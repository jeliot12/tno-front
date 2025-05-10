const Test = () => {
  const communityStats = {
    coins: "10,540,125",
    players: "103,259"
  };

  const topPlayers = [
    { name: "MegaLeonLel", points: "105,012", badge: "🏅" },
    { name: "bigrotleta03", points: "99,012", badge: "🥈" },
    { name: "Etoya007", points: "98,125", badge: "🥉" }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="p-2 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src="https://placehold.co/100x100"
                  alt="Community"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">TNO community</h1>
                <div className="flex items-center gap-2">
                  <span className="text-amber-500">🏆</span>
                  <span className="text-zinc-400">#10,485</span>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          </div>
            <p className="text-sm text-white bg-[#1c1c1c] rounded-xl p-1">
              Присоединяйтесь к нашей команде! Получайте бонусы за выполнение заданий, участвуйте в акциях и улучшайте свои навыки. Вместе мы достигнем большего!
              <br/><span className="text-zinc-500"> #КомандаМечты #Награды</span>
            </p>
        </div>

        {/* Content Section */}
        <div className="p-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#1c1c1c]">
            <div className="text-center">
              <p className="text-xl font-bold">{communityStats.coins}</p>
              <p className="text-sm text-zinc-400">Монет</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{communityStats.players}</p>
              <p className="text-sm text-zinc-400">Игроков</p>
            </div>
          </div>

          {/* Players List */}
          <div className="space-y-2 bg-[#1c1c1c] rounded-2xl">
            {topPlayers.map((player, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg"></div>
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm text-zinc-400">{player.points} TNO</p>
                  </div>
                </div>
                <span className="text-xl">{player.badge}</span>
              </div>
            ))}

            {[4, 5, 6].map((num) => (
              <div
                key={num}
                className="flex items-center justify-between p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg"></div>
                </div>
                <span className="text-zinc-600">#{num}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
