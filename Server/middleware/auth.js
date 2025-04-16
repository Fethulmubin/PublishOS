import jwt from 'jsonwebtoken';
import { signupWithGoogleCheck } from '../controllers/users.js';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log({"token" : token})
        //if it is >500 it;s google's token 
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            const id = decodedData?.sub;
            const email = decodedData?.email;
            const name = decodedData?.name;
            const password = decodedData?.jti;
            req.userId = await signupWithGoogleCheck(id, email, name, password);
        }
        // console.log(decodedData)
        next();
    } catch (error) {
        // console.log(error);
        res.status(500).json({success: false, message: 'Unauthorized user'})
    } 
}
export {auth}