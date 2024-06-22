const express = require('express');
const app = express();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const cors = require('cors');

const UserModel = require("./src/models/UserModel");

mongoose.connect("mongodb+srv://todolist:todo@todolistnew.1a8vtae.mongodb.net/").then(
    () => console.log("DB :)")
)

app.get('/', (req, res) => {
    res.send("Hello world!!!");
});

app.use(express.json());

app.use(cors({ origin: "*" }));

app.listen(5000, () => {
    console.log("Server running");
})

app.post('/register', async (req, res) => {
    try {
        const { rollNumber, email, password, confirmPassword, contact } = req.body;
        if (!/^\d{12}$/.test(rollNumber)) {
            return res.status(400).send("Invalid roll number");
        }
        let exist = await UserModel.findOne({ email });
        if (exist) {
            return res.status(400).send("user already exists");
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).send("Invalid email address");
        }
        if (password !== confirmPassword) {
            return res.status(400).send("Passwords dont match");
        }
        if (!/^\d{10}$/.test(contact)) {
            return res.status(400).send("Invalid contact");
        }
        let newUser = new UserModel({
            rollNumber,
            email,
            password,
            confirmPassword,
            contact
        });
        await newUser.save();
        res.status(200).send("User registered successfully");
    } catch (err) {
        console.log("This is the errror",err);
        return res.status(500).send("Internal server error");
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        let userExist = await UserModel.findOne({ email });
        if (!userExist) {
            return res.status(400).send("User not found");
        }
        if (userExist.password !== password) {
            return res.status(400).send("Invalid password");
        }
        let userPayload = {
            user: {
                id: userExist.id
            }
        };
        jwt.sign(userPayload, 'jwtSecret', { expiresIn: 3600000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token });
        });
    }
    catch (err) {
        res.status(500).send("Internal server error");
    }
})

app.get('/myprofile', middleware, async (req, res) => {
    try {
        let exist = await UserModel.findById(req.user.id)
        if (!exist) {
            res.status(400).send("Token not found");
        }
        res.json(exist);
    }
    catch (err) {
        res.status(500).send("Invalid token");
    }
})