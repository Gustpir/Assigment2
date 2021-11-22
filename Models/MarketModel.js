var mongoose = require('mongoose');
const Promise = require('bluebird');
var MarketModel = function () {

};

MarketModel.prototype.model = null;


MarketModel.prototype.init = function () {

    // Defining a schema
    var marketSchema = new mongoose.Schema({
        marketId: mongoose.Schema.Types.ObjectId,
        userId: String,
        marketName: String,
        gold: Number,
        goldTot: Number
    });

    try {
        this.model = mongoose.model("cov_markets");
    } catch (error) {
        this.model = mongoose.model("cov_markets", marketSchema);
    }

    console.log("success init marketModel")
    return this.model;

}

MarketModel.prototype.addMarket = function (param, callBack) {
    console.log("create market")
    var query = new this.model({
        marketId: new mongoose.Types.ObjectId,
        userId: param.userId,
        marketName: param.marketName,
        gold: 0,
        goldTot: 0
    });
    query.save(function (err) {
        if (err) {
            var code = {};
            code.code = 500;
            code.description = "Failed create market";
            callBack(true, code);
        } else {
            callBack(err, query);
        }
    });


}


MarketModel.prototype.findAllMarket = function (userId, callBack) {
    var query = this.model.find({userId : userId});
    query.exec(callbackGeneral(callBack));
}

MarketModel.prototype.findOneMarketById = function (param, callBack) {
    var query = this.model.findOne({userId : param.userId, marketId : param.marketId});
    query.exec(callbackGeneral(callBack));
}

MarketModel.prototype.findOneAndDeleteMarketById = function (param, callBack) {
    var query = this.model.findOneAndDelete({userId : param.userId, marketId : param.marketId});
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


module["exports"] = new MarketModel();

