import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startTimer,
  pauseTimer,
  stopTimer,
  tick,
  switchSession
} from "../store/actions/timerActions"

const Timer = () => {
  const dispatch = useDispatch();
  const { timeLeft, isWorking, isRunning } = useSelector(
    (state) => state.timerReducer
  );

  const handleStart = () => {
    dispatch(startTimer());
  };

  const handlePause = () => {
    dispatch(pauseTimer());
  };

  const handleStop = () => {
    dispatch(stopTimer());
  };

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        dispatch(tick());
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      dispatch(switchSession());
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, dispatch]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <h1>{isWorking ? "Work" : "Break"}: {formatTime(timeLeft)}</h1>
      {!isRunning && (
        <button onClick={handleStart}>Start</button>
      )}
      {isRunning && (
        <div>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleStop}>Stop</button>
        </div>
      )}
    </div>
  );
};


export default Timer;