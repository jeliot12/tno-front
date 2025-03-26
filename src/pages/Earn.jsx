import { useState } from 'react';
import { Navigation } from "../components/Navigation/Navigation";
import PropTypes from 'prop-types';
import { Check, Users, Wallet } from 'lucide-react';

function TaskItem({ Icon, title, reward, action, completed }) {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleAction = () => {
    if (action === 'Начать') {
      alert(`Starting task: ${title}`);
    }
    setIsCompleted(true);
  };

  return (
      <li className="flex items-center justify-between py-4 px-6 border-b-2 border-b-[#1f1f1f]">
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
                        <ul className='bg-[#1a1a1a] rounded-t-lg h-dvh'>
                        <li className='mb-1'>
                            <TaskItem
                            Icon={Users}
                            title="Пригласить 10 друзей"
                            reward="+ 5,000 TNO"
                            action="Начать"
                            completed={false}
                            />
                        </li>
                        <li>
                        <TaskItem
                            Icon={Wallet}
                            title="Подписаться на канал"
                            reward="+ 3,000 TNO"
                            action="Начать"
                            completed={false}
                        />
                        </li>
                        <li>
                        <TaskItem
                            Icon={Wallet}
                            title="Подписаться на канал"
                            reward="+ 3,000 TNO"
                            action="Начать"
                            completed={false}
                        />
                        </li>
                        <li>
                        <TaskItem
                            Icon={Wallet}
                            title="Подписаться на канал"
                            reward="+ 3,000 TNO"
                            action="Начать"
                            completed={false}
                        />
                        </li>
                        <li>
                        <TaskItem
                            Icon={Wallet}
                            title="Подписаться на канал"
                            reward="+ 3,000 TNO"
                            action="Начать"
                            completed={false}
                        />
                        </li>
                        <li>
                        <TaskItem
                            Icon={Wallet}
                            title="Подписаться на канал"
                            reward="+ 3,000 TNO"
                            action="Начать"
                            completed={false}
                        />
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