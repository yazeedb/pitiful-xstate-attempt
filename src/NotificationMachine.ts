import { Machine, assign } from 'xstate';

// Hidden by default
// Triggers through whatever action
// Auto-closes after 3 seconds
// Does not close if user hovers mouse over it
// Resets countdown when user removes mouse

export const openEvent = (message: string) => {
  return {
    type: Transitions.OPEN,
    message
  };
};

export const closeEvent = () => {
  return {
    type: Transitions.CLOSE
  };
};

export enum States {
  closed = 'closed',
  opened = 'opened'
}

enum Transitions {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE'
}

export const NotificationMachine = Machine({
  id: 'notification',
  initial: States.closed,
  context: {
    message: null
  },
  states: {
    [States.closed]: {
      on: {
        [Transitions.OPEN]: States.opened
      }
    },
    [States.opened]: {
      on: {
        [Transitions.CLOSE]: States.closed
      },
      invoke: {
        src: () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 3000);
          }),
        onDone: {
          target: States.closed
        }
      }
    }
  },

  //   actions: assign((context, event) => {
  //     return {
  //       count: context.count + event.value,
  //       message: 'Count changed'
  //     }
  //   }),
  on: {
    [Transitions.OPEN]: {
      target: States.opened,
      actions: assign((context: any, event) => {
        console.log({ context, event });
        return {
          message: event.message
        };
      })
      //   actions: assign({
      //     message: (_: any, event: any) => event.message
      //   })
    }
  }
});
