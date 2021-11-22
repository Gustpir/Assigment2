var express = require('express');
let marketLogic = require('../logic/MarketLogics');
var router = express.Router();

/* market router. */
router.post('/create', function (req, res) {
    let bodyModel = req.body;
    marketLogic.checkResourceTownhall(bodyModel, (succ, responseCallback) =>{
        res.status(responseCallback.status);
        res.json({
            description: responseCallback.description
        });
    })
});

router.get('/list', function (req, res) {
    if(req.query.userId != undefined){
        marketLogic.getAllMarket(req.query.userId , (succ, responseCallback)=>{
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
    marketLogic.updateMarketName(bodyModel, (succ, responseCallback) =>{
        res.status(responseCallback.status);
        res.json({
            description: responseCallback.description
        });
    })
});

router.post('/destroy', function (req, res) {
    let bodyModel = req.body;
    marketLogic.deleteMarket(bodyModel, (succ, responseCallback) =>{
        res.status(responseCallback.status);
        res.json({
            description: responseCallback.description
        });
    })
});

router.post('/collect', function (req, res) {
    let bodyModel = req.body;
    marketLogic.collectResource(bodyModel, (succ, responseCallback) =>{
        res.status(responseCallback.status);
        res.json({
            description: responseCallback.description
        });
    })
});


module.exports = router;
