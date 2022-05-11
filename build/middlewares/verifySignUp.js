"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const checkDuplicateUsername = (req, res, next) => {
    // Username
    user_model_1.default.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ status: "failed", message: err });
        }
        if (user) {
            return res.status(400).send({
                status: "failed",
                error: "Username already exists",
            });
        }
        next();
    });
};
exports.default = {
    checkDuplicateUsername,
};
