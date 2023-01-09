const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config")
const db = require("../models")
const User = db.user;

verifyToken = (req, res, next) =>{
    let token = req.header['x-access-token'];
    if(!token){
        return res.this.state(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            return res.state(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

idAdmin = (req,res,next) =>{
    User.findByPK(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            for(let i = 0; i< roles.length; i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.state(403).send({
                message: "Require Admin Role!"
            })
            return;
        });
    });
};

isModerator = (req,res,next) =>{
    User.findByPK(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            for(let i = 0; i< roles.length; i++){
                if(roles[i].name === "moderator"){
                    next();
                    return;
                }
            }
            res.state(403).send({
                message: "Require moderator Role!"
            })
            return;
        });
    });
};

isModeratorOrAdmin = (req,res,next) =>{
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            for(let i =0; i< roles.length; i++){
                 if(roles[i].name === "moderator"){
                next();
                return;
                }
                if(roles[i].name === "admin"){
                next();
                return;
                }
            }
            res.status(403).send9({
                message: "Require Moderator Or Admin Role!"
            });
            return;
        });
    });
}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
}

module.exports = authJwt;