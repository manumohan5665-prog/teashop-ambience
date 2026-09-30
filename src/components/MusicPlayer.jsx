import {
    FiPlay,
    FiPause,
    FiSkipBack,
    FiSkipForward,
    FiShuffle,
    FiRepeat,
    FiVolume2,
} from "react-icons/fi";

import { useMusicPlayer } from "../hooks/useMusicPlayer";
import { songs } from "../data/songs";

function MusicPlayer() {
    const {
        audioRef,
        currentSong,
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
        currentIndex,
        setCurrentIndex,
    } = useMusicPlayer();

    const formatTime = (seconds) => {
        if (!Number.isFinite(seconds)) return "0:00";

        const minutes = Math.floor(seconds / 60);
        const remaining = Math.floor(seconds % 60);

        return `${minutes}:${String(remaining).padStart(2, "0")}`;
    };

    return (
        <section className="music-section" id="music">
            <div className="section-heading">
                <span>02 — THE JUKEBOX</span>

                <h2>Let the music play.</h2>

                <p>
                    A little music, a little rain, and a whole
                    lot of memories.
                </p>
            </div>

            <div className="music-player">
                <audio
                    ref={audioRef}
                    src={currentSong.src}
                    preload="metadata"
                    onLoadedMetadata={(e) => {
                        setDuration(e.target.duration);
                    }}
                    onTimeUpdate={(e) => {
                        setCurrentTime(e.target.currentTime);
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={handleEnded}
                    onError={(e) => {
                        console.error("Audio error:", e.target.error);
                    }}
                />

                <div className="music-cover">
                    <img
                        src={currentSong.cover}
                        alt={`Cover artwork for ${currentSong.title}`}
                    />
                </div>

                <div className="music-content">
                    <span className="music-label">NOW PLAYING</span>

                    <h3>{currentSong.title}</h3>

                    <p className="music-artist">
                        {currentSong.artist}
                    </p>

                    <div className="music-progress">
                        <input
                            type="range"
                            min="0"
                            max={Number.isFinite(duration) ? duration : 0}
                            step="0.1"
                            value={currentTime}
                            aria-label="Song progress"
                            onChange={(event) =>
                                seek(Number(event.target.value))
                            }
                        />

                        <div className="music-time">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className="music-controls">
                        <button
                            className={isShuffling ? "control-active" : ""}
                            onClick={() => setIsShuffling(!isShuffling)}
                            aria-label="Toggle shuffle"
                            aria-pressed={isShuffling}
                        >
                            <FiShuffle />
                        </button>

                        <button
                            onClick={previousSong}
                            aria-label="Previous song"
                        >
                            <FiSkipBack />
                        </button>

                        <button
                            className="music-play-button"
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <FiPause /> : <FiPlay />}
                        </button>

                        <button
                            onClick={nextSong}
                            aria-label="Next song"
                        >
                            <FiSkipForward />
                        </button>

                        <button
                            className={isRepeating ? "control-active" : ""}
                            onClick={() => setIsRepeating(!isRepeating)}
                            aria-label="Toggle repeat"
                            aria-pressed={isRepeating}
                        >
                            <FiRepeat />
                        </button>
                    </div>
                    <div className="playlist">
                        <h3>Chaaya Kada Radio</h3>

                        <div className="playlist-list">
                            {songs.map((song, index) => (
                                <button
                                    key={song.id}
                                    className={`playlist-item ${index === currentIndex ? "playlist-active" : ""
                                        }`}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        setIsPlaying(true);
                                    }}
                                >
                                    <div className="playlist-number">
                                        {index === currentIndex && isPlaying ? "▶" : index + 1}
                                    </div>

                                    <div className="playlist-info">
                                        <span className="playlist-title">
                                            {song.title}
                                        </span>

                                        <span className="playlist-artist">
                                            {song.artist}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="music-volume">
                        <FiVolume2 />

                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            aria-label="Music volume"
                            onChange={(event) =>
                                setVolume(Number(event.target.value))
                            }
                        />

                        <span>{Math.round(volume * 100)}%</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MusicPlayer;