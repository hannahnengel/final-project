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
  ("userId", "firstName", "email", "hashedPassword")
  values (0, 'DemoUser', 'testemail123@email.com', '$argon2i$v=19$m=4096,t=3,p=1$fz5/wi10RpqSzv/q7jW7jA$5lWwrFVXjwDSTl+tebgLGIQ/57R+VXiwQ7r6oXPl8K8');

insert into "userInfos"
  ("userId", "birthday", "gender", "contact")
  values (0, '1994-07-02', 'female', '{"email"}');

insert into "friendPreferences"
  ("userId", "city", "zipCode", "lat", "lng", "mileRadius", "friendGender", "friendAge")
  values (0, 'Irvine', 92618, 33.6544307, -117.7517141, 50, '{"female","male","nonBinary"}', '25-31');

insert into "profilePics" ("userId", "url", "fileName")
  values (0, '/imgs/Hannah-Engelhardt.jpg', 'Hannah-Engelhardt.jpg');

insert into "userSelections" ("userId", "categoryId", "selectionId")
  values(0, 1, 3), (0, 2, 13), (0, 3, 16), (0, 4, 26), (0, 5, 28), (0, 6, 43), (0, 7, 54), (0, 8, 56), (0, 9, 73), (0, 10, 76);
