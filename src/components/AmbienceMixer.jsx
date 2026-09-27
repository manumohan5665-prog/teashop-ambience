import { useState } from "react";
import {
    FiPause,
    FiPlay,
    FiVolume2,
} from "react-icons/fi";

import { useAudio } from "../context/AudioContext";
import { presets } from "../data/presets";

const soundData = [
    {
        id: "rain",
        name: "Rain",
        description: "Gentle monsoon rain",
        icon: "🌧️",
        src: "/audio/rain.mp3",
    },
    {
        id: "thunder",
        name: "Thunder",
        description: "Distant monsoon thunder",
        icon: "⚡",
        src: "/audio/thunder.mp3",
    },
    {
        id: "crickets",
        name: "Crickets",
        description: "Quiet night insects",
        icon: "🦗",
        src: "/audio/crickets.mp3",
    },
    {
        id: "chatter",
        name: "Tea Shop",
        description: "Conversations in the kada",
        icon: "💬",
        src: "/audio/chatter.mp3",
    },
    {
        id: "fireplace",
        name: "Fireplace",
        description: "Warm evening fire",
        icon: "🔥",
        src: "/audio/fireplace.mp3",
    },
    {
        id: "birds",
        name: "Birds",
        description: "Morning Kerala birds",
        icon: "🐦",
        src: "/audio/birds.mp3",
    },
    {
        id: "wind",
        name: "Wind",
        description: "Soft evening breeze",
        icon: "🌬️",
        src: "/audio/wind.mp3",
    },
];

function AmbienceMixer() {
    const {
        sounds,
        playSound,
        pauseSound,
        setSoundVolume,
        masterVolume,
        changeMasterVolume,
    } = useAudio();

    const [activePreset, setActivePreset] =
        useState(null);

    const applyPreset = async (preset) => {
        setActivePreset(preset.id);

        for (const sound of soundData) {
            const newVolume = preset.sounds[sound.id] ?? 0;

            setSoundVolume(sound.id, newVolume);

            if (newVolume > 0) {
                await playSound({
                    ...sound,
                    volume: newVolume,
                });
            } else {
                pauseSound(sound.id);
            }
        }
    };

    return (
        <section
            className="ambience-section"
            id="ambience"
        >
            <div className="section-heading">
                <span>01 — ATMOSPHERE</span>

                <h2>Build your evening.</h2>

                <p>
                    Mix the sounds of a Kerala evening
                    and create your own atmosphere.
                </p>
            </div>

            <div className="master-volume">

                <div>
                    <span>MASTER VOLUME</span>

                    <strong>
                        {Math.round(masterVolume * 100)}%
                    </strong>
                </div>

                <div className="master-volume-control">

                    <FiVolume2 />

                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={masterVolume}
                        onChange={(event) =>
                            changeMasterVolume(
                                Number(event.target.value)
                            )
                        }
                    />

                </div>

            </div>

            {/* PRESETS */}

            <div className="preset-section">
                <div className="preset-heading">
                    <span>QUICK ATMOSPHERES</span>

                    <h3>Choose your mood.</h3>
                </div>

                <div className="preset-grid">
                    {presets.map((preset) => (
                        <button
                            key={preset.id}
                            className={`preset-card ${activePreset === preset.id
                                ? "preset-active"
                                : ""
                                }`}
                            onClick={() =>
                                applyPreset(preset)
                            }
                        >
                            <span className="preset-icon">
                                {preset.icon}
                            </span>

                            <span className="preset-name">
                                {preset.name}
                            </span>

                            <span className="preset-description">
                                {preset.description}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* SOUND MIXER */}

            <div className="ambience-grid">
                {soundData.map((sound) => {
                    const currentSound =
                        sounds[sound.id];

                    const volume =
                        currentSound?.volume ?? 0.5;

                    const isPlaying =
                        currentSound?.isPlaying ?? false;

                    return (
                        <div
                            className={`sound-card ${isPlaying
                                ? "sound-active"
                                : ""
                                }`}
                            key={sound.id}
                        >
                            <div className="sound-top">
                                <div className="sound-icon">
                                    {sound.icon}
                                </div>

                                <div>
                                    <h3>{sound.name}</h3>

                                    <p>
                                        {sound.description}
                                    </p>
                                </div>
                            </div>

                            <div className="sound-controls">
                                <button
                                    className="audio-button"
                                    onClick={() => {
                                        if (isPlaying) {
                                            pauseSound(sound.id);
                                        } else {
                                            playSound({
                                                ...sound,
                                                volume,
                                            });
                                        }
                                    }}
                                >
                                    {isPlaying ? (
                                        <FiPause />
                                    ) : (
                                        <FiPlay />
                                    )}

                                    {isPlaying
                                        ? "Pause"
                                        : "Play"}
                                </button>

                                <div className="volume-control">
                                    <FiVolume2 />

                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={(event) =>
                                            setSoundVolume(
                                                sound.id,
                                                Number(
                                                    event.target.value
                                                )
                                            )
                                        }
                                    />

                                    <span>
                                        {Math.round(
                                            volume * 100
                                        )}
                                        %
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default AmbienceMixer;