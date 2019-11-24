import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

enum States {
  closed = 'closed',
  opened = 'opened',
  paused = 'paused'
}

interface NotificationStateSchema {
  states: {
    [States.closed]: {};
    [States.opened]: {};
    [States.paused]: {};
  };
}

export type NotificationType = 'success' | 'danger' | 'warning' | 'info';

type NotificationEvent =
  | { type: 'CLOSE' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | {
      type: 'OPEN';
      message: string;
      notificationType: NotificationType;
    };

interface NotificationContext {
  message: string;
  notificationType: NotificationType;
}

const NotificationMachine = Machine<
  NotificationContext,
  NotificationStateSchema,
  NotificationEvent
>({
  id: 'notification',
  initial: States.closed,
  context: {
    message: '',
    notificationType: 'info'
  },
  states: {
    closed: {},
    opened: {
      on: {
        CLOSE: States.closed,
        PAUSE: States.paused
      },
      after: { 1500: 'closed' }
    },
    paused: {
      on: {
        RESUME: States.opened,
        CLOSE: States.closed
      }
    }
  },
  on: {
    OPEN: {
      target: States.opened,
      actions: assign({
        message: (_, event) => event.message,
        notificationType: (_, event) => event.notificationType
      })
    }
  }
});

export const useNotificationMachine = () => {
  const [state, send] = useMachine(NotificationMachine);

  return {
    state,
    send,
    show: state.matches(States.opened) || state.matches(States.paused)
  };
};
