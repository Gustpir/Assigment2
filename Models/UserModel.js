var mongoose = require('mongoose');
const Promise = require('bluebird');
var UserModel = function () {

};

UserModel.prototype.model = null;


UserModel.prototype.init = function () {

    // Defining a schema
    var userSchema = new mongoose.Schema({
        userId: mongoose.Schema.Types.ObjectId,
        emailAddress: String,
        name: String,
        password: String
    });

    try {
        this.model = mongoose.model("cov_users");
    } catch (error) {
        this.model = mongoose.model("cov_users", userSchema);
    }

    console.log("success init userModel")
    return this.model;

}

UserModel.prototype.addUser = function (param, callBack) {
    console.log("add user")
    var query = new this.model({
        userId: new mongoose.Types.ObjectId,
        emailAddress: param.emailAddress,
        name: param.name,
        password: param.password
    });
    query.save(function (err) {
        if (err) {
            var code = {};
            code.code = 500;
            code.description = "Failed register";
            callBack(true, code);
        } else {
            callBack(err, query);
        }
    });


}


UserModel.prototype.findAllUser = function (callBack) {
    var query = this.model.find();
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


module["exports"] = new UserModel();

