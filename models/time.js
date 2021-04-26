const mongoose = require("mongoose")
const Schema = mongoose.Schema

var Log = new Schema({
    full_name: {type: String},
    entryDayTime:{type:String},    
    rawEntry: {type: Number},
    exitDayTime: {type:String},
    rawExit:{type: Number},
    pauses: [{
      rawPauseBegin:{type:Number},
      rawPauseEnd:{type:Number},
      pauseFrom:{type:String},
      pauseTo:{type:String},
      pauseDuration: {type:String},
      pauseReason:{type:String}
    }],
    duration:{ type: String},
    complete :{type: Boolean},
    createdAt: {
      type: Date,
      default: new Date()
    }
},
{collection: 'logs'}
)

module.exports = Log = mongoose.model('logs', Log)