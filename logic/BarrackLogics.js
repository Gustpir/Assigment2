let barrackModel = require('../Models/BarrackModel');
let townhallModel = require('../Models/TownhallModel');
let constanta = require('../const');

let globalVar = this;

let barrackLogic = {

    checkResourceTownhall: function (param, callback) {
        globalVar = this;
        var code = {};
        townhallModel.findMyTownhall(param.userId, (err, getResult) => {
            console.log("data my townhall " + getResult);

            if (getResult.gold >= constanta.goldBarrack && getResult.food >= constanta.foodBarrack) {
                let updateGold = getResult.gold - constanta.goldBarrack;
                let updateFood = getResult.food - constanta.foodBarrack;
                getResult.update({
                    gold: updateGold,
                    food: updateFood
                }, {}, function (err, userResult) {
                    if (err) {
                        code.status = 400;
                        code.description = "You don't have resource for create Barrack";
                        callback(false, code);
                    } else {
                        globalVar.createBarrack(param, callback);
                    }


                });
            } else {
                code.status = 400;
                code.description = "You don't have resource for create Barrack";
                callback(false, code);
            }
        });
    },

    createBarrack: function (param, callback) {
        var code = {};
        barrackModel.addBarrack(param, (err, saveResult) => {
            console.log("data barrack save " + saveResult);
            if (err) {
                code.status = 500;
                code.description = "Failed create barrack";
                callback(false, code);
            } else {
                code.status = 200;
                code.data = saveResult;
                code.description = "success create barrack " + saveResult.barrackId;
                callback(true, code);
            }
        });
    },

    getAllBarrack: function (userId, callback) {
        var code = {};
        barrackModel.findAllBarrack(userId, (err, saveResult) => {
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

    updateBarrackName: function (param, callback) {
        var code = {};
        barrackModel.findOneBarrackById(param, (err, getResult) => {
            if (err) {
                code.status = 500;
                code.description = "Failed get data barrack";
                callback(false, code);
            } else {
                getResult.update({
                    barrackName: param.barrackName
                }, {}, function (err, userResult) {
                    if (err) {
                        code.status = 500;
                        code.description = "failed update barrack name";
                        callback(false, code);
                    } else {
                        code.status = 200;
                        code.description = "success update barrack name";
                        callback(true, code);
                    }


                });
            }
        });
    },

    deleteBarrack: function (param, callback) {
        var code = {};
        barrackModel.findOneAndDeleteBarrackById(param, (err, getResult) => {
            if (err) {
                code.status = 500;
                code.description = "Failed delete barrack";
                callback(false, code);
            } else {
                code.status = 200;
                code.description = "success delete barrack";
                callback(true, code);
            }
        });
    },

    collectResource: function (param, callback) {
        var code = {};
        townhallModel.findMyTownhall(param.userId, (err, getResult) => {
            barrackModel.findOneBarrackById(param, (errBarrack, barrackResult)=>{
                var updateSoldier = getResult.soldier + barrackResult.soldier;
                getResult.update({
                    soldier: updateSoldier
                }, {}, function (errUpdateTownhall, userResult) {
                    if (errUpdateTownhall) {
                        code.status = 400;
                        code.description = "collect soldier failed";
                        callback(false, code);
                    } else {
                        barrackResult.update({
                            soldier: 0

                        }, {}, function (errUpdateBarrack, updateBarrackResult) {
                            if(errUpdateBarrack){

                                code.status = 400;
                                code.description = "collect soldier failed";
                                callback(false, code);
                            }else {

                                code.status = 200;
                                code.description = "collect soldier success";
                                callback(true, code);
                            }

                        })

                    }


                });
            })
        });
    }

}


module["exports"] = barrackLogic;
