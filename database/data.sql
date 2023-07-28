insert into "categories"
  ("categoryName")
  values ('Pets'), ('Foods'), ('Desserts'), ('Vacation Activities'), ('TV Shows'), ('Hobbies'), ('Pet Peeves'), ('Drinks'), ('Fandoms'), ('Music Genres');

insert into "selections"
  ("selectionName", "src", "categoryId")
  values ('dogs', '/hate-selections-imgs/dog.jpeg', 1), ('cats','/hate-selections-imgs/cats.jpeg', 1), ('hamsters', '/hate-selections-imgs/hamsters.webp', 1), ('birds', '/hate-selections-imgs/bird.jpeg', 1), ('fish', '/hate-selections-imgs/Fish.webp', 1), ('horses', '/hate-selections-imgs/horses.jpeg', 1),
  ('sushi', '/hate-selections-imgs/Sushi.jpeg', 2), ('spicy foods', '/hate-selections-imgs/spicyfood.jpeg', 2), ('fruits & veggies', '/hate-selections-imgs/vegetables.png', 2), ('bacon', '/hate-selections-imgs/bacon.webp', 2), ('cheese', '/hate-selections-imgs/cheese.webp', 2), ('breakfast', '/hate-selections-imgs/Breakfast.jpeg', 2), ('pineapple pizza', '/hate-selections-imgs/pinapplepizza.png', 2), ('vegan food', '/hate-selections-imgs/vegan.jpeg', 2),
  ('chocolate', '/hate-selections-imgs/chocolate.jpeg' , 3), ('candy', '/hate-selections-imgs/candy.jpeg', 3), ('cake', '/hate-selections-imgs/cake.jpeg', 3), ('ice cream', '/hate-selections-imgs/ice-cream.png', 3), ('cookies', '/hate-selections-imgs/cookies.jpeg', 3), ('pie', '/hate-selections-imgs/pie.jpeg', 3),
  ('beach', '/hate-selections-imgs/beach.png', 4), ('museums', '/hate-selections-imgs/museums.webp', 4), ('hiking', '/hate-selections-imgs/hiking.png', 4), ('skiing & snowboarding', '/hate-selections-imgs/skiing-snowboarding.png', 4), ('dining out', '/hate-selections-imgs/dining-out.png', 4), ('fishing', '/hate-selections-imgs/fishing.webp', 4),
  ('the office', '/hate-selections-imgs/the-office.png', 5), ('friends', '/hate-selections-imgs/friends.png', 5), ('rick & morty', '/hate-selections-imgs/rickmorty.png', 5), ('star trek', '/hate-selections-imgs/startrek.png', 5), ('sports', '/hate-selections-imgs/sports.png', 5), ('anime', '/hate-selections-imgs/anime.png', 5), ('reality TV', '/hate-selections-imgs/RealityTV.png', 5), ('greys anatomy', '/hate-selections-imgs/greysanatomy.png', 5), ('family guy', '/hate-selections-imgs/familyguy.png', 5), ('law & order', '/hate-selections-imgs/laworder.png', 5),
  ('instrument/ singing', '/hate-selections-imgs/instrument_singing.png', 6), ('video games/ computer', '/hate-selections-imgs/videogames.png', 6), ('drawing/ art', '/hate-selections-imgs/drawing_art.png', 6), ('reading/ writing', '/hate-selections-imgs/reading_writing.png', 6), ('drinking', '/hate-selections-imgs/drinking.png', 6), ('baking', '/hate-selections-imgs/baking.png', 6), ( 'sports', '/hate-selections-imgs/sports.png', 6), ('board games', '/hate-selections-imgs/board games.png', 6), ('dancing', '/hate-selections-imgs/dancing.png', 6), ('cars', '/hate-selections-imgs/cars.png', 6),
  ('incorrect spelling/ grammar', '/hate-selections-imgs/grammarspelling.png', 7), ('untidy rooms', '/hate-selections-imgs/untidy.png', 7), ('being late', '/hate-selections-imgs/late.png', 7), ( 'PDA', '/hate-selections-imgs/pda.png', 7), ('cracking knuckles', '/hate-selections-imgs/cracking-knuckles.png', 7), ('overly optimistic', '/hate-selections-imgs/optimism.png', 7), ('texting & talking', '/hate-selections-imgs/texting_talking.png', 7), ('not signaling', '/hate-selections-imgs/turnsignal.png', 7),
  ('water', '/hate-selections-imgs/water.png', 8), ('soda', '/hate-selections-imgs/soda.png', 8), ('beer', '/hate-selections-imgs/beer.png', 8), ('wine', '/hate-selections-imgs/wine.png' , 8), ('coffee', '/hate-selections-imgs/coffee.png', 8), ('tea', '/hate-selections-imgs/tea.png', 8), ('milk', '/hate-selections-imgs/milk.png', 8), ('juice', '/hate-selections-imgs/juice.png', 8), ('cocktails', '/hate-selections-imgs/cocktails.png', 8), ('tequila', '/hate-selections-imgs/tequila.png', 8),
  ('harry potter', '/hate-selections-imgs/harry potter.png', 9), ('lord of the rings', '/hate-selections-imgs/LOTR.png', 9), ('star wars', '/hate-selections-imgs/starwars.png', 9), ('star trek', '/hate-selections-imgs/startrek.png', 9), ('pokemon', '/hate-selections-imgs/pokemon.png', 9), ('disney/ pixar', '/hate-selections-imgs/Disney.png', 9), ('marvel', '/hate-selections-imgs/marvel.png', 9), ('DC comics', '/hate-selections-imgs/DC.png', 9), ('game of thrones', '/hate-selections-imgs/GOT.png', 9), ('twilight', '/hate-selections-imgs/twilight.png', 9),
  ('pop', '/hate-selections-imgs/pop.png', 10), ('country', '/hate-selections-imgs/country.png', 10), ('EDM/ electronic', '/hate-selections-imgs/electronic.png', 10), ('classical', '/hate-selections-imgs/classical.png', 10), ('rock', '/hate-selections-imgs/Rock.png', 10), ('jazz', '/hate-selections-imgs/jazz.png', 10), ('rap', '/hate-selections-imgs/rap.png', 10), ('indie', '/hate-selections-imgs/indie.png', 10);


insert into "users"
  ("demoId", "firstName", "email", "hashedPassword")
  values
  (1, 'DemoUser', 'testemail123@email.com', '$argon2i$v=19$m=4096,t=3,p=1$fz5/wi10RpqSzv/q7jW7jA$5lWwrFVXjwDSTl+tebgLGIQ/57R+VXiwQ7r6oXPl8K8'),
  (2, 'Ken', 'fakeemail1@email.com', 'hashedPassword'),
  (3, 'SailorMoon', 'fakeemail2@email.com', 'hashedPassword'),
  (4, 'Moogle', 'fakeemail3@email.com', 'hashedPassword'),
  (5, 'Cloud', 'fakeemail4@email.com', 'hashedPassword'),
  (6, 'Jinx', 'fakeemail5@email.com', 'hashedPassword'),
  (7, 'NotBlitz', 'fakeemail6@email.com', 'hashedPassword'),
  (8, 'Toad', 'fakeemail7@email.com', 'hashedPassword'),
  (9, 'Mine', 'fakeemail8@email.com', 'hashedPassword'),
  (10, 'Korok', 'fakeemail9@email.com', 'hashedPassword'),
  (11, 'Lily', 'fakeemail10@email.com', 'hashedPassword'),
  (12, 'Zenitsu', 'fakeemail11@email.com', 'hashedPassword'),
  (13, 'Anya', 'fakeemail12@email.com', 'hashedPassword'),
  (14, 'Rick', 'fakeemail13@email.com', 'hashedPassword'),
  (15, 'Peach', 'fakeemail14@email.com', 'hashedPassword'),
  (16, 'Peter', 'fakeemail15@email.com', 'hashedPassword');

-- insert into "userInfos"
--   ("userId", "birthday", "gender", "contact")
--   values
--   (1, '1994-07-02', 'female', '{"email"}'),
--   (2, '1993-01-31', 'male', '{"email"}'),
--   (3, '1992-02-07', 'female', '{"email"}'),
--   (4, '1997-01-31', 'non-binary', '{"email"}'),
--   (5, '1997-01-31', 'male', '{"email"}'),
--   (6, '1997-07-02', 'female', '{"email"}'),
--   (7, '1992-07-21', 'non-binary', '{"email"}'),
--   (8, '1992-07-30', 'male', '{"email"}'),
--   (9, '1995-02-14', 'female', '{"email"}'),
--   (10, '1997-07-02', 'non-binary', '{"email"}'),
--   (11, '1998-02-14', 'female', '{"email"}'),
--   (12, '1997-09-03', 'male', '{"email"}'),
--   (13, '1998-02-14', 'female', '{"email"}'),
--   (14, '1993-02-21', 'male', '{"email"}'),
--   (15, '1992-07-30', 'female', '{"email"}'),
--   (16, '1994-08-10', 'male', '{"email"}');

-- insert into "friendPreferences"
--   ("userId", "city", "zipCode", "lat", "lng", "mileRadius", "friendGender", "friendAge")
--   values
--   (1, 'Irvine', 92618, 33.65, -117.7437, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (2, 'El Segundo', 90245, 33.9203, -118.391853, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (3, 'Los Gatos', 95032, 37.2598686218261, -121.962860107421, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (4, 'El Segundo', 90245, 33.93087, -118.39628, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (5, 'El Segundo', 90245, 33.93087, -118.39628, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (6, 'Los Angeles', 90064, 34.03294, -118.457787, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (7, 'Los Angeles', 90064, 34.03294, -118.457787, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (8, 'Universal City', 91608, 34.138329, -118.359512, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (9, 'Los Gatos', 95032, 37.2598686218261, -121.962860107421, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (10, 'Redmond', 98052, 47.651235, -122.1392071, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (11, 'Dana Point', 92629, 33.4682191, -117.6898738, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (12, 'San Francisco', 94103, 37.7769228, -122.4159354, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (13, 'San Francisco', 94108, 37.7904144, -122.4068215, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (14, 'Seattle', 98104, 47.6038321, -122.330062, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (15, 'Universal City', 91608, 34.138329, -118.359512, 1500, '{"female","male","nonBinary"}', '25-31'),
--   (16, 'Anaheim', 92802, 38.81731, -121.29281, 1500, '{"female","male","nonBinary"}', '25-31');

-- insert into "profilePics" ("userId", "url", "fileName")
--   values
--   (1, '/imgs/Hannah-Engelhardt.jpg', 'Hannah-Engelhardt.jpg'),
--   (2, '/imgs/ken.jpeg', 'ken.jpeg'),
--   (3, '/imgs/SailorMoon.jpg', 'SailorMoon.jpg'),
--   (4, '/imgs/moogle.png', 'moogle.png'),
--   (5, '/imgs/CloudStrife.jpeg', 'CloudStrife.jpeg'),
--   (6, '/imgs/Jinx-League-of-Legends.png', 'Jinx-League-of-Legends.png'),
--   (7, '/imgs/Blitzcrank.jpeg', 'Blitzcrank.jpeg'),
--   (8, '/imgs/Toad.png', 'Toad.png'),
--   (9, '/imgs/Mine.png', 'Mine.png'),
--   (10, '/imgs/Korok.jpeg', 'Korok.jpeg'),
--   (11, '/imgs/Lily.png', 'Lily.png'),
--   (12, '/imgs/Zenitsu.jpeg', 'Zenitsu.jpeg'),
--   (13, '/imgs/Anya.png', 'Anya.png'),
--   (14, '/imgs/RickSanchez.png', 'RickSanchez.png'),
--   (15, '/imgs/Princess_Peach.png', 'Princess_Peach.png'),
--   (16, '/imgs/Spiderman.png', 'Spiderman.png');

-- insert into "userSelections" ("userId", "categoryId", "selectionId")
--   values
--   (1, 1, 3), (1, 2, 13), (1, 3, 16), (1, 4, 26), (1, 5, 28), (1, 6, 43), (1, 7, 54), (1, 8, 56), (1, 9, 73), (1, 10, 76),
--   (2, 1, 3), (2, 2, 13), (2, 3, 16), (2, 4, 26), (2, 5, 28), (2, 6, 43), (2, 7, 54), (2, 8, 56), (2, 9, 73), (2, 10, 76),
--   (3, 1, 3), (3, 2, 13), (3, 3, 16), (3, 4, 26), (3, 5, 28), (3, 6, 43), (3, 7, 54), (3, 8, 56), (3, 9, 73), (3, 10, 76),
--   (4, 1, 1), (4, 2, 13), (4, 3, 17), (4, 4, 26), (4, 5, 28), (4, 6, 43), (4, 7, 50), (4, 8, 64), (4, 9, 72), (4, 10, 76),
--   (5, 1, 3), (5, 2, 13), (5, 3, 16), (5, 4, 26), (5, 5, 28), (5, 6, 45), (5, 7, 50), (5, 8, 56), (5, 9, 73), (5, 10, 76),
--   (6, 1, 3), (6, 2, 13), (6, 3, 16), (6, 4, 26), (6, 5, 28), (6, 6, 43), (6, 7, 54), (6, 8, 55), (6, 9, 74), (6, 10, 78),
--   (7, 1, 5), (7, 2, 7), (7, 3, 18), (7, 4, 23), (7, 5, 31), (7, 6, 45), (7, 7, 54), (7, 8, 55), (7, 9, 67), (7, 10, 76),
--   (8, 1, 6), (8, 2, 8), (8, 3, 16), (8, 4, 22), (8, 5, 31), (8, 6, 41), (8, 7, 52), (8, 8, 64), (8, 9, 69), (8, 10, 77),
--   (9, 1, 5), (9, 2, 14), (9, 3, 20), (9, 4, 26), (9, 5, 35), (9, 6, 43), (9, 7, 51), (9, 8, 61), (9, 9, 70), (9, 10, 81),
--   (10, 1, 3), (10, 2, 13), (10, 3, 16), (10, 4, 26), (10, 5, 28), (10, 6, 43), (10, 7, 54), (10, 8, 56), (10, 9, 73), (10, 10, 76),
--   (11, 1, 3), (11, 2, 13), (11, 3, 16), (11, 4, 26), (11, 5, 28), (11, 6, 43), (11, 7, 54), (11, 8, 56), (11, 9, 73), (11, 10, 76),
--   (12, 1, 2), (12, 2, 14), (12, 3, 16), (12, 4, 26), (12, 5, 33), (12, 6, 42), (12, 7, 53), (12, 8, 56), (12, 9, 73), (12, 10, 76),
--   (13, 1, 5), (13, 2, 9), (13, 3, 20), (13, 4, 22), (13, 5, 33), (13, 6, 41), (13, 7, 54), (13, 8, 58), (13, 9, 65), (13, 10, 78),
--   (14, 1, 4), (14, 2, 9), (14, 3, 16), (14, 4, 26), (14, 5, 29), (14, 6, 43), (14, 7, 54), (14, 8, 60), (14, 9, 73), (14, 10, 75),
--   (15, 1, 1), (15, 2, 10), (15, 3, 19), (15, 4, 23), (15, 5, 32), (15, 6, 38), (15, 7, 49), (15, 8, 63), (15, 9, 74), (15, 10, 76),
--   (16, 1, 4), (16, 2, 13), (16, 3, 20), (16, 4, 26), (16, 5, 30), (16, 6, 44), (16, 7, 54), (16, 8, 62), (16, 9, 72), (16, 10, 76);

-- insert into "matches" ("userId1", "userId2", "matchType", "user1Status", "user2Status", "matchStatus")
--   values
--   (1, 2, 'perfect', 'accepted', 'accepted', 'accepted'),
--   (1, 3, 'perfect', 'accepted', 'accepted', 'accepted'),
--   (1, 4, 'great', 'accepted', 'accepted', 'accepted'),
--   (1, 5, 'great', 'accepted', 'accepted', 'accepted'),
--   (1, 6, 'great', 'accepted', 'accepted', 'accepted'),
--   (1, 7, 'good', 'accepted', 'accepted', 'accepted'),
--   (1, 8, 'good', 'accepted', 'accepted', 'accepted'),
--   (1, 9, 'good', 'accepted', 'accepted', 'accepted'),
--   (1, 10, 'perfect', 'pending', 'accepted', 'pending'),
--   (1, 11, 'perfect', 'pending', 'accepted', 'pending'),
--   (1, 12, 'great', 'pending', 'accepted', 'pending'),
--   (1, 13, 'good', 'pending', 'accepted', 'pending'),
--   (1, 14, 'great', 'pending', 'accepted', 'pending'),
--   (1, 15, 'good', 'pending', 'accepted', 'pending'),
--   (1, 16, 'good', 'accepted', 'accepted', 'accepted');
