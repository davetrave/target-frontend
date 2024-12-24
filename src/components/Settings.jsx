import { useState, useEffect} from 'react'
import UserAvatar from './UserAvatar';
import LoadingAnimation from './LoadingAnimation'
import { useFlashMessage } from "../context/FlashMessageContext";
import { getUserData } from '../services/UserService'

const Settings = () => {
  const showMessage = useFlashMessage()
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("Account")
  const [avatar, setAvatar] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")

  const fetchUserData = async () => {
    try {
      const data = await getUserData();
      if (data) {
        setUserData(data);
        setLoading(false);
      }
      else {
        showMessage(`Error: ${response}`, "error")
      }

    } catch(error){
      showMessage(`Error: ${error}`, "error")
    }
  }

  useEffect(()=> {
    fetchUserData()
    let username_local = localStorage.getItem('username')
    let first_name_local =localStorage.getItem('first_name')
    let  photo_url = localStorage.getItem('photo_url');
    if(username_local){
      setUsername(`(@${username_local})`)

    }
    if(first_name_local){
      setFirstName(first_name_local)
    }
    if(photo_url){
      setPhotoUrl(photo_url)
    }
    else{
      setAvatar(first_name_local)
    }

   }, [])

   if (loading) {
    return <LoadingAnimation />
   }

    return (
      <div className=" p-4 text-white">
        <div className="starry-bg"></div>
        <div className='alphacard'>
          <UserAvatar name={avatar} photoUrl={photoUrl}/>
          <h1 className="inline-block text-2xl font-bold mb-4 ml-3">
            {firstName}{username}</h1>
          
        </div>
        <div className='alphacard'>
          
          <h1 className="text-sm font-bold mb-4 ml-3">Date Joined: 
            {userData.date_joined}
          </h1>
        </div>
        
        {userData.courses_created > 0 && ( 
          <div className='alphacard'>
            <h1 className="text-sm font-bold  ml-3">Courses Curated: 
              {userData.courses_created}
            </h1>
          </div>
        )}
        
        <div className='alphacard'>
          <h1 className="text-sm font-bold ml-3">Courses in Cart: 
            {userData.carts_count}
          </h1>
        </div>
        <div className='alphacard'>
          <h1 className="text-sm font-bold ml-3">Courses Purchased and Awaiting Approval : 
            {userData.courses_awaiting_approval}
          </h1>
        </div>
        <div className='alphacard'>
          <h1 className="text-sm font-bold ml-3">Courses Purchased : 
            {userData.courses_purchased}
          </h1>
        </div>
      </div>
    );
  };

  export default Settings