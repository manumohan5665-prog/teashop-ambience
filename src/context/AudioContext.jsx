import {
    createContext,
    useContext,
    useRef,
    useState,
} from "react";

const defaultSounds = {
    rain: {
        id: "rain",
        name: "Rain",
        volume: 0.5,
        isPlaying: false,
    },

    thunder: {
        id: "thunder",
        name: "Thunder",
        volume: 0.5,
        isPlaying: false,
    },

    crickets: {
        id: "crickets",
        name: "Crickets",
        volume: 0.5,
        isPlaying: false,
    },

    chatter: {
        id: "chatter",
        name: "Tea Shop",
        volume: 0.5,
        isPlaying: false,
    },

    fireplace: {
        id: "fireplace",
        name: "Fireplace",
        volume: 0.5,
        isPlaying: false,
    },

    birds: {
        id: "birds",
        name: "Birds",
        volume: 0.5,
        isPlaying: false,
    },

    wind: {
        id: "wind",
        name: "Wind",
        volume: 0.5,
        isPlaying: false,
    },
};

const AudioContext = createContext(null);

const fadeAudio = (
    audio,
    targetVolume,
    duration = 800
) => {
    const startVolume = audio.volume;

    const difference =
        targetVolume - startVolume;

    const startTime = performance.now();

    const animate = (currentTime) => {
        const elapsed =
            currentTime - startTime;

        const progress = Math.min(
            elapsed / duration,
            1
        );

        audio.volume =
            startVolume +
            difference * progress;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};

export function AudioProvider({ children }) {

    const audioRefs = useRef({});

    const [sounds, setSounds] =
        useState(defaultSounds);

    const [masterVolume, setMasterVolume] =
        useState(1);

    const playSound = async (sound) => {

        let audio = audioRefs.current[sound.id];

        if (!audio) {

            audio = new Audio(sound.src);

            audio.loop = true;

            audioRefs.current[sound.id] = audio;
        }

        try {

            await audio.play();

            fadeAudio(
                audio,
                sound.volume * masterVolume
            );

            setSounds((current) => ({
                ...current,
                [sound.id]: {
                    ...sound,
                    isPlaying: true,
                },
            }));

        } catch (error) {

            console.error(
                `Unable to play ${sound.name}`,
                error
            );
        }
    };


    const pauseSound = (id) => {

        const audio =
            audioRefs.current[id];

        if (audio) {

            fadeAudio(audio, 0, 600);

            setTimeout(() => {

                audio.pause();

            }, 600);
        }

        setSounds((current) => ({
            ...current,

            [id]: {
                ...current[id],
                isPlaying: false,
            },
        }));
    };


    const setSoundVolume = (
        id,
        volume
    ) => {

        const audio =
            audioRefs.current[id];

        if (audio) {

            fadeAudio(
                audio,
                volume * masterVolume,
                200
            );
        }

        setSounds((current) => ({
            ...current,
            [id]: {
                ...current[id],
                volume,
            },
        }));
    };


    const stopAllSounds = () => {

        Object.values(audioRefs.current)
            .forEach((audio) => {
                audio.pause();
                audio.currentTime = 0;
            });

        setSounds({});
    };


    const changeMasterVolume = (
        volume
    ) => {

        setMasterVolume(volume);

        Object.entries(
            audioRefs.current
        ).forEach(([id, audio]) => {

            const sound =
                sounds[id];

            if (sound) {

                audio.volume =
                    sound.volume * volume;
            }
        });
    };


    const value = {
        sounds,
        masterVolume,

        playSound,
        pauseSound,

        setSoundVolume,

        stopAllSounds,

        changeMasterVolume,
    };


    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
}


export function useAudio() {

    const context =
        useContext(AudioContext);

    if (!context) {

        throw new Error(
            "useAudio must be used inside AudioProvider"
        );
    }

    return context;
}