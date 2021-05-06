//Public Home Page

import {useState, useEffect} from 'react'
import UserCard from './UserCard'
import Loading from './Loading'

const PublicPage = () => {

    const[userData,setUserData] = useState([])
    const[loading,setLoading] = useState(true)

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
        setLoading(false)
        
           
    }

    useEffect(()=>{getIds()},[])    

    
    return (
    
    <div className="container">
      <div className="row">
        {loading && <Loading/>}
        {!loading && userData.map(data=>(
            <UserCard id={data.user}/>
        ))}
    </div>
    </div>

    )
}

export default PublicPage

