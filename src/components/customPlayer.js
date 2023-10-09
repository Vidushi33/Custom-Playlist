import React from "react";
import { useState, useEffect, useRef } from "react";

import { GiPlayButton } from "react-icons/gi";
import { GiPauseButton } from "react-icons/gi";
import { HiSpeakerWave } from "react-icons/hi2";
import { PiSpeakerSimpleSlashBold } from "react-icons/pi";
import { AiFillFastForward } from "react-icons/ai";
import { AiFillFastBackward } from "react-icons/ai";

import VideosList from "../videos.json";

export default function CustomPlayer() {
  const [videoPlayer, setVideoPlayer] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMute: false,
  });

  const videoElem = useRef(null);
  // console.log(videoElem.current.currentTime)

  // PLAY PAUSE FUNCTION 
  const togglePlayPause = () => {
    setVideoPlayer({
      ...videoPlayer,
      isPlaying: !videoPlayer.isPlaying,
    });
  };

  useEffect(() => {
    videoPlayer.isPlaying
      ? videoElem.current.play()
      : videoElem.current.pause();
  }, [videoPlayer.isPlaying, videoElem]);

  
  // PAUSE FUNCTION
  const togglePause = () => {
    setVideoPlayer({
      ...videoPlayer,
      isPlaying: false,
    });
  };

  
  
  // INCREASE TIME FROM 5 SECONDS
  const addFiveSec = () => {
    videoElem.current.currentTime = videoElem.current.currentTime + 5;
  };

  
  // DECREASE TIME FROM 5 SECONDS
  const subtractFiveSec = () => {
    videoElem.current.currentTime = videoElem.current.currentTime - 5;
  };

  

  // UPDATING THE TIME 
  const timeUpdateBar = () => {
    // console.log(videoElem.current.currentTime);
    let progress = (videoElem.current.currentTime / videoElem.current.duration) * 100;
    if (isNaN(progress)) {
      progress = 0;
    }
    // console.log(progress);
    // console.log(videoElem)
    setVideoPlayer({
      ...videoPlayer,
      progress,
    });

    if (progress === 100) {
      togglePlayPause();
    }
  };


  // UPDATING THE PROGRESS BAR
  const videoProgress = (event) => {
    const changeOnProgressBar = Number(event.target.value);
    //   console.log(changeOnProgressBar)
    videoElem.current.currentTime = (videoElem.current.duration / 100) * changeOnProgressBar;
    setVideoPlayer({
      ...videoPlayer,
      progress: changeOnProgressBar,
    });
  };



  // CHANGING THE SPEED OF THE VIDEO
  const handleVideoSpeed = (event) => {
    // console.log(event)
    const speed = Number(event.target.value);
    // console.log(speed);
    videoElem.current.playbackRate = speed;
    setVideoPlayer({
      ...videoPlayer,
      speed,
    });
  };



  // MUTE AND UNMUTE THE VIDEO
  const toggleMute = () => {
    setVideoPlayer({
      ...videoPlayer,
      isMute: !videoPlayer.isMute,
    });
  };

  useEffect(() => {
    videoPlayer.isMute
      ? (videoElem.current.muted = true)
      : (videoElem.current.muted = false);
  });

  
  
  // LINKING THE VIDEOS BY JSON 
  const [path, setPath] = useState("/Videos/video1.mp4");
  const [activeElement, setActiveElement] = useState(1);

  useEffect(() => {
    videoElem.current?.load();
  }, [path]);
  


  // UPDATING THE VIDEO THROUGH JSON LINK[LISTING]
  const urlUpdate = (url) => {
    console.log(url);
    setPath(url);
  };


  //ROTATING ARRAY ON SELECTING ONE VIDEO FROM LIST 
  const [JsonData, setJsonData] = useState([...VideosList]);
  // console.log(JsonData)

  const selectedListOnTop = (index) => {
    let copyList = [...JsonData];
    const selectedArray = [copyList[index]];
    const rightElem = copyList.slice(index + 1, copyList.length);
    const midArray = selectedArray.concat(rightElem);
    const leftElem = copyList.slice(0, index);
    const newOrder = midArray.concat(leftElem);
    // console.log(newOrder)

    setJsonData(newOrder);
    // console.log(JsonData)
  };

  return (
    <div>
      <h1 className="text-4xl text-bold text-center mt-6">
        Custom Video Playlist in React
      </h1>

      <div className=" ml-5 mt-6  flex">
        <div className=" relative">

          {/* VIDEO ADDING */}
          <video
            width="1000"
            height="240"
            ref={videoElem}
            onTimeUpdate={timeUpdateBar}
          >
            <source src={path} />
          </video>


          {/* CENTER CONTROLS */}
          <div className=" flex justify-evenly absolute fixed bottom-72 w-full">
            <button onClick={subtractFiveSec} className="text-black flex-none">
              <i className="text-4xl  bg-black">
                <AiFillFastBackward />
              </i>
            </button>

            <button onClick={togglePlayPause} className="text-black flex-none">
              {!videoPlayer.isPlaying ? (
                <i className="text-4xl  bg-black">
                  <GiPlayButton />
                </i>
              ) : (
                <i className="text-4xl bg-black">
                  <GiPauseButton />
                </i>
              )}
            </button>

            <button onClick={addFiveSec} className="text-black flex-none">
              <i className="text-4xl  bg-black">
                <AiFillFastForward />
              </i>
            </button>
          </div>


          {/* CONTROLLERS */}
          <div className=" sticky bottom-9 bg-black p-4 rounded w-full flex">
            <button onClick={togglePlayPause} className="text-white flex-none">
              {!videoPlayer.isPlaying ? (
                <i className="text-2xl  bg-black">
                  <GiPlayButton />
                </i>
              ) : (
                <i className="text-2xl bg-black">
                  <GiPauseButton />
                </i>
              )}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={videoPlayer.progress}
              onChange={(e) => videoProgress(e)}
              className="ml-7 mt-3 h-2 cursor-pointer flex-auto"
            />

            <div className="float-right flex-none">
              <select
                value={videoPlayer.speed}
                onChange={(e) => handleVideoSpeed(e)}
                className="ml-12  p-1 pr-2 "
              >
                <option value="0.25">0.25x</option>
                <option value="0.5">0.50x</option>
                <option value="1" className="text-center">
                  1x
                </option>
                <option value="1.5">1.50x</option>
                <option value="2" className="text-center">
                  2x
                </option>
              </select>

              <button onClick={toggleMute} className="ml-12 text-white ">
                {!videoPlayer.isMute ? (
                  <i className="text-2xl bg-black">
                    <HiSpeakerWave />
                  </i>
                ) : (
                  <i className="text-2xl bg-black">
                    <PiSpeakerSimpleSlashBold />
                  </i>
                )}
              </button>
            </div>
          </div>
        </div>



        {/* LIST OF VIDEOS */}
        <div
          className="ml-10 w-96 mr-5 mt-12 text-black flex-auto overflow-y-auto"
          style={{ maxHeight: "500px" }}
        >
          <ul>
            <li className="bg-black text-center">
              {JsonData.map((item, index) => {
                if (item.SNo === activeElement) {
                  return (
                    <div>
                      <a
                        href="/#"
                        className="flex mb-1 p-4 text-white bg-sky-800 text-center active::text-white active:bg-sky-800"
                        key={index}
                        onClick={() => {
                          urlUpdate(item.url);
                          selectedListOnTop(index);
                          togglePause();
                        }}
                      >
                        <p className="mr-2 ">{item.SNo})</p>
                        <p className="text-center">{item.title}</p>

                        <br />
                      </a>
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <a
                        href="/#"
                        className="flex mb-1 p-4 bg-sky-100 text-center active::text-white active:bg-sky-800"
                        key={index}
                        onClick={() => {
                          urlUpdate(item.url);

                          setActiveElement(item.SNo);
                          selectedListOnTop(index);
                          togglePause();
                        }}
                      >
                        <p className="mr-2 ">{item.SNo})</p>
                        <p className="text-center">{item.title}</p>

                        <br />
                      </a>
                    </div>
                  );
                }
              })}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
