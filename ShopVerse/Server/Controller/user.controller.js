import { productCollection } from '../Model/product.model.js'
import { userCollection } from '../Model/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export async function signUp(req, res,next) {
    try {
        let body = req.body;
        // Defensive: ensure userName is present
        if (!body.userName || !body.email || !body.password || !body.role) {
            return res.status(400).json({ Message: "Missing required fields" });
        }
        let user = await userCollection.create(body);
        req.user = user
        next()
        // res.json({ Message: "Success", Data: user });
    } catch (error) {
        // Always return a valid JSON response
        res.status(400).json({ Message: `${error}` });
    }

}


export async function signIn(req, res) {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ Message: "Missing information" });
        }
        let user = await userCollection.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ Message: "Email or Password is Incorrect" });
        }
        let verifyPass = await bcrypt.compare(password, user.password);
        if (!verifyPass) {
            return res.status(400).json({ Message: "Email or Password is Incorrect" });
        }
        let token = jwt.sign({ id: user._id,userName:user.userName, email: user.email, role: user.role },process.env.SECRET_TOKEN, { expiresIn: '10h' });
        res.json({ Message: "Success", Data: user, token: token });
    } catch (error) {
        res.status(400).json({ Message: `${error}` });
    }
}