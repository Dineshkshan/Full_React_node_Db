import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import '../cssfile/Login.css';
import Avatar from 'react-avatar';
import avatar from '../image.png';
import { Formik} from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Login = ({history}) => (
    <Formik
    initialValues={{
        UserName:'',
        Password:''
    }}
    onSubmit={(value)=>
    {
        console.log("The values are",value);
        axios.post('http://localhost:5000/Login',value)
        .then((resp)=>{
            console.log("The response received is",resp.data.valid);
            var valid=resp.data.valid;
            if(valid)
            {
                history.push('./Buttons');
            }
            else
            {
                alert("UserName and Password doesn't exists");
            }
        });
    }}
    validationSchema={yup.object(
        {
            UserName:yup.string()
               .required('Required'),
            Password:yup.string()
               .required('Required')
        }
    )}
    >
    {({handleChange,handleSubmit,errors,values})=> (
        <div className="contain">
        <div className="card">
        <h5 className="card-title">Login</h5>
        <div className="card-body" style={{bottom:'100px'}} >
        <div className="avatar" >
            <Avatar src={avatar} round={true} size="100"/>
            </div>
        <form onSubmit={handleSubmit} action='/Register'>
            <div className='form-group'>
            <label>User Name:</label>
            <input 
            type="text" 
            className={errors.UserName ? "form-control is-invalid":"form-control"}
            onChange={handleChange}
             name="UserName" 
             value={values.UserName}
             />
            {errors.UserName ? <div className="text-danger" style={{height:'0px'}}>*{errors.UserName}*</div>:null}
            </div>
            <div className="form-group">
            <label>Password:</label>
            <input 
            type="password" 
            className={errors.Password ? "form-control is-invalid":"form-control"}
            onChange={handleChange} 
            name="Password"
            value={values.Password}
            />
            {errors.Password ?<div className="text-danger" style={{height:'0px'}}> *{errors.Password}*</div>:null}
            </div>
            <div className="button">
            <Button type="submit" className="btn-lg btn-block" style={{marginTop: '30px'}}>Submit</Button>
            </div>
            </form>
            <Link to="./Register"id="p">Don't have an account?</Link>
        </div>
      </div>
      </div>
    )
    }
 </Formik>
);
export default Login;