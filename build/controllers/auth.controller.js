"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_config_1 = __importDefault(require("../config/auth.config"));
const user_model_1 = __importDefault(require("../models/user.model"));
const signup = (req, res) => {
    const user = new user_model_1.default({
        username: req.body.username,
        password: bcrypt_1.default.hashSync(req.body.password, 8),
    });
    user.save((err, user) => {
        if (err) {
            return res.status(500).send({
                status: "failed",
                message: err.message || "Some error occurred while creating the user.",
            });
        }
        if (user) {
            return res.status(200).send({
                status: "success",
                message: "User created successfully",
                user,
            });
        }
    });
};
const signin = (req, res) => {
    user_model_1.default.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(500).send({
                status: "failed",
                message: err.message || "Some error occurred while finding the user.",
            });
        }
        if (!user) {
            return res.status(404).send({
                status: "failed",
                message: "Invalid username or password",
            });
        }
        if (bcrypt_1.default.compareSync(req.body.password, user.password)) {
            const expireTime = 86400;
            const token = jsonwebtoken_1.default.sign({ id: user._id }, auth_config_1.default.secret, {
                expiresIn: expireTime,
            });
            res.cookie("x-access-token", token, {
                expires: new Date(Date.now() + expireTime),
                secure: false,
                httpOnly: true,
            });
            return res.status(200).send({
                status: "success",
                message: "Authentication successful!",
            });
        }
        return res.status(404).send({
            status: "failed",
            message: "Invalid username or password",
        });
    });
};
exports.default = { signup, signin };
