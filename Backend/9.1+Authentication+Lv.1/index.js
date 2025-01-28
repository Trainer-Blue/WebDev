import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.error(err);
    }
    try {
      const checkUser = await db.query('SELECT * FROM users WHERE email = $1', [email]); // Check if user exists

      if (checkUser.rows.length > 0) {
        res.send("User already exists");
      } else {
        await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hash]);
        res.render("secrets.ejs");
      }
    } catch (err) {
      console.error(err);
    }
  }
  );
  
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;
  try {
    const checkUser = await db.query('SELECT * FROM users WHERE email = $1', [email]); // Check if user exists

    if (checkUser.rows.length > 0) {
      bcrypt.compare(loginPassword, checkUser.rows[0].password, (err, result) => {
        if (err) {
          console.error(err);
        } else{
          if (result) {
            res.render("secrets.ejs");
          }
          else {  
            res.send("Incorrect password");
          }
        }
      }); 
    } else {
      res.send("User does not exist");
    }
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
