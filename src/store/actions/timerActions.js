import {
  START_TIMER,
  STOP_TIMER,
  PAUSE_TIMER,
  TICK,
  SWITCH_SESSION
} from "./type";

export const startTimer = () => {
  return { type: START_TIMER };
};

export const pauseTimer = () => {
  return { type: PAUSE_TIMER };
};

export const stopTimer = () => {
  return { type: STOP_TIMER };
};

export const tick = () => {
  return { type: TICK };
};

export const switchSession = () => {
  return { type: SWITCH_SESSION };
};
