import generateToken from "../../utils/generateToken.js";
import User from "./model.js";

export async function verifyUser({email, pass}) {
    const user = await User.findOne({email});
    console.log(email, user);
    if (user.length === 0) {
        throw new Error("email not registered signup");
    }
    const passMatch = user.pass === pass;
    if (passMatch) {
        const token = generateToken(user.id);
        return {msg: "Login success", token: token, name: user.name, email: user.email};
    } else {
        return {msg: "wrong credential"};
    }
}

export async function registerUser({email, pass, name}) {
    if (!validEmail(email)) {
        throw new Error("not a valid email");
    }
    if (!validName(name)) {
        throw new Error("not a valid username");
    }
    const user = await User.find({email});
    if (user.length > 0) {
        throw new Error("email already taken login");
    }
    const tempUser = new User({
        email,
        pass,
        name,
    });
    await tempUser.save();
    let token = generateToken(tempUser.id);
    return {msg: "signup successful", token: token};
}

function validEmail(email) {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function validName(name) {
    let regex = /^[a-zA-Z0-9._-]+$/;
    return regex.test(name);
}
