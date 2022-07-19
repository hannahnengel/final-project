insert into "users" (
  "firstName",
  "email",
  "hashedPassword",
  "city",
  "zipCode",
  "latitude",
  "longitude",
  "birthday",
  "age",
  "gender",
  "locationRange",
  "friendGenderPreference",
  "friendAgePreference",
  "phone",
  "preferredContact"
) values (
  'Hannah',
  'hannah@example.com',
  '12345Iamahashedpassword',
  'irvine',
  92618,
  33.665031,
  -117.746658,
  '1994-07-02',
  28,
  'female',
  65,
  'all',
  '25-35',
  '9491111111',
  'both'
), (
  'Kilian',
  'kilian@example.com',
  '12345Iamahashedpassword1',
  'irvine',
  92618,
  33.665031,
  -117.746658,
  '1992-07-21',
  29,
  'male',
  50,
  'all',
  '25-35',
  '9491111112',
  'email'
), (
  'Megan',
  'megan@example.com',
  '12345Iamahashedpassword2',
  'laguna niguel',
  92677,
  33.535730,
  -117.702910,
  '1996-08-31',
  25,
  'female',
  100,
  'all',
  '25-35',
  '9492222222',
  'phone'
);

insert into "categories"
  ("categoryName")
  values ('Pets'),('Foods'), ('Desserts'), ('Vacation Activities'), ('TV Shows'), ('Hobbies'), ('Pet Peeves'), ('Drinks'), ('Fandoms'), ('Music Genres');

insert into "selections"
  ("selectionName", "categoryId")
  values ('Dogs', 1), ('Cats', 1), ('Hamsters', 1), ('Birds', 1), ('Fish', 1), ('Horses', 1),
  ('Sushi', 2), ('Spicy Foods', 2), ('Fruits & Veggies', 2), ('Bacon', 2), ('Cheese', 2), ('Breakfast', 2), ('Pineapple Pizza', 2), ('Vegan', 2),
  ('Chocolate', 3), ('Candy', 3), ('Cake', 3), ('Ice Cream', 3), ('Cookies', 3), ('Pie', 3),
  ('Beach', 4), ('Museums', 4), ('Hiking', 4), ('Skiing & Snowboarding', 4), ('Dining Out', 4), ('Fishing', 4),
  ('The Office', 5), ('Friends', 5), ('Rick & Morty', 5), ('Star Trek', 5), ('Sports', 5), ('Anime', 5), ('Reality TV', 5), ('Greys Anatomy', 5), ('Family Guy', 5), ('Law & Order', 5),
  ('Instrument/Singing', 6), ('Video Games/Computer', 6), ('Drawing/Art', 6), ('Reading/Writing', 6), ('Drinking', 6), ('Baking', 6), ('Sports', 6), ('Board Games', 6), ('Dancing', 6), ('Cars', 6),
  ('Incorrect Spelling/Grammar', 7), ('Untidy Rooms', 7), ('Being Late', 7), ('PDA', 7), ('Cracking Knuckles', 7), ('Overly Optimistic', 7), ('Texting & Talking', 7), ('Not Signalling', 7),
  ('Water', 8), ('Soda', 8), ('Beer', 8), ('Wine', 8), ('Coffee', 8), ('Tea', 8), ('Milk', 8), ('Juice', 8), ('Cocktails', 8), ('Tequila', 8),
  ('Harry Potter', 9), ('Lord of the Rings', 9), ('Star Wars', 9), ('Star Trek', 9), ('Pokemon', 9), ('Disney/Pixar', 9), ('Marvel', 9), ('DC Comics', 9), ('Game of Thrones', 9), ('Twilight', 9),
  ('Pop', 10), ('Country', 10), ('EDM/Electronic', 10), ('Classical', 10), ('Rock', 10), ('Jazz', 10), ('Rap', 10), ('Indie', 10);
