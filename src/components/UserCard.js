//User cards for public page
import '../App.css'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import likeImg from './Assets/likeImg.png'
import likedImg from './Assets/likedImg.png'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'



const UserCard = (props) => {

    const[userDetails,setUserDetails] = useState({
        username: "",
        aboutMe: "",
        avatar: "",
        likes: []
    })

    const[likes, setLikes] = useState([])

   


    const getDetails = async() => {
        const response = await fetch('https://bingeme.herokuapp.com/api/user/userDetails/'+props.id,{
            method: 'GET',
            mode: 'cors',
            headers : {
                'Content-Type':'application/json'
            }
        })
        const res = await response.json()
        setLikes(res.likes)
        setUserDetails(res)
    }

    const likeUser = async() => {

      const cookies = new Cookies()
      const user_token = cookies.get('token')
      const response = await fetch('https://bingeme.herokuapp.com/api/dashboard/likeUser/'+props.id,{
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': user_token
        }
      })
      const res = await response.json()
      if (res.msg){
        Swal.fire({
          icon: 'info',
          title: 'Oops!',
          text: 'Please login to like/unlike users!',
        })
      }else if(res.error){
        Swal.fire({
          icon: 'info',
          title: 'Awww!',
          text: res.error,
        })
      }
      else{
        console.log(res)
        setLikeButtonStuff({
          image: likedImg,
          func: unlikeUser
        })
        setLikes(res)
      }

    }


    const unlikeUser = async() => {

      const cookies = new Cookies()
      const user_token = cookies.get('token')
      const response = await fetch('https://bingeme.herokuapp.com/api/dashboard/unlikeUser/'+props.id,{
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': user_token
        }
      })
      const res = await response.json()
      if (res.msg){
        Swal.fire({
          icon: 'info',
          title: 'Oops!',
          text: 'Please login to like/unlike users!',
        })
      }else if(res.error){
        Swal.fire({
          icon: 'info',
          title: 'Argh!',
          text: res.error,
        })
      }
      else{
        console.log(res)
        setLikeButtonStuff({
          image: likeImg,
          func: likeUser
        })
        setLikes(res)
      }

    }

     const[likeButtonStuff, setLikeButtonStuff] = useState({
      image: likeImg,
      func: likeUser
    
    })

    //Check if the card is liked by current user or not
    const checkCardLike = async() => {
      const cookies = new Cookies()
      const user_token = cookies.get('token')
      const response = await fetch('https://bingeme.herokuapp.com/api/dashboard/likeList/'+props.id, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': user_token
        }
      })
      const res = await response.json()
      if(res.status){
        setLikeButtonStuff({
          image: likedImg,
          func: unlikeUser
        })
      }else{
        setLikeButtonStuff({
          image: likeImg,
          func: likeUser
        })
      }
    }


    useEffect(()=>{
        getDetails()
        checkCardLike()
    },[])



    return(
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="card my-3 mx-3 myCard">
            <img className="card-img-top" src={userDetails.avatar} alt="Gravatar"/>
            <div className="card-body">
              <h5 className="card-title">{userDetails.username}</h5>
              <p className="card-text">{userDetails.aboutMe}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Likes: {likes.length}</li>
            </ul>
            <div className="card-body">
              <a href="#" className="card-link"><img className="round" src={likeButtonStuff.image} alt="Like Icon" onClick={likeButtonStuff.func}/></a>
              <Link to={{'pathname': '/user', 'state': {'id':props.id}}} className="card-link">BingeMe</Link>
            </div>
          </div>
        </div>
    )
}

export default UserCard