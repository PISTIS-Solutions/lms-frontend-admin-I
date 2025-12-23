import React, { useRef, useState, useEffect } from "react";
import { FaVolumeMute } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";
import { FaForward } from "react-icons/fa6";

interface ProtectedVideoPlayerProps {
  videoUrl: string;
  poster?: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  className?: string;
}

const ProtectedVideoPlayer: React.FC<ProtectedVideoPlayerProps> = ({
  videoUrl,
  poster,
  onProgress,
  onComplete,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) video.pause();
    else video.play();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const forward10s = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(video.currentTime + 10, duration);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const current = video.currentTime;
    setCurrentTime(current);
    if (onProgress && duration > 0) {
      const progress = (current / duration) * 100;
      onProgress(progress);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) setDuration(video.duration);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (onComplete) onComplete();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(
        () => setShowControls(false),
        3000
      );
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <div
      className={`relative bg-black rounded-sm overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onContextMenu={(e) => e.preventDefault()}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        className="w-full h-auto max-h-[70vh] object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
        controls={false}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        playsInline
      />

      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-2 flex items-center justify-between text-white text-sm">
          <button
            onClick={togglePlay}
            className="hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <svg width="24" height="24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="flex items-center gap-2 flex-1 mx-2">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => {
                const t = parseFloat(e.target.value);
                if (videoRef.current) videoRef.current.currentTime = t;
                setCurrentTime(t);
              }}
              className="flex-1 accent-[#157BFF]"
            />
            <span>{formatTime(duration)}</span>
          </div>

          <button
            onClick={forward10s}
            title="Forward 10s"
            className="hover:scale-110 transition-transform"
          >
           <FaForward size={22} />
          </button>

          <button
            onClick={toggleMute}
            className="hover:scale-110 cursor-pointer transition-transform ml-4"
          >
            {isMuted ? (
              <FaVolumeMute size={22} />
            ) : (
            <AiFillSound size={22} />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProtectedVideoPlayer;
