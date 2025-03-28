import { useEffect, useState } from 'react';
import { getUserLeaders } from "../../http/UserAPI";
import { Navigation } from "../../components/Navigation/Navigation";
import styles from '../../styles/TopUsersTable.module.css';
import { FaCoins, FaMedal } from 'react-icons/fa';
import { trophy } from '../../assets/images';

function UserLeaders() {
    const [topUsers, setTopUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
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
    const renderTable = () => {
        if (topUsers.length === 0) {
          return <div className={styles.empty}>Нет данных для отображения</div>;
      }
    }
    if (loading) {
      return <div className={styles.loading}>Loading... <FaCoins className={styles.spinner} /></div>;
    }
  
    if (error) {
      return <div className={styles.error}>Error: {error}</div>;
    }
    return (
        <div className='min-h-screen bg-gradient-main px-4 flex flex-col items-center text-white font-medium'>
            <div className='absolute inset-0 h-1/2 bg-gradient-overlay z-0'></div>
            <div className='absolute inset-0 flex item-center justify-center z-0'></div>
            <div className='radial-gradient-overlay'></div>

            <div className='w-full z-10 min-h-screen flex flex-col items-center text-white'>
                <div className='top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white'>
                    <div className='flex items-center py-2'>
                            <img src={trophy} width={80} height={80}/>
                    </div>
                    <div className='mt-12 text-2xl font-bold flex items-center'>
                        <span className='ml-2'>User Leaderboad</span>
                    </div>
                </div>

                <div className='fixed bottom-0 left-0 w-full px-4 pb-4 z-10'>
                    <Navigation />
                </div>

                <div className="container mx-auto px-4 py-8 h-80">
                    <div className='bg-gray-700 rounded-lg shadow mb-2'>
                        {/* <span className='ml-2'>Total 8 users</span> */}
                        {renderTable()}
                    </div>
                    <div className="bg-gray-700 rounded-lg shadow">
                        {/* <div className="p-4 border-gray-600 max-h-96 overflow-y-auto no-scrollbar">
                            {filteredUsers.map(user => (
                                    <div key={user.id} className="flex items-center justify-between mb-2 bg-gray-900 rounded-md p-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full mr-2"><img src={tnocoin} alt="" /></div>
                                            <span className="font-medium">{user.username}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">{user.count_coin} TNC</span>
                                        </div>
                                    </div>
                            ))}
                            
                        </div> */}
                        <div className="space-y-4 p-4 border-gray-600 max-h-96 overflow-y-auto no-scrollbar">
                            {topUsers.map((user, index) => (
                            <div 
                                key={user.id}
                                className="bg-[#363636] rounded-xl p-4 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                {/* Иконка позиции */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                    ${index === 0 ? "bg-gradient-to-b from-[#FFD700] to-[#D4AF37]" :
                                    index === 1 ? "bg-gradient-to-b from-[#C0C0C0] to-[#808080]" :
                                    index === 2 ? "bg-gradient-to-b from-[#CD7F32] to-[#8B4513]" : 
                                    "bg-[#4A4A4A]"}
                                `}>
                                    {index < 3 ? (
                                    <FaMedal className="text-white text-sm" />
                                    ) : (
                                    <span className="text-white font-bold">#{index + 1}</span>
                                    )}
                                </div>

                                {/* Имя пользователя */}
                                <span className="text-white font-medium">{user.username}</span>
                                </div>

                                {/* Баллы */}
                                <div className="flex items-center gap-2">
                                <span className="text-[#3b92c4] font-bold">
                                    {user.balance.toLocaleString()}
                                </span>
                                <span className="text-[#AAAAAA]">TNC</span>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserLeaders;