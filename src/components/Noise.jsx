import React, { useState, useEffect } from "react";
import pinkNoise from "../assets/pink.mp3"; // import the white noise audio clip
import whiteNoise from "../assets/white.mp3"; // import the pink noise audio clip
import brownianNoise from "../assets/brownian.mp3"; // import the brownian noise audio clip
import rainforest from "../assets/rainforest.mp3"; // import the rainforest audio clip
import rain from "../assets/rain.mp3"; // import the rain audio clip
import ocean from "../assets/ocean.mp3"; // import the ocean audio clip
import binaural15hz from "../assets/binaural15hz.mp3"; // import the binaural 15hz audio clip
import binaural20hz from "../assets/binaural20hz.mp3"; // import the binaural 20hz audio clip
import binaural35hz from "../assets/binaural35hz.mp3"; // import the binaural 35hz audio clip

const noises = [
  { name: "Pink Noise", src: pinkNoise },
  { name: "White Noise", src: whiteNoise },
  { name: "Brownian Noise", src: brownianNoise },
  { name: "Rainforest", src: rainforest },
  { name: "Rain", src: rain },
  { name: "Ocean", src: ocean },
  { name: "Binaural Beat 15hz", src: binaural15hz },
  { name: "Binaural Beat 20hz", src: binaural20hz },
  { name: "Binaural Beat 35hz", src: binaural35hz },
]

const Noise = () => {
  const [isPlaying, setIsPlaying] = useState(false); // state variable to keep track of whether the audio is playing or not
  const [volume, setVolume] = useState(0.5); // state variable to keep track of the audio volume
  const [noise, setNoise] = useState(noises[0].src); // state variable to keep track of the audio volume
  const audioRef = React.createRef(); // reference to the audio element

  const handleTogglePlay = () => {
    const audioElement = audioRef.current; // get the audio element

    if (!isPlaying) {
      audioElement.play(); // play the audio
      setIsPlaying(true); // set isPlaying to true
    } else {
      audioElement.pause(); // pause the audio
      setIsPlaying(false); // set isPlaying to false
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value; // get the new volume value
    setVolume(newVolume); // update the volume state variable
    audioRef.current.volume = newVolume; // set the audio volume
  };

  const handleNoiseChange = (event) => {
    const newNoise = event.target.value;
    setNoise(newNoise);
    audioRef.current.src = newNoise;
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <button onClick={handleTogglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <div className="flex flex-col">
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
        />
        <select value={noise} onChange={handleNoiseChange}>
          {noises.map((noise) => (
            <option key={noise.src} value={noise.src}>
              {noise.name}
            </option>
          ))}
        </select>

      </div>
      <audio src={pinkNoise} loop ref={audioRef}></audio>
    </div>
  );
};

export default Noise;
