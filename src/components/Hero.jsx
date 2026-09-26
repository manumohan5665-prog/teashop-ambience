import { FiPlay } from "react-icons/fi";
import Rain from "./Rain";

function Hero() {
    return (
        <section className="hero">

            <Rain />

            <div className="atmosphere"></div>

            <div className="hero-overlay"></div>

            <div className="hero-content">

                <p className="hero-malayalam">
                    ഒരു ചായ ആയാലോ?
                </p>

                <h1>
                    Chaaya
                    <span>Kada</span>
                </h1>

                <p className="hero-description">
                    A digital Kerala evening filled with rain,
                    music, conversations and memories.
                </p>

                <button className="enter-button">
                    <FiPlay />
                    Enter the Kada
                </button>

                <div className="hero-info">
                    <span>🌧️ Rainy Evening</span>
                    <span>☕ Fresh Chaya</span>
                    <span>🎵 Old Songs</span>
                </div>

            </div>

            <div className="hero-location">
                <span>📍</span>
                <div>
                    <strong>Kerala</strong>
                    <small>Somewhere near your favourite tea shop</small>
                </div>
            </div>

        </section>
    );
}

export default Hero;