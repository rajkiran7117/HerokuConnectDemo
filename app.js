var express = require('express')
var app = express()
const port = process.env.PORT || 5000;
var path = require("path");
var fs = require("fs");
const {Pool, Client } = require('pg')
const connectionString = process.env.DATABASE_URL;
const client = new Client({
  connectionString: connectionString,
})

client.connect()
//Define request response in root URL (/)
app.get('/', async (req, res) =>{
  var htmlString ='<html><title>Heroku Demo</title><body><head><style>table, th, td {border: 1px solid black; }  </style>  </head><h1>Salesforce Accounts</h1>';
  
  var sftablelist = '';
  console.log('before  sf gedetails method');
  let recordsList =[]; 
  var tableList = '<table><tr><th>Id</th><th>Name</th></tr>';
  
  recordsList =  await getSfDetails();
  console.log('after  sf gedetails method'+JSON.stringify(recordsList));
  //queryTest();
  
  var i=0;
  console.log(tableList);
  for(i =0;i<recordsList.rows.length;i++){
    console.log('inside for loop');
    tableList+='<tr>';
    tableList += '<td>'+recordsList.rows[i].sfid+'</td>';
    tableList += '<td>'+recordsList.rows[i].name+'</td>';
    tableList += '</tr>';
  }
  console.log('tableList '+tableList);
  tableList += '</table></body></html>';
  res.send(htmlString+''+tableList);
  
  
})
async function getSfDetails(){
  console.log('inside sf gedetails method');
  return new Promise((resolve, reject) => {
    client.query('SELECT name,sfid FROM salesforcedevraj.account ORDER BY name NULLS LAST LIMIT 10', function (err, ret) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          //recordsList = ret.rows
          console.log(JSON.stringify(ret.rows));
          resolve(ret);
        }
      })
      
    });
}
app.get('/contact', async (req, res) =>{
  var htmlString ='<html><title>Contacts</title><body><head><style>table, th, td {border: 1px solid black; }  </style>  </head><h1>Salesforce Contacts</h1>';
  
  var sftablelist = '';
  console.log('before  sf gedetails method');
  let recordsList =[]; 
  var tableList = '<table><tr><th>Id</th><th>FirstName</th><th>LastName</th></tr>';
  
  recordsList =  await getSfConDetails();
  console.log('after  sf Con gedetails method'+JSON.stringify(recordsList));
  //queryTest();
  
  var i=0;
  console.log(tableList);
  for(i =0;i<recordsList.rows.length;i++){
    console.log('inside for loop');
    tableList+='<tr>';
    tableList += '<td>'+recordsList.rows[i].sfid+'</td>';
    tableList += '<td>'+recordsList.rows[i].firstname+'</td>';
    tableList += '<td>'+recordsList.rows[i].lastname+'</td>';
    tableList += '</tr>';
  }
  console.log('tableList '+tableList);
  tableList += '</table></body></html>';
  res.send(htmlString+''+tableList);
  
  
})
async function getSfConDetails(){
  console.log('inside sf gedetails method');
  return new Promise((resolve, reject) => {
    client.query('SELECT firstname,lastname,sfid FROM salesforcedevraj.contact ORDER BY firstname NULLS LAST LIMIT 10', function (err, ret) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          //recordsList = ret.rows
          console.log(JSON.stringify(ret.rows));
          resolve(ret);
        }
      })
      
    });
}
/*
const pool = new Pool({
  connectionString: connectionString,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})*/

// function queryTest (){
 
//client.end() 
 //}
//Launch listening server on port 8080
// app configurations
app.set('port', port);
app.listen(port, function () {
  console.log('App listening on port '+port+'!')
})