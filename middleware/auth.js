const { getUser } = require("../service/auth");

function checkforAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if(!tokenCookie) return next(); //if not authorized call the next function

    const token = tokenCookie; //Bearer 67839576748948567
    const user = getUser(token)

    req.user = user;
    return next();
}

//authorization to a specific set of roles bcoz admin can also have normal role so thats why we use a list of role.. we also added a new column named roles in our db
function restrictTo(roles = []){
    return function(req, res, next) {
        if (!req.user) return res.redirect('/login'); // agar koi user hi nhi hua toh

        if ( !roles.includes(req.user.role)) return res.end("Unauathorized") //agar user k baas vo role nhi hai jisko vo access karna chah rha

        return next();
    }
}

// async function restrictToLoggedInUser(req, res, next) {
//     //to use cookies here we need to install a package ie cookie parser
//     // const userUuid = req.cookies?.uid; //agar cookie hai toh hi uid read karo
//     const userUuid = req.headers['authorization'];
//     console.log(req.headers);

//     if (!userUuid) return res.redirect('/login');

//     const token = userUuid.split('Bearer ')[1]; //Bearer 67839576748948567
//     // console.log(token);
    
//     const user = getUser(token);

//     // const user = getUser(userUuid);
    
//     if (!user) return res.redirect('/login');

//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next) {
//     // const userUuid = req.cookies?.uid; //agar cookie hai toh hi uid read karo
//     console.log(req.headers);

//     const userUuid = req.headers['authorization'];
//     console.log(req.headers);

//     // const user = getUser(userUuid);
//     const token = userUuid.split('Bearer ')[1];
//     // console.log(token);

//     const user = getUser(token);
//     // const user = getUser(userUuid);


//     console.log(user);

//     req.user = user;
//     next();
// }

module.exports = { checkforAuthentication, restrictTo }