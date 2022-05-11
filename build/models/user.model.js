"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = (0, mongoose_1.model)("User", new mongoose_1.Schema({
    username: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
}));
