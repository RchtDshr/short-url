//Below code is for statefull authentication as state is being maintained in the server
//state was being maintained using a map
// const sessionToUserMap = new Map();

// //mapping all the sessionID to a corresponding user
// //stored in a hash map

// function setUser(id, user){
//     sessionToUserMap.set(id, user);
// }

// function getUser(id){
//     return sessionToUserMap.get(id);
// }


// to implement stateless authentication we use jwt which has a token which stores the state and that token can be used to get the current state
const jwt = require("jsonwebtoken");
const secret = "rachita@17d"

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret);

}
function getUser(token) {
    if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}
module.exports = {
    setUser,
    getUser
}