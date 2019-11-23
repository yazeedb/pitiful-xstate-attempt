import React from 'react';
import { useNotificationMachine } from './useNotificationMachine';
import './App.css';

interface NotificationProps {
  show: boolean;
  message: string;
  pause: () => void;
  resume: () => void;
  close: () => void;
}
const Notification: React.FC<NotificationProps> = ({
  show,
  message,
  pause,
  resume,
  close
}) =>
  show ? (
    <div
      className="notification"
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: 'black',
        width: '100px'
      }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onClick={close}
    >
      <p style={{ color: 'white' }}>{message}</p>
    </div>
  ) : null;

const App: React.FC = () => {
  const { state, open, close, pause, resume, show } = useNotificationMachine();

  console.log('State:', state);

  return (
    <div
      className="App"
      style={{
        marginTop: '100px'
      }}
    >
      <Notification
        show={show}
        pause={pause}
        resume={resume}
        close={close}
        message={state.context.message}
      />

      <button
        onClick={() => {
          open('Hello World');
        }}
      >
        Open
      </button>

      <button onClick={close}>Close</button>
    </div>
  );
};

export default App;
