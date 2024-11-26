const express = require('express')
const app = express()
const mongoose = require('mongoose');

const productRoute = require('./routes/productRoute');

require('dotenv').config();

const MONGO_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

//json middleware to make our application understand json
app.use(express.json());

//json middleware to use urlencode instead of json to send data
app.use(express.urlencoded({extended: false}))


//middleware to use the productRoute in this file; used /api to append it before products in url
app.use('/api/products', productRoute);

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

/* app.get('/blog', (req, res) => {
    res.send('Hello Blog!!')
  }) */

/* app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) */

  mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected!');
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
