const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const port = process.env.port || 3000;

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employeedb'
});

mysqlConnection.connect((err) => {
    if(!err)
    console.log('DB connection succeeded.');
    else
    console.log('DB connection failed \n Error :' + JSON.stringify(err, undefined, 2));
});

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});

app.get('/employees', (req,res) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) =>{
    if(!err)
    console.log(rows);
    else
    console.log(err);
  })
});

//retrieve a single record
app.get('/employees/:id', (req,res) => {
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) =>{
    if(!err)
    console.log(rows);
    else
    console.log(err);
  })
});

//delete a particular record
app.delete('/employees/:id', (req,res) => {
    mysqlConnection.query('DELETE FROM employee WHERE EmpID =?', [req.params.id], (err, rows, fields) =>{
    if(!err)
    console.log('Record deleted');
    else
    console.log(err);
  })
});

//Insert new data
app.post('/insert', (req,res) => {
    
    let sql = 'INSERT INTO employee SET ?'
    let post = {
        Name: req.body.Name,
        EmpCode: req.body.EmpCode,
        Salary: req.body.Salary
    }

    mysqlConnection.query(sql,post,(err,res) =>{
        if (err) throw err;
        console.log("1 record inserted");
    });

//Update a single record
app.post('/update/:EmpID',(req,res) => {
    var sql = `UPDATE employee SET Name='${Name}',EmpCode='${EmpCode}',Salary='${Salary}' WHERE EmpID='${EmpID}'`;
    var EmpCode= req.body.EmpCode;
    var Salary= req.body.Salary;
    var EmpID= req.params.EmpID;
    
    mysqlConnection.query(sql,(err,res) =>{
        if (err) throw err;
        
        console.log(result.affectedRows + "record(s) updated");
    })
})
mysqlConnection.end();
});

  
