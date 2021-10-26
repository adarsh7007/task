let mongoose = require("mongoose");
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const getUser = function (req, res, next) {

    console.log('hit')
    User.find({}).exec((error, User) => {
        if (error)
            return res.status(500).json({
                error: failed
            })
        if (User)
            return res.status(200).json({
                User
            })
    })

}
const signup = (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .exec((error, user) => {
            if (user)
                return res.status(200).json({
                    message: 'register'
                });
            const {
                firstname,
                lastname,
                email,
                password
            } = req.body;
            const _user = new User({
                firstname,
                lastname,
                email,
                password,
                username: Math.random().toString()
            })
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        error: 'wrong'
                    })
                }
                if (data) {
                    return res.status(200).json(data)
                }
            });
        })
}

const login = (req, res) => {
    console.log('hit')
    User.findOne({
        email: req.body.email
    }).exec((error, user) => {
        if (error)
            return res.status(400).json({
                error: 'somethingwrong'
            });
        if (user) {
            if (user.authenticate(req.body.password)) {
                const token = jwt.sign({
                    _id: user._id
                }, process.env.jwt_SECRET, {})
                const {
                    firstname,
                    lastname,
                    email,
                    fullname

                } = user;
                res.status(200).json({
                    token,
                    user: {
                        firstname,
                        lastname,
                        email,
                        fullname

                    }
                })
            } else {
                return res.status(400).json({

                })
            }

        } else {
            return res.status(400).json({

            })
        }
    })
}
module.exports={
    getUser,signup,login
}