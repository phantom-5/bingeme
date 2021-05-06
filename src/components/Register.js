// Registration form
import '../App.css'
import { useState } from 'react'
import Swal from 'sweetalert2'



const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        aboutMe: '',
        password: '',
        password2: '',
    })

    const triggerChange = (e) => {
        setFormData({...formData,[e.target.id]: e.target.value})
    }

    const registerUser = async() => {
        const newData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            aboutMe: formData.aboutMe
        }
        const response = await fetch('https://bingeme.herokuapp.com/api/user/register',{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })

        const res = await response.json()
        if(res.error){
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: res.error,
          })
        }else{
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'You have been registered. Please Login!',
          })
        }
    }

    const submitForm = async(e) => {
        e.preventDefault()
   
        if(formData.password !== formData.password2){
        
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Passwords don\'t match',
              })

        }else{
            await registerUser()
        }
    }


    return (

        <div className="container myForm">
        <form onSubmit={e=>submitForm(e)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="username" className="form-control" id="name" placeholder="Enter username" value={formData.name} onChange={e=>triggerChange(e)}/>    
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={formData.email} onChange={e=>triggerChange(e)}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="aboutme">About Me</label>
            <textarea className="form-control" id="aboutMe" rows="3" value={formData.aboutMe} onChange={e=>triggerChange(e)}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" value={formData.password} onChange={e=>triggerChange(e)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password2">Retype Password</label>
            <input type="password" className="form-control" id="password2" placeholder="Password" value={formData.password2} onChange={e=>triggerChange(e)}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}

export default Register