import { useState } from 'react';
import ModalWindow from './ModalWindow';
import { Notification } from '../Notification';
import ImageFileUpload from '../ImageFileUpload';

const FormModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const telegramId = "1083689910";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (selectedFile) formData.append('photo', selectedFile);
    formData.append('telegramId', telegramId);

    try {
      const response = await fetch('http://localhost:4000/api/createSquad-to-telegram', {
        method: 'POST',
        body: formData,
      });

      if (response.ok){
        setShowNotification(true);
        // Очистка формы
        setTitle('');
        setDescription('');
        setSelectedFile(null);
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
    }
  };

  return (
    <>
    <ModalWindow isOpen={isOpen} onClose={onClose} handleClick={handleSubmit}>
      <div className="space-y-4">
        <div className="flex gap-4 flex-row sm:flex-row w-full">
          {/* <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg w-full sm:w-48 hover:border-blue-500 transition-colors">
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="hidden"
            />
            <span className="text-gray-500 text-sm">
              {selectedFile ? selectedFile.name : 'Загрузить фото'}
            </span>
          </label> */}
          <ImageFileUpload onChange={(file) => setSelectedFile(file)} />

          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow p-3 rounded-lg focus:outline-none focus:ring-0 bg-[#292929] text-white"
          />
        </div>

        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            placeholder="Описание"
            className="w-full h-48 p-3 rounded-lg focus:outline-none focus:ring-0 resize-none bg-[#292929] text-white"
          />
          <div className="absolute bottom-2 right-2 text-sm text-[#4d4d4d] bg-[#292929] px-2 rounded">
            {description.length}/200
          </div>
        </div>
      </div>

      <button className="bg-[#0088cc] text-white text-3xl font-medium py-3 px-8 rounded-lg w-full">
        Отправить заявку!
      </button>
    </ModalWindow>
    {showNotification && (
        <Notification 
          message="Заявка успешно отправлена!" 
          onClose={() => setShowNotification(false)}
        />
    )}
    </>
  );
};

export default FormModal;