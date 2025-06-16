import React, { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

interface AudioPlayerProps {
  pageNumber: number;
  onTimeUpdate: (timestamp: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  pageNumber,
  onTimeUpdate,
  isPlaying,
  setIsPlaying,
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const positionInterval = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    loadAudio();
    
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (positionInterval.current) {
        clearInterval(positionInterval.current);
      }
    };
  }, [pageNumber]);
  
  useEffect(() => {
    if (sound) {
      if (isPlaying) {
        sound.playAsync();
        positionInterval.current = setInterval(async () => {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setPosition(status.positionMillis / 1000);
            onTimeUpdate(status.positionMillis / 1000);
          }
        }, 200);
      } else {
        sound.pauseAsync();
        if (positionInterval.current) {
          clearInterval(positionInterval.current);
        }
      }
    }
    
    return () => {
      if (positionInterval.current) {
        clearInterval(positionInterval.current);
      }
    };
  }, [isPlaying, sound]);
  
  const loadAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      
      const audioSource = { uri: `https://example.com/audio/page-${pageNumber}.mp3` };
      
      
      
      setSound(newSound);
    } catch (error) {
      console.error('Error loading audio:', error);
      setIsPlaying(false);
    }
  };
  
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis / 1000);
      setPosition(status.positionMillis / 1000);
      
      if (status.didJustFinish) {
        setIsPlaying(false);
        sound?.setPositionAsync(0);
      }
    }
  };
  
  return null;
};

export default AudioPlayer;