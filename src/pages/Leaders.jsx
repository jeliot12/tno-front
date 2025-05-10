import { Navigation } from "../components/Navigation/Navigation";
import {useState, useEffect} from 'react';
import { getUserLeaders } from "../http/UserAPI";
import { getSquadLiders } from "../http/SquadAPI.js";
import { trophy, goldM, silverM, bronzeM, profileImage} from "../assets/images";
import { useNavigate } from 'react-router-dom';
// import withMobileCheck from '../components/withMobileCheck';


function Leaders(){
    const navigate = useNavigate();
    const [topUsers, setTopUsers] = useState([]);
    const [topSquads, setTopSquads] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('Игроки');

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

    // Данные для топа сквадов
    useEffect(() => {
      const fetchTopSquads = async () => {
        try {
          const response = await getSquadLiders();
          
          if (!response) {
            throw new Error(`HTTP error! Status: ${response}`);
          }
          
          // Гарантируем, что data - массив
          if (!Array.isArray(response.data)) {
            throw new Error('Invalid data format from server');
          }
  
          setTopSquads(response.data);
          setError(null);
        } catch (err) {
          setError(err.message);
          setTopSquads([]); // Сбрасываем до пустого массива при ошибке
        } finally {
          setLoading(false);
        }
      };
  
      fetchTopSquads();
    }, []);

    const handleSelectItem = (id, isSquads, ind) => {
      if (isSquads === 'Сквады'){
        localStorage.setItem("Squad", id)
        localStorage.setItem("Index", ind)
        navigate("/squadprofile");
      }else {
        console.log(2);
      }
    };

    // Выбор данных в зависимости от активной вкладки
    const filteredUser = topUsers.filter(obj => 
      !Object.values(obj).some(val => val === 0)
    );
    const filteredSquad = topSquads.filter(obj => 
      !Object.values(obj).some(val => val === 0)
    );
    if (activeTab === 'Игроки'){
      var data = filteredUser;
    }else if (activeTab === 'Сквады'){
      data = filteredSquad
    }

    return (
      <div className='min-h-screen bg-gradient-main px-4 flex flex-col items-center text-white font-medium'>
          <div className='w-full z-10 flex flex-col items-center flex-1'>
              {/* Основной контент */}
              <div className="w-full max-w-2xl flex-1 flex flex-col justify-center py-4 ">
                  {/* Заголовок и кнопки */} 
                  <div className="mb-4 space-y-4 px-2">
                      <div className="flex flex-col items-center space-y-2">
                          <img 
                              src={trophy} 
                              className="w-16 h-16 md:w-20 md:h-20"
                              alt="Трофей"
                          />
                          <h1 className="text-2xl md:text-3xl font-bold">Лидеры</h1>
                      </div>

                      {/* Кнопки переключения вкладок */}
                      <div className="bg-[#000000] p-1 rounded-xl flex customBorder">
                          {['Сквады', 'Игроки'].map((tab) => (
                              <button
                                  key={tab}
                                  className={`flex-1 py-2 text-center text-lg md:text-xl transition-colors
                                      ${activeTab === tab 
                                          ? 'bg-[#1a1a1a] rounded-lg shadow-md' 
                                          : 'hover:bg-[#1a1a1a]/50'}`}
                                  onClick={() => setActiveTab(tab)}
                              >
                                  {tab}
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* Контейнер таблицы с фиксированной высотой */}
                  <div className="flex-1 flex flex-col px-2 z-50">
                      <div className="bg-[#1d1d1d] rounded-xl flex-1 flex flex-col">
                          {/* Scrollable area */}
                          <div className="overflow-y-auto max-h-[60vh]">
                              {data.map((user, index) => (
                                  <div
                                      key={user.id}
                                      className="flex items-center justify-between p-3 mx-2 my-1 rounded-lg"
                                      onClick={() => handleSelectItem(user.id, activeTab, index+1)}
                                  >
                                      {/* Левая часть */}
                                      <div className="flex items-center flex-1 min-w-0">
                                          <img 
                                              src={profileImage}
                                              className="w-10 h-10 md:w-12 md:h-12 rounded-lg mr-3"
                                              alt="Профиль"
                                          />
                                          <div className="min-w-0">
                                              <p className="text-base md:text-lg font-medium truncate">
                                                  {user.username || user.name}
                                              </p>
                                              <p className="text-sm md:text-base text-gray-400">
                                                  {user.balance || user.totalCount} TNO
                                              </p>
                                          </div>
                                      </div>

                                      {/* Правая часть */}
                                      <div className="ml-2">
                                          {index < 3 ? (
                                              <img 
                                                  src={[goldM, silverM, bronzeM][index]}
                                                  alt="Медаль"
                                              />
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
              </div>
          </div>

          {/* Навигация */}
          <div className='w-full mt-auto fixed bottom-0 left-0 z-10'>
              <Navigation />
          </div>
      </div>
  )
}


export default Leaders;