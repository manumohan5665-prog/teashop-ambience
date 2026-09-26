function Rain() {
    const drops = Array.from({ length: 80 });

    return (
        <div className="rain" aria-hidden="true">
            {drops.map((_, index) => (
                <span
                    className="rain-drop"
                    key={index}
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${0.6 + Math.random() * 0.8}s`,
                    }}
                />
            ))}
        </div>
    );
}

export default Rain;