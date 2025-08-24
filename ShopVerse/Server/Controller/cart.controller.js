import { cartCollection } from "../Model/cart.model.js";


export async function createCart(req, res) {
    try {
        let userId = req.user._id

        await cartCollection.create({ user: userId })
        res.json({ Message: "Success", Data: req.user })
    } catch (error) {
        res.status(400).json({ Message: `${error}` })
    }

}