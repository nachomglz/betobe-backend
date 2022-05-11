"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import server modules
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// Import server routes
const router_1 = __importDefault(require("./routes/router"));
// Create express app
const app = (0, express_1.default)();
//Enable json body parsing and url encoding
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Enable cookie-parser
app.use((0, cookie_parser_1.default)());
// Use express fileupload
app.use((0, express_fileupload_1.default)({
    createParentPath: true,
}));
// Activate CORS
app.use((0, cors_1.default)({
    origin: "*",
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Access-Control-Allow-Request-Method",
        "X-Access-Token",
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    // exposedHeaders: ["X-Access-Token"],
}));
// Configure routes
app.use("/api", router_1.default);
// Export app
exports.default = app;
