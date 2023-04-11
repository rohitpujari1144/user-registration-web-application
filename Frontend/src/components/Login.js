import React, { useEffect, useState } from 'react'
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './element.css'

function Login() {
    var count = 0
    let navigate = useNavigate()
    let [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        axios.get('https://user-registration-web-application-be.onrender.com')
            .then((response) => {
                setAllUsers(response.data)
            });
    }, [allUsers])

    function loginClick() {
        const emailInput = document.getElementById('emailInput')
        const emailError = document.getElementById('emailError')
        const passwordInput = document.getElementById('passwordInput')
        const passwordError = document.getElementById('passwordError')
        if (emailInput.value === '') {
            emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            emailError.innerHTML = ''
        }
        if (passwordInput.value === '') {
            passwordError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            passwordError.innerHTML = ''
        }
        if (emailError.innerHTML === '' && passwordError.innerHTML === '') {
            let emailCheck = allUsers.filter((e) => e.email === emailInput.value)
            if (emailCheck.length) {
                let passwordCheck = emailCheck.filter((e) => e.password === passwordInput.value)
                if (passwordCheck.length) {
                    sessionStorage.setItem('userInfo', JSON.stringify(passwordCheck))
                    alert('login successful')
                    navigate('/main-page')
                }
                else {
                    passwordError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
                }
            }
            else {
                emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
            }

        }
    }

    function emailValidate() {
        const emailInput = document.getElementById('emailInput')
        const emailError = document.getElementById('emailError')
        if (emailInput.value === '') {
            emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            emailError.innerHTML = ''
        }
    }

    function passwordValidate() {
        const passwordInput = document.getElementById('passwordInput')
        const passwordError = document.getElementById('passwordError')
        if (passwordInput.value === '') {
            passwordError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
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
    return (
        <>
            <div className='col-3 container rounded shadow position-absolute top-50 start-50 translate-middle'>
                <div className='d-grid justify-content-center'>
                    <h3 className='mt-2 text-center text-primary'>Login</h3>
                    <div className='mt-2'>
                        <TextField label="Email Id" id="emailInput" size="small" onKeyUp={() => { emailValidate() }} />
                        <p className='text-danger' id='emailError'></p>
                    </div>
                    <div>
                        <TextField label="Password" type='password' id="passwordInput" size="small" onKeyUp={() => { passwordValidate() }} />
                        <p className='text-danger' id='passwordError'></p>
                    </div>
                    <div>
                        <FormGroup >
                            <FormControlLabel control={<Checkbox />} label="Show password" onClick={() => { showPasswordClick() }} />
                        </FormGroup>
                    </div>
                    <div className='mt-2 d-flex justify-content-center '>
                        <Button variant="contained" size="medium" onClick={() => { loginClick() }}>login</Button>
                    </div>
                    <div className='mt-3 mb-3 text-primary text-center'>
                        <h6 className='hover' onClick={()=>{navigate('/signup')}}>click here to register</h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login