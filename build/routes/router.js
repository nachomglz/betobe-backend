"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_middlewares_1 = require("../middlewares/index.middlewares");
// Import controllers
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const players_controller_1 = __importDefault(require("../controllers/players.controller"));
// Import validator
const dataValidation_1 = __importDefault(require("../middlewares/dataValidation"));
const router = (0, express_1.Router)();
// Admin routes, with /admin prefix
router.post("/admin/signup", [index_middlewares_1.verifySignUp.checkDuplicateUsername], auth_controller_1.default.signup);
router.post("/admin/signin", auth_controller_1.default.signin);
// Players routes, with /players route before endpoint
router.get("/players/get", [index_middlewares_1.authJwt.verifyToken], players_controller_1.default.getPlayers);
router.get("/players/get/:id", [index_middlewares_1.authJwt.verifyToken], players_controller_1.default.getPlayer);
// predelete and preselect players
router.put("/player/set/:id/:status", [index_middlewares_1.authJwt.verifyToken], players_controller_1.default.changeStatus);
router.get("/players/predeleted", [index_middlewares_1.authJwt.verifyToken], players_controller_1.default.getPredeleted);
router.get("/players/preselected", [index_middlewares_1.authJwt.verifyToken], players_controller_1.default.getPreselected);
// Delete player
router.delete("/player/delete/:id", [index_middlewares_1.authJwt.verifyToken], players_controller_1.default.deletePlayer);
// Image routes
router.get("/players/image/:image_name", players_controller_1.default.getImage);
router.post("/player/postImage/:id", players_controller_1.default.postImage);
// Save player in Database
router.post("/player/save", [index_middlewares_1.authJwt.verifyToken, dataValidation_1.default], players_controller_1.default.savePlayer);
exports.default = router;
