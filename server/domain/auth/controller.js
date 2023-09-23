import generateToken from "../../utils/generateToken.js";
import User from "./model.js";

export async function verifyUser(req, res) {
    const email = req.body.email;
    const pass = req.body.pass;
    const user = await User.findOne({email});
    console.log(email, user);
    if (user.length === 0) {
        throw new Error("email not registered signup");
    }
    const passMatch = user.pass === pass;
    if (passMatch) {
        const token = generateToken(user.id);
        res.json({msg: "login success", token, name: user.name, email: email});
    } else {
        res.status(403).json({msg: "wrong credential"});
    }
}

export async function registerUser(req, res) {
    const email = req.body.email;
    const pass = req.body.pass;
    const name = req.body.name;
    if (!validEmail(email)) {
        res.status(401).json("not a valid email");
        return;
    }
    if (!validName(name)) {
        res.status(403).json("not a valid username");
        return;
    }
    const user = await User.find({email});
    if (user.length > 0) {
        res.status(403).json("email already taken login");
        return;
    }
    const tempUser = new User({
        email,
        pass,
        name,
    });
    await tempUser.save();
    let token = generateToken(tempUser.id);
    res.json({msg: "signup successful", token: token});
}

function validEmail(email) {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function validName(name) {
    let regex = /^[a-zA-Z0-9._-]+$/;
    return regex.test(name);
}
