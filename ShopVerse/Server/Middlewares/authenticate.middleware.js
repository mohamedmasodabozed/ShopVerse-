import jwt from 'jsonwebtoken'
import { userCollection } from '../Model/user.model.js'


export async function authenticate(req, res, next) {
    try {
        let token = req.headers.authorization
        if (!token) return res.status(401).json({ Message: "Missing Token" })
        let payLoad = jwt.verify(token, process.env.SECRET_TOKEN)
    
        
        let user = await userCollection.findById(payLoad.id)
        if(!user) return res.status(404).json({ Message: "User Not Found" })
        req.user = user
        next()
    } catch (error) {
        return res.status(400).json({ Message: `${error}` })
    }
}


export function restricto(...roles){

    return function check(req,res,next){
        
        if(!roles.includes(req.user.role)) return res.status(401).json({Message:"Unauthorized"})
        next()
    }
}
