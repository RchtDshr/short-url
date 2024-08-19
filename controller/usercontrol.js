const User = require('../model/usermodel')
const {v4 : uuidv4} = require('uuid');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.redirect('/');
}
async function handleUserLogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});

    if(!user) return res.render("login", {error: "Invalid user or password"});

    // created a session id to handle statefull authentication
    // const sessionId = uuidv4();
    // setUser(sessionId, user);

    //using jwt to handle stateless authentication
    const token = setUser(user);

    //sending a cookie with name uid and sessionID as its unique session id linked to a specific user
    // res.cookie('uid', sessionId) for statefull authentication we send uid and sessionId to handle state

    res.cookie('token', token) // for stateless authentication we sent jwt token in authentication
    return res.redirect('/');

    //instead of making cookie we are sending tokens, 
    console.log("login token: ", token);
    
    // return res.json({token})

}

module.exports = {
    handleUserSignup,
    handleUserLogin
}