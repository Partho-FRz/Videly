const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());
const genre = require('./router/genre');
const home = require('./router/home');
const customer = require('./router/customer');
const movie = require('./router/movie');
const rental = require('./router/rental');
const user = require('./router/user');
const auth = require('./router/auth');
const config = require('config');

if(!config.get('jwtPrivateKey')){
  console.log('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

const uri = 'mongodb+srv://onto:fearless10112@cluster0-8dc7n.mongodb.net/Vidly?retryWrites=true';
mongoose.connect(uri).then(()=>{
  console.log('mongodb atlas connected');
}).catch(err =>{
  console.log(err.message);
});

app.use('/api/genres', genre);
app.use('/', home);
app.use('/api/customers',customer);
app.use('/api/movies',movie);
app.use('/api/rentals',rental);
app.use('/api/users',user);
app.use('/api/auth',auth);


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`));