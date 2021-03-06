const express = require("express");
const db = require("./db");
const app = express();
app.use(express.json());

db.pool.query(`CREATE TABLE lists (
  id INTEGER AUTO_INCREMENT,
  value TEXT,
  PRIMARY KEY (id)
)`, (err, results, fields) => {
  console.log('results', results)
})

// DB에서 Frontend로
app.get("/api/values", (req, res) => {
  db.pool.query("SELECT * FROM  lists;", (err, results, fileds) => {
    if (err) {
      console.log("db-fe")
      return res.status(500).send(err);
    } else {
      return res.json(results);
    }
  });
});

// Frontend에서 DB로
app.post("/api/value", (req, res, next) => {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fields) => {
      if (err) {
        console.log("fe-db")
        return res.status(500).send(err);
      } else {
        return res.json({ success: true, value: req.body.value });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
