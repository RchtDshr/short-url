const { getUser } = require("../service/auth");

async function restrictToLoggedInUser(req, res, next) {
    //to use cookies here we need to install a package ie cookie parser
    // const userUuid = req.cookies?.uid; //agar cookie hai toh hi uid read karo
    const userUuid = req.headers['authorization'];
    console.log(req.headers);

    if (!userUuid) return res.redirect('/login');

    const token = userUuid.split('Bearer ')[1]; //Bearer 67839576748948567
    // console.log(token);
    
    const user = getUser(token);

    // const user = getUser(userUuid);
    
    if (!user) return res.redirect('/login');

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    // const userUuid = req.cookies?.uid; //agar cookie hai toh hi uid read karo
    console.log(req.headers);

    const userUuid = req.headers['authorization'];
    console.log(req.headers);

    // const user = getUser(userUuid);
    const token = userUuid.split('Bearer ')[1];
    // console.log(token);

    const user = getUser(token);
    // const user = getUser(userUuid);


    console.log(user);

    req.user = user;
    next();
}

module.exports = { restrictToLoggedInUser, checkAuth }