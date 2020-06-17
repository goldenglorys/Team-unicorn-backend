import Profile from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// Get user profile details

class ProfileController {

    getProfile(req, res, next) {
        const { _id } = req.params;
        Profile.findById(_id).select('firstname lastname username email _id').then(
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

    getProfiles(req, res) {
        const { _id } = req.params;
        Profile.find()
            .then((err, foundObject) => {
                if (err) return res.json({ status: 400, message: 'There is an error' })
                res.json({
                    status: 200,
                    data: foundObject
                })
            })
            .catch(err => res.json({
                status: 404,
                data: err
            }))
    }

    deleteProfile(req, res) {
        const { _id } = req.params;
        Profile.findOneAndRemove(_id)
            .then((err) => {
                if (err) return res.json({ status: 400, message: 'No user with the specified Id' });
                res.json({
                    status: 200,
                    message: 'The profile is deleted successfully',
                })
            })
            .catch(err => res.json({
                status: 404,
                message: 'No profile found!',
            }))
    }
}



export default new ProfileController();