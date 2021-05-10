const express = require ('express')
const router = express.Router()

const userCtrl = require('../controllers/usercontroller')
const logCtrl = require('../controllers/logcontroller')
const articleCtrl = require('../controllers/articlecontroller')

router.post('/login', userCtrl.logUser)
router.post('/register', userCtrl.registerNewUser)

router.post('/entry', logCtrl.createLogEntry)
router.post('/exit' , logCtrl.updateLogExit)
router.post('/pauseIn', logCtrl.beginPause)
router.post('/pauseOut',logCtrl.endPause)
router.get('/entries',logCtrl.getEntries)

router.post('/article/create', articleCtrl.createArticle)
router.post('/article/update', articleCtrl.updateArticle)
router.post('/article/delete', articleCtrl.deleteArticle)
router.get('/articles/:area',articleCtrl.getArticlesByArea)

module.exports = router