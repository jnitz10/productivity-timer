const initialState = {
  timeLeft: 25 * 60 || 0,
  isWorking: true,
  isRunning: false,
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_TIMER":
      return { ...state, isRunning: true };
    case "PAUSE_TIMER":
      return { ...state, isRunning: false };
    case "STOP_TIMER":
      return {
        ...state,
        isRunning: false,
        isWorking: !state.isWorking,
        timeLeft: !state.isWorking ? 25 * 60 : 5 * 60,
      };
    case "TICK":
      return { ...state, timeLeft: state.timeLeft - 1 };
    case "SWITCH_SESSION":
      return {
        ...state,
        isWorking: !state.isWorking,
        timeLeft: !state.isWorking ? 25 * 60 : 5 * 60,
      };
    default:
      return state;
  }
};

export default timerReducer;
