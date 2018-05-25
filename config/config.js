
const env = process.env.NODE_ENV || 'development';
console.log('enviroment: ', env);

if (env === 'development') { // If enviroment is development us local server. 
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/kollen';
}