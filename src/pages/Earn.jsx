import { useEffect, useState } from 'react';
import { Navigation } from "../components/Navigation/Navigation";
import PropTypes from 'prop-types';
import { FaUsers, FaCheck } from "react-icons/fa";
import {checkSubscribe, checkTasks, checkInvite} from '../http/UserAPI';
import Telegram from '../assets/Icon/Telegram';


function TaskItem({ Icon, colorBg, title, id, reward, action, completed }) {
  const [isCompleted, setIsCompleted] = useState(completed);

  const telegramId = localStorage.getItem("id").toString();
  const userId = Number(telegramId);
  const username = localStorage.getItem("username").toString();

  const checkUserSubcription = async (userId, username)=> {
    const data = await checkSubscribe(userId, username);
    if (data.isSubscribed == true){
      setIsCompleted(true);
      console.log(data);
      
      localStorage.setItem("isSubscribed", "true")
    }else{
      setIsCompleted(false);
      console.log("user is not subs");
    }
  }

  const handleAction = () => {
    const channelUrl = 'https://t.me/tno_community';
    //const userId = localStorage.getItem("id").toString();
    if (action === 'Начать') {
      if (id === "substno"){
        window.Telegram.WebApp.openTelegramLink(channelUrl);
        setTimeout(()=>{
          checkUserSubcription(userId, username)
        }, 5000);
      }
    }
  };

  useEffect(() => {
    const checkAllTasks = async () => {
      try {
        const response = await checkTasks(telegramId);
        
        if (!response) {
          throw new Error(`HTTP error! Status: ${response}`);
        }
        if(response.isSubscribed){
          if (id === "substno") {
            setIsCompleted(true);
          }
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        console.log('')
      }
    };

    checkAllTasks();
  }, []);
  useEffect(() => {
    const checkUserInvite = async () => {
      try {
        const response = await checkInvite(telegramId, username);
        
        if (!response) {
          throw new Error(`HTTP error! Status: ${response}`);
        }
        if(response.isInvite){
          if (id === "frens") {
            setIsCompleted(true);
          }
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        console.log('')
      }
    };

    checkUserInvite();
  }, []);

  return (
    // border-b-2 border-b-[#1f1f1f]
      <li className="flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-4">
          <div className={`bg-[${colorBg}] rounded-lg`}>
            {Icon}
            {/* <Icon size={20} color="white" className='bg-blue-500'/> */}
          </div>
          <div>
            <h3 className="text-base font-normal text-white">{title}</h3>
            <p className="text-xs text-neutral-500 font-normal">{reward}</p>
          </div>
        </div>
        {isCompleted ? (
          <div className="text-green-500">
            <FaCheck  size={20}/>
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-white text-black rounded-lg text-xs"
            onClick={handleAction}
            disabled={isCompleted}
          >
            {action}
          </button>
        )}
      </li>
  );
}

TaskItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  reward: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

function Earns() {
    return (
        <div className='min-h-screen bg-gradient-main px-4 flex flex-col items-center text-white font-medium'>
            <div className='absolute inset-0 h-1/2 bg-gradient-overlay z-0'></div>
            <div className='absolute inset-0 flex item-center justify-center z-0'></div>

            <div className='w-full z-10 min-h-screen flex flex-col items-center text-white'>
                <div className="h-full md:h-full w-full text-white mt-10 rounded-md">
                  <h1 className="text-5xl font-medium mb-4">Задания</h1>
                  <p className="text-2xl text-[#a6a6a6] mb-6">Получайте монеты за выполнение заданий</p>
                    <div className="container h-full">
                        {/* Task List */}
                        <ul className='bg-[#1a1a1a] rounded-lg h-max'>
                          <li className='mb-1'>
                            <ul>
                              <TaskItem
                                Icon={<FaUsers size={35} color='black' />}
                                colorBg="#ffff"
                                title="Пригласить 10 друзей"
                                id="frens"
                                reward="+ 5,000 TNO"
                                action="Начать"
                                completed={false}
                                />
                            </ul>
                          </li>
                          <li>
                            <ul>
                              <TaskItem
                                Icon={<Telegram size={35} color='white' />}
                                colorBg="#ffff"
                                title="Подписаться на канал"
                                id="substno"
                                reward="+ 3,000 TNO"
                                action="Начать"
                                completed={false}
                              />
                              
                            </ul>
                          </li>
                        </ul>
                    </div>
                </div>
                <div className='fixed bottom-0 left-0 w-full z-10'>
                    <Navigation />
                </div>
            </div>
        </div>
    )
}

export default Earns;