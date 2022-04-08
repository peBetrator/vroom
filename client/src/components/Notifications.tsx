import { Button } from '@material-ui/core';

import { useSocketContext } from '../hooks';

export default function Notifications(): React.ReactElement | null {
  const { answerCall, call, callAccepted } = useSocketContext();

  if (call.isReceivingCall && !callAccepted) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{call.name || 'A user'} is calling:</h1>
        <Button variant="contained" color="primary" onClick={answerCall}>
          Answer
        </Button>
      </div>
    );
  }

  return null;
}
