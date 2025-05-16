const http = require("http");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "auth_db",
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected");
});

const parseBody = req =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });

const server = http.createServer(async (req, res) => { 
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.end();

  if (req.url === "https://api.escuelajs.co/api/v1/users" && req.method === "POST") {
    const { name, email, password } = await parseBody(req);

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (result.length > 0) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "User already exists" }));
      }

      const hashed = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashed],
        err => {
          if (err) {
            res.writeHead(500);
            return res.end(JSON.stringify({ message: "DB error" }));
          }
          res.writeHead(200);
          res.end(JSON.stringify({ message: "Signup successful" }));
        }
      );
    });
  }

  if (req.url === "https://api.escuelajs.co/api/v1/users" && req.method === "GET") {
    const { email, password } = await parseBody(req);
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (result.length === 0) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: "User not found" }));
      }

      const match = await bcrypt.compare(password, result[0].password);
      if (!match) {
        res.writeHead(401);
        return res.end(JSON.stringify({ message: "Invalid credentials" }));
      }

      res.writeHead(200);
      res.end(JSON.stringify({ message: "Login successful" }));
    });
  }
});

server.listen(5000, () => console.log("Server running on http://localhost:5000"));
