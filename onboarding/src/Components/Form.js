import React from "react"
import axios from "axios"
import * as yup from 'yup'

const Form = () => {


    return(
        <div>
            <label>
                Name: 
                <input type='text' name='email' />
            </label>
            <label>
                Email:
                <input type='text' name='email' />
            </label>
        </div>

    )
}

export default Form 