let userModel = require('../Models/UserModel');
let townhallModel = require('../Models/TownhallModel');


let buildingBaseCamp = {

    registerUser: function (param, callback) {
        var code = {};
        if (validateEmail(param.emailAddress)) {
            userModel.addUser(param, (err, saveResult) => {
                console.log("data user save " + saveResult);
                if (err) {
                    code.status = 500;
                    code.description = "Failed Register";
                    callback(false, code);
                } else {
                    this.createTownhall(saveResult, callback);
                }
            });
        } else {
            code.status = 400;
            code.description = "wrong email format";
            callback(false, code);
        }
    } ,

    getAllUser: function (callback) {
        var code = {};
        userModel.findAllUser((err, saveResult) => {
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

    getAllTownhall: function (callback) {
        var code = {};
        townhallModel.findAllTownhall((err, saveResult) => {
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

    getMyTownhall: function (userId, callback) {
        var code = {};
        townhallModel.findMyTownhall(userId, (err, saveResult) => {
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

    createTownhall: function (param, callback) {
        var townhallVar = {};
        townhallVar.userId = param.userId;
        townhallVar.gold = 100;
        townhallVar.food = 100;
        townhallVar.soldier = 0;
        townhallModel.addTownhall(townhallVar,(err, saveResult) => {
            console.log("data townhall save " + saveResult);
            var code = {};
            if (err) {
                code.status = 500;
                code.description = "Failed Create townhall";
                callback(false, code);
            } else {
                code.status = 200;
                code.data = saveResult;
                code.description = "success register " + param.emailAddress;
                callback(true, code);

            }
        });


    }

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


module["exports"] = buildingBaseCamp;
