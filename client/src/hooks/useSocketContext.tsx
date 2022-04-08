import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { io } from 'socket.io-client';

import {
  CallData,
  ContextProviderPropTypes,
  SocketContextValue,
} from './types';
import useUserName from './useUserName';

const SocketContext = createContext({} as SocketContextValue);

const useSocketContext = () => useContext(SocketContext);

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }: ContextProviderPropTypes) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [me, setMe] = useState('');
  const [call, setCall] = useState({} as CallData);

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isScreenShOn, setIsScreenShOn] = useState(false);

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  const { name } = useUserName();

  useEffect(() => {
    socket.on('me', id => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream as MediaStream,
    });

    peer.on('signal', data => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', currentStream => {
      userVideo.current!.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream as MediaStream,
    });

    peer.on('signal', data => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on('stream', currentStream => {
      userVideo.current!.srcObject = currentStream;
    });

    socket.on('callAccepted', signal => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();
    window.location.reload();
  };

  const toggleMic = () => {
    if (!isVideoOn && isMicOn) {
      // if both audio and video have to be disabled don't getUserMedia()
      (myVideo.current!.srcObject as MediaStream)
        .getAudioTracks()
        .forEach(track => track.stop());

      setIsMicOn(!isMicOn);
      setStream(null);
      myVideo.current!.srcObject = null;
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: isVideoOn, audio: !isMicOn })
      .then(currentStream => {
        setIsMicOn(!isMicOn);
        setStream(currentStream);
        myVideo.current!.srcObject = currentStream;
      });
  };

  const toggleVideo = () => {
    if (!isMicOn && isVideoOn) {
      // if both audio and video have to be disabled don't getUserMedia()
      (myVideo.current!.srcObject as MediaStream)
        .getVideoTracks()
        .forEach(track => track.stop());

      setIsVideoOn(!isVideoOn);
      setStream(null);
      myVideo.current!.srcObject = null;
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: isMicOn, video: !isVideoOn })
      .then(currentStream => {
        setIsVideoOn(!isVideoOn);
        setStream(currentStream);
        myVideo.current!.srcObject = currentStream;
      });
  };

  const toggleScreenSharing = () => {
    if (isScreenShOn) {
      (myVideo.current!.srcObject as MediaStream)
        .getTracks()
        .forEach(track => track.stop());

      setIsScreenShOn(!isScreenShOn);
      setStream(null);
      myVideo.current!.srcObject = null;
      return;
    }

    navigator.mediaDevices
      .getDisplayMedia({ video: { frameRate: 60 } })
      .then(currentStream => {
        setIsScreenShOn(!isVideoOn);
        setStream(currentStream);
        myVideo.current!.srcObject = currentStream;
      });
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        isMicOn,
        toggleMic,
        isVideoOn,
        toggleVideo,
        isScreenShOn,
        toggleScreenSharing,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, useSocketContext };
