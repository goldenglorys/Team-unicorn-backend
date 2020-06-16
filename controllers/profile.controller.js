import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// Get user profile details

class ProfileController {

    getProfile(req, res, next) {
        const { id } = req.params;
        User.findById(id).select('firstname lastname username email _id').then(
            result => {
                res.status(200).json({
                    status: 200,
                    message: 'success',
                    data: result,
                    request: {
                        type: "GET",
                        url: `http://${req.headers.host}/api/v1/auth/profile/:${id}`
                    }
                })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    message: 'An error ocuur',
                    error: err
                })
            })
    }

}



export default new ProfileController();