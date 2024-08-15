const sessionToUserMap = new Map();

//mapping all the sessionID to a corresponding user
//stored in a hash map

function setUser(id, user){
    sessionToUserMap.set(id, user);
}

function getUser(id){
    return sessionToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}