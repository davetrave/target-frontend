import { useState, useEffect} from 'react'
const Settings = () => {
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("Account")

  useEffect(()=> {
    let username_local = localStorage.getItem('username')
    let first_name_local =localStorage.getItem('first_name')

    if(username_local){
      setUsername(`(@${username_local})`)

    }
    if(first_name_local){
      setFirstName(first_name_local)
    }

   }, [])

    return (
      <div className="form-container p-4 text-white">
        <div className="starry-bg"></div>
        <div className='alphacard'>
          <h1 className="text-2xl font-bold mb-4">{firstName}{username}</h1>
          <p>Coming Soon for Awesome Features.</p>
        </div>
      </div>
    );
  };

  export default Settings