"use strict";
const Router = require("express");
const images = require("./Controllers/images");
const secure = require("./Controllers/security");
const authMiddleware = require("./middleware/auth");
const router = Router();
const albums = require("./Controllers/albums");

//Photo routes
router.get("/",  images.getPhotos);
router.post("/upload",  images.uploadPhoto);
router.delete("/delete",  images.deletePhoto);
router.put("/like",  images.addLike);

//login routes

router.post("/register", secure.registerUser);
router.post("/login", secure.login);
router.post("/logout",  secure.logout);
// router.get("/users", secure.getUsers);
router.get("/refresh", secure.refreshUser);
// Album routes

router.post("/newAlbum",  albums.createAlbum);
router.post("/album",  albums.getAlbum);
router.post("/share-album",  albums.shareAlbum);
router.post("/accept-invite", albums.acceptAlbum);
router.delete("/album",  albums.deleteAlbum);
router.put("/album",  albums.removeSharedAlbum);
router.put("/reject-invite",  albums.rejectAlbum);
module.exports = router;
