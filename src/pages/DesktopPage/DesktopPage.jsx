import {QRCodeSVG} from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

export default function DesktopPage() {
    const navigate = useNavigate();
    const telegramLink = "https://t.me/tnocoin_bot";


    return (
        <div className='bg-gradient-main min-h-screen px-4 flex flex-col items-center justify-center text-white font-medium'>

            <div className="max-w-md w-full bg-[#1d1d1d] rounded-xl shadow-lg p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">🚀 Мобильное приложение</h1>
                <p className="mb-6 text-white">
                    Для использования этого приложения отсканируйте QR-код 
                    или перейдите по ссылке на мобильном устройстве
                </p>
                
                <div className="flex justify-center">
                    <div className='bg-white rounded-lg border border-gray-200 w-56 flex justify-center mb-6 p-2'>
                        <QRCodeSVG 
                            value={telegramLink}
                            size={200}
                            level="H"
                        />
                    </div>
                </div>
                
                <div className="mb-6">
                    <p className="font-medium mb-2">Или перейдите по ссылке:</p>
                    <a 
                        href={telegramLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline break-all"
                    >
                        {telegramLink}
                    </a>
                </div>
                
                <button 
                    onClick={() => navigate(-1)} 
                    className="px-4 py-2 transition w-full bg-[#0088cc] hover:bg-gray-600 text-white text-xl font-medium rounded-xl duration-200"
                >
                    Назад
                </button>
            </div>
        </div>
    );
}