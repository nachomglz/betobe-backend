"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PlayerSchema = new mongoose_1.Schema({
    name: String,
    surname: String,
    description: String,
    email: String,
    phone: String,
    birthdate: Date,
    weight: Number,
    height: Number,
    country: String,
    image: { type: String, default: "profile_placeholder.jpg" },
    agency: {
        agecy_name: String,
        agency_phone: String,
        agency_email: String,
        agency_extra: String,
    },
    laterality: String,
    position: String,
    passports: [{ country: String }],
    videos: [{ video_name: String, video_url: String }],
    current_team: { type: String, default: null },
    player_status: { type: String, default: null },
    uploaded: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)("Player", PlayerSchema);
