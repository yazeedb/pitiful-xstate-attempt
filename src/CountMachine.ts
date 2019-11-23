import { Machine, assign } from 'xstate';

export const countMachine = Machine(
  {
    initial: 'start',
    context: { count: 0 },
    states: {
      start: {
        entry: 'increment'
      }
    }
  },
  {
    actions: {
      increment: assign({ count: (context) => context.count + 1 }),
      decrement: assign({ count: (context) => context.count - 1 })
    }
  }
);
