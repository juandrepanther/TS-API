
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useHistory } from 'react-router-dom'

type Inputs = {
    firstName: string;
    lastName: string;
    female: string;
    male: string;
    DoB: string;
    Bio:string;
    Image: any;
  };

export const Logged: React.FC = () => {
    const {register, handleSubmit} = useForm<Inputs>()
    const [imageData, setImageData] = useState<any>()
    const history = useHistory() 
    
    const ImageConvert = (event: any) => {
      const image = event.target.files[0] 
      var reader = new FileReader()
      reader.readAsDataURL(image)

      reader.onload = () => {
          setImageData(reader.result) 
          console.log(reader)
      }
      reader.onerror = error => {
        console.log('Error: ', error);
      }
    }

    const onSubmit = (data: Inputs) => {
            fetch('http://localhost:3000/comments', {
            method: 'POST', 
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({
                Image: imageData,
                data
            })
            })
            .then((response) => response.json())
            .then((json) => console.log(json))
            history.push('/results')
    }
   

    return (
        <div>
            <h3>Fill in your Account information below</h3>
            <NavLink to="/results">Already Have Done? Click Here!</NavLink>
            <div className="row">
                <form onSubmit={handleSubmit(onSubmit)} method='post' className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input ref={register} required type="text" name='firstName' className="validate"/>
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input name='lastName' ref={register} required id="last_name" type="text" className="validate"/>
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                            <p>Gender</p>
                             <p>
                            <label>
                                <input ref={register} name="male" type="radio" />
                                <span>Male</span>
                            </label>
                            </p>
                            <p>
                            <label>
                                <input ref={register} name="female" type="radio" />
                                <span>Female</span>
                            </label>
                            </p>
                            <p>Date of Birth</p>
                            <input ref={register} name='DoB' required type='date'/>
                            <p>Describe yourself more detailed (skills, professional experience etc.)</p>
                            <div className="row">
                                <div className="input-field col s12">
                                <textarea ref={register} required name='Bio' placeholder='Type here' className="materialize-textarea"></textarea>
                            </div>
                        </div>
                            <div className="file-field input-field inline">
                                <div className="btn">
                                    <span>Upload Your Gallery</span>
                                    <input name='Gallery' required type="file" onChange={ImageConvert} accept='images/jpg'/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" placeholder="Multiple"/>
                                </div>
                            </div>
                    </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                            <i className="material-icons right">arrow_forward</i>
                        </button>
                </form>
              
        </div>
        </div>
    )
}
