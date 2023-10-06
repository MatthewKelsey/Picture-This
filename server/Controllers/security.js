const User = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const saltRounds = 15;

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ message: "User already exists", status: 409 });
  try {
    if (password === "") throw new Error();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const user = await newUser.save();
    req.session.uid = user._id;
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error + "Could not create user" });
  }
};
exports.refreshUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.uid }).populate({
      path: "uploadedAlbums sharedAlbums pendingInvite",
      populate: { path: "photos" },
    });

    res.status(200);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate({
      path: "uploadedAlbums sharedAlbums pendingInvite",
      populate: { path: "photos" },
    });

    if (!user) {
      return res
        .status(401)
        .send({
          error: "Invalid email",
          message: "Email and/or password incorrect",
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(401)
        .send({
          error: "Incorrect password",
          message: "Email and/or password incorrect",
        });
    }

    req.session.uid = user._id;
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        error: "Internal server error",
        message: "An error occurred during login",
      });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error + "Could not log out please try again");
    } else {
      res.clearCookie("sid");
      console.log("cookie cleared");
      res.status(200).send({ message: "Logout succesful" });
    }
  });
};

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.send(allUsers);
    res.status(200);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ email: req.body.email });

    res.send(deletedUser);
    res.status(200);
  } catch (error) {
    console.log(error);
  }
};
