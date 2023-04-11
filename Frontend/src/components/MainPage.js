import React, { useEffect, useState } from 'react'
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './element.css'

function MainPage() {
  var count = 0
  let navigate = useNavigate()
  let [allUsers, setAllUsers] = useState([])
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  useEffect(() => {
    axios.get('https://user-registration-web-application-be.onrender.com')
      .then((response) => {
        setAllUsers(response.data)
      });
  }, [allUsers])

  function editClick() {
    const nameInput = document.getElementById('nameInput')
    const passwordInput = document.getElementById('passwordInput')
    nameInput.removeAttribute('readOnly')
    passwordInput.removeAttribute('readOnly')
  }

  function updateClick() {
    const nameInput = document.getElementById('nameInput')
    const nameError = document.getElementById('nameError')
    const passwordInput = document.getElementById('passwordInput')
    const passwordError = document.getElementById('passwordError')
    if (nameInput.value === '') {
      nameError.innerHTML = `<i className="fa-solid fa-circle-exclamation"></i> Required`
    }
    else {
      if (!isNaN(nameInput.value)) {
        nameError.innerHTML = `<i className="fa-solid fa-circle-exclamation"></i> Invalid`
      }
      else {
        nameError.innerHTML = ''
      }
    }
    if (passwordInput.value === '') {
      passwordError.innerHTML = `<i className="fa-solid fa-circle-exclamation"></i> Required`
    }
    else {
      if (!isNaN(passwordInput.value)) {
        passwordError.innerHTML = `<i className="fa-solid fa-circle-exclamation"></i> Invalid`
      }
      else if (passwordInput.value.length < 6) {
        passwordError.innerHTML = `<i className="fa-solid fa-circle-exclamation"></i> Required minimum length is 6`
      }
      else {
        passwordError.innerHTML = ''
      }
    }
    if (nameError.innerHTML === '' && passwordError.innerHTML === '') {
      let userUpdatedData = {
        name: nameInput.value,
        password: passwordInput.value
      }
      axios.put(`https://user-registration-web-application-be.onrender.com/updateUser/${userInfo[0].email}`, userUpdatedData)
        .then((response) => {
          alert('Profile updated successfully')
          nameInput.setAttribute('readOnly', 'true')
          passwordInput.setAttribute('readOnly', 'true')
        });
    }
  }

  function nameValidate() {
    const nameInput = document.getElementById('nameInput')
    const nameError = document.getElementById('nameError')
    if (nameInput.value === '') {
      nameError.innerHTML = `<i className="fa-solid fa-circle-exclamation"></i> Required`
    }
    else if (!isNaN(nameInput.value)) {
      nameError.innerHTML = `<i className="fa-solid fa-circle-exclamation"></i> Invalid`
    }
    else {
      nameError.innerHTML = ''
    }
  }

  function passwordValidate() {
    const passwordInput = document.getElementById('passwordInput')
    const passwordError = document.getElementById('passwordError')
    if (passwordInput.value === '') {
      passwordError.innerHTML = `<i className="fa-solid fa-circle-exclamation"></i> Required`
    }
    else if (!isNaN(passwordInput.value)) {
      passwordError.innerHTML = `<i className="fa-solid fa-circle-exclamation"></i> Invalid`
    }
    else if (passwordInput.value.length < 6) {
      passwordError.innerHTML = `<i className="fa-solid fa-circle-exclamation"></i> Required minimum length is 6`
    }
    else {
      passwordError.innerHTML = ''
    }
  }

  function showPasswordClick() {
    const passwordInput = document.getElementById('passwordInput')
    count++
    if (count % 2 !== 0) {
      passwordInput.removeAttribute('type')
    }
    else {
      passwordInput.setAttribute('type', 'password')
    }
  }

  function logoutClick() {
    sessionStorage.clear()
    navigate('/login')
  }

  return (
    <>
      <nav className="shadow navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">User Management Web Application</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link active hover" aria-current="page" onClick={() => { logoutClick() }}>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='col-3 container rounded shadow position-absolute top-50 start-50 translate-middle'>
        <div className='d-grid justify-content-center'>
          <h4 className='mt-2 text-center text-primary'>User Profile</h4>
          <div className='mt-2'>
            <label htmlFor="nameInput" className="form-label">Name</label>
            <input type="text" className="form-control" id="nameInput" aria-describedby="emailHelp" autoComplete='off' defaultValue={userInfo[0].name} readOnly onKeyUp={() => { nameValidate() }} />
            <p className='text-danger' id='nameError'></p>
          </div>
          <div>
            <label htmlFor="exampleInputEmail1" className="form-label">Email Id</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' defaultValue={userInfo[0].email} readOnly />
          </div>
          <div className='mt-3'>
            <label htmlFor="passwordInput" className="form-label">Password</label>
            <input type="password" className="form-control" id="passwordInput" aria-describedby="emailHelp" autoComplete='off' defaultValue={userInfo[0].password} readOnly onKeyUp={() => { passwordValidate() }} />
            <p className='text-danger' id='passwordError'></p>
          </div>
          <div>
            <FormGroup >
              <FormControlLabel control={<Checkbox />} label="Show password" onClick={() => { showPasswordClick() }} />
            </FormGroup>
          </div>
          <div className='mt-2 mb-3 d-flex justify-content-evenly'>
            <div>
              <Button variant="contained" size="medium" onClick={() => { editClick() }}>Edit</Button>
            </div>
            <div>
              <Button variant="contained" size="medium" onClick={() => { updateClick() }}>Update</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPage