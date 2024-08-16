const { getUser } = require("../service/auth");

async function restrictToLoggedInUser(req, res, next) {
    //to use cookies here we need to install a package ie cookie parser
    const userUuid = req.cookies?.uid; //agar cookie hai toh hi uid read karo

    if (!userUuid) return res.redirect('/login');

    const user = getUser(userUuid);
    if (!user) return res.redirect('/login');

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUuid = req.cookies?.uid; //agar cookie hai toh hi uid read karo

    const user = await getUser(userUuid);

    req.user = user;
    next();
}

module.exports = { restrictToLoggedInUser, checkAuth }