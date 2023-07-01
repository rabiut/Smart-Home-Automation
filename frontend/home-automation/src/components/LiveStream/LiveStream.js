"use client";
import { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const LiveStream = () => {
  useEffect(() => {
    const player = videojs("my_video");
    document.addEventListener("click", function () {
      player.muted(false);
    });
  }, []);

  return (
    <>
      <div className="livestream__layout w-full h-full flex flex-col mt-10 md:mt-0 md:justify-center items-center">
        <h1 className="title font-bold text-3xl mb-4">
          Live Stream from ESP32-CAM
        </h1>
        <div className="livestream">
          <video
            id="my_video"
            className="video-js vjs-default-skin"
            controls
            muted
            autoPlay
            data-setup="{ }"
          >
            <source
              src="http://192.168.2.43:8080/hls/stream.m3u8"
              type="application/x-mpegURL"
            />
          </video>
        </div>
      </div>
    </>
  );
};

export default LiveStream;
