import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const signUp = (req, res) => {
    const { firstName, lastName, email, username, password, isAdmin } = req.body;

    if (!firstName || !lastName || !email || !username || !password || !isAdmin) {
        return res.status(200).json({ message: 'Please enter all fields' });
    }

    User.findOne({ email })
        .then(user => {
            if (user) return res.json({ status: 400, message: 'User already exists' })

            const newUser = new User({
                firstName,
                lastName,
                email,
                username,
                password,
                isAdmin
            });

            bcrypt.genSalt(10, (err, salts) => {
                bcrypt.hash(newUser.password, salts, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                process.env.JWT_SECRET,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        status: 200,
                                        data: {
                                            token,
                                            id: newUser.id,
                                            username: newUser.username,
                                            email: newUser.email,
                                            password: newUser.password
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
}


const signIn = (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.json({ status: 404, message: 'User not found, please provide valid credentials' });
            }

            bcrypt.compare(password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.json({ status: 403, message: 'Incorrect username or password, please review details and try again' });
                    }
                    const token = jwt.sign(
                        { email: user.email, id: user.id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 }
                    );

                    res.json({
                        status: 200,
                        data: {
                            id: user.id,
                            token,
                            message: 'User Logged in Sucessfully'
                        }
                    });
                });
        })
        .catch(err => console.log(err));
}

//Get user profile details

const profile = (req, res, next) => {
    const { id } = req.params;
    User.findById(id).select('firstname lastname username email _id').then(
        result => {
            res.status(200).json({
                status: 200,
                message: 'success',
                data: result,
                request: {
                    type: "GET",
                    url: `http://${req.headers.host}/api/v1/auth/profile/:${user_id}`
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


export { signUp, signIn, profile };

