import { useEffect } from 'react';
import { checkUserOnDB } from '../http/UserAPI';

const Test = () => {

    const Id = "1083689910"
    const username = "qwqwqrw"
  
    const checkUser = async (telegramId, username) => {
      const data = await checkUserOnDB(telegramId, username);
      if (data == true){
        console.log("1")
      }else {
        console.log("2");
      }
    };
    useEffect(() => {
      checkUser(Id, username)
    }, []);
  return (
    <>
    </>
  );
};

export default Test;