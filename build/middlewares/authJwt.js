"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../config/auth.config"));
const verifyToken = (req, res, next) => {
    next();
    return;
    let token = req.cookies["x-access-token"];
    if (!token)
        return res.status(403).send({ auth: false, message: "No token provided." });
    jsonwebtoken_1.default.verify(token, auth_config_1.default.secret, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .send({ auth: false, message: "Failed to authenticate token." });
        }
        next();
    });
};
exports.default = { verifyToken };
