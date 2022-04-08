import { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useSocketContext } from '../hooks';
import { OptionsPropTypes } from './types';

export default function Options({
  children,
}: OptionsPropTypes): React.ReactElement {
  const [idToCall, setIdToCall] = useState('');

  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useSocketContext();
  const styles = useStyles();

  return (
    <Container className={styles.container}>
      <Paper elevation={10} className={styles.paper}>
        <form className={styles.root} noValidate autoComplete="off">
          <Grid container className={styles.gridContainer}>
            <Grid item xs={12} md={6} className={styles.padding}>
              <Typography gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className={styles.input}
                fullWidth
              />
              <CopyToClipboard text={me}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={styles.padding}>
              <Typography gutterBottom variant="h6">
                Make a call
              </Typography>
              <TextField
                label="ID to call"
                value={idToCall}
                onChange={e => setIdToCall(e.target.value)}
                className={styles.input}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneDisabled fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Phone fontSize="large" />}
                  fullWidth
                  onClick={() => callUser(idToCall)}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '10px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  input: {
    marginBottom: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
}));
