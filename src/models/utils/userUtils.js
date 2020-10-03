'use strict';
//=============================================================================
/**
 * Module dependencies
 */
//=============================================================================
const User = require('../users'),
    _ = require('lodash');
//=============================================================================
/**
 *  CRUD users
 */
//=============================================================================



exports.createUser = (doc) => {
    if (_.isEmpty(doc)) {
        return Promise.reject("Missing Feilds");
    }
    let newUser = new User(doc);
    return newUser.save(doc);
};


exports.getAllUser = () => {
    return User.find({})
        .exec()
        .then(result => {
            if (_.isEmpty(result)) {
                return Promise.reject('No users found');
            } else return result;
        })
        .catch(e => {
            console.log("getAllUser: ", e);
            return Promise.reject(e);
        })
};

exports.getUser = (filter) => {

    if (_.isEmpty(filter)) {
        return Promise.reject(error_codes.MissingFields);
    } else if (_.isString(filter)) {
        filter = { name: filter }
    }

    return User.find(filter)
        .exec()
        .then(result => {
            if (_.isEmpty(result)) {
                return false
            } else return result;
        })
        .catch(e => {
            console.log("getUser: ", e)
            return Promise.reject(e)
        })

};

exports.deleteUser = (filter) => {

    if (_.isEmpty(filter)) {
        return Promise.reject(error_codes.MissingFields);
    }

    return User.findOneAndRemove(filter)
        .exec();


};

exports.updateUser = (filter, update) => {

    if (_.isEmpty(filter) || _.isEmpty(update)) {
        return Promise.reject(error_codes.MissingFields);
    }
    console.log(JSON.stringify(filter) + JSON.stringify(update))

    return User.findOneAndUpdate(filter, update, { new: true, setDefaultsOnInsert: true }).exec()
        .catch(err => {
            return Promise.reject(err);
        });

};

exports.upsertUser = (User) => {
    if (_.isEmpty(User)) {
        return Promise.reject(error_codes.MissingFields)
    }

    User = _.isArray(User) ? User : [User];
    let Promises = User.map(user => {
        if (_.isEmpty(user.name)) {
            return Promise.reject(`Missing fields for User ${JSON.stringify(user)}`)
        }
        return User.findOneAndUpdate({ name: utils.standardise(user.name) }, user, {
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true,
            new: true
        }).exec()
    }
    );

    return Promise.all(Promises.map(p => p.catch(e => e)))
};



