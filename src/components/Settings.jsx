import React,{ useState, useEffect} from 'react'
import gsap from 'gsap';
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
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const endX = Math.random() * 100;
      const endY = Math.random() * 100;
      const duration = Math.random() * 10 + 10; 
      const delay = Math.random() * 5;

      gsap.fromTo(
        star,
        { x: `${startX}vw`, y: `${startY}vh` },
        {
          x: `${endX}vw`,
          y: `${endY}vh`,
          repeat: -1,
          duration,
          ease: 'linear',
          delay,
        }
      );
    });

    gsap.to('.gradient', {
      background: 'linear-gradient(45deg, #000000, #6e40c9, #b96c3c, #1d9d74)',
      duration: 10,
      repeat: -1,
      ease: 'power2.inOut',
      backgroundSize: '400% 400%',
    });

   }, [])

   if (loading) {
    return <LoadingAnimation />
   }

    return (
      <>
        <div className="relative w-full h-screen flex flex-col justify-start  text-white bg-gray-900 ">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="gradient absolute top-0 left-0 w-full h-full"></div>
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className={`star absolute rounded-full ${i < 10 ? 'bg-gray-300' : 'bg-white'}`}
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  opacity: i < 10 ? 0.8 : 1
                }}
              ></div>
            ))}
          </div>
          <div className='alphacard mt-6'>
              <UserAvatar name={avatar} photoUrl={photoUrl}/>
              <h1 className="inline-block text-lg font-bold ml-3">
                {firstName}{username}</h1>
              
            </div>
            <div className='alphacard'>
              
              <h1 className="text-sm font-bold  ml-3">Date Joined: 
                {new Date(userData.date_joined).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
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
              <h1 className="text-sm font-bold ml-3">Courses Purchased and Waiting for Approval : 
                {userData.courses_awaiting_approval}
              </h1>
              <h1 className="text-sm font-bold ml-3">Courses Purchased : 
                {userData.courses_purchased}
              </h1>
            </div>
          
        </div>
      </>
      
    );
  };

  export default Settings