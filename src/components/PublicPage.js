//Public Home Page

import {useState, useEffect} from 'react'
import UserCard from './UserCard'

const PublicPage = () => {

    const[userData,setUserData] = useState([])

    const getIds = async() => {

        const response = await fetch('https://bingeme.herokuapp.com/api/dashboard/public', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const res = await response.json()
       // console.log(res[0].user)

        setUserData([...res])
           
    }

    useEffect(()=>{getIds()},[])    

    
    return (
    
    <div class="container">
      <div class="row">
        {userData.map(data=>(
            <UserCard id={data.user}/>
        ))}
    </div>
    </div>

    )
}

export default PublicPage

