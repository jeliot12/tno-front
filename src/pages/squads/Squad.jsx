import { Navigation } from "../../components/Navigation/Navigation";
import FormModal from '../../components/Modal/FormModal';
import { useState } from 'react';

function Squad(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className='min-h-screen bg-gradient-main px-4 flex flex-col items-center text-white font-medium'>
            <div className='absolute inset-0 h-1/2 bg-gradient-overlay z-0'></div>
            <div className='absolute inset-0 flex item-center justify-center z-0'></div>

            <div className='w-full z-10 min-h-screen flex flex-col items-center text-white'>
                {/* <div className='top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white'>
                    <div className='flex items-center py-2'>
                            <img src={trophy} width={80} height={80}/>
                    </div>
                    <div className='mt-12 text-2xl font-bold flex items-center'>
                        <span className='ml-2'>Leaderboad</span>
                    </div>
                </div> */}
                <div className="w-full mt-8 text-white md:p-6 h-full">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0 text-center">
                                <h2 className="text-4xl font-normal mb-1">Tnocoin</h2>
                                <div className="mt-5">
                                    <h3 className="text-sm text-[#a6a6a6] font-normal mt-1">Сквады Tnocoin — твой ключ к большему заработку
                                        монет и эксклюзивным еженедельным эвентам,
                                        доступным только командам.</h3>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='fixed bottom-0 left-0 w-full z-10'>
                    <div className="flex flex-col items-center">
                        <button onClick={() => setIsModalOpen(true)} className="bg-[#0088cc] text-white text-3xl font-normal py-3 px-8 rounded-lg w-[90% ] transition duration-200 ">Создать сквад</button>
                    </div>
                    <Navigation />
                </div>
                <FormModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    )
}


export default Squad;