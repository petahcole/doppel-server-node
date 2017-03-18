const db = require('monk')('localhost/doppel');
const users = db.get('users');
const amato = db.get('amato')
const bcrypt = require('bcrypt')
const auth = require('./auth')



function getInventory() {
    return amato.find({})
}
function addInventory(item) {
    console.log(item)
    return amato.findOne({
            name: item.name,
            color: item.color,
            inSeason: item.inSeason,                       
            outSeason: item.outSeason,            
            soldAs: item.soldAs,
            price: item.price
        })
    .then(doc   =>  {
        if(!doc)    {            
            amato.insert({
            name: item.name,
            color: item.color,
            inSeason: item.inSeason,            
            outSeason: item.outSeason,            
            soldAs: item.soldAs,
            price: item.price
            })
        }  else {
            throw new onerror({
                err: 'flower already exists'
            })
        }  
    })
}

function deleteColl()   {
    return amato.drop()
}

function getAllUsers()  {
   return users.find({})
}

function addUser(user)  {
   return users.findOne({email: user.email})
            .then(doc   =>  {
                if(!doc)    {
                    users.insert({
                    email: user.email,
                    password: bcrypt.hashSync(user.password, 7),
                    isAdmin: user.isAdmin                
                    })            
            }   else    {
                throw new Error({
                    err: 'user already exists'
                    })
                }
            })
};

function getUser(user)  {
   return users.findOne({email: user.email})
}

function checkPass(password, hashPass)    { 
  return bcrypt.compare(password, hashPass)    
}

function checkAuth(req, res, next)  {
    if(!(req.headers && req.headers.authorization)) {
        return res.status(400).json({
            status: 'invalid user'
        })
    }
    let header = req.headers.authorization.split('');
    let token = header[0];
    auth.decodeToken(token, (err, payload)  =>  {
        if (err)    {
            return res.status(400).json({
                status: 'expired toke'
            })
        }   else if  (payload.isAdmin == true)  {
            console.log('redirect to admin page')
        }   else    {
            console.log('redirect to shop page')
        }
    })
}

module.exports = {
    getAllUsers,
    getInventory,
    addInventory,
    deleteColl,
    addUser,
    getUser,
    checkPass,
    checkAuth
}