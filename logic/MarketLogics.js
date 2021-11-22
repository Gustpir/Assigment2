let marketModel = require('../Models/MarketModel');
let townhallModel = require('../Models/TownhallModel');
let constanta = require('../const');

let globalVar = this;

let marketLogic = {

    checkResourceTownhall: function (param, callback) {
        globalVar = this;
        var code = {};
        townhallModel.findMyTownhall(param.userId, (err, getResult) => {
            console.log("data my townhall " + getResult);

            if (getResult.gold >= constanta.goldMarket && getResult.food >= constanta.foodMarket) {
                let updateGold = getResult.gold - constanta.goldMarket;
                let updateFood = getResult.food - constanta.foodMarket;
                getResult.update({
                    gold: updateGold,
                    food: updateFood
                }, {}, function (err, userResult) {
                    if (err) {
                        code.status = 400;
                        code.description = "You don't have resource for create market";
                        callback(false, code);
                    } else {
                        globalVar.createMarket(param, callback);
                    }


                });
            } else {
                code.status = 400;
                code.description = "You don't have resource for create market";
                callback(false, code);
            }
        });
    },

    createMarket: function (param, callback) {
        var code = {};
        marketModel.addMarket(param, (err, saveResult) => {
            console.log("data market save " + saveResult);
            if (err) {
                code.status = 500;
                code.description = "Failed create market";
                callback(false, code);
            } else {
                code.status = 200;
                code.data = saveResult;
                code.description = "success create market " + saveResult.marketId;
                callback(true, code);
            }
        });
    },

    getAllMarket: function (userId, callback) {
        var code = {};
        marketModel.findAllMarket(userId, (err, saveResult) => {
            if (err) {
                code.status = 500;
                code.description = "Failed get data";
                callback(false, code);
            } else {
                code.status = 200;
                code.data = saveResult;
                callback(true, code);
            }
        });
    },

    updateMarketName: function (param, callback) {
        var code = {};
        marketModel.findOneMarketById(param, (err, getResult) => {
            if (err) {
                code.status = 500;
                code.description = "Failed get data market";
                callback(false, code);
            } else {
                getResult.update({
                    marketName: param.marketName
                }, {}, function (err, userResult) {
                    if (err) {
                        code.status = 500;
                        code.description = "failed update market name";
                        callback(false, code);
                    } else {
                        code.status = 200;
                        code.description = "success update market name";
                        callback(true, code);
                    }


                });
            }
        });
    },

    deleteMarket: function (param, callback) {
        var code = {};
        marketModel.findOneAndDeleteMarketById(param, (err, getResult) => {
            if (err) {
                code.status = 500;
                code.description = "Failed delete market";
                callback(false, code);
            } else {
                code.status = 200;
                code.description = "success delete market";
                callback(true, code);
            }
        });
    },

    collectResource: function (param, callback) {
        var code = {};
        townhallModel.findMyTownhall(param.userId, (err, getResult) => {
            marketModel.findOneMarketById(param, (errMarket, marketResult)=>{
                var updateGold = getResult.gold + marketResult.gold;
                getResult.update({
                    gold: updateGold
                }, {}, function (errUpdateTownhall, userResult) {
                    if (errUpdateTownhall) {
                        code.status = 400;
                        code.description = "collect gold failed";
                        callback(false, code);
                    } else {
                        marketResult.update({
                            gold: 0

                        }, {}, function (errUpdateMarket, updateMarketResult) {
                            if(errUpdateMarket){

                                code.status = 400;
                                code.description = "collect gold failed";
                                callback(false, code);
                            }else {

                                code.status = 200;
                                code.description = "collect gold success";
                                callback(true, code);
                            }

                        })

                    }


                });
            })
        });
    }

}


module["exports"] = marketLogic;
