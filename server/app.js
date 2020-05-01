const express=require("express");
const app=express();
var morgan = require('morgan')
var mysql      = require('mysql');
var cors = require('cors')
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'application'
});
var id='';
connection.connect(err=>
  {
    if(err)
    {
      console.log("Database is not Connected");
    }
    console.log("Database is connected successfully");
  });
app.get('/show',(req,res)=>
{
  connection.query('SELECT * FROM USERTABLE',(err,results)=>
  {
    if(err)
    {
      console.log(err);
    }
    console.log("The values in the database are",results);
    res.status(200).send(results);
  })
});

app.post('/Login',(req,res)=>
{
  console.log(req.body.UserName);
  var user=req.body.UserName;
  var pass=req.body.Password;
  connection.query('SELECT * FROM USERTABLE WHERE USERNAME =? && PASSWORDNAME=?',[user,pass],(err,results,field)=>
  {
    if(err)
    {
      console.log(err);
    }
   else{
     if(results[0]!=undefined)
     {
     console.log("Results",results[0]);
     id=results[0].id;
     console.log("The value of id",id);
     return res.status(200).json(
       {valid:true}
     );
     }
     else
     console.log("The value of result is",results);
     res.status(200).json({valid:false});
   }
  })
});

app.post('/Register',(req,res)=>
{
  let query=req.body;
  connection.query("INSERT INTO Usertable(UserName,Email,PhoneNumber,PasswordName,ConfirmPassword) VALUES (?,?,?,?,?)",[query.UserName,query.email,query.mobile,query.Password,query.CPassword],(err)=>
  {
     if(err)  return console.log(err);
     else{
       res.status(200).json(
         {valid:true}
       );
     }
  });
});
app.post('/delete',(req,res)=>
{
  connection.query('DELETE FROM USERTABLE WHERE ID=?',[id],(err)=>
  {
    if(err)
    {
      console.log(err);
    }
    console.log("Deleted Successful");
    res.status(200).json(
      {valid:true}
    ); 
  })
});
app.post('/change',(req,res)=>
{
  console.log("The ID value in Change is",id);
  console.log("Request sent to Change is",req);
  var password=req.body.Password;
  var changepassword=req.body.ConfirmPassword;
  connection.query('UPDATE USERTABLE SET PasswordName=?,ConfirmPassword= ? WHERE ID = ?',[password,changepassword,id],(err)=>
  {
      if(err)
      {
      console.log(err); 
      }
      else{
      res.status(200).json({valid:true});
      }
  });
});
app.get('/ID',(req,res)=>
{
  console.log("The value of ID is",id);
});
app.post('/UserName',(req,res)=>
{
  console.log("The value given as the request for UserName is",req.body.value);
  var name=req.body.value;
  connection.query("SELECT * FROM USERTABLE WHERE USERNAME=?",[name],(err,results)=>
  {
    console.log("hi");
      if(err)
      {
        console.log(err);
      }
      else
      {
         console.log("The Results in UserName",results[0]);
         if(results[0]===undefined)
         {
           return res.status(200).json({
             status:null
           });
         }
         return res.status(200).json({
           status:results[0].UserName
         })
      }
  });
});
console.log("The value id is",id);
const port=process.env.PORT||5000
app.listen(port,(err)=>
{
    if(err)
    {
        console.log("Error in the application");
    }
    console.log("Application is working properly",port);
});