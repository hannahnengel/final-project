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
const fs = require('fs');

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

app.get('/api/friend-preferences/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!Number.isInteger(userId) || userId < 1) {
    throw new ClientError(400, 'User Id must be a positive integer');
  }

  const sql = `
  select *
     from "friendPreferences"
   where "userId" = $1
  `;

  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const users = result.rows;
      if (!users) {
        throw new ClientError(404, `Cannot find user with userId ${userId}`);
      } else {
        res.json(users);
      }
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

app.get('/api/user-selections', (req, res, next) => {
  const sql = `
  select * from "userSelections"
  `;
  db.query(sql)
    .then(result => {
      const allSelections = result.rows;
      res.status(201).json(allSelections);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/user-info', (req, res, next) => {
  const { friendGender } = req.body;
  if (!friendGender) {
    throw new ClientError(400, 'Friend gender is a required field');
  }
  const sql = `
    select * from "userInfos"
    where "gender" = $1
    `;
  const params = [friendGender];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length !== 0) {
        res.status(201).json(result.rows);
      }
      if (result.rows.length === 0) {
        res.status(202).json('no users with that gender');
      }
    })
    .catch(err => next(err));

});

app.get('/api/user-selections/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!Number.isInteger(userId) || userId < 0) {
    throw new ClientError(400, 'User Id must be a positive integer');
  }
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

app.post('/api/match-selections', (req, res, next) => {
  const { userId1, userId2, selectionId, categoryId } = req.body;
  if (!selectionId || !categoryId) {
    throw new ClientError(400, 'SelectionId and categoryId are required fields');
  }
  if (!Number.isInteger(categoryId) || categoryId < 1) {
    throw new ClientError(400, 'CategoryId must be a positive integer');
  }
  if (!Number.isInteger(selectionId) || selectionId < 1) {
    throw new ClientError(400, 'SelectionId must be a positive integer');
  }
  if (!Number.isInteger(userId1) || userId1 < 1) {
    throw new ClientError(400, 'UserId1 must be a positive integer');
  }
  if (!Number.isInteger(userId2) || userId2 < 1) {
    throw new ClientError(400, 'UserId2 must be a positive integer');
  }

  const sql = `
  insert into "matchSelections" ("userId1", "userId2", "selectionId", "categoryId")
  values ($1, $2, $3, $4)
  on conflict on constraint "matchSelections_pk"
    do
    update set "selectionId" = $3
  returning *
  `;
  const params = [userId1, userId2, selectionId, categoryId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/matches', (req, res, next) => {
  const { userId1, userId2, matchType } = req.body;

  if (!matchType || !userId1 || !userId2) {
    throw new ClientError(400, 'Match Type, user1Id, and user2Id are required fields');
  }

  if (!Number.isInteger(userId1) || userId1 < 1) {
    throw new ClientError(400, 'userId1 must be a positive integer');
  }
  if (!Number.isInteger(userId2) || userId2 < 1) {
    throw new ClientError(400, 'userId2 must be a positive integer');
  }
  const user1Status = 'pending';
  const user2Status = 'pending';
  const matchStatus = 'pending';

  const sql = `
  insert into "matches" ("userId1", "userId2", "matchType", "user1Status", "user2Status", "matchStatus")
  values ($1, $2, $3, $4, $5, $6)
  on conflict on constraint "matches_pk"
    do
    update set "matchType" = $3
  returning *
  `;
  const params = [userId1, userId2, matchType, user1Status, user2Status, matchStatus];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/match-status-update', (req, res, next) => {
  const { userId1, userId2, statusToUpdate, status } = req.body;
  if (!userId1 || !userId2 || !statusToUpdate || !status) {
    throw new ClientError(400, 'user1Id, user2Id, status to update, and status are required fields');
  }
  if (!Number.isInteger(userId1) || userId1 < 1) {
    throw new ClientError(400, 'userId1 must be a positive integer');
  }
  if (!Number.isInteger(userId2) || userId2 < 1) {
    throw new ClientError(400, 'userId2 must be a positive integer');
  }

  let sql;
  if (statusToUpdate === 'user1Status') {
    sql = `
    update "matches"
      set "user1Status" = $3
    where "userId1" = $1
      and "userId2" = $2
    returning *
    `;
  } else {
    sql = `
    update "matches"
      set "user2Status" = $3
     where "userId1" = $1
      and "userId2" = $2
    returning *
    `;
  }
  const params = [userId1, userId2, status];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length > 0) {
        const statuses = {
          userId1: result.rows[0].userId1,
          userId2: result.rows[0].userId2,
          user1Status: result.rows[0].user1Status,
          user2Status: result.rows[0].user2Status
        };
        const { user1Status, user2Status } = statuses;
        let matchStatus = '';
        if (user1Status === 'accepted' && user2Status === 'accepted') {
          matchStatus = 'accepted';
        } else if (user1Status === 'rejected' || user2Status === 'rejected') {
          matchStatus = 'rejected';
        } else {
          matchStatus = 'pending';
        }

        const sql = `
        update "matches"
          set "matchStatus" = $3
         where "userId1" = $1
            and "userId2" = $2
        returning *
        `;
        const params = [userId1, userId2, matchStatus];
        db.query(sql, params)
          .then(nextRes => {
            res.status(201).json(nextRes.rows);
          }).catch(err => next(err));
      }
    })
    .catch(err => next(err));
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

app.get('/api/auth/user-info/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  const sql = `
  select "users"."firstName",
         "userSelections"."selectionId",
         "selections"."selectionName",
         "profilePics".*
  from "users"
  join "userSelections" using ("userId")
  join "selections" using ("selectionId")
  left join "profilePics" using ("userId")
  where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        res.status(202).json('no user info exists');
      } else res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/auth/find-matches/', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  select "friendPreferences".*,
         "userInfos".*,
         "userSelections".*
  from "friendPreferences"
  join "userInfos" using ("userId")
  join "userSelections" using ("userId")
  where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        res.status(202).json('no user exists');
      } else {
        const currentUserInfo = result.rows[0];
        const currentUserSelects = result.rows.map(selection => {
          return {
            userId: selection.userId,
            categoryId: selection.categoryId,
            selectionId: selection.selectionId
          };
        });
        const { friendGender } = currentUserInfo;
        const friendGenderArray = friendGender.replace(/{|}|"|"/g, '').split(',');
        const bodyGenderArray = [];
        friendGenderArray.forEach((friendGender, i) => {
          if (friendGender === 'nonBinary') {
            friendGender = 'non-binary';
          }
          bodyGenderArray.push({ friendGender });
        });
        let where;
        if (bodyGenderArray.length === 1) {
          where = 'where "gender" = $1';
        } else if (bodyGenderArray.length === 2) {
          where = 'where "gender" = $1 OR "gender" = $2';
        } else if (bodyGenderArray.length === 3) {
          where = 'where "gender" = $1 OR "gender" = $2 OR "gender" = $3';
        }
        const sql = `
        select "friendPreferences".*,
                "userInfos".*,
                "users"."firstName",
                "profilePics"."url",
                "profilePics"."fileName"
          from "friendPreferences"
          join "userInfos" using ("userId")
          join "users" using ("userId")
          left join "profilePics" using ("userId")
          ${where}
        `;
        const params = bodyGenderArray.map(gender => {
          return gender.friendGender;
        });
        db.query(sql, params)
          .then(result => {
            if (result.rows.length === 0) {
              res.status(202).json('no potential matches exist');
            } else {
              const potentialGenderMatches = result.rows;
              const potentialMatches = [];
              //         const potentialMatchMileage = [];

              const getAge = birthday => {
                const today = new Date();
                const birthDate = new Date(birthday);
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                  age--;
                }
                return age;
              };

              const isAgeMatch = (age, friendAge) => {
                const friendAgeArray = friendAge.split('-');
                const youngestFriend = parseInt(friendAgeArray[0]);
                const oldestFriend = parseInt(friendAgeArray[1]);
                if (age >= youngestFriend && age <= oldestFriend) {
                  return true;
                } else {
                  return false;
                }
              };

              const isGenderMatch = (gender, friendGender) => {
                let genderMatch = false;
                const checkGenderArray = friendGender.replace(/{|}|"|"/g, '').split(',');
                checkGenderArray.forEach(genderCheck => {
                  let genderCompare;
                  if (genderCheck === 'nonBinary') {
                    genderCompare = 'non-binary';
                  } else {
                    genderCompare = genderCheck;
                  }
                  if (gender === genderCompare) {
                    genderMatch = true;
                  }
                });
                return genderMatch;
              };

              const pointDistance = (centerLatDeg, centerLngDeg, checkLatDeg, checkLngDeg) => {
                const radiusEarth = 6378.1;
                const centerLat = centerLatDeg * Math.PI / 180;
                const centerLng = centerLngDeg * Math.PI / 180;
                const checkLat = checkLatDeg * Math.PI / 180;
                const checkLng = checkLngDeg * Math.PI / 180;

                const deltaLng = Math.abs(centerLng - checkLng);
                const distance = radiusEarth * Math.acos((Math.sin(centerLat) * Math.sin(checkLat)) + (Math.cos(centerLat) * Math.cos(checkLat) * Math.cos(deltaLng)));
                const distanceMiles = Math.round(((distance / 1.609344) * 10), 1) / 10;
                return distanceMiles;
              };

              potentialGenderMatches.forEach(potentialMatch => {
                if (potentialMatch.userId !== currentUserInfo.userId) {
                  const kmCenterRadius = currentUserInfo.mileRadius * 1.60934;
                  const kmCheckRadius = potentialMatch.mileRadius * 1.609344;
                  const centerLat = currentUserInfo.lat;
                  const centerLng = currentUserInfo.lng;
                  const checkLat = potentialMatch.lat;
                  const checkLng = potentialMatch.lng;

                  const distance = pointDistance(centerLat, centerLng, checkLat, checkLng);
                  const potentialMatchNear = distance <= kmCenterRadius;
                  const userNearPotentialMatch = distance <= kmCheckRadius;

                  const locationMatch = !!(potentialMatchNear && userNearPotentialMatch);

                  if (isAgeMatch(getAge(potentialMatch.birthday), currentUserInfo.friendAge) &&
                    isAgeMatch(getAge(currentUserInfo.birthday), potentialMatch.friendAge) &&
                    isGenderMatch(potentialMatch.gender, currentUserInfo.friendGender) &&
                    isGenderMatch(currentUserInfo.gender, potentialMatch.friendGender) &&
                    locationMatch) {
                    potentialMatch.age = getAge(potentialMatch.birthday);
                    potentialMatch.mileage = distance;
                    potentialMatches.push(potentialMatch);
                  }
                }

              });
              if (potentialMatches.length === 0) {
                res.status(202).json('no potential matches exist');
              } else {
                const params = potentialMatches.map(potentialMatch => {
                  return potentialMatch.userId;
                });

                let where = 'where ';
                params.forEach((param, index) => {
                  if (index === params.length - 1) {
                    where += `"userId"=$${index + 1}`;
                  } else where += `"userId"=$${index + 1} OR `;
                });

                const sql = ` select * from "userSelections"
              ${where}`;

                db.query(sql, params)
                  .then(result => {
                    if (result.rows.length === 0) {
                      res.status(202).json('no potential matches exist');
                    } else {
                      const potentialMatchSelects = result.rows;
                      const matchSelections = [];
                      potentialMatchSelects.forEach(potentialMatchSelect => {
                        currentUserSelects.forEach(currentUserSelect => {
                          if (potentialMatchSelect.categoryId === currentUserSelect.categoryId) {
                            if (potentialMatchSelect.selectionId === currentUserSelect.selectionId) {
                              let userId1;
                              let userId2;

                              if (currentUserSelect.userId < potentialMatchSelect.userId) {
                                userId1 = currentUserSelect.userId;
                                userId2 = potentialMatchSelect.userId;
                              } else {
                                userId1 = potentialMatchSelect.userId;
                                userId2 = currentUserSelect.userId;
                              }
                              const match = {
                                userId1,
                                userId2,
                                categoryId: currentUserSelect.categoryId,
                                selectionId: currentUserSelect.selectionId
                              };
                              matchSelections.push(match);
                            }
                          }
                        });
                      });
                      const potentialMatchData = {
                        potentialMatches,
                        matchSelections
                      };
                      res.status(200).json(potentialMatchData);
                    }
                  });
              }
            }
          });
      }
    })
    .catch(err => next(err));
});

app.post('/api/auth/post-matches/', (req, res, next) => {
  const { allMatchTypes, matchSelections, currentUser } = req.body;
  if (!matchSelections || !allMatchTypes || !currentUser) {
    throw new ClientError(400, 'matchSelections, allMatchTypes and currentUser are required');
  }

  const sql = `
  delete from "matchSelections"
  where "userId1" = $1 OR "userId2" = $1
  returning *
  `;
  const params = [currentUser];
  db.query(sql, params)
    .then(result => {

      const params = [];
      let values = 'values ';
      matchSelections.forEach((matchSelection, i) => {
        params.push(matchSelection.userId1);
        params.push(matchSelection.userId2);
        params.push(matchSelection.categoryId);
        params.push(matchSelection.selectionId);
      });
      params.forEach((param, i) => {
        if (i === params.length - 1) {
          values += `($${i - 2}, $${i - 1}, $${i}, $${i + 1})`;
        } else if (i !== 0 && i % 4 === 0) {
          values += `($${i - 3}, $${i - 2}, $${i - 1}, $${i}), `;
        }
      });
      const sql = `
        insert into "matchSelections" ("userId1", "userId2", "categoryId", "selectionId")
        ${values}
        returning *
        `;
      db.query(sql, params)
        .then(result => {
          const sql = `
          select * from "matchSelections"
          join "selections" using ("selectionId")
          `;
          db.query(sql)
            .then(result => {
              const selections = result.rows;
              const sql = `
              select * from "matches"
              where "userId1" = $1 OR "userId2" = $1
              `;
              const params = [currentUser];

              db.query(sql, params)
                .then(result => {
                  const existingMatches = result.rows;
                  const matchesToUpdate = [];
                  const matchesToUpload = [];
                  const matchesToReject = [];

                  for (let i = 0; i < allMatchTypes.length; i++) {
                    let found = false;
                    for (let j = 0; j < existingMatches.length; j++) {
                      if (allMatchTypes[i].userId1 === existingMatches[j].userId1 && allMatchTypes[i].userId2 === existingMatches[j].userId2) {
                        found = true;
                        existingMatches[j].matchType = allMatchTypes[i].matchType;
                        matchesToUpdate.push(existingMatches[j]);
                        break;
                      }
                    }
                    if (!found) {
                      matchesToUpload.push(allMatchTypes[i]);
                    }
                  }

                  for (let i = 0; i < existingMatches.length; i++) {
                    let found = false;
                    for (let j = 0; j < allMatchTypes.length; j++) {
                      if (existingMatches[i].userId1 === allMatchTypes[j].userId1 && existingMatches[i].userId2 === allMatchTypes[j].userId2) {
                        found = true;
                        break;
                      }
                    }
                    if (!found) {
                      matchesToReject.push(existingMatches[i]);
                    }
                  }

                  const postMatches = [];

                  if (matchesToUpdate.length > 0) {
                    matchesToUpdate.forEach(match => {
                      postMatches.push(match);
                    });
                  }

                  if (matchesToUpload.length > 0) {
                    matchesToUpload.forEach(match => {
                      match.user1Status = 'pending';
                      match.user2Status = 'pending';
                      match.matchStatus = 'pending';
                      postMatches.push(match);
                    });
                  }
                  if (matchesToReject.length > 0) {
                    matchesToReject.forEach(match => {
                      match.matchStatus = 'rejected';
                      match.matchType = 'no longer a match';
                      postMatches.push(match);
                    });
                  }
                  const params = [];
                  let values = 'values ';
                  postMatches.forEach((match, i) => {
                    params.push(match.userId1);
                    params.push(match.userId2);
                    params.push(match.matchType);
                    params.push(match.user1Status);
                    params.push(match.user2Status);
                    params.push(match.matchStatus);
                  });
                  params.forEach((param, i) => {
                    if (i === params.length - 1) {
                      values += `($${i - 4}, $${i - 3}, $${i - 2}, $${i - 1},  $${i} , $${i + 1})`;
                    } else if (i !== 0 && i % 6 === 0) {
                      values += `($${i - 5}, $${i - 4}, $${i - 3}, $${i - 2}, $${i - 1}, $${i}), `;
                    }
                  });

                  const sql = `
                  insert into "matches" ("userId1", "userId2", "matchType", "user1Status", "user2Status", "matchStatus")
                  ${values}
                  on conflict on constraint "matches_pk"
                    do
                    update set
                    "matchType"= EXCLUDED."matchType",
                    "matchStatus" = EXCLUDED."matchStatus"
                  returning *
                  `;
                  db.query(sql, params)
                    .then(result => {
                      const matches = result.rows;
                      matches.forEach(match => {
                        const matchSelections = [];
                        selections.forEach(selection => {
                          if (match.userId1 === selection.userId1 && match.userId2 === selection.userId2) {
                            matchSelections.push(selection);
                          }
                        });
                        match.matchSelections = matchSelections;
                      });
                      res.status(201).json(matches);
                    });
                });

            });
        });

    });

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

app.delete('/api/auth/profile-picture', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  delete from "profilePics"
    where "userId" = $1
  returning *`;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(204).json(result.rows);
      const url = result.rows[0].url;
      const pathToFile = path.join('./server/public', url);
      fs.unlink(pathToFile, function (err) {
        if (err) {
          throw err;
        }
      });
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
