const express = require('express')
const router = express.Router();
const passport = require('passport');
const usercontroller = require('../controllers/user')
// const passport = require('passport');

const isAuthenticated = usercontroller.isAuthenticated
router.post("/login" , usercontroller.login)
// router.post('/login', passport.authenticate('local'))

router.post("/save" , usercontroller.signup)
router.get("" , usercontroller.getUsers)
// router.get("/profile" , usercontroller.userProfile)
router.get('/profile/:userId' , usercontroller.userProfile)
// router.get('/userTicket/:userID' , isAuthenticated, usercontroller.userTicket)
router.get('/userTicket/:userID' , usercontroller.userTicket)








module.exports = router