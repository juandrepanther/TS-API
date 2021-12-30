
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

export const MyApi: React.FC = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  let page: any = 0

  const onSubmit = (data: Inputs, e: any) => { 
    e.target.reset()
    fetch('http://localhost:3000/posts', {
      method: 'POST', 
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((json) => console.log(json))
      alert('User by ID Added Successfully')
      
  } 

 const DeleteTest = (e:any) => {
   e.preventDefault()  
              fetch(`http://localhost:3000/posts/${page}`, {
                method: 'DELETE',
                headers: { 'Content-Type' : 'application/json'},
              })
                .then((response) => response.json())
                .then((json) => console.log(json)); 
                alert('User by ID Deleted Successfully')         
 }
   
  return (
    <div className="row">
      <h2>Registration Form</h2>
      <form className="col s12" onSubmit={handleSubmit(onSubmit)} method='post' id='regForm'>
        <div className="row">
          <div className="input-field col s6">
            <input
              type="text"
              name="First-Name"
              className="validate"
              ref={register}
              required
            />
            <label htmlFor="First-name">First Name</label>
          </div>
          <div className="input-field col s6">
            <input
              type="text"
              className="validate"
              ref={register}
              name="Last-name"
              required
            />
            <label htmlFor="Last-name">Last Name</label>
          </div>
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="password"
              className="validate"
              name="password"
              ref={register}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="email"
              className="validate"
              name="email"
              ref={register}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
        <button
          className="btn waves-effect waves-light"
          type="reset"
          name="action"
        >
          Reset
          <i className="material-icons right">clear</i>
        </button> 
      </form>
      <form>
        <button
            className="btn waves-effect waves-light red"
            type="submit"
            name="action"
            onClick={DeleteTest}
          >
            Delete (Test Button)
            <i className="material-icons right">arrow_back</i>
          </button>
          <div className="input-field inline">
          <input
                  type="number"
                  className="validate"
                  name="number"
                  onChange={(e)=> {
                    page = e.target.value
                  }}
                />
          </div>
      </form>   
    </div>
  );
};
