import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Avatar from 'react-avatar';
import avatar from '../image.png';
import axios from 'axios';

function Buttons({history}){
    function handlechange1(){
        axios.post('http://localhost:5000/delete')
        .then((resp)=>{
            var valid=resp.data.valid;
            if(valid)
            {
                alert("Account deleted Successfully");
                history.push('./');
            }
        });
    }
    function handlechange2(){
        history.push('./Change');
    }
    return(
    <div className='contain' style={{
        paddingTop:'150px'
    }}>
    <div className="card" style={{
            width: '60%',
            height:'60%',
            marginLeft: '240px',
    }}>
    <h5 className="card-title" style={{
            paddingTop:'80px'
    }}>Click!!!</h5>
    <div className="card-body" style={{
           bottom:'90px'
    }}>
    <div className="avatar" style={{
            left: '390px',
            bottom: '90px'
    }}>
        <Avatar src={avatar} round={true} size="100"/>
        </div>
        <Button type="submit"className="btn-lg"style={{marginLeft:'100px'}}onClick={handlechange1}>Delete Account!!</Button>
        <Button type="submit"className="btn-lg" id="button2" style={{marginLeft:'300px'}} onClick={handlechange2}>Change Password</Button>
    </div>
    </div>
    </div>
    );
}
export default Buttons;