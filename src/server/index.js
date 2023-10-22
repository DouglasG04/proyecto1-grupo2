const express = require('express');
const cors = require('cors');
require("dotenv").config();
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
app.use(cors({ origin: '*' }))


const PORT = process.env.PORT || 1234;
const mongoURI = process.env.MONGO_URI || "mongodb+srv://GxnzaCR:B3JrojLWvjHEldKo@cluster0.aowwazw.mongodb.net/FixSite?retryWrites=true&w=majority";


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });



//Here, we will import ALL our models to use them in our app routes
const User = require('./models/User.Model');

   
// Here, we will create ALL our app routes
app.get('/', (req, res) =>{
    res.send('Running server!')
})


// All the apis that we will create have to use this format /api/...
app.get('/api/', async (req, res) => {

})


// It have to be the last route requet
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/404/404.html');
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:1234`)
})