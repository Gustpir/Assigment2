let farmModel = require('../Models/FarmModel');
let townhallModel = require('../Models/TownhallModel');
let constanta = require('../const');

let globalVar = this;

let farmLogic = {

    checkResourceTownhall: function (param, callback) {
        globalVar = this;
        var code = {};
        townhallModel.findMyTownhall(param.userId, (err, getResult) => {
            console.log("data my townhall " + getResult);

            if (getResult.gold >= constanta.goldFarm && getResult.food >= constanta.foodFarm) {
                let updateGold = getResult.gold - constanta.goldFarm;
                let updateFood = getResult.food - constanta.foodFarm;
                getResult.update({
                    gold: updateGold,
                    food: updateFood
                }, {}, function (err, userResult) {
                    if (err) {
                        code.status = 400;
                        code.description = "You don't have resource for create farm";
                        callback(false, code);
                    } else {
                        globalVar.createFarm(param, callback);
                    }


                });
            } else {
                code.status = 400;
                code.description = "You don't have resource for create farm";
                callback(false, code);
            }
        });
    },

    createFarm: function (param, callback) {
        var code = {};
        farmModel.addFarm(param, (err, saveResult) => {
            console.log("data farm save " + saveResult);
            if (err) {
                code.status = 500;
                code.description = "Failed create farm";
                callback(false, code);
            } else {
                code.status = 200;
                code.data = saveResult;
                code.description = "success create farm " + saveResult.farmId;
                callback(true, code);
            }
        });
    },

    getAllFarm: function (userId, callback) {
        var code = {};
        farmModel.findAllFarm(userId, (err, saveResult) => {
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

    updateFarmName: function (param, callback) {
        var code = {};
        farmModel.findOneFarmById(param, (err, getResult) => {
            if (err) {
                code.status = 500;
                code.description = "Failed get data farm";
                callback(false, code);
            } else {
                getResult.update({
                    farmName: param.farmName
                }, {}, function (err, userResult) {
                    if (err) {
                        code.status = 500;
                        code.description = "failed update farm name";
                        callback(false, code);
                    } else {
                        code.status = 200;
                        code.description = "success update farm name";
                        callback(true, code);
                    }


                });
            }
        });
    },

    deleteFarm: function (param, callback) {
        var code = {};
        farmModel.findOneAndDeleteFarmById(param, (err, getResult) => {
            if (err) {
                code.status = 500;
                code.description = "Failed delete farm";
                callback(false, code);
            } else {
                code.status = 200;
                code.description = "success delete farm";
                callback(true, code);
            }
        });
    },

    collectResource: function (param, callback) {
        var code = {};
        townhallModel.findMyTownhall(param.userId, (err, getResult) => {
            farmModel.findOneFarmById(param, (errFarm, farmResult)=>{
                var updateFood = getResult.food + farmResult.food;
                getResult.update({
                    food: updateFood
                }, {}, function (errUpdateTownhall, userResult) {
                    if (errUpdateTownhall) {
                        code.status = 400;
                        code.description = "collect food failed";
                        callback(false, code);
                    } else {
                        farmResult.update({
                            food: 0

                        }, {}, function (errUpdateFarm, updateFarmResult) {
                            if(errUpdateFarm){

                                code.status = 400;
                                code.description = "collect food failed";
                                callback(false, code);
                            }else {

                                code.status = 200;
                                code.description = "collect food success";
                                callback(true, code);
                            }

                        })

                    }


                });
            })
        });
    }

}


module["exports"] = farmLogic;
