//Private List for Auth Users
import Cookies from 'universal-cookie'
import {useState, useEffect} from 'react'
import Swal from 'sweetalert2'

const PrivateList = () => {

    
    const cookies = new Cookies();

    const cookie_token = cookies.get('token')

    const [privateList, setPrivateList] = useState({
        data: [],
        username: '',
        aboutMe: ''
    })

    const getUserPrivateList = async() => {
        const response = await fetch('https://bingeme.herokuapp.com/api/dashboard/private',{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token': cookie_token
            }
        })
        const res = await response.json()
        setPrivateList(res)
    }

    const addPrivate = async() => {

       const newItemData = await Swal.fire({
            title: 'Add to Private List',
            confirmButtonText: 'Add',
            html: `<form>
            <div class="form-group">
              <input type="text" class="form-control" id="name" placeholder="Name" required>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="genre" placeholder="Genre" required>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="platform" placeholder="Platform" required="true">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="review" placeholder="Review">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="score" placeholder="Score" required>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="link" placeholder="Link">
            </div>
          </form>`,
          preConfirm: () => {

                const name = Swal.getPopup().querySelector('#name').value
                const genre = Swal.getPopup().querySelector('#genre').value
                const platform = Swal.getPopup().querySelector('#platform').value
                const review = Swal.getPopup().querySelector('#review').value
                const score = Swal.getPopup().querySelector('#score').value
                const url = Swal.getPopup().querySelector('#link').value

                return {
                    name,
                    genre,
                    platform,
                    review,
                    score,
                    url
                }
          }
          })
          if(!newItemData.isDismissed){
          console.log(newItemData.value)
          const {name, genre, platform, review, score, url} = newItemData.value
          if(!(name && genre && platform && score)){
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Name, Genre, Platform and Score are mandatory.',
              })
          }else{
              const response = await fetch('https://bingeme.herokuapp.com/api/dashboard/private',{
                  method: 'POST',
                  mode: 'cors',
                  headers : {
                      'Content-Type':'application/json',
                      'auth-token': cookie_token
                  },
                  body: JSON.stringify(newItemData.value)
              })
              const res = await response.json()
              console.log(res)
              if(res.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: res.error,
                  })
              }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Yay!',
                    text: 'New Item Added!',
                  })
                  setPrivateList({...privateList,'data':[...privateList.data,newItemData.value]})
              }
          }
        }

    }

    const addPublic = async() => {
        
        const newItemData = await Swal.fire({
            title: 'Add to Public List',
            confirmButtonText: 'Add',
            html: `<form>
            <div class="form-group">
              <input type="text" class="form-control" id="name" placeholder="Name" required>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="genre" placeholder="Genre" required>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="platform" placeholder="Platform" required="true">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="review" placeholder="Review">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="score" placeholder="Score" required>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="link" placeholder="Link">
            </div>
          </form>`,
          preConfirm: () => {

                const name = Swal.getPopup().querySelector('#name').value
                const genre = Swal.getPopup().querySelector('#genre').value
                const platform = Swal.getPopup().querySelector('#platform').value
                const review = Swal.getPopup().querySelector('#review').value
                const score = Swal.getPopup().querySelector('#score').value
                const url = Swal.getPopup().querySelector('#link').value

                return {
                    name,
                    genre,
                    platform,
                    review,
                    score,
                    url
                }
          }
          })
          if(!newItemData.isDismissed){
          console.log(newItemData.value)
          const {name, genre, platform, review, score, url} = newItemData.value
          if(!(name && genre && platform && score)){
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Name, Genre, Platform and Score are mandatory.',
              })
          }else{
              const response = await fetch('https://bingeme.herokuapp.com/api/dashboard/public',{
                  method: 'POST',
                  mode: 'cors',
                  headers : {
                      'Content-Type':'application/json',
                      'auth-token': cookie_token
                  },
                  body: JSON.stringify(newItemData.value)
              })
              const res = await response.json()
              console.log(res)
              if(res.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: res.error,
                  })
              }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Yay!',
                    text: 'New Item Added!',
                  })
              }
          }
        }

    }

    useEffect(()=>{getUserPrivateList()},[])


    return (

        <div>

            <div className="jumbotron jumbotron-fluid text-center">
                
                <div className="container">
                    <h1 className="display-4">{privateList.username}</h1>
                    <p className="lead">{privateList.aboutMe}</p>
                    <a className="btn btn-outline-success btn-lg"  role="button" onClick={addPublic}>Add Public</a>&nbsp;&nbsp;
                    <a className="btn btn-outline-danger btn-lg" role="button" onClick={addPrivate}>Add Private</a>
                </div>
            
            </div>
            <div className="container">
                <div className="list-group">
            {privateList.data.map(item=>{
                let name = item.name
                let genre = item.genre
                let platform = item.platform
                let score = item.score
                let date = item.date
                let review = ''
                let url=''
                if(item.review){
                    review = item.review
                }
                if(item.url){
                    url = item.url
                }
                return <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{name}</h5>
                        <small>{genre}</small>
                    </div>
                    <p className="mb-1">{platform}, {score}, {review}</p>
                    <small>Number of mentions</small>
                </a>

            })}
            </div>
            </div>
        </div>
        
    )
    
}

export default PrivateList