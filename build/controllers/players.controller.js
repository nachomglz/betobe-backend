"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Import player model
const player_model_1 = __importDefault(require("../models/player.model"));
const controller = {
    savePlayer: (req, res) => {
        // Create player object from model and save the player
        const player = new player_model_1.default(req.body);
        player.save((err, player) => {
            if (err || !player) {
                res.status(500).send({
                    status: "failed",
                    message: "Ha ocurrido un error en el registro, por favor, inténtelo más tarde.",
                });
            }
            else {
                res.status(200).send({
                    status: "success",
                    message: "Jugador guardado correctamente",
                    player,
                });
            }
        });
    },
    getPlayers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let filters = {};
        // Do Find in mongoDB
        if (req.query.filters) {
            filters = JSON.parse(req.query.filters);
            if (filters.birthdate) {
                filters.birthdate = {
                    $gte: new Date(filters.birthdate).toISOString(),
                };
            }
            for (let i in filters) {
                if (!isNaN(filters[i])) {
                    filters[i] = { $gte: parseFloat(filters[i]) };
                }
            }
            filters.player_status = null;
        }
        try {
            const players = yield player_model_1.default.find(filters).sort("-updated");
            return res.send({
                status: "success",
                players,
            });
        }
        catch (e) {
            console.log(e);
            return res.status(500).send({
                status: "failed",
                message: "Error al obtener los jugadores",
            });
        }
    }),
    getPlayer: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const player = yield player_model_1.default.findById(id);
            return res.send({
                status: "success",
                player,
            });
        }
        catch (e) {
            console.log(e);
            return res.status(500).send({
                status: "failed",
                message: "Error al obtener el jugador",
            });
        }
    }),
    getPredeleted: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Do Find in mongoDB
        try {
            const players = yield player_model_1.default.find({
                player_status: "predeleted",
            }).sort("-updated");
            return res.status(200).send({
                status: "success",
                players,
            });
        }
        catch (e) {
            console.log(e);
            return res.status(500).send({
                status: "failed",
                message: "Error al obtener los jugadores",
            });
        }
    }),
    getPreselected: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const players = yield player_model_1.default.find({
                player_status: "preselected",
            }).sort("-updated");
            return res.status(200).send({
                status: "success",
                players,
            });
        }
        catch (e) {
            console.log(e);
            return res.status(500).send({
                status: "failed",
                message: "Error al obtener los jugadores",
            });
        }
    }),
    getImage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { image_name } = req.params;
        try {
            const image_path = "./uploads/players/" + image_name;
            const default_image = "./img/profile_placeholder.jpg";
            console.log("llega a entrar al try");
            if (image_name === "profile_placeholder.jpg" ||
                image_name === null ||
                image_name === "" ||
                !fs_1.default.existsSync(image_path)) {
                return res.sendFile(path_1.default.resolve(default_image));
            }
            else {
                return res.sendFile(path_1.default.resolve(image_path));
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send({
                status: "failed",
                message: "Error al obtener la imagen",
            });
        }
    }),
    changeStatus: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, status } = req.params;
        // If the status is not valid, return error
        if (!["predeleted", "preselected", "return"].includes(status)) {
            return res.status(422).send({
                status: "failed",
                message: "El estado no es válido",
            });
        }
        try {
            // Find the player and update it, the "new" parameter is used to return the updated version of the player, and the player status depends, if the status requested is "return" it means that the status has to go null
            const result = yield player_model_1.default.findByIdAndUpdate(id, {
                player_status: status === "return" ? null : status,
            }, { new: true });
            if (result === null) {
                return res.status(404).send({
                    status: "failed",
                    message: "El jugador no existe",
                });
            }
            return res.status(200).send({
                status: "success",
                message: "Se ha cambiado el estado del jugador",
                result,
            });
        }
        catch (err) {
            return res.status(500).send({
                status: "failed",
                message: "Error al cambiar el estado del jugador",
            });
        }
    }),
    deletePlayer: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const result = yield player_model_1.default.findByIdAndDelete(id);
            if (result === null) {
                return res.status(404).send({
                    status: "failed",
                    message: "El jugador no existe",
                });
            }
            return res.status(200).send({
                status: "success",
                message: "Se ha eliminado el jugador",
                result,
            });
        }
        catch (err) {
            return res.status(500).send({
                status: "failed",
                message: "Error al eliminar el jugador",
            });
        }
    }),
    postImage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // await Player.updateMany({}, { $set: { image: null } });
            // return;
            const { id } = req.params;
            // If there's no req.files, no image was uploaded
            if (!req.files)
                return res.status(400).send({
                    status: "failed",
                    message: "No se ha subido ninguna imagen",
                });
            // The name of the input field (i.e. "image") is used to retrieve the uploaded file
            const { image } = req.files;
            // Get the extension of the image
            var image_ext = image.name.split(".");
            image_ext = image_ext[image_ext.length - 1];
            // Hash the image name, and replace the slashes with the word slash so it doesn't break the url
            const image_name = bcrypt_1.default.hashSync(image.name, 10) + "." + image_ext;
            const replaced_image_name = image_name.replace(/\//g, "slash");
            // If the player already has an image, we have to delete the old one and then update to the new one
            const player = yield player_model_1.default.findById(id);
            if (player === null) {
                return res.status(404).send({
                    status: "failed",
                    message: "Invalid ID, the user doesn't exist",
                });
            }
            // If the user has an image already, we have to delete the old one
            if (player.image !== null && player.image !== "") {
                const old_image_path = "./uploads/players/" + player.image;
                if (fs_1.default.existsSync(replaced_image_name)) {
                    fs_1.default.unlinkSync(replaced_image_name);
                }
            }
            // Once deleted, update the player with the new image
            yield player_model_1.default.findByIdAndUpdate(id, { image: image_name });
            // Move the image to the uploads folder
            image.mv(path_1.default.join("uploads", "players", replaced_image_name));
            return res.status(200).send({
                status: "success",
                message: "Se ha subido la imagen correctamente",
                data: {
                    name: image_name,
                    mimetype: image.mimetype,
                    size: image.size,
                },
            });
        }
        catch (e) {
            console.log(e.message);
            return res.status(500).send({
                status: "failed",
                message: "Error al subir la imagen",
            });
        }
    }),
};
exports.default = controller;
