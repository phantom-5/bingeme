//Navbar Logged In

import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie'



const NavbarLI = () => {

  const cookies = new Cookies();


  const [buttonName, setButtonName] = useState('Login')
  const [buttonTo, setButtonTo] = useState('/login')
  const [buttonOne, setButtonOne] = useState('SignUp')
  const [buttonOnePath, setButtonOnePath] = useState('/register')
  const [searchDisplay, setSearchDisplay] = useState({
    status: false,
    count: 0,
    item: ''
  })

  const verifyUser = async() => {

      console.log('From app.js',cookies.get('token'))

      const cookie_token = cookies.get('token') 
      const cookie_username = cookies.get('username')

      console.log('verifyUser Triggered')

      const response = await fetch('https://bingeme.herokuapp.com/api/user/verify',{
                  method: 'GET',
                  mode: 'cors',
                  headers: {
                      'Content-Type': 'application/json',
                      'auth-token' : cookie_token
                  }
      })

        const res = await response.json()

        if(res.verified){


          console.log(res.verified)
          setButtonName('Logout')
          setButtonTo('/')
          setButtonOne(cookie_username)
          setButtonOnePath('/dashboard/private')

          
        }else{
          
          setButtonName('Login')
          setButtonTo('/login')
          setButtonOne('SignUp')
          setButtonOnePath('/register')

        }

       
  }

  //search function
  const searchFun = async() => {
    console.log('functionCalled')
    const val = document.querySelector('#search').value
    const response = await fetch('https://bingeme.herokuapp.com/api/dashboard/public/search/'+val, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response)
    const res = await response.json()
    console.log(res.count)
    setSearchDisplay({
      status: true,
      count: res.count,
      item: val
    })
    setTimeout(()=>{
      setSearchDisplay({
        status: false,
        count: 0,
        item: ''
      })
    },5000)
  }

  useEffect(()=>{verifyUser()},[])


    const logOut = (e) => {
        e.preventDefault()
        console.log('logOut triggered')
        cookies.set('token', 'DEFAULT_TOKEN' , { path: '/' })
        verifyUser()
      

    }

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
        <Link className="navbar-brand" to="/">BingeMe</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={buttonOnePath}>{buttonOne}</Link>
            </li>
            <li className="nav-item active" onClick={e=>logOut(e)}>
              <Link className="nav-link" to={buttonTo}>{buttonName}</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={searchFun}>Search</button>
          </form>
        </div>
      </nav>
      {searchDisplay.status && <div>
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">{searchDisplay.item}</h1>
            <p class="lead">The item has been mentioned {searchDisplay.count} number of times.</p>
          </div>
          </div></div>}
      </div>
    )

}

export default NavbarLI