import { Navigation } from "../components/Navigation/Navigation";
import {useState, useEffect} from 'react';
import { getUserLeaders } from "../http/UserAPI";
import { trophy, goldM, silverM, bronzeM} from "../assets/images";
// import withMobileCheck from '../components/withMobileCheck';
// import styles from '../styles/TopUsersTable.module.css';
// import { FaCoins } from 'react-icons/fa';


function Leaders(){
    // const [topUsers, setTopUsers] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('Сквады');

    // Данные для топа игроков
    useEffect(() => {
      const fetchTopUsers = async () => {
        try {
          const response = await getUserLeaders();
          
          if (!response) {
            throw new Error(`HTTP error! Status: ${response}`);
          }
          
          // Гарантируем, что data - массив
          if (!Array.isArray(response.data)) {
            throw new Error('Invalid data format from server');
          }
  
          setTopUsers(response.data);
          setError(null);
        } catch (err) {
          setError(err.message);
          setTopUsers([]); // Сбрасываем до пустого массива при ошибке
        } finally {
          setLoading(false);
        }
      };
  
      fetchTopUsers();
    }, []);
    // Рендер содержимого
    // const renderTable = () => {
    //     if (topUsers.length === 0) {
    //       return <div className={styles.empty}>Нет данных для отображения</div>;
    //   }
    // }
    // if (loading) {
    //   return <div className={styles.loading}>Loading... <FaCoins className={styles.spinner} /></div>;
    // }
  
    // if (error) {
    //   return <div className={styles.error}>Error: {error}</div>;
    // }
    const playersData = [
      { rank: 1, username: 'TNO community', balance: 100000},
      { rank: 2, username: 'РоманЧИК', balance: 50000},
      { rank: 3, username: 'Mara', balance: 50000},
      { rank: 4, username: 'Durov', balance: 10785},
    ];

    // Данные для топа сквадов
    const squadsData = [
      { rank: 1, username: 'Squad Alpha', balance: 200000},
      { rank: 2, username: 'Squad Beta', balance: 150000},
      { rank: 3, username: 'Squad Gamma', balance: 120000},
      { rank: 4, username: 'Squad Delta', balance: 100000},
    ];


    // Выбор данных в зависимости от активной вкладки
    const data = activeTab === 'Сквады' ? squadsData : playersData;
    return (
        <div className='min-h-screen bg-gradient-main px-4 flex flex-col items-center text-white font-medium'>
            <div className='absolute inset-0 h-1/2 bg-gradient-overlay z-0'></div>
            <div className='absolute inset-0 flex item-center justify-center z-0'></div>

            <div className='w-full z-10 min-h-screen flex flex-col items-center text-white'>
                <div className='fixed bottom-0 left-0 w-full z-10'>
                    <Navigation />
                </div>
                <div className="min-h-screen w-full flex items-center justify-center">
                  <div className="w-full space-y-4">
                    {/* Заголовок "Лидеры" */}
                    <div className="p-4 flex flex-col items-center justify-center">
                      <img src={trophy} width={79} height={79}/>
                      <h1 className="text-3xl font-bold text-white">Лидеры</h1>
                    </div>

                    {/* Кнопки переключения вкладок */}
                    <div className="bg-[#121212] py-1 px-1 rounded-lg flex justify-center space-x-4 borderTabButton">
                      <button
                        className={`px-4 py-2 w-full rounded-lg text-2xl font-normal transition${
                          activeTab === 'Сквады' ? 'bg-[#1a1a1a] borderTabButton' : 'bg-[#121212]'
                        }`}
                        onClick={() => setActiveTab('Сквады')}
                      >
                        Сквады
                      </button>
                      <button
                        className={`px-4 py-2 w-full rounded-lg text-2xl font-normal transition ${
                          activeTab === 'Игроки' ? 'bg-[#1a1a1a] borderTabButton' : 'bg-[#121212]'
                        }`}
                        onClick={() => setActiveTab('Игроки')}
                      >
                        Игроки
                      </button>
                    </div>

                    {/* Таблица лидеров */}
                    <div className="bg-[#1d1d1d] rounded-lg p-2 space-y-4 max-h-96">
                      {data.map((user, index) => (
                        <div
                          key={user.rank}
                          className={`flex items-center justify-between p-2 rounded-lg`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white`}
                            >
                            </div>
                            <div>
                              <p className="text-base font-medium">{user.username}</p>
                              <p className="text-sm text-gray-400">{user.balance} TNO</p>
                              {/* {
                              index === 0 ? <img src={goldM} /> :
                              index === 1 ? <img src={silverM} /> :
                              index === 2 ? <img src={bronzeM} /> : ""
                              }
                              {index > 2 ? <span className="text-white font-light">#{index + 1}</span> : ""} */}
                            </div>
                          </div>
                          {/* <div className="text-sm">
                            {entry.medal ? (
                              <span className="text-2xl">{entry.medal}</span>
                            ) : (
                              <span className="bg-gray-600 px-2 py-1 rounded-full">#{user.id}</span>
                            )}
                          </div> */}
                          <div className="ml-auto text-sm">
                              {
                              user.rank === 1 ? <img src={goldM} /> :
                              user.rank === 2 ? <img src={silverM} /> :
                              user.rank === 3 ? <img src={bronzeM} /> : ""
                              }
                              {user.rank > 3 ? <span className="text-white font-light">#{index + 1}</span> : ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
        </div>
    )
}


export default Leaders;