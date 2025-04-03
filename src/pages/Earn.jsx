import { useState } from 'react';
import { Navigation } from "../components/Navigation/Navigation";
import PropTypes from 'prop-types';
import { Check, Users, Wallet } from 'lucide-react';
import {checkSubscribe} from '../http/UserAPI';

function TaskItem({ Icon, title, id, reward, action, completed }) {
  const [isCompleted, setIsCompleted] = useState(completed);

  const checkUserSubcription = async (userId)=> {
    const data = await checkSubscribe(userId);
    if (data.isSubscribed == true){
      setIsCompleted(true);
    }else{
      console.log("user is not subs");
    }
  }

  const handleAction = () => {
    const channelUrl = 'https://t.me/tno_community';
    const userId = 1083689910;
    
    if (action === 'Начать') {
      if (id === "substno"){
        window.open(channelUrl, '_blank');
        setTimeout(()=>{
          checkUserSubcription(userId)
        }, 5000);
      }
    }
  };

  return (
    // border-b-2 border-b-[#1f1f1f]
      <li className="flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-neutral-800 rounded-lg">
            <Icon size={20} color="white" />
          </div>
          <div>
            <h3 className="text-base font-normal text-white">{title}</h3>
            <p className="text-xs text-neutral-500 font-normal">{reward}</p>
          </div>
        </div>
        {isCompleted ? (
          <div className="text-green-500">
            <Check size={20} />
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
                                Icon={Users}
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
                                Icon={Wallet}
                                title="Подписаться на канал"
                                id="substno"
                                reward="+ 3,000 TNO"
                                action="Начать"
                                completed={false}
                              />
                            </ul>
                          </li>
                          <li>
                            <ul>
                              <TaskItem
                                Icon={Wallet}
                                title="Подписаться на канал"
                                id="substno"
                                reward="+ 3,000 TNO"
                                action="Начать"
                                completed={false}
                              />
                            </ul>
                          </li>
                          <li>
                            <ul>
                              <TaskItem
                                Icon={Wallet}
                                title="Подписаться на канал"
                                id="substno"
                                reward="+ 3,000 TNO"
                                action="Начать"
                                completed={false}
                              />
                            </ul>
                          </li>
                          <li>
                            <ul>
                              <TaskItem
                                Icon={Wallet}
                                title="Подписаться на канал"
                                id="substno"
                                reward="+ 3,000 TNO"
                                action="Начать"
                                completed={false}
                              />
                            </ul>
                          </li>
                          <li>
                            <ul>
                              <TaskItem
                                Icon={Wallet}
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