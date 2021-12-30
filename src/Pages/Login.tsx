import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useHistory } from 'react-router-dom'
import data from '../data-2.json'

export const Login: React.FC = () => {
    const {register, handleSubmit} = useForm()
    const emailAdressesJson = data.posts.map((i)=> i.email)
    const passwordJson = data.posts.map((i)=> i.password)
    const history = useHistory()  
     
const onSubmit = (e: any) => {
    const inputEmailValue: any = e['email']
    const inputPass = e['password']
    
    
        if (emailAdressesJson.includes(inputEmailValue) && passwordJson.includes(inputPass)) {
            history.push('/system')
            
        } else {
            alert('No User Found. Please try again and check if typed correctly!')                       
        }
     }
 
    return (
        <div>
            <h1>Please type your data for Login in the System</h1>
            <NavLink to="/system">Continue Anyway without Login (for Test)</NavLink>
            <div className="column">
                <form onSubmit={handleSubmit(onSubmit)} className="col s12">
                    <div className="column">
                        <div className="input-field col s6">
                            <input required name='email' ref={register} type="email" className="validate"/>
                            <label htmlFor="first_name">Email</label>
                        </div>
                        </div>
                    <div className="input-field col s6">
                        <input required name='password' ref={register} type="password" className="validate"/>
                        <label htmlFor="last_name">Password</label>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Login
                    <i className="material-icons right">send</i>
                     </button>
                     <NavLink to="/my-api">Create New User</NavLink>
                 </form>
                 
            </div>
            
        </div>
        
    )
}