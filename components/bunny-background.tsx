import "../app/globals.css";

const BunnyBackground = () => {
  const bunnyCount = 15; // Number of bunnies

  // Generate random positions & delays for each bunny
  const bunnies = Array.from({ length: bunnyCount }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bunnies.map((bunny) => (
        <div
          key={bunny.id}
          className="bunny"
          style={{
            left: bunny.left,
            bottom: bunny.bottom,
            animationDelay: bunny.delay,
          }}
        ></div>
      ))}
    </div>
  );
};

export default BunnyBackground;
