import React, {useState, useEffect} from "react"
import axios from "axios"
import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup.string().required('Please fill out name'),
    email: yup.string().email('Please provide a valid email address').required('An email is required'),
    password: yup.string().min(8, 'Enter a minimum of 8 characters').required('A password is required'),
    terms: yup.boolean().oneOf([true], 'Please agree to the Terms of Service')
})

const Form = () => {

    //we have to make a state for our form
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        terms: false
    })

    //state for errors
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        terms: ''
    })
    //making a state for our button
    const [disabledButton, setDisabled] = useState(true)

    //state for our user when it gets created
    const [user, setUser] = useState([])

    //Esta funcion verifica la validacion del formulario y activa el boton de sumbit
    useEffect(() => {
        formSchema.isValid(formState)
        .then((valid) => {
            setDisabled(!valid)
        })
    }, [formState])

    //this fucntion validates each current input values and if they are validated based on the schema then the user ]
    //will not get an error, otherwise we can display an error to our user (.catch())

    const validateForm = (e) => {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then((valid) => {
            setErrors({
                ...errors,
                [e.target.name]: ''
            })
        })
        .catch((err) => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            })

        })
    }

    const inputChange = (e) => {
        e.persist()
        const newData = {
            ...formState,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }
        validateForm(e)
        setFormState(newData)
    }

    const formSubmit = (e) => {
        e.preventDefault()
        axios
        .post('https://reqres.in/api/users', formState)
        .then((res) => {
            setUser(res.data)
            console.log('success', user)
            setFormState({
                name: '',
                email: '',
                password: '',
                terms: false
            })
        })
        .catch(err => console.log(err))
    }

    return(
        <div>

            <form onSubmit={formSubmit}>
                <label htmlFor='name'>
                    Name: 
                    <input type='text' name='name' id='name' onChange={inputChange} value={formState.name}/>
                    {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
                </label><br/>

                <label htmlFor='email'>
                    Email:
                    <input type='text' name='email' id='email' onChange={inputChange} value={formState.email}/>
                    {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
                </label><br/>

                <label htmlFor='password'>
                    Password:
                    <input type='password' name="password" id='password' onChange={inputChange} value={formState.password}/>
                    {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
                </label><br/>

                <label htmlFor='terms'>
                    Terms of Service: 
                    <input type='checkbox' name='terms' id='terms' onChange={inputChange} checked={formState.terms}/>
                    {errors.terms.checked === false > 0 ? <p className="error">{errors.terms}</p> : null}
                </label><br/>

                <pre>{JSON.stringify(user, null, 2)}</pre>
                <button disabled={disabledButton}>Submit</button>
            </form>
        </div>

    )
}

export default Form 