import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Avatar from 'react-avatar';
import avatar from '../image.png';
import { Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const phone = /[7-9]{1}[0-9]{4}[0-9]{5}/;
const Register = ({history}) => (
    <Formik
    initialValues={{
        UserName:'',
        email:'',
        mobile:'',
        Password:'',
        CPassword:''
    }}
    onSubmit={(value)=>
    {
        console.log("The values are",value);
        axios.post('http://localhost:5000/Register',value)
        .then((resp)=>{
            console.log("The response received is",resp.data.valid);
            var valid=resp.data.valid;
            if(valid)
            {
                alert("Registeration successful");
                history.push('./');
            }
        });
    }}
    validationSchema={yup.object(
        {
            UserName:yup.string()
               .required('Required')
               .test('is-${value}','UserName already exists',(value)=>
               {
                   let request={
                       value:value
                   };
                   return axios.post("http://localhost:5000/UserName",request)
                   .then((resp)=>
                   {
                       console.log("Response",resp.data.status);
                       var valid=resp.data.status;
                       if(valid===value)
                       {
                           return false;
                       }
                       return true;
                   });
               })
               .min(4,'Minimum 4 characters required')
               .max(12,'Maximum limit is 12 characters'),
            email:yup.string()
                .required('Required')
                .email('Email-id is invalid'),
            mobile:yup.string()
                .required('Required') 
                .matches(phone,'Phone number is invalid')
                .max(10,'Phone number invalid'), 
            Password:yup.string()
               .required('Required')
               .min(4,'Minimum 4 characters required')
               .max(12,'Maximum limit is 12 characters'),
            CPassword:yup.string()
                .required('Required')
                .oneOf([yup.ref('Password'),null],"Password doesn't match")   
        }
    )}
    >
    {({handleChange,handleSubmit,errors,values})=> (
        <div className='contain' style={{
            paddingTop: '70px'
        }}>
        <div className="card" style={{
                width: '40%',
                height:'95%',
                marginLeft:'450px'            
        }}>
        <h5 className="card-title" style={{
            textAlign:'center',
            paddingTop:'50px'
        }}>Registeration</h5>
        <div className="card-body"style={{
               bottom:'110px'
         }}>
        <div className="avatar" style={{
                left: '240px',
                bottom: '40px'
        }}>
            <Avatar src={avatar} round={true} size="90"/>
            </div>
        <form onSubmit={handleSubmit} action='/Login'>
            <div className="form-group">
            <label>UserName:</label>
            <input 
            type="text" 
            className={errors.UserName ? "form-control is-invalid":"form-control"}
            onChange={handleChange} 
            name="UserName"
            value={values.UserName}/>
            {errors.UserName ?<div className="text-danger" style={{height:'0px'}}> *{errors.UserName}*</div>:null}
            </div>
            <div className="form-group">
            <label>Email id:</label>
            <input 
            type="text" 
            className={errors.email ? "form-control is-invalid":"form-control"}
            onChange={handleChange} 
            name="email"
            value={values.email}/>
            {errors.email ?<div className="text-danger" style={{height:'0px'}}> *{errors.email}*</div>:null}
            </div>
            <div className="form-group">
            <label>Phone Number:</label>
            <input 
            type="text" 
            className={errors.mobile ? "form-control is-invalid":"form-control"}
            onChange={handleChange} 
            name="mobile"
            value={values.mobile}/>
            {errors.mobile ?<div className="text-danger" style={{height:'0px'}}> *{errors.mobile}*</div>:null}
            </div>
            <div className="form-group">
            <label>Password:</label>
            <input 
            type="password" 
            className={errors.Password ? "form-control is-invalid":"form-control"}
            onChange={handleChange} 
            name="Password"
            value={values.Password}/>
            {errors.Password ?<div className="text-danger" style={{height:'0px'}}> *{errors.Password}*</div>:null}
            </div>
            <div className="form-group">
            <label>Confirm Password:</label>
            <input 
            type="password" 
            className={errors.CPassword ? "form-control is-invalid":"form-control"}
            onChange={handleChange} 
            name="CPassword"
            value={values.CPassword}/>
            {errors.CPassword ?<div className="text-danger" style={{height:'0px'}}> *{errors.CPassword}*</div>:null}
            </div>
            <div className="button">
            <Button type="submit" className="btn-lg btn-block" style={{marginTop:'30px'}}>Register</Button>
            </div>
            </form>
        </div>
      </div>
      </div>
    )
    }
 </Formik>
);
export default Register;