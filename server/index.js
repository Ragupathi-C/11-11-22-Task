const express = require("express");
const bodyparser = require("body-parser");
const cors = require ("cors");
const mysql = require("mysql");


const app = express("");

app.use(express.json);
app.use(bodyparser.json);
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "assessment"
});


connection.connect(function(err,res){
    if(err){
        console.log(err);
    }
    else{
        console.log("Db connected");
    }
});

app.post("/register",function(request,response){
    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;
    const role = request.body.role;

    let signUpQuery = "insert into userdetails(username, password, email,username, role)values(?, ?, ?, ?, ?)";

    connection.createQuery(signUpQuery,[email, password, email, username, role],function(err,res){
        if(err){
            let message = {"status" : "not_inserted"};
            response.send(message);
        }
        else{
            let message = {"status" : "inserted"};
            response.send(message);
        }
    })
});

app.post('/login', (request, response) => {

    let username = request.body.username;
    let password = request.body.password;

var signInQuery = "select * from userdetails where username=?";

    connection.query(signInQuery, [username], (err, res) => {
        if (err) {
            let s = { "status": "username_error" };
            response.send(s);
        }

        else if (res.length > 0) {
            let username1 = res[0].username;
            let password1 = res[0].password;
            let role = res[0].role;

            if (username1 === username && password1 === password) {
                let s = { "status": "login_success","role": role };
                response.send(s);
            }
            else {
                let s = { "status": "invalid_login" };
                response.send(s);
            }
        }
    })
})


app.listen(3001);