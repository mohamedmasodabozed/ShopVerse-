import { productCollection } from '../Model/product.model.js'
import { userCollection } from '../Model/user.model.js'

export async function signUp(req, res) {
    try {

        let body = req.body

        let user = await userCollection.create(body)
        res.json({ Message: "Success", Data: user })
    } catch (error) {
        res.status(400).json({ Message: `${error}` })
    }

}


export async function signIn(req, res) {
    try {
        let { email, password } = req.body

        if (!email | !password) res.status(400).json({ Message: "Missing information" })
        let user = await userCollection.findOne({ email: email })
        if (!user) res.status(400).json({ Message: "Email or Password is Incorrect" })

        let verifyPass = await bcrypt.compare(password, user.password)
        if (!verifyPass) res.status(400).json({ Message: "Email or Password is Incorrect" })

        let token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET_TOKEN, { expiresIn: '10h' })
        res.json({ Message: "Success", Data: user, token: token })
    } catch (error) {
        res.status(400).json({ Message: `${error}` })
    }
}