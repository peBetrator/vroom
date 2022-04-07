import { useContext } from 'react';

import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../hooks';

export default function VideoPlayer(): React.ReactElement {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  const styles = useStyles();

  console.log({ call, userVideo });

  return (
    <Grid container className={styles.gridContainer}>
      {/* Our own video */}
      {stream && (
        <Paper className={styles.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || 'My Name'}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={styles.video}
            />
          </Grid>
        </Paper>
      )}
      {/* User's video */}
      {callAccepted && !callEnded && (
        <Paper className={styles.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "User's name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={styles.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
}));
