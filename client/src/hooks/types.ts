export type UseUserNameReturnType = {
  name: string;
  updateName: (name: string) => void;
};

export type ContextProviderPropTypes = {
  children: React.ReactElement;
};

export type CallData = {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: string;
};

export type SocketContextValue = {
  call: CallData;
  callAccepted: boolean;
  myVideo: React.MutableRefObject<HTMLVideoElement | null>;
  userVideo: React.MutableRefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  isMicOn: boolean;
  toggleMic: () => void;
  isVideoOn: boolean;
  toggleVideo: () => void;
  callEnded: boolean;
  me: string;
  callUser: (id: string) => void;
  leaveCall: () => void;
  answerCall: () => void;
};
