import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './element.css'

function Signup() {
    var count = 0
    let navigate = useNavigate()
    let [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        axios.get('https://user-registration-web-application-be.onrender.com')
            .then((response) => {
                setAllUsers(response.data)
            });
    }, [allUsers])

    function registerClick() {
        const nameInput = document.getElementById('nameInput')
        const nameError = document.getElementById('nameError')
        const emailInput = document.getElementById('emailInput')
        const emailError = document.getElementById('emailError')
        const passwordInput = document.getElementById('passwordInput')
        const passwordError = document.getElementById('passwordError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        if (nameInput.value === '') {
            nameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (!isNaN(nameInput.value)) {
                nameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else {
                nameError.innerHTML = ''
            }
        }
        if (emailInput.value === '') {
            emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (emailInput.value.match(emailPattern)) {
                emailError.innerHTML = ''
            }
            else {
                emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
            }
        }
        if (passwordInput.value === '') {
            passwordError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (!isNaN(passwordInput.value)) {
                passwordError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else if (passwordInput.value.length < 6) {
                passwordError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required minimum length is 6`
            }
            else {
                passwordError.innerHTML = ''
            }
        }
        if (nameError.innerHTML === '' && emailError.innerHTML === '' && passwordError.innerHTML === '') {
            let emailCheck = allUsers.filter((e) => e.email === emailInput.value)
            if (emailCheck.length) {
                emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Email Id already exist`
            }
            else {
                let userSignupData = {
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value
                }
                axios.post('https://user-registration-web-application-be.onrender.com/userSignUp', userSignupData)
                    .then((response) => {
                        alert('signup successful')
                        navigate('/login')
                    });
            }

        }
    }

    function nameValidate() {
        const nameInput = document.getElementById('nameInput')
        const nameError = document.getElementById('nameError')
        if (nameInput.value === '') {
            nameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (!isNaN(nameInput.value)) {
            nameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else {
            nameError.innerHTML = ''
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
        else if (!isNaN(passwordInput.value)) {
            passwordError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else if (passwordInput.value.length < 6) {
            passwordError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required minimum length is 6`
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
                    <h3 className='mt-2 text-center text-primary'>Signup</h3>
                    <div className='mt-2'>
                        <TextField label="Name" id="nameInput" size="small" onKeyUp={() => { nameValidate() }} />
                        <p className='text-danger' id='nameError'></p>
                    </div>
                    <div>
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
                        <Button variant="contained" size="medium" onClick={() => { registerClick() }}>register</Button>
                    </div>
                    <div className='mt-3 mb-3 text-primary text-center'>
                        <h6 className='hover' onClick={()=>{navigate('/login')}}>click here to login</h6>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Signup