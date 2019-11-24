import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

const NotificationMachine = Machine({
  id: 'notification',
  initial: 'closed',
  context: {
    message: '',
    notificationType: 'info'
  },
  states: {
    closed: {},
    opened: {
      on: {
        CLOSE: 'closed',
        PAUSE: 'paused'
      },
      after: {
        '1500': 'closed'
      }
    },
    paused: {
      on: {
        RESUME: 'opened',
        CLOSE: 'closed'
      }
    }
  },
  on: {
    OPEN: {
      target: 'opened',
      actions: assign({
        message: (_: any, event: any) => event.message,
        notificationType: (_: any, event: any) => event.notificationType
      })
    }
  }
});

export const useNotificationMachine = () => {
  const [state, send] = useMachine(NotificationMachine);

  return {
    state,
    send,
    show: state.matches('opened') || state.matches('paused')
  };
};
