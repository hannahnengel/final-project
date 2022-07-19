require('dotenv/config');
const path = require('path');
const pg = require('pg');
const express = require('express');
// const argon2 = require('argon2');
// const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
// const authorizationMiddleware = require('./authorization-middleware');

const app = express();
const publicPath = path.join(__dirname, 'public');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  const sql = `
  select "userId",
          "hashedPassword"
        from "users"
      where "email" = $1`;
  const params = [email];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      if (user.hashedPassword !== password) {
        throw new ClientError(401, 'incorrect password');
      }
      res.json({ user });
    })
    .catch(err => next(err));
});

app.post('/api/auth/register', (req, res, next) => {
  const { firstName, email, password } = req.body;
  if (!firstName || !email || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  const sql = `
  insert into "users" ("firstName", "email", "hashedPassword")
  values ($1, $2, $3)
  returning "userId", "email", "createdAt"
  `;
  const params = [firstName, email, password];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
