import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Avatar from 'react-avatar';
import avatar from '../image.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Change=({history})=>
(
    <Formik
    initialValues={{
        Password:'',
        ConfirmPassword:''
    }}
    onSubmit={(values)=>
    {
        console.log("The values are",values);
        axios.post('http://localhost:5000/change',values)
        .then((resp)=>{
            var valid=resp.data.valid;
            if(valid)
            {
                alert("Password changed Successfully");
                history.push('./');
            }
        });
    }}
    validationSchema={yup.object(
        {
            Password:yup.string()
                .required('Required')
                .min(4,'Minimum 4 characters required')
                .max(12,'Maximum limit is 12 characters'),
            ConfirmPassword:yup.string()
                .required('Required')
                .oneOf([yup.ref('Password'),null],"Password doesn't match")    
        }
    )}
    >
        {({handleChange,handleSubmit,errors,values})=>
        (
    <div className='contain' style={{paddingTop:'150px'}}>
    <div className="card" style={{
         width:'20%',
         height:'75%',
         marginLeft:'600px'
    }}>
    <h5 className="card-title" style={{paddingTop:'80px'}}>Change Password</h5>
    <div className="card-body" style={{bottom: '90px'}}>
     <form onSubmit={handleSubmit}>   
    <div className="avatar" style={{left: '80px',bottom: '90px'}}>
    <Avatar src={avatar} round={true} size="100"/>
    </div>
    <div className="form-group">
        <label>Enter New Password</label>
     <input 
     type="password" 
     name="Password"
     className={errors.Password ? "form-control is-invalid":"form-control"} 
     value={values.Password}
     onChange={handleChange}
     />
    {errors.Password ? <div className="text-danger" style={{height:'0px'}}>*{errors.Password}*</div>:null}
    </div>
    <div className="form-group">
        <label>ConfirmPassword</label>
        <input 
        type="password" 
        className={errors.ConfirmPassword ? "form-control is-invalid":"form-control"} 
        name="ConfirmPassword"
        value={values.ConfirmPassword}
        onChange={handleChange}
        />
       {errors.ConfirmPassword ? <div className="text-danger" style={{height:'0px'}}>*{errors.ConfirmPassword}*</div>:null}
    </div>
    <Button type="submit"className="btn-block"style={{marginTop:'40px'}}>Change Password</Button>
    </form>    
    </div>
    </div>
    </div>
        )
        }
    </Formik>
)
export default Change;