const express = require('express')
const app = express()
const mongoose = require('mongoose');

var cors = require('cors')

const productRoute = require('./routes/productRoute');

const errorMiddleware = require('./middleware/errorMiddleware');

require('dotenv').config();

const MONGO_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;


var corsOptions = {
  origin: 'http://example.com', //write the url which you want to allow to access backend; to put multiple use array
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions ))

//json middleware to make our application understand json
app.use(express.json());

//json middleware to use urlencode instead of json to send data
app.use(express.urlencoded({extended: false}))




//middleware to use the productRoute in this file; used /api to append it before products in url
app.use('/api/products', productRoute);

app.get('/', (req, res) => {
  //throw new Error('fake error');
  res.send('Hello World!!')
})

/* app.get('/blog', (req, res) => {
    res.send('Hello Blog!!')
  }) */

/* app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) */

  //use middleware
app.use(errorMiddleware);


  mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected!');
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
