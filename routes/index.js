const express = require ('express')
const router = express.Router()

const userCtrl = require('../controllers/usercontroller')
const logCtrl = require('../controllers/logcontroller')

router.post('/login', userCtrl.logUser)
router.post('/register', userCtrl.registerNewUser)

router.post('/entry', logCtrl.createLogEntry)
router.post('/exit' , logCtrl.updateLogExit)
router.post('/pauseIn', logCtrl.beginPause)
router.post('/pauseOut',logCtrl.endPause)
router.get('/entries',logCtrl.getEntries)

module.exports = router