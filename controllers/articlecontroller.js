articleCtrl = {}
const Article = require("../models/article")

articleCtrl.createArticle = async(req,res) => {
  try {                    
    const article = {
      name: req.body.name,
      amount: req.body.amount,
      description:req.body.description,
      price:req.body.price,
      acquiredAt: req.body.acquiredAt,
      area:req.body.area,
      project:req.body.project,
      comments:req.body.comments,
      createdAt: new Date().toLocaleTimeString('es-MX',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:"2-digit", minute:"numeric",second:"numeric"}),
      updatedAt: new Date().toLocaleTimeString('es-MX',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:"2-digit", minute:"numeric",second:"numeric"})
    }    
    Article.create(article).then((article) => {
      res.json({status: article.name + " registrado."})
    })
    .catch((err)=> {
      res.send("error: "+err)
    })    
  }
  catch(err){
    res.status(400).json({ err: err });
  }
};

articleCtrl.updateArticle = async(req,res) => {
  const article = {
    name: req.body.name,
    amount: req.body.amount,
    description:req.body.description,
    price:req.body.price,
    acquiredAt: req.body.acquiredAt,
    area:req.body.area,
    project:req.body.area,
    comments:req.body.comments,
    updatedAt: new Date().toLocaleTimeString('es-MX',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:"2-digit", minute:"numeric",second:"numeric"})
  }  
  Article.findById({_id:req.body._id}).exec(function(err) {
    if (err) {
      console.log(err);
    }    
    Article.findOneAndUpdate(
      { _id: obj._id }, article,
      { upsert: true } // return updated post      
    ).exec(function(err) {
      if (err) {
        console.log(err);
      }
    })
    res.json("Updated")
  })
}

articleCtrl.deleteArticle = async(req,res) => {
  Article.findByIdAndDelete({_id:req.body._id}, function(err, docs){
    if (err){
      console.log(err)
    }
    else{
      res.json("Deleted : ", docs);
    }
  });
}

articleCtrl.getArticlesByArea = async(req,res) => {
  Article.find({area: req.body.area}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      res.json(docs);
    }
  })
}

module.exports = articleCtrl;