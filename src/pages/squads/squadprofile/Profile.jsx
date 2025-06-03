import { getSquadInfo } from "../../../http/SquadAPI";
import { getUsersInfo, leaveSquad } from "../../../http/UserAPI";
import {useState, useEffect} from 'react';
import { goldM, silverM, bronzeM, profileImage} from "../../../assets/images";
import { Navigation } from "../../../components/Navigation/Navigation";


function Profile() {
  const [topUsers, setTopUsers] = useState({}); 
  const [balanceSquad, setBalanceSquad] = useState(null);
  const [countMembers, setCountMembers] = useState(0);
  const [squadName, setSquadName] = useState('TNO community');
  const [userClanId, setUserClanId] = useState(false);
  const [leaveData, setLeaveData] = useState(false)

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const clanId = Number(localStorage.getItem("Squad"));
  const telegramId = "1083689910"; // надо поставить id пользователя из бд
  const username = "qwqwqrw";
  const Index = localStorage.getItem("Index")

  // Данные сквада
  useEffect(() => {
        const fetchSquadInfo = async (clanId) => {
          try {
            const response = await getSquadInfo(clanId);
            
            if (!response) {
              throw new Error(`HTTP error! Status: ${response}`);
            }
            
            // Гарантируем, что data - массив
            // if (!Array.isArray(response.data)) {
            //   throw new Error('Invalid data format from server');
            // }
            setTopUsers(response.data);
            setBalanceSquad(response.data.totalCount);
            setCountMembers(response.data.members.length);
            setSquadName(response.data.name);
            setError(null);
          } catch (err) {
            setError(err.message);
            setTopUsers([]); // Сбрасываем до пустого массива при ошибке
          } finally {
            setLoading(false);
          }
        };
    
        fetchSquadInfo(clanId);
  }, []);

  useEffect(() => {
        const fetchDataUsername = async (username) => {
          try {
            const response = await getUsersInfo(username);
            if (response.clanId){
              setUserClanId(true)
              if(response.clanId === clanId){
                setLeaveData(true)
              }
            }
          } catch (err) {
            console.error('Error loading user:', err);
            setError('Failed to load data');
          }
        };
        
        fetchDataUsername(username);
  }, []);

  const leaveButtonFunc = async () => {
    try {
      const response = await leaveSquad(telegramId);
      console.log(response);
    } catch (err) {
        console.error('Error loading user:', err);
        setError('Failed to load data');
    }
  }


  const topPlayers = topUsers?.topUsers || [];
  // const balanceSquad = topUsers[0].totalCount;
  // console.log();
  
  
  return (
    <div className="min-h-screen bg-gradient-main text-white p-4 md:p-6">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="p-2 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src={profileImage}
                  alt="Community"
                  className="w-full h-full object-cover border-2 rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">{squadName}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-amber-500">
                    {Index == 1 ? <img src={goldM} alt="Медаль"/> : ''}
                    {Index == 2 ? <img src={silverM} alt="Медаль"/> : ''}
                    {Index == 3 ? <img src={bronzeM} alt="Медаль"/> : ''}
                  </span>
                  <span className="text-zinc-400"># {Index}</span>
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
            {userClanId ? (
              <></>
            ) : (
              <button className="bg-[#0088cc] text-white text-3xl font-normal py-3 px-8 rounded-xl w-full transition duration-200">Вступить в сквад</button>
            )}
            {leaveData ? (
              <button className="bg-[#a02b2b] text-white text-3xl font-normal py-3 px-8 rounded-xl w-full transition duration-200" onClick={leaveButtonFunc}>Выйти из сквада</button>
            ) : (
              <></>
            )}
        </div>

        {/* Content Section */}
        <div className="p-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#1c1c1c]">
            <div className="text-center">
              <p className="text-xl font-bold">{balanceSquad}</p>
              <p className="text-sm text-zinc-400">Монет</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{countMembers}</p>
              <p className="text-sm text-zinc-400">{countMembers > 1 ? 'Игроков' : 'Игрок'}</p>
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
                <img 
                                              src={profileImage}
                                              className="w-10 h-10 md:w-12 md:h-12 rounded-lg mr-3"
                                              alt="Профиль"
                                          />
                  <div>
                    <p className="font-medium">{player.username}</p>
                    <p className="text-sm text-zinc-400">{player.balance} TNO</p>
                  </div>
                </div>
                  <div className="ml-2">
                      {index < 3 ? (
                          <img src={[goldM, silverM, bronzeM][index]}alt="Медаль"/>
                          ) : (
                          <span className="text-gray-400 text-sm md:text-base">
                          #{index + 1}
                          </span>
                      )}
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Навигация */}
      <div className='w-full mt-auto fixed bottom-0 left-0 z-10'>
              <Navigation />
      </div>
    </div>
  )
}

export default Profile;
