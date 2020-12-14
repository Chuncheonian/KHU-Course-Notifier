const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM course",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/customers/:id', (req, res) => {
  let sqlCourse = 'SELECT * FROM course WHERE id=?';
  let params = [req.params.id];

  connection.query(sqlCourse, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.post('/api/comments', (req, res) => {
  let sql = 'INSERT INTO comment VALUES (null, ?, ?, ?, ?, DEFAULT)';
  let courseNum = req.body.courseNum;
  let author = req.body.author;
  let content = req.body.content;
  let rating = req.body.rating;
  let params = [courseNum, author, content, rating];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
      console.log(rows);
    }
  );
});

app.get('/api/comments', (req, res) => {
  connection.query(
    "SELECT * FROM comment",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/comments/:courseNum', (req, res) => {
  let sqlComment = 'SELECT * FROM comment WHERE courseNum=?';
  let params = [req.params.courseNum];
  connection.query(sqlComment, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));