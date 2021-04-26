logCtrl = {}
const date = require('date-and-time');
const Log = require("../models/time")
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};



function convertMS(milliseconds) {
  var day, hour, minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }
  return {
    day: pad(day),
    hour: pad(hour),
    minute: pad(minute),
    seconds: pad(seconds)
  };
}

logCtrl.createLogEntry = async(req,res) => {
  try {        
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const rawNow = Date.now()
    const today = new Date(rawNow)
    const nowDayTime = today.toLocaleDateString('es-MX', options) + " " +today.toLocaleTimeString('en-US')
    const entry = {
      full_name: req.body.full_name,
      entryDayTime: nowDayTime,      
      rawEntry: rawNow,
      complete: false
    }    
    Log.create(entry).then((entry) => {
      res.json({status: entry.now + " registrado."})
    })
    .catch((err)=> {
      res.send("error: "+err)
    })    
  }
  catch(err){
    res.status(400).json({ err: err });
  }
};

logCtrl.beginPause = async(req,res) => {
  const rawIn = Date.now()
  const today = new Date(rawIn)
  const nowDayTime = today.toLocaleDateString('es-MX', options) +" " + today.toLocaleTimeString('en-US')  
  const pause = {
    rawPauseBegin:rawIn,      
    pauseFrom:nowDayTime,            
    pauseReason:req.body.pauseReason,
    rawPauseEnd: '',
    pauseTo: '', 
    pauseDuration: ''
  }
  var arr = [pause]
  Log.find({full_name:req.body.full_name}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    const obj = doc[doc.length - 1];      
    Log.findOneAndUpdate(
      { _id: obj._id },
      {
        $push: {
          pauses: { $each: [pause], $position: 0 }, 
        }
      },
      { upsert: true } // return updated post      
    ).exec(function(err) {
      if (err) {
        console.log(err);
      }
    })
    res.json("Updated")
  })
}

logCtrl.endPause = async(req,res)=> {
  const rawNow = Date.now()
  const today = new Date(rawNow)
  const nowDayTime = today.toLocaleDateString('es-MX', options) +" " + today.toLocaleTimeString('en-US')      
  Log.find({full_name:req.body.full_name}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    const obj = doc[doc.length - 1];    
    let dur = convertMS(rawNow - obj.pauses[0].rawPauseBegin);
    const timeStr = dur.hour + ':' + dur.minute + ':' + dur.seconds;
    Log.findOneAndUpdate(
      { _id: obj._id },
      {
        $set: {          
          "pauses.0.rawPauseEnd": rawNow,
          "pauses.0.pauseTo":nowDayTime,
          "pauses.0.pauseDuration":timeStr                    
        }        
      },
      { new: true } // return updated post      
    ).exec(function(err) {
      if (err) {
        console.log(err);
      }
    })
    res.json("Updated")
  })
}

logCtrl.updateLogExit = async(req, res) => {
  
  const rawNow = Date.now()
  const today = new Date(rawNow)
  const nowDayTime = today.toLocaleDateString('es-MX', options) +" " + today.toLocaleTimeString('en-US')  
  
  Log.find({full_name:req.body.full_name}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    const obj = doc[doc.length - 1];
    
    let dur = convertMS(rawNow - obj.rawEntry);
    const timeStr = dur.hour + ':' + dur.minute + ':' + dur.seconds;
    Log.findOneAndUpdate(
      { _id: obj._id },
      {
        $set: {
          exitDayTime: nowDayTime,
          rawExit: rawNow,
          complete: true,
          duration: timeStr
        }
      },
      { new: true } // return updated post
      
    ).exec(function(err) {
      if (err) {
        console.log(err);
      }
    })
    res.json("Updated")
  })
};

logCtrl.getEntries = async(req, res) => {
  Log.find().then(logs => res.json(logs))
    .catch((err) =>{
      console.log(err)
    })  
}

module.exports = logCtrl;