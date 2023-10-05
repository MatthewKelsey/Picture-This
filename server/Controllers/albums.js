const Album = require("../Models/albumSchema");
const User = require("../Models/userSchema");
const { use } = require("../router");

exports.getAlbum = async (req, res) => {
  try {
    const album = await Album.findOne({ _id: req.body._id }).populate("photos");
    res.status(200);
    res.send(album);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.createAlbum = async (req, res) => {
  console.log("request", req.body);
  try {
    const newAlbum = await Album.create({
      albumName: req.body.albumName,
      owner: req.body.uploader,
    });
    const user = await User.findOne({ _id: req.body.uploader });
    console.log(user);
    let userAlbums = user.uploadedAlbums;
    userAlbums.push(newAlbum);
    user.uploadedAlbums = userAlbums;

    user.save();

    res.status(201);
    res.send(newAlbum);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
exports.deleteAlbum = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ _id: req.body.user });
    const deletedAlbum = await Album.findOneAndDelete({
      _id: req.body.albumId,
    });

    const albumIndex = user.uploadedAlbums.indexOf(req.body.albumId);
    if (albumIndex !== -1) {
      user.uploadedAlbums.splice(albumIndex, 1);
      await user.save();
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the album.");
  }
};
exports.shareAlbum = async (req, res) => {
  try {
    const invitedUser = await User.findOne({ email: req.body.email });

    const invitedAlbum = req.body.albumId;
    let pending = invitedUser.pendingInvite;
    pending.push(invitedAlbum);
    invitedUser.pendingInvite = pending;
    invitedUser.save();
    res.status(201);
    res.send(invitedAlbum);
  } catch (error) {
    console.log(error);
  }
};

exports.rejectAlbum = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.user });
    const album = req.body._id;
    pendingInvites = user.pendingInvite;
    const index = pendingInvites.indexOf(album);
    const newInvites = pendingInvites.filter((element) => {
      return element != album;
    });
    user.pendingInvite = newInvites;
    user.save();
    res.status(204);
    res.send();
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};

exports.acceptAlbum = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.uid });
    const pending = req.body.albumId;
    const newAlbum = await Album.findOne({ _id: pending }).populate("photos");

    const currentSharedAlbums = user.sharedAlbums;
    currentSharedAlbums.push(pending);

    user.sharedAlbums = currentSharedAlbums;
    let pendingList = user.pendingInvite;
    const index = pendingList.indexOf(pending);
    pendingList.splice(index, [index + 1]);

    user.pendingInvite = pendingList;
    user.save();

    res.status(201);
    res.send(newAlbum);
  } catch (error) {
    console.log(error);
  }
};

exports.removeSharedAlbum = async (req, res) => {
  try {
    const album = req.body.albumId;

    const user = await User.findOne({ _id: req.body.user });
    const sharedAlbums = user.sharedAlbums;

    let index = sharedAlbums.indexOf(album);

    sharedAlbums.splice(index, 1);

    user.sharedAlbums = sharedAlbums;
    user.save();
    res.status(204);
    res.send();
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};
