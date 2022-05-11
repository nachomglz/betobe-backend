import express, { Request, Response, Router } from "express";
import { verifySignUp, authJwt } from "../middlewares/index.middlewares";

// Import controllers
import AuthController from "../controllers/auth.controller";
import PlayerController from "../controllers/players.controller";

// Import validator
import validateData from "../middlewares/dataValidation";

const router: express.Router = Router();

// Admin routes, with /admin prefix
router.post(
   "/admin/signup",
   [verifySignUp.checkDuplicateUsername],
   AuthController.signup
);
router.post("/admin/signin", AuthController.signin);

// Players routes, with /players route before endpoint
router.get("/players/get", [authJwt.verifyToken], PlayerController.getPlayers);
router.get(
   "/players/get/:id",
   [authJwt.verifyToken],
   PlayerController.getPlayer
);
// predelete and preselect players
router.put(
   "/player/set/:id/:status",
   [authJwt.verifyToken],
   PlayerController.changeStatus
);
router.get(
   "/players/predeleted",
   [authJwt.verifyToken],
   PlayerController.getPredeleted
);
router.get(
   "/players/preselected",
   [authJwt.verifyToken],
   PlayerController.getPreselected
);

// Delete player
router.delete(
   "/player/delete/:id",
   [authJwt.verifyToken],
   PlayerController.deletePlayer
);

// Image routes
router.get("/players/image/:image_name", PlayerController.getImage);
router.post("/player/postImage/:id", PlayerController.postImage);

// Save player in Database
router.post(
   "/player/save",
   [authJwt.verifyToken, validateData],
   PlayerController.savePlayer
);
export default router;
