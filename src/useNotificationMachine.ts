import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

// Hidden by default
// Triggers through whatever action
// Auto-closes after 3 seconds
// Does not close if user hovers mouse over it
// Resets countdown when user removes mouse

export enum States {
  closed = 'closed',
  opened = 'opened',
  paused = 'paused'
}

export enum Transitions {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  PAUSE = 'PAUSE',
  RESUME = 'RESUME'
}

const NotificationMachine = Machine({
  id: 'notification',
  initial: States.closed,
  context: {
    message: ''
  },
  states: {
    [States.closed]: {
      on: {
        [Transitions.OPEN]: {
          target: States.opened,
          actions: assign({
            message: (_: any, event: any) => event.message
          })
        }
      }
    },
    [States.opened]: {
      on: {
        [Transitions.CLOSE]: States.closed,
        [Transitions.PAUSE]: States.paused
      },
      after: { 1500: States.closed }
    },
    [States.paused]: {
      on: {
        [Transitions.RESUME]: States.opened,
        [Transitions.CLOSE]: States.closed
      }
    }
  }
});

export const useNotificationMachine = () => {
  const [state, send] = useMachine(NotificationMachine);

  return {
    state,
    show: state.matches(States.opened) || state.matches(States.paused),
    open: (message: string) => {
      send({ type: Transitions.OPEN, message });
    },
    close: () => {
      send({ type: Transitions.CLOSE });
    },
    pause: () => {
      send({ type: Transitions.PAUSE });
    },
    resume: () => {
      send({ type: Transitions.RESUME });
    }
  };
};
