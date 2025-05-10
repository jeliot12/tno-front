import { useState } from 'react';
import { uploadCustomIcon } from '../assets/images';

export default function ImageFileUpload({ onChange }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Создаем превью для изображения
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Передаем файл родительскому компоненту
      onChange(file);
    }
  };

  return (
    <div className="relative">
      {/* Скрытый input */}
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      
      {/* Кастомная картинка-кнопка */}
      <label 
        htmlFor="file-upload"
        className="block cursor-pointer transition-transform hover:scale-105"
      >
        {preview ? (
          <img 
            src={preview} 
            alt="Загруженное изображение"
            className="w-full object-cover rounded-lg border-2"
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center bg-white rounded-md">
            <div className="text-center">
              <img 
                src={uploadCustomIcon} // Укажите путь к вашей картинке
                alt="ТNO community"
                className="mx-auto object-contain mb-2"
              />
            </div>
          </div>
        )}
      </label>
      
      {/* Удаление изображения (опционально) */}
      {preview && (
        <button
          type="button"
          onClick={() => {
            setPreview(null);
            onChange(null);
          }}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}