require('dotenv/config');
const path = require('path');
const pg = require('pg');
const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const uploadsMiddleware = require('./uploads-middleware');

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

app.post('/api/auth/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'Username and password are required fields');
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
        throw new ClientError(404, 'Invalid login, no user with this email exists');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(400, 'Invalid login, email or password is incorrect');
          }
          const payload = { userId, email };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.post('/api/auth/register', (req, res, next) => {
  const { firstName, email, password, confirmPassword } = req.body;
  if (!firstName || !email || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  if (password !== confirmPassword) {
    throw new ClientError(400, 'passwords do not match');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("firstName", "email", "hashedPassword")
      values ($1, $2, $3)
      returning "userId", "email", "createdAt"
      `;
      const params = [firstName, email, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => {
      next(err);
    }
    );
});

app.get('/api/selections/:categoryId', (req, res, next) => {
  const categoryId = Number(req.params.categoryId);
  if (!Number.isInteger(categoryId) || categoryId < 1) {
    throw new ClientError(400, 'CategoryId must be a positive integer');
  }
  const sql = `
  select *
     from "selections"
   where "categoryId" = $1
  `;

  const params = [categoryId];
  db.query(sql, params)
    .then(result => {
      const selections = result.rows;
      if (!selections) {
        throw new ClientError(404, `Cannot find selections with categoryId ${categoryId}`);
      } else {
        res.json(selections);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/categories', (req, res, next) => {
  const sql = `
  select * from "categories"
  `;
  db.query(sql)
    .then(result => {
      const categories = result.rows;
      res.json(categories);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/categories/:categoryId', (req, res, next) => {
  const categoryId = Number(req.params.categoryId);
  if (!Number.isInteger(categoryId) || categoryId < 1) {
    throw new ClientError(400, 'CategoryId must be a positive integer');
  }
  const sql = `
  select *
     from "categories"
   where "categoryId" = $1
  `;

  const params = [categoryId];
  db.query(sql, params)
    .then(result => {
      const categories = result.rows;
      if (!categories) {
        throw new ClientError(404, `Cannot find categories with categoryId ${categoryId}`);
      } else {
        res.json(categories);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/selections/selection/:selectionId', (req, res, next) => {
  const selectionId = Number(req.params.selectionId);
  if (!Number.isInteger(selectionId) || selectionId < 1) {
    throw new ClientError(400, 'SelectionId must be a positive integer');
  }
  const sql = `
  select *
     from "selections"
   where "selectionId" = $1
  `;

  const params = [selectionId];
  db.query(sql, params)
    .then(result => {
      const selections = result.rows;
      if (!selections) {
        throw new ClientError(404, `Cannot find selections with selectionId ${selectionId}`);
      } else {
        res.json(selections);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.use(authorizationMiddleware);

app.post('/api/auth/profile-info', (req, res, next) => {
  const { userId } = req.user;
  const { birthday, gender, phone, contact } = req.body;
  if (!birthday || !gender || !contact) {
    throw new ClientError(400, 'Birthday, gender, and contact are required fields');
  }
  const sql = `
    insert into "userInfos" ("userId", "birthday", "gender", "phone", "contact")
    values($1, $2, $3, $4, $5)
    on conflict on constraint "userInfos_pk"
      do
      update set "birthday" = $2, "gender" = $3, "phone" = $4, "contact" = $5
    returning *
  `;
  const params = [userId, birthday, gender, phone, contact];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/auth/friend-preferences', (req, res, next) => {
  const { userId } = req.user;
  const { city, zipCode, lat, lng, mileRadius, friendGender, friendAge } = req.body;
  if (!city || !zipCode || !lat || !lng || !mileRadius || !friendGender || !friendAge) {
    throw new ClientError(400, 'City, zip code, latitude, longitude, mile radius, friend gender preference, and friend age range preference are required fields');
  }
  const sql = `
  insert into "friendPreferences" ("userId", "city", "zipCode", "lat", "lng", "mileRadius", "friendGender", "friendAge")
  values($1, $2, $3, $4, $5, $6, $7, $8)
  on conflict on constraint "friendPreferences_pk"
    do
    update set "city" = $2, "zipCode" = $3, "lat" = $4, "lng" = $5, "mileRadius" = $6, "friendGender" = $7, "friendAge" = $8
  returning *
  `;
  const params = [userId, city, zipCode, lat, lng, mileRadius, friendGender, friendAge];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/auth/profile-info', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  select * from "userInfos"
  where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        res.status(202).json('no info exists');
      } else res.status(200).json(result.rows);
    });
});

app.get('/api/auth/user-info', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  select * from "users"
  where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        res.status(202).json('no info exists');
      } else res.status(200).json(result.rows);
    });
});

app.get('/api/auth/friend-preferences', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  select * from "friendPreferences"
  where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        res.status(202).json('no info exists');
      } else res.status(200).json(result.rows);
    });
});

app.post('/api/auth/user-selections', (req, res, next) => {
  const { userId } = req.user;
  const { selectionId, categoryId } = req.body;
  if (!selectionId || !categoryId) {
    throw new ClientError(400, 'SelectionId and categoryId are required fields');
  }
  if (!Number.isInteger(categoryId) || categoryId < 1) {
    throw new ClientError(400, 'CategoryId must be a positive integer');
  }
  if (!Number.isInteger(selectionId) || selectionId < 1) {
    throw new ClientError(400, 'SelectionId must be a positive integer');
  }

  const sql = `
  insert into "userSelections" ("userId", "selectionId", "categoryId")
  values ($1, $2, $3)
  on conflict on constraint "userSelections_pk"
    do
    update set "selectionId" = $2, "categoryId" = $3
  returning *
  `;
  const params = [userId, selectionId, categoryId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/auth/user-selections', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  select * from "userSelections"
  where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        res.status(202).json('no info exists');
      } else res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/auth/profile-picture', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  select * from "profilePics"
  where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        res.status(202).json('no info exists');
      } else res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/auth/profile-picture', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const fileName = req.file.filename;
  const url = '/images/' + fileName;

  const sql = `
  insert into "profilePics" ("userId", "url", "fileName")
  values ($1, $2, $3)
  on conflict on constraint "profilePics_pk"
    do
    update set "url" = $2, "fileName" = $3
  returning *
  `;
  const params = [userId, url, fileName];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        res.status(202).json('no info exists');
      } else res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
