import React, { useState, useEffect, useRef } from 'react';
import video1 from "../assets/videos/video_1.ogg";
import video2 from "../assets/videos/video_2.ogg";
import video3 from "../assets/videos/video_3.ogg";
import video4 from "../assets/videos/video_4.ogg";

const videoSources = [video1, video2, video3, video4];

const BackgroundVideo = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [isPlayingFirst, setIsPlayingFirst] = useState(true);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
    setNextVideoIndex((prevIndex) => (prevIndex + 2) % videoSources.length);
    setIsPlayingFirst(!isPlayingFirst);
  };

  useEffect(() => {
    const currentVideoRef = isPlayingFirst ? videoRef1 : videoRef2;
    if (currentVideoRef.current) {
      currentVideoRef.current.play();
    }
  }, [isPlayingFirst]);

  return (
    <div className='relative w-screen h-screen'>
      <video
        ref={videoRef1}
        className={`absolute object-fill w-screen h-screen transition-opacity duration-1000 ${isPlayingFirst ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        muted
        onEnded={handleVideoEnd}
      >
        <source src={videoSources[currentVideoIndex]} type="video/ogg" />
      </video>
      <video
        ref={videoRef2}
        className={`absolute object-fill w-screen h-screen transition-opacity duration-1000 ${!isPlayingFirst ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        muted
        onEnded={handleVideoEnd}
      >
        <source src={videoSources[nextVideoIndex]} type="video/ogg" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
