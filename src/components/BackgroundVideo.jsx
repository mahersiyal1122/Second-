// import React, { useState, useEffect, useRef } from 'react';
// import video1 from "../assets/videos/video_1.ogg";
// import video2 from "../assets/videos/video_2.ogg";
// import video3 from "../assets/videos/video_3.ogg";
// import video4 from "../assets/videos/video_4.ogg";

// const videoSources = [video1, video2, video3, video4];

// const BackgroundVideo = () => {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const videoRef = useRef(null);

//   const handleVideoEnd = () => {
//     setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
//   };

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.load();
//       videoRef.current.play();
//     }
//   }, [currentVideoIndex]);

//   return (
//     <div className='relative w-screen h-screen'>
//       <video
//         ref={videoRef}
//         className="absolute object-fill w-screen h-screen"
//         autoPlay
//         muted
//         onEnded={handleVideoEnd}
//       >
//         <source src={videoSources[currentVideoIndex]} type="video/ogg" />
//       </video>
//     </div>
//   );
// };

// export default BackgroundVideo;

import React, { useState, useEffect, useRef } from 'react';
import video1 from "../assets/videos/video_1.ogg";
import video2 from "../assets/videos/video_2.ogg";
import video3 from "../assets/videos/video_3.ogg";
import video4 from "../assets/videos/video_4.ogg";

const videoSources = [video1, video2, video3, video4];

const BackgroundVideo = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
      setIsFading(false);
    }, 1000); // 1 second fade out
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentVideoIndex]);

  return (
    <div className='relative w-screen h-screen'>
      <video
        ref={videoRef}
        className={`absolute object-fill w-screen h-screen transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}
        autoPlay
        muted
        onEnded={handleVideoEnd}
      >
        <source src={videoSources[currentVideoIndex]} type="video/ogg" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
