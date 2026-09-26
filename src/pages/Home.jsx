import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AmbienceMixer from "../components/AmbienceMixer";
import Presets from "../components/Presets";
import MusicPlayer from "../components/MusicPlayer";
import SleepTimer from "../components/SleepTimer";
import Footer from "../components/Footer";

function Home() {
    return (
        <>
            <Navbar />

            <main>
                <Hero />
                <AmbienceMixer />
                <Presets />
                <MusicPlayer />
                <SleepTimer />
            </main>

            <Footer />
        </>
    );
}

export default Home;