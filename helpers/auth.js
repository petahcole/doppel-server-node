const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();


function encodeToken(user)  {
    const payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    user: user
}

    return jwt.encode(payload, process.env.SECRET_TOKEN);
}

function decodeToken(token, callback) {
  const payload = jwt.decode(token, process.env.SECRET_TOKEN);
  const now = moment().unix();
  
  if (now > payload.exp) callback('Token has expired.');
  else callback(null, payload);
}

module.exports = {
    encodeToken,
    decodeToken
}