import React from 'react';
import { useNotificationMachine } from './useNotificationMachine';
import './App.css';

interface NotificationProps {
  show: boolean;
  message: string;
  notificationType: any;
  pause: () => void;
  resume: () => void;
  close: () => void;
}
const Notification: React.FC<NotificationProps> = ({
  show,
  message,
  pause,
  resume,
  close,
  notificationType
}) => {
  const baseClassName = `notification ${notificationType}`;

  return (
    <div
      className={show ? baseClassName : `${baseClassName} fade-out`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onClick={close}
    >
      <p>{message}</p>
    </div>
  );
};

const App: React.FC = () => {
  const { state, send, show } = useNotificationMachine();

  return (
    <div>
      <Notification
        show={show}
        pause={() => {
          send('PAUSE');
        }}
        resume={() => {
          send('RESUME');
        }}
        close={() => {
          send('CLOSE');
        }}
        message={state.context.message}
        notificationType={state.context.notificationType}
      />

      <h1>Notification Squad</h1>

      <button
        className="success"
        onClick={() => {
          send({
            type: 'OPEN',
            message: 'Success!',
            notificationType: 'success'
          });
        }}
      >
        Success
      </button>

      <button
        className="info"
        onClick={() => {
          send({
            type: 'OPEN',
            message: 'Info!',
            notificationType: 'info'
          });
        }}
      >
        Info
      </button>

      <button
        className="warning"
        onClick={() => {
          send({
            type: 'OPEN',
            message: 'Warning!',
            notificationType: 'warning'
          });
        }}
      >
        Warning
      </button>

      <button
        className="danger"
        onClick={() => {
          send({
            type: 'OPEN',
            message: 'Danger!',
            notificationType: 'danger'
          });
        }}
      >
        Error
      </button>
    </div>
  );
};

export default App;
