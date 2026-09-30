import { useEffect, useRef, useState } from "react";
import { songs } from "../data/songs";

export function useMusicPlayer() {
    const audioRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isRepeating, setIsRepeating] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    const currentSong = songs[currentIndex];

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume;
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.load();

        setCurrentTime(0);
        setDuration(0);

        if (isPlaying) {
            audio.play().catch((error) => {
                console.error("Playback failed:", error);
                setIsPlaying(false);
            });
        }
    }, [currentIndex]);

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Playback failed:", error);
                setIsPlaying(false);
            }
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const nextSong = () => {
        if (isShuffling && songs.length > 1) {
            setCurrentIndex((previous) => {
                const offset =
                    1 + Math.floor(Math.random() * (songs.length - 1));

                return (previous + offset) % songs.length;
            });
        } else {
            setCurrentIndex((previous) =>
                (previous + 1) % songs.length
            );
        }
    };

    const previousSong = () => {
        setCurrentIndex((previous) =>
            (previous - 1 + songs.length) % songs.length
        );
    };

    const seek = (time) => {
        const audio = audioRef.current;
        if (!audio || !Number.isFinite(duration)) return;

        audio.currentTime = time;
        setCurrentTime(time);
    };

    const handleEnded = () => {
        if (isRepeating) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(console.error);
        } else {
            nextSong();
        }
    };

    return {
        audioRef,
        currentSong,
        currentIndex,
        setCurrentIndex,
        isPlaying,
        currentTime,
        duration,
        volume,
        isRepeating,
        isShuffling,
        togglePlay,
        nextSong,
        previousSong,
        seek,
        handleEnded,
        setCurrentTime,
        setDuration,
        setVolume,
        setIsPlaying,
        setIsRepeating,
        setIsShuffling,
    };
}