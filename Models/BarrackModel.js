var mongoose = require('mongoose');
const Promise = require('bluebird');
var BarrackModel = function () {

};

BarrackModel.prototype.model = null;


BarrackModel.prototype.init = function () {

    // Defining a schema
    var barrackSchema = new mongoose.Schema({
        barrackId: mongoose.Schema.Types.ObjectId,
        userId: String,
        barrackName: String,
        soldier: Number,
        soldierTot: Number
    });

    try {
        this.model = mongoose.model("cov_barracks");
    } catch (error) {
        this.model = mongoose.model("cov_barracks", barrackSchema);
    }

    console.log("success init barrackModel")
    return this.model;

}

BarrackModel.prototype.addBarrack = function (param, callBack) {
    console.log("create farm")
    var query = new this.model({
        barrackId: new mongoose.Types.ObjectId,
        userId: param.userId,
        barrackName: param.barrackName,
        soldier: 0,
        soldierTot: 0
    });
    query.save(function (err) {
        if (err) {
            var code = {};
            code.code = 500;
            code.description = "Failed create barrack";
            callBack(true, code);
        } else {
            callBack(err, query);
        }
    });


}


BarrackModel.prototype.findAllBarrack = function (userId, callBack) {
    var query = this.model.find({userId : userId});
    query.exec(callbackGeneral(callBack));
}

BarrackModel.prototype.findOneBarrackById = function (param, callBack) {
    var query = this.model.findOne({userId : param.userId, barrackId : param.barrackId});
    query.exec(callbackGeneral(callBack));
}

BarrackModel.prototype.findOneAndDeleteBarrackById = function (param, callBack) {
    var query = this.model.findOneAndDelete({userId : param.userId, barrackId : param.barrackId});
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


module["exports"] = new BarrackModel();

