# Hate Mate 

A full stack JavaScript application that matches users with friends based on mutual dislikes and demographics. 
<br/> Let mutual hatred fuel the fire 🔥!

## Why I built this application

In my experience at school and work I often found that it was mutual **dislikes** that drew me to my social circles - mutual dislikes about types of foods, tv shows, music genres, etc. **The stronger the hatred for something, the faster we would become friends.** I wanted to create an application that allows users to connect to locals in their area based on this criteria since I have never seen a matching app like this before despite my own experience making friends in this way.

## Technologies Used
- React.js
- Webpack
- Bootstrap 5
- Node.js
- JavaScript (ES6)
- HTML5
- CSS3
- Dokku
- AJAX
- Google Maps API [click here for documentation](https://developers.google.com/maps/documentation/javascript)

## Live Demo
Check out the live site here! [HateMate](https://hate-mate.hate-mate.com/)

## Features
- User can can select friend gender, age, and location range settings
- User can take a hate selections quiz to create a profile
- User can edit their profile information
- User can view their pending matches and accept or decline
- User can view all matches’ profiles
- User can view a map view of all their matches

## Preview
![feature-4-desktop](https://user-images.githubusercontent.com/90408240/211100305-42378cbd-5ea9-46aa-ae5b-2a00c3819c1c.gif)
![feature-5-Desktop](https://user-images.githubusercontent.com/90408240/211100325-4717b34b-020d-46dd-899e-80135658da05.gif)
![feature-6-desktop](https://user-images.githubusercontent.com/90408240/211100339-10eccae6-9e0a-4386-a01b-412f40cda1c8.gif)

## Upcoming Features
- User can use forget password link to reset password
- User can unmatch a match

## Getting Started 
1. Clone the repository.

    ```shell
    git clone git@github.com:hannahnengel/hate-mate.git 
    cd hate-mate
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install react, react-dom @react-google-maps/api, argon2, body-parser, dotenv, express, fs, jsonwebtoken, jwt-decode, multer, multer-s3
    ```

    ```shell
    npm install @babel/core, @babel/plugin-transform-react-jsx, @babel/preset-env, babel-loader, webpack, webpack-cli, webpack-dev-middleware, webpack-hot-middleware --save-dev
    ```

3. Create a `schema.sql` file based on the database build from DBDesigner [here](https://app.dbdesigner.net/designer/schema/540601)
4. Create a `data.sql` file with the below data 

  ```shell
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
  ```


6. Start PostgreSQL.

    ```shell
    sudo service postgreSQL start
    ```

7. Create the database on Pgweb and view by opening http://localhost:8081
 
   ```shell
   createdb HateMate
   ```

   ```shell
    pgweb --db=HateMate
    ```

9.  Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
    
    ```shell
    npm run dev
    ```
