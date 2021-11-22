let mongoose = require('mongoose');
let Promise = require('bluebird');


let mongooseOptions = {
    useMongoClient: true,
    autoIndex: false,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 20,
    bufferMaxEntries: 0,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 60000,
    keepAlive: 300000
};
let DatabaseManager = {

    userModel:null,
    townhallModel:null,
    marketModel:null,
    farmModel:null,
    barrackModel:null,

    init: function(){

        let self = this;
		
        // Connection to our chat database

        try{
            // mongoose.Promise = global.Promise;
            mongoose.Promise = Promise;
            if(!mongoose.connection.readyState){

                mongoose.connect("mongodb://localhost/clashofvillage", function(err){

                    if (err) {
                        console.log("error when connect");

                    } else {
                        console.log("success when connect");

                        // Defining a schema
                        self.setupSchema();
                        
                    }
                });
                
            } else {

                // Defining a schema
                self.setupSchema();
                        
            }

	
        } catch(ex){
            console.log("UnHandle exceptions");

	        throw ex;
	        
        }

    },
    
    setupSchema : function(){
        this.userModel = require('../Models/UserModel').init();
        this.townhallModel = require('../Models/TownhallModel').init();
        this.marketModel = require('../Models/MarketModel').init();
        this.farmModel = require('../Models/FarmModel').init();
        this.barrackModel = require('../Models/BarrackModel').init();

    }
};

module["exports"] = DatabaseManager;