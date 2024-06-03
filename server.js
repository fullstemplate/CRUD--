const express = require('express');
const mysql = require('mysql');
const BodyParser = require('body-parser');

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

const db = mysql.createConnection({
  host: 'localhost',
  database: 'db_mahasiswa',
  user: 'root',
  password: '',
});

db.connect((err) => {
  if (err) throw err;
  console.log('database connected....');

  //untuk get data
  app.get('/', (req, res) => {
    const sql = 'SELECT * FROM biodata';
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render('index', { users: users, title: 'BioData Mahasiswa' });
    });
  });

  //untuk insert/add data
  app.post('/add', (req, res) => {
    const insertSql = `INSERT INTO biodata (nama, phone, gmail, gender) VALUES('${req.body.nama}',
          '${req.body.phone}', '${req.body.gmail}', '${req.body.gender}');`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

app.listen(8000, () => {
  console.log('server ready...');
});
