
# Picture This
Picture This is an app for sharing photos with friends and acquaintances through the use of private and shared photo albums.

## Prerequisites

1. In order to run Picture- This you will need to have access to an instance of MongoDB. You can either install MongoDB locally or create a free online account with MongoDB Atlas. Windows users are strongly recommended to use MongoDB Atlas for ease of use. 

* [Installation](https://www.mongodb.com/docs/manual/installation/)
* [Create a MongoDB account](https://www.mongodb.com/atlas/database)

2. You will need a cloudinary account for storing images.
* [Create a Cloudinary account](https://cloudinary.com/users/register_free)

## Screenshots

<p align="center">
  <img src="/cover.png" />
</p>

## Getting started

1. Clone the repo
```bash
git clone https://github.com/MatthewKelsey/Picture-This
cd Picture-This
```

2. Install dependencies in both /client and /server folders

```bash
npm install
```
3. Create a .env file inside server folder and update MONGODB_CREDENTIALS and Cloudinary credentials. Follow the .env.sample as a guide. 
```
cd server
touch .env
```

4. Start development server

```bash
cd /server
npx nodemon 
```

5. Start the front end app

```bash
cd /client
npm start
```

## Testing

Unit tests can be run from inside the client folder with the following command.

```
npm test
```

End to end testing can be run from inside the client folder with the following command.
```
npx cypress run
```

## Tech Stack
* [React JS](https://reactjs.org) - Front end library for building user interfaces
* [Cloudinary](https://cloudinary.com) - Image and Video APIs
* [Express JS](https://expressjs.com) - Web framework for Node.js
* [MongoDb](https://www.mongodb.com/) - Open source non-relational database system


## Author
* Matthew Kelsey - [GitHub](https://github.com/MatthewKelsey) - [LinkedIn](https://www.linkedin.com/)

