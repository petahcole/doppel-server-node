var express = require('express');
var router = express.Router();
var auth = require('../helpers/auth');
var Q = require('../helpers/queries')

router.get('/', (req, res, next)    =>  {
    Q.getInventory()
        .then(data  =>  {
            res.json({data: data})
        })
        .catch(err  =>  {
            res.json(err)
        })
})

router.post('/new', (req, res, next)   =>  {
    let newFlower = {
        name: req.body.name,
        color: req.body.color,
        inSeason: req.body.inSeason,        
        outSeason: req.body.outSeason,
        soldAs: req.body.soldAs,
        price: req.body.price
    }
    Q.addInventory(newFlower)
        .then(result    =>  {
            res.json(result)
        })
        .catch(err  =>  {
            res.json(err.message)
        })
})

router.delete('/delete', (req, res, next)   =>  {
    Q.deleteColl()
        .then(result    =>  {
            res.json(result)
        })
        .catch(err  =>  {
            res.json(err)
        })
})
module.exports = router;