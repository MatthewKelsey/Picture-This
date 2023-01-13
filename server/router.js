"use strict";
const Router = require("express");
const images = require("./Controllers/images");
const secure = require("./Controllers/security")
const authMiddleware = require('./middleware/auth')
const router = Router();

//Photo routes
router.get("/",authMiddleware, images.getPhotos);
router.post("/upload", authMiddleware, images.uploadPhoto);
router.delete("/delete",authMiddleware, images.deletePhoto);
router.put("/like", authMiddleware, images.addLike);

//login routes

router.post('/register' ,  secure.registerUser)
router.post('/login',  secure.login)
router.post('/logout', authMiddleware,secure.logout)
router.get('/users' , secure.getUsers)


module.exports = router;