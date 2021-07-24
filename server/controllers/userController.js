import User from '../models/User.js';

// save new user in the database
const saveUser = async (request, response) => {
    const newUser = new User({
        username: request.body.username,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        photo: request.body.photo,
    });

    try {
        // save new User in the database
        const savedUser = await newUser.save();
        response.status(200).json(savedUser);
    } catch (error) {
        response.status(500).json(error);
    }
}



// get detail of a specific user
const getUser = async (request, response) => {
    try {
        const user = await User.find({ _id: request.params.userId });
        response.status(200).json(user[0]);
    } catch (error) {
        response.status(500).json(error);
    }
}


export { saveUser, getUser};
