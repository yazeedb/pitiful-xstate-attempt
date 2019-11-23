import React from 'react';
import logo from './logo.svg';
import {
  NotificationMachine,
  openEvent,
  closeEvent,
  States
} from './NotificationMachine';
import { useMachine } from '@xstate/react';
import './App.css';
import { countMachine } from './CountMachine';

interface NotificationProps {
  message: string | null;
  open: boolean;
}
const Notification: React.FC<NotificationProps> = ({ open, message }) => {
  console.log({ message });
  return open && message ? (
    <div
      className="notification"
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: 'black',
        width: '100px',
        height: '30px'
      }}
    >
      <p
        style={{
          color: 'white'
        }}
      >
        {message}
      </p>
    </div>
  ) : null;
};

const App: React.FC = () => {
  const [state, send] = useMachine(NotificationMachine);

  const [state2, send2] = useMachine(countMachine);
  const { message } = state.context;

  console.log(state2);

  return (
    <div
      className="App"
      style={{
        marginTop: '100px'
      }}
    >
      <button
        onClick={() => {
          console.log('click');
          send2('increment');
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          send2('decrement');
        }}
      >
        -1
      </button>

      <Notification open={state.matches(States.opened)} message={message} />
      <button
        onClick={() => {
          send(openEvent('Hello Beef'));
        }}
      >
        Open
      </button>
      <button
        onClick={() => {
          send(closeEvent());
        }}
      >
        Close
      </button>
    </div>
  );
};

export default App;
