export const LoadingCube = () => {
  const chinesePhrases = [
    "快乐编码", // Happy coding
    "猫咪最可爱", // Cats are the cutest
    "代码如诗", // Code is like poetry
    "休息一下", // Take a break
    "加油！", // Come on! / Keep going!
    "编程使我快乐", // Programming makes me happy
  ];

  const getRandomPhrase = () => {
    return chinesePhrases[Math.floor(Math.random() * chinesePhrases.length)];
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="relative">
        <div className="cube">
          <div className="cube-face" style={{ transform: 'rotateX(0deg) translateZ(30px)' }}>
            <div className="w-full h-full flex items-center justify-center text-primary">
              {getRandomPhrase()}
            </div>
          </div>
          <div className="cube-face" style={{ transform: 'rotateX(180deg) translateZ(30px)' }}>
            <div className="w-full h-full flex items-center justify-center text-primary">
              {getRandomPhrase()}
            </div>
          </div>
          <div className="cube-face" style={{ transform: 'rotateY(90deg) translateZ(30px)' }}>
            <div className="w-full h-full flex items-center justify-center text-primary">
              {getRandomPhrase()}
            </div>
          </div>
          <div className="cube-face" style={{ transform: 'rotateY(-90deg) translateZ(30px)' }}>
            <div className="w-full h-full flex items-center justify-center text-primary">
              {getRandomPhrase()}
            </div>
          </div>
          <div className="cube-face" style={{ transform: 'rotateX(90deg) translateZ(30px)' }}>
            <div className="w-full h-full flex items-center justify-center text-primary">
              {getRandomPhrase()}
            </div>
          </div>
          <div className="cube-face" style={{ transform: 'rotateX(-90deg) translateZ(30px)' }}>
            <div className="w-full h-full flex items-center justify-center text-primary">
              {getRandomPhrase()}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary/20 to-transparent rounded-full filter blur-xl"></div>
      </div>
    </div>
  );
};