import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, Play, Pause, 
  Settings, X, Minimize, Maximize, Gauge, RotateCcw, RotateCw, Volume2, VolumeX
} from 'lucide-react';
import { Lesson } from '../types';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface VideoPlayerScreenProps {
  lesson: Lesson;
  courseTitle: string;
  moduleTitle: string;
  onBack: () => void;
  onProgressUpdate?: (lessonId: string, time: number) => void;
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ 
  lesson, 
  courseTitle, 
  moduleTitle,
  onBack, 
  onProgressUpdate 
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
      setIsFullscreen(!!document.fullscreenElement);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 4000);
    }
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  const loadYouTubeAPI = () => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
  };

  const getYouTubeId = (url?: string) => {
    if (!url) return 'dQw4w9WgXcQ';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : 'dQw4w9WgXcQ';
  };

  useEffect(() => {
    loadYouTubeAPI();

    const initPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      const videoId = getYouTubeId(lesson.videoUrl);

      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          playsinline: 1
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            setDuration(event.target.getDuration());
            
            const savedProgress = localStorage.getItem(`undd_progress_${lesson.id}`);
            if (savedProgress) {
              const time = parseFloat(savedProgress);
              event.target.seekTo(time, true);
              setCurrentTime(time);
            }
            
            event.target.playVideo();
            setIsPlaying(true);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              if (!progressIntervalRef.current) {
                progressIntervalRef.current = window.setInterval(() => {
                  if (playerRef.current && playerRef.current.getCurrentTime) {
                    const time = playerRef.current.getCurrentTime();
                    setCurrentTime(time);
                    if (onProgressUpdate) onProgressUpdate(lesson.id, time);
                    localStorage.setItem(`undd_progress_${lesson.id}`, time.toString());
                  }
                }, 1000);
              }
            } else {
              setIsPlaying(false);
              if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
              }
            }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) playerRef.current.destroy();
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [lesson]);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    resetControlsTimeout();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (playerRef.current && isReady) {
      playerRef.current.seekTo(time, true);
    }
    resetControlsTimeout();
  };

  const seekRelative = (seconds: number) => {
    if (!playerRef.current || !isReady) return;
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    setCurrentTime(newTime);
    playerRef.current.seekTo(newTime, true);
    resetControlsTimeout();
  };

  const toggleMute = () => {
    if (!playerRef.current || !isReady) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
    resetControlsTimeout();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (playerRef.current && playerRef.current.setPlaybackRate) {
      playerRef.current.setPlaybackRate(speed);
    }
    setShowSettings(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 bg-black z-50 overflow-hidden select-none flex items-center justify-center ${
        isPortrait && isFullscreen ? 'force-landscape' : ''
      }`}
      onMouseMove={resetControlsTimeout}
      onClick={resetControlsTimeout}
    >
      {/* Player Container */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <div id="youtube-player" className="w-full h-full pointer-events-none" />

        {/* Video Scrim & Controls */}
        <div 
          className={`absolute inset-0 z-10 transition-opacity duration-300 pointer-events-none flex flex-col justify-between ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Top Bar (TUTOR REMOVED per user request) */}
          <div className="p-4 sm:p-6 md:p-8 flex items-center justify-between bg-gradient-to-b from-[#060B18]/90 via-[#060B18]/50 to-transparent pointer-events-auto">
            <div className="flex items-center gap-3.5">
              <button 
                onClick={(e) => { e.stopPropagation(); onBack(); }} 
                className="p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-xl border border-white/15 transition-all cursor-pointer"
                aria-label="Voltar"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1 className="text-xs sm:text-sm md:text-base font-bold text-white uppercase tracking-tight line-clamp-1">
                  {lesson.title}
                </h1>
                <p className="text-[10px] sm:text-[11px] text-[#3B82F6] font-bold uppercase tracking-wider flex items-center gap-2">
                  <span>{courseTitle}</span>
                  {moduleTitle && (
                    <>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-300 font-normal">{moduleTitle}</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Top Right: Only Settings and Audio button (No AI Tutor button) */}
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleMute(); }} 
                className="p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white border border-white/15 transition-all cursor-pointer"
                title={isMuted ? "Ativar som" : "Desativar som"}
              >
                {isMuted ? <VolumeX size={18} className="text-amber-400" /> : <Volume2 size={18} />}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowSettings(true); }} 
                className="p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white border border-white/15 transition-all cursor-pointer"
                title="Configurações de Reprodução"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>

          {/* Center Play/Pause Indicator */}
          <div className="flex items-center justify-center gap-6 pointer-events-auto">
            <button 
              onClick={(e) => { e.stopPropagation(); seekRelative(-10); }}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all cursor-pointer"
              title="Voltar 10 segundos"
            >
              <RotateCcw size={22} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); togglePlay(); }} 
              className={`w-16 h-16 sm:w-20 sm:h-20 bg-[#1E40AF]/90 hover:bg-[#1E40AF] border-2 border-white/40 rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(30,64,175,0.7)] ${
                isPlaying ? 'opacity-0 scale-75 hover:opacity-100' : 'opacity-100 scale-100 hover:scale-105 active:scale-95'
              }`}
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); seekRelative(10); }}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all cursor-pointer"
              title="Avançar 10 segundos"
            >
              <RotateCw size={22} />
            </button>
          </div>

          {/* Bottom Controls Bar */}
          <div className="p-4 sm:p-6 md:p-8 space-y-3 bg-gradient-to-t from-[#060B18]/95 via-[#060B18]/60 to-transparent pointer-events-auto">
            <div className="px-1 pointer-events-auto">
              <input 
                type="range" 
                min="0" 
                max={duration || 100} 
                step="0.1" 
                value={currentTime} 
                onClick={(e) => e.stopPropagation()}
                onChange={handleSeek} 
                className="w-full h-1.5 bg-white/20 hover:bg-white/30 rounded-full appearance-none cursor-pointer accent-[#F59E0B]" 
              />
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-white px-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-gray-200">{formatTime(currentTime)} / {formatTime(duration)}</span>
                <span className="px-2 py-0.5 rounded bg-blue-600/30 border border-blue-500/40 text-[10px] font-bold text-blue-300">
                  {playbackSpeed}x
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} 
                  className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors cursor-pointer"
                  title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                >
                  {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Configurações de Reprodução (100% Português) */}
        {showSettings && (
          <div 
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setShowSettings(false)}
          >
            <div 
              className="bg-[#0C162E] border border-[#1B2F5C] rounded-3xl p-5 sm:p-6 w-full max-w-sm space-y-5 shadow-2xl text-white animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-white">
                  <Settings size={16} className="text-blue-400" />
                  Configurações do Vídeo
                </h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="p-1 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Velocidade de Reprodução */}
              <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <Gauge size={14} className="text-blue-400" /> Velocidade de Reprodução
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {SPEEDS.map(speed => (
                    <button 
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        playbackSpeed === speed 
                          ? 'bg-blue-600 border-blue-400 text-white shadow-md' 
                          : 'bg-[#060B18] border-[#1B2F5C] text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Qualidade e Informações */}
              <div className="p-3 bg-[#060B18] rounded-xl border border-white/5 text-[11px] text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Qualidade de Streaming:</span>
                  <span className="text-emerald-400 font-bold">1080p Full HD</span>
                </div>
                <div className="flex justify-between">
                  <span>Idioma do Áudio:</span>
                  <span className="text-white font-medium">Português Brasileiro (Oficial)</span>
                </div>
              </div>

              <button 
                onClick={() => setShowSettings(false)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .force-landscape {
          width: 100vh !important;
          height: 100vw !important;
          transform: translate(-50%, -50%) rotate(90deg);
          transform-origin: center center;
          position: fixed;
          top: 50%;
          left: 50%;
        }

        #youtube-player iframe {
          width: 100% !important;
          height: 100% !important;
          border: none;
          pointer-events: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayerScreen;
