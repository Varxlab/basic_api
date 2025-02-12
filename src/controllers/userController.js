const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRECT_Key = "NOTESAPI";

const signup = async (req, res) => {
    //Existing user check

    //hash password
    //user creation
    //token generate

    const { username, email, password } = req.body;
    try {

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }


        const hashPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashPassword,
            username: username
        });

        const token = jwt.sign({ email: result.email, id: result._id }, SECRECT_Key);
        res.status(201).json({ user: result, token: token });

    } catch (error) {

        console.log("error :", error);
        res.status(500).json({ message: 'something went wrong' });
    }
}

const signin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRECT_Key);
        res.status(201).json({ user: existingUser, token: token });

    } catch (error) {
        console.log("error :", error);
        res.status(500).json({ message: 'something went wrong' });
    }
}

module.exports = { signup, signin };