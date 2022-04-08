import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useSocketContext } from '../hooks';

export default function VideoPlayer(): React.ReactElement {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useSocketContext();
  const styles = useStyles();

  return (
    <Grid container className={styles.gridContainer}>
      {/* Our own video */}
      <Paper className={styles.paper}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {name || 'My Name'}
          </Typography>
          <video
            playsInline
            poster="https://c.tenor.com/8tHFGZn1O9IAAAAd/%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D1%83%D0%B2%D1%8B%D1%80%D1%83%D0%B1%D0%B0%D0%B9-%D1%82%D1%83%D1%82%D1%81%D1%8C%D0%B5%D0%BC%D0%BA%D0%B0%D0%B2%D1%8B%D0%B4%D0%B8%D0%BE%D0%B7%D0%B0%D0%BF%D1%80%D0%B5%D1%89%D0%B5%D0%BD%D0%B0.gif"
            muted
            ref={myVideo}
            autoPlay
            className={styles.video}
          />
        </Grid>
      </Paper>
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
    minHeight: '400px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    minWidth: '500px',
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
  video: {
    objectFit: 'contain',
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
}));
