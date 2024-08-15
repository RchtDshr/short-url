const express = require('express')
const connectMongo = require('./connection')
const path = require('path')

//cookie parser
const cookieParser = require('cookie-parser');

const urlRoute = require('./routes/urlroutes')
const staticRouter = require('./routes/staticRouter')
const userRoute = require('./routes/userroutes')

const {restrictToLoggedInUser, checkAuth} = require('./middleware/auth')

const URL = require('./model/urlmodel')

const app = express()
const PORT = 8001

// MongoDB connection 
const url = "mongodb://127.0.0.1:27017/short-url"
connectMongo(url)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

// Set the view engine to ejs
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path.resolve('./views'));

// middleware to read body
// TypeError: Cannot read properties of undefined (reading 'url') 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// all routes starting from /url/ 
app.use('/url', restrictToLoggedInUser, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth , staticRouter);

// route for /shortID 
// creating a get route to redirect 
app.get('/url/:shortID', async (req, res) => {
    const shortID = req.params.shortID;
    // console.log(shortID)
    const originalEntry = await URL.findOneAndUpdate(
        {shortID},
        {
            $push: {
                visitHistory: {timestamp: Date.now()}
            }
        }
    )
    return res.redirect(originalEntry.redirectURL)
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
