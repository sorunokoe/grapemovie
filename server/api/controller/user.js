const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = {
    create: function(req, res, next) {
        console.log(req.body)
        userModel.find({'email': req.body.email})
            .exec()
            .then(docs => {
                if(docs.length == 0){
                    userModel.create({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: req.body.password
                    }, function (err, result) {
                        if (err)
                            next(err);
                        else {
                            res.json({
                                status: "success",
                                message: "User added successfully!",
                                data: result
                            });
                        }
                    });
                }else{
                    res.status(200).json({
                        "status": "error",
                        "message": "User is already exist."
                    })
                }
            })
            .catch(next)
    },
    authenticate: function(req, res, next) {

        console.log(req.body.email)

        userModel.findOne({email: req.body.email}, function(err, userInfo){
            if (err) {
                next(err);
            } else {
                if (userInfo) {
                    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                        const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: '1h'});
                        res.json({status: "success", data: {user: userInfo, token: token}});
                    } else {
                        res.json({status: "error", message: "Invalid email/password!", data: null});
                    }
                }else{
                    res.json({status: "error", message: "Invalid email/password!", data: null});
                }
            }
        });
    },
}