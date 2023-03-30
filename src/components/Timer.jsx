import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startTimer,
  pauseTimer,
  stopTimer,
  tick,
  switchSession
} from "../store/actions/timerActions"
import bell from "../assets/bell.mp3";

const Timer = () => {
  const dispatch = useDispatch();
  const { timeLeft, isWorking, isRunning } = useSelector(
    (state) => state.timerReducer
  );

  const [isFinished, setIsFinished] = useState(false);
  const bellRef = React.createRef();

  const handleStart = () => {
    dispatch(startTimer());
  };

  const handlePause = () => {
    dispatch(pauseTimer());
  };

  const handleStop = () => {
    dispatch(stopTimer());
    setIsFinished(false); // stop the bell if ringing
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
      setIsFinished(true);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, dispatch]);

  useEffect(() => {
    if (isFinished) {
      bellRef.current.play();
      setTimeout(() => {
        setIsFinished(false);
      }, 5000);
    }
  }, [isFinished]);


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
      <audio ref={bellRef} src={bell} />
    </div>
  );
};


export default Timer;