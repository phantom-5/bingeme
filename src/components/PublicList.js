//Public list of particular user
import {useState, useEffect} from 'react'



const PublicList = (props) => {

    const user_id = props.location.state.id
    const [itemDetails, setItemDetails] = useState([])
    const [userDetails, setUserDetails] = useState({})

    const getUserList = async() => {
        const response = await fetch('https://bingeme.herokuapp.com/api/dashboard/public/'+user_id, {
            method: 'GET',
            mode: 'cors',
            headers : {
                'Content-Type': 'applicaiton/json'
            }
        })
        const res = await response.json()
        console.log(res)
        setItemDetails(res[0].itemList)

    }

    const getUserDetails = async() => {
        const response = await fetch('https://bingeme.herokuapp.com/api/user/userDetails/'+user_id, {
            method: 'GET',
            mode: 'cors',
            headers : {
                'Content-Type': 'application/json'
            }
        })
        const res = await response.json()
        const user = {
            username: res.username,
            aboutMe: res.aboutMe
        }
        setUserDetails(user)
    }

    useEffect(()=>{
        getUserList()
        getUserDetails()
    },[])

    return (
        
        <div>
        <div className="jumbotron jumbotron-fluid text-center">
                
        <div className="container">
                    <h1 className="display-4">{userDetails.username}</h1>
                    <p className="lead">{userDetails.aboutMe}</p>
        </div>
        </div>

        <div className="container">
                <div className="list-group">
            {itemDetails.map(item=>{
                return <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{item.name}</h5>
                    <small>{item.genre}</small>
                </div>
                <p className="mb-1">{item.platform}, {item.score}, {item.review}</p>
                <small>Number of mentions</small>
            </a>
            })}

        </div>
        </div>

        
        </div>
    )
}

export default PublicList