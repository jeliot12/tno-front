import { useState, useEffect } from 'react';
import { Navigation } from "../components/Navigation/Navigation";
import { getRefLinkUser, getUsersReferral } from '../http/UserAPI';
import SmartDate from '../components/SmartDate';
import {profileImage} from "../assets/images";

function Frens() {
    const [copying, setCopying] = useState(false);
    const [refLink, setRefLink] = useState();
    const [referrals, setIsReferrals] = useState([])
    const [loading, setIsLoading] = useState(false)

    const [title, setIsTitle] = useState('Пока никого')
    const [subtitle, setIsSubtitle] = useState('Приглашайте друзей')
    const [subtitle2, setIsSubtitle2] = useState('и получайте больше TNO')

    const [title2, setIsTitle2] = useState('')
    const [title3, setIsTitle3] = useState('')

    // const tg_id = localStorage.getItem("id").toString();
    const tg_id = "1083689910";

    const getLink = async (telegramId) => {
        await getRefLinkUser(telegramId);
    }

    const handleCopyLink = () => {
      navigator.clipboard.writeText(refLink)
        .then(() => {
          setCopying(true);
          setTimeout(() => setCopying(false), 2000);
        });
    };

    useEffect(() => {
        getLink(tg_id)
        const savedLink = localStorage.getItem('referralLink');
        if (savedLink) {
            setRefLink(savedLink);
        }
    }, []);

    useEffect(()=> {
        const fetchReferralUser = async () => {
          try {
            const data = await getUsersReferral(tg_id);
            if (!data) {
              throw new Error(`HTTP error! Status: ${data}`);
            }

            if (data.length !== 0){
                setIsLoading(true)
                setIsReferrals(data)
                setIsTitle('')
                setIsSubtitle('')
                setIsSubtitle2('')
                setIsTitle2('Приглашайте друзей')
                setIsTitle3('и получайте больше TNO')
            }
          } catch (error) {
            throw new Error(error);
          }
        }
    
        fetchReferralUser();
    }, [])
    const data = referrals;
    return (
        <div className='min-h-full bg-gradient-main px-4 flex flex-col items-center text-white font-medium'>
            <div className='absolute inset-0 h-1/2 bg-gradient-overlay z-0'></div>
            <div className='absolute inset-0 flex item-center justify-center z-0'></div>

            <div className='w-full z-10 min-h-screen flex flex-col items-center text-white'>
                <div className='fixed bottom-0 left-0 w-full z-10'>
                    <div className="w-full flex-grow flex items-center justify-center px-4 pb-4">
                        <div className="w-full md:w-auto">
                            <button className="bg-[#0088cc] hover:bg-gray-600 text-white text-xl font-medium py-3 px-8 rounded-xl w-full transition duration-200" onClick={handleCopyLink}>
                                {copying ? 'Скопировано!' : 'Пригласить'}
                            </button>
                        </div>
                    </div>
                    <Navigation />
                </div>
                <div className="w-full mt-10 text-white md:p-6 h-full">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        {/* Левая часть с заголовком и подзаголовком */}
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-4xl font-semibold mb-1">{title}</h2>
                            <div className="text-sm">
                                <h3 className="text-lg text-[#a6a6a6] font-semibold mt-1">{subtitle}</h3>
                                {' '}
                                <h3 className="text-lg text-[#a6a6a6] font-semibold mb-1">{subtitle2}</h3>
                            </div>
                            <h2 className="text-4xl font-semibold mb-1">{title2}</h2>
                            {' '}
                            <h2 className="text-2xl font-semibold mb-1">{title3}</h2>
                        </div>

                        {/* Центральная часть с аватаром и информацией */}
                        <div className="flex items-start mb-4 md:mb-0 bg-[#1a1a1a] rounded-2xl h-96 top-24 relative">
                            <div className='flex items-center border-b-2 border-b-[#1f1f1f] w-full p-3'>
                                <div className="rounded-lg w-12 h-10 flex items-center justify-center mr-3">
                                <img src={profileImage}
                                    className={`w-full h-full rounded-lg`}
                                />
                                </div>
                                {loading ? (
                                    data.map((user) => (
                                        <div
                                        key={user.id}
                                        className='flex items-center justify-center w-full'>
                                            <div className="flex-1">
                                                <p className="text-base text-white">{user.username}</p>
                                                <p className="text-xs text-gray-500"><SmartDate dateString={user.createdAt} /></p>
                                            </div>
                                            <div className="text-right ml-4">
                                                <p className="text-white text-sm font-normal">+550 TNO</p>
                                            </div>
                                        </div>
                                    ))
                                ) : 
                                <div
                                        className='flex items-center justify-center w-full'>
                                            <div className="flex-1">
                                                <p className="text-base text-white">Никого нету</p>
                                            </div>
                                        </div>
                                }
                            </div>
                            
                        </div>

                        {/* Правая часть с кнопкой */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Frens;