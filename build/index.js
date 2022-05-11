"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Import needed modules to run the application
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Import express app
const app_1 = __importDefault(require("./app"));
// Configure dotenv to load variables from .env file
dotenv_1.default.config();
// Asign .env file variables to const variables
const PORT = process.env.PORT;
const MONGO_URL = (_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : "";
mongoose_1.default
    .connect(MONGO_URL, {
    useNewUrlParser: true,
})
    .then(() => {
    console.log("Connected to MongoDB");
    app_1.default.listen(PORT, () => {
        console.log(`App listening on port ${process.env.PORT}`);
    });
})
    .catch((err) => {
    console.log(err);
});
