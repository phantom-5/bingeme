import '../App.css'
import {useState} from 'react'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'



const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    //Coookies

    const cookies = new Cookies();




    const triggerChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value})
    }

    const loginUser = async() => {
        const newData = {
            ...formData
        }
        const response = await fetch('https://bingeme.herokuapp.com/api/user/login',{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
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

          cookies.set('token', res.token , { path: '/' })
          cookies.set('username', res.username, { path: '/'})

          window.open('/dashboard/private','_self')

        }
    }

    const submitForm = async(e) => {
        e.preventDefault()
        await loginUser()
    }

    return(

        <div className="container">
        <form onSubmit={e=>submitForm(e)}>
          <div className="form-group myForm">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={e=>triggerChange(e)} value={formData.email}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" onChange={e=>triggerChange(e)} value={formData.password}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

    )
}

export default Login