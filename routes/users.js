var express = require('express');
let buildingBaseLogic = require('../logic/BuildingBasecamp');
var router = express.Router();

/* Register data user. */
router.post('/register', function (req, res) {
    let bodyModel = req.body;
    buildingBaseLogic.registerUser(bodyModel, (succ, responseCallback) =>{
        res.status(responseCallback.status);
        res.json({
            description: responseCallback.description
        });
    })
});

router.get('/list', function (req, res) {
    buildingBaseLogic.getAllUser((succ, responseCallback)=>{
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

});

router.get('/townhall', function (req, res) {
    buildingBaseLogic.getAllTownhall((succ, responseCallback)=>{
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

});
router.get('/mytownhall', function (req, res) {
    if(req.query.userId != undefined){
        buildingBaseLogic.getMyTownhall(req.query.userId, (succ, responseCallback)=>{
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

        res.status(500);
        res.json({
            description: "userId undefined"
        });
    }


});


module.exports = router;
