const mongoose = require("mongoose")
const Schema = mongoose.Schema

var Article = new Schema({
    name: {type: String},
    description:{type:String},    
    amount: {type: Number},
    updatedAt: {type: Date,
      default: new Date()},
    price:{type: Number},
    aquiredAt:{ type: String},
    area:{type: Boolean},
    createdAt: {
      type: Date,
      default: new Date()
    },
    project:{type:String},
    comments:{type:String}
},
{collection: 'articles'}
)

module.exports = Article = mongoose.model('articles', Article)