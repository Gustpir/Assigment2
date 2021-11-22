var express = require('express');
let farmLogics = require('../logic/FarmLogics');
var router = express.Router();

/* market router. */
router.post('/create', function (req, res) {
    let bodyModel = req.body;
    farmLogics.checkResourceTownhall(bodyModel, (succ, responseCallback) =>{
        res.status(responseCallback.status);
        res.json({
            description: responseCallback.description
        });
    })
});

router.get('/list', function (req, res) {
    if(req.query.userId != undefined){
        farmLogics.getAllFarm(req.query.userId , (succ, responseCallback)=>{
            if(succ){
                res.status(responseCallback.status);
                res.json(responseCallback.data);
            }else{
                res.status(responseCallback.status);
                res.json({
                    description: responseCallback.description
                });
            }
        })
    }else{
        res.status(400);
        res.json({
            description: "userId undefined"
        });
    }

});

router.post('/updatename', function (req, res) {
    let bodyModel = req.body;
    farmLogics.updateFarmName(bodyModel, (succ, responseCallback) =>{
        res.status(responseCallback.status);
        res.json({
            description: responseCallback.description
        });
    })
});

router.post('/destroy', function (req, res) {
    let bodyModel = req.body;
    farmLogics.deleteFarm(bodyModel, (succ, responseCallback) =>{
        res.status(responseCallback.status);
        res.json({
            description: responseCallback.description
        });
    })
});

router.post('/collect', function (req, res) {
    let bodyModel = req.body;
    farmLogics.collectResource(bodyModel, (succ, responseCallback) =>{
        res.status(responseCallback.status);
        res.json({
            description: responseCallback.description
        });
    })
});


module.exports = router;
