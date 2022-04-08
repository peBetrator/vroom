import { Container, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  ScreenShare,
  StopScreenShare,
} from '@material-ui/icons';

import { useSocketContext } from '../hooks';

export default function MuteButtons(): React.ReactElement {
  const {
    isMicOn,
    isVideoOn,
    isScreenShOn,
    toggleMic,
    toggleVideo,
    toggleScreenSharing,
  } = useSocketContext();
  const styles = useStyles();

  return (
    <Container className={styles.btnsContainer}>
      {isVideoOn ? (
        <IconButton
          color="primary"
          aria-label="turn off video"
          component="span"
          title="Turn OFF Camera"
          onClick={toggleVideo}
        >
          <Videocam fontSize="large" />
        </IconButton>
      ) : (
        <IconButton
          color="secondary"
          aria-label="turn on video"
          component="span"
          title="Turn ON Camera"
          onClick={toggleVideo}
        >
          <VideocamOff fontSize="large" />
        </IconButton>
      )}

      {isMicOn ? (
        <IconButton
          color="primary"
          aria-label="mute mic"
          component="span"
          title="Mute Mic"
          onClick={toggleMic}
        >
          <Mic fontSize="large" />
        </IconButton>
      ) : (
        <IconButton
          color="secondary"
          aria-label="un-mute mic"
          component="span"
          title="Unmute Mic"
          onClick={toggleMic}
        >
          <MicOff fontSize="large" />
        </IconButton>
      )}

      {isScreenShOn ? (
        <IconButton
          color="primary"
          aria-label="stop screen share"
          component="span"
          title="Stop Screen Share"
          onClick={toggleScreenSharing}
        >
          <ScreenShare fontSize="large" />
        </IconButton>
      ) : (
        <IconButton
          color="secondary"
          aria-label="screen share"
          component="span"
          title="Share Screen"
          onClick={toggleScreenSharing}
        >
          <StopScreenShare fontSize="large" />
        </IconButton>
      )}
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  btnsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gridGap: 20,
  },
}));
