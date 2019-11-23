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
}) => {
  const baseClassName = 'notification';

  return (
    <div
      className={show ? baseClassName : `${baseClassName} fade-out`}
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: 'black',
        width: '200px',
        minHeight: '50px',
        borderRadius: '3px',
        cursor: 'pointer',
        padding: '0 10px'
      }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onClick={close}
    >
      <p style={{ color: 'white' }}>{message}</p>
    </div>
  );
};

const App: React.FC = () => {
  const { state, open, close, pause, resume, show } = useNotificationMachine();

  return (
    <div
      className="App"
      style={{
        maxWidth: '960px',
        margin: '0 auto',
        marginTop: '200px'
      }}
    >
      <Notification
        show={show}
        pause={pause}
        resume={resume}
        close={close}
        message={state.context.message}
      />

      <h1>Notification Squad</h1>

      <button
        onClick={() => {
          open('Click to close, hover to keep.');
        }}
        style={{
          padding: '8px 16px',
          fontSize: '24px'
        }}
      >
        Open
      </button>
    </div>
  );
};

export default App;
