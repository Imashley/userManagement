'use strict';
//=============================================================================
/**
 * Module dependencies
 */
//=============================================================================
const


    express = require('express'),
    userUtils = require('../models/utils/userUtils.js');

//=============================================================================
/**
 * Router instance
 */
//=============================================================================
const router = express.Router();
//=============================================================================
/**
 * UserM Routes
 */
//=============================================================================
router.post('/register', (req, res) => {

    //ToDo finish returning correct error for duplicate keys on signup

    let doc = req.body;
    return userUtils.createUser(doc)
        .then(user => {
            console.log("create use error" + user)
            if (!user) {
                result = "User not created"
                return res.status(404).json(user);
            } else {
                return res.status(200).json(user);
            }
        }).catch(err => {
            console.log('/register err ' + JSON.stringify(err));
            return res.status(400).json(err);
        });
});


router.post('/login', (req, res) => {
    return userUtils.getUser(req.body)
        .then(result => {
            console.log("login successfull")
            if (!result) {
                result = "User not found"
                return res.status(209).json(result);
            } else {
                return res.status(200).json(result);
            }
        }).catch(err => {
            console.log('/login err ' + JSON.stringify(err));
            return res.status(400).json(JSON.stringify(err));
        });

});

//change password
router.put('/updateUser', (req, res) => {
    return userUtils.updateUser(req.body.filter, req.body.update)
        .then(value => {
            return res.status(200).json(value);
        }).catch(err => {
            console.log('/updateUser err ' + err);
            let error = JSON.stringify(err);
            return error.errmsg;
        });
});


//for delete account homepage button
router.delete('/deleteUser', (req, res) => {
    return userUtils.deleteUser(req.body)
        .then(response => {
            return res.status(200).json(response);
        }).catch(err => {
            let error = JSON.stringify(err);
            console.log('/deleteUser err ' + JSON.stringify(error));
            return error;

        });
});

//=============================================================================
/**
 * Export Router
 */
//=============================================================================
module.exports = router;
//=============================================================================
