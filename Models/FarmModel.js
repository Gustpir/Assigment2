var mongoose = require('mongoose');
const Promise = require('bluebird');
var FarmModel = function () {

};

FarmModel.prototype.model = null;


FarmModel.prototype.init = function () {

    // Defining a schema
    var farmSchema = new mongoose.Schema({
        farmId: mongoose.Schema.Types.ObjectId,
        userId: String,
        farmName: String,
        food: Number,
        foodTot: Number
    });

    try {
        this.model = mongoose.model("cov_farms");
    } catch (error) {
        this.model = mongoose.model("cov_farms", farmSchema);
    }

    console.log("success init farmModel")
    return this.model;

}

FarmModel.prototype.addFarm = function (param, callBack) {
    console.log("create farm")
    var query = new this.model({
        farmId: new mongoose.Types.ObjectId,
        userId: param.userId,
        farmName: param.farmName,
        food: 0,
        foodTot: 0
    });
    query.save(function (err) {
        if (err) {
            var code = {};
            code.code = 500;
            code.description = "Failed create farm";
            callBack(true, code);
        } else {
            callBack(err, query);
        }
    });


}


FarmModel.prototype.findAllFarm = function (userId, callBack) {
    var query = this.model.find({userId : userId});
    query.exec(callbackGeneral(callBack));
}

FarmModel.prototype.findOneFarmById = function (param, callBack) {
    var query = this.model.findOne({userId : param.userId, farmId : param.farmId});
    query.exec(callbackGeneral(callBack));
}

FarmModel.prototype.findOneAndDeleteFarmById = function (param, callBack) {
    var query = this.model.findOneAndDelete({userId : param.userId, farmId : param.farmId});
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


module["exports"] = new FarmModel();

