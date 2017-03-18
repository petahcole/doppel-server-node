var express = require('express');
var router = express.Router();
var auth = require('../helpers/auth');
var Q = require('../helpers/queries')

router.get('/', (req, res, next) =>  {
  Q.getAllUsers()
    .then(users =>  {
      res.json(users)
    })
    .catch(err  =>  {
      res.json(err)
    })
})

router.post('/login', (req, res, next) =>  {
  let userLogin = {
    email: req.body.email,
    password: req.body.password,    
  }
  Q.getUser(userLogin)
    .then(user  =>  {
      if(!user) {
        next(new Error('incorrect password'))
      } else {
        Q.checkPass(userLogin.password, user.password)
          .then(result  =>  {
            console.log('result', result)
            if(!result) {
              next(new Error('incorrect password'))
            } else  {
              let token =  auth.encodeToken(user)  
              res.json({token: token}) 
            }
          })
          .catch(err  =>  {
            res.json(err)
          })
    }  
  })
  .catch(err  =>  {
    res.json(err)
  })
})

router.post('/new', (req, res, next)  =>  {
    let user = {
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  }
  Q.addUser(user)
    .then(user  =>  { 
      let token =  auth.encodeToken(user)    
      res.json({token: token})
    })
    .then(token =>  {
      console.log(token)
      res.json(token)
    })  
    .catch(err  =>  {
      res.json(err)
    })
})

module.exports = router;
