var mongoose = require('mongoose');
const Promise = require('bluebird');
var TownhallModel = function () {

};

TownhallModel.prototype.model = null;


TownhallModel.prototype.init = function () {

    // Defining a schema
    var townhallSchema = new mongoose.Schema({
        townhallId: mongoose.Schema.Types.ObjectId,
        userId: String,
        gold: Number,
        food: Number,
        soldier: Number,
        goldMax: Number,
        foodMax: Number,
        soldierMax: Number,
        barrackTot: Number,
        marketTot: Number,
        farmTot: Number
    });

    try {
        this.model = mongoose.model("cov_townhalls");
    } catch (error) {
        this.model = mongoose.model("cov_townhalls", townhallSchema);
    }

    console.log("success init townhallModel")
    return this.model;

}

TownhallModel.prototype.addTownhall = function (param, callBack) {
    console.log("create townhall")
    var query = new this.model({
        townhallId: new mongoose.Types.ObjectId,
        userId: param.userId,
        gold: param.gold,
        food: param.food,
        soldier: param.soldier,
        goldMax: 1000,
        foodMax: 1000,
        soldierMax: 500,
        marketTot: 0,
        barrackTot: 0,
        farmTot: 0
    });
    query.save(function (err) {
        if (err) {
            var code = {};
            code.code = 500;
            code.description = "Failed create townhall";
            callBack(true, code);
        } else {
            callBack(err, query);
        }
    });


}


TownhallModel.prototype.findAllTownhall = function (callBack) {
    var query = this.model.find();
    query.exec(callbackGeneral(callBack));
}


TownhallModel.prototype.findMyTownhall = function (userId, callBack) {
    var query = this.model.findOne({userId : userId});
    query.exec(callbackGeneral(callBack));
}

TownhallModel.prototype.updateResourceTownhall = function (userId, callBack) {
    var query = this.model.findOne({userId : userId});
    query.exec(callbackGeneral(callBack));
}


var callbackGeneral = function (callBack) {
    return function (err, data) {
        if (err) {
            callBack(true, err);

        } else {
            callBack(false, data);
        }
    }
};


module["exports"] = new TownhallModel();

