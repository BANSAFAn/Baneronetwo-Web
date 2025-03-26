
import { useState, useRef, useEffect } from 'react';
import { Volume2, Volume1, VolumeX, Pause, Play, SkipForward } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    // Get saved volume from localStorage or default to 50
    return [parseInt(localStorage.getItem('audioPlayerVolume') || '50')];
  });
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    // Get saved track index from localStorage or default to 0
    return parseInt(localStorage.getItem('audioPlayerTrackIndex') || '0');
  });
  const [isLoading, setIsLoading] = useState(true);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  // Dynamic search for MP3 files in music folder
  const tracks = import.meta.glob('/public/music/*.mp3', { eager: true });
  const trackPaths = Object.keys(tracks).map(path => path.replace('/public', ''));

  // Save volume to localStorage when changed
  useEffect(() => {
    localStorage.setItem('audioPlayerVolume', volume[0].toString());
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  // Save current track index to localStorage
  useEffect(() => {
    localStorage.setItem('audioPlayerTrackIndex', currentTrackIndex.toString());
  }, [currentTrackIndex]);

  useEffect(() => {
    console.log('Available tracks:', trackPaths);
    console.log('Current track path:', trackPaths[currentTrackIndex]);
    
    const handleError = (e: ErrorEvent) => {
      console.error('Audio loading error:', e);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error loading audio",
        description: "Please ensure music files are in the public/music folder",
      });
    };

    const handleLoadedData = () => {
      if (audioRef.current && isLoading) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Playback error:', error);
            setIsLoading(false);
            toast({
              variant: "destructive",
              title: "Playback error",
              description: "Could not play the audio file",
            });
          });
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('error', handleError as EventListener);
      audioRef.current.addEventListener('loadeddata', handleLoadedData);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('error', handleError as EventListener);
        audioRef.current.removeEventListener('loadeddata', handleLoadedData);
      }
    };
  }, [toast, currentTrackIndex, trackPaths, isLoading]);

  // Attempt autoplay when the component mounts
  useEffect(() => {
    if (trackPaths.length > 0 && !autoplayAttempted) {
      setAutoplayAttempted(true);
      if (audioRef.current) {
        setIsLoading(true);
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Autoplay error:', error);
            setIsLoading(false);
            // Don't show toast for autoplay errors as they're common due to browser policies
          });
      }
    }
  }, [trackPaths, autoplayAttempted]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Playback error:', error);
            setIsLoading(false);
            toast({
              variant: "destructive",
              title: "Playback error",
              description: "Could not play the audio file",
            });
          });
      }
    }
  };

  const getRandomTrackIndex = (currentIndex: number) => {
    if (trackPaths.length <= 1) return 0;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * trackPaths.length);
    } while (newIndex === currentIndex);
    return newIndex;
  };

  const playNextTrack = () => {
    const nextIndex = getRandomTrackIndex(currentTrackIndex);
    setCurrentTrackIndex(nextIndex);
    setIsLoading(true);
    if (audioRef.current) {
      audioRef.current.src = trackPaths[nextIndex];
      // Playback will start automatically after loadeddata event
    }
  };

  const handleTrackEnd = () => {
    playNextTrack();
  };

  const VolumeIcon = () => {
    if (volume[0] === 0) return <VolumeX size={18} />;
    if (volume[0] < 50) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  if (trackPaths.length === 0) {
    return null; // Don't show player if no MP3 files
  }

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-4 bg-black/20 backdrop-blur-lg p-3 rounded-full border border-white/10">
      <audio
        ref={audioRef}
        src={trackPaths[currentTrackIndex]}
        onEnded={handleTrackEnd}
      />
      <button
        onClick={togglePlayPause}
        disabled={isLoading}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <button
        onClick={playNextTrack}
        disabled={isLoading}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
      >
        <SkipForward size={18} />
      </button>
      <div className="flex items-center gap-2">
        <VolumeIcon />
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
          className="w-20"
        />
      </div>
    </div>
  );
};
