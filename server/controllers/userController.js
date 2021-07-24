import User from '../models/User.js';

// save new user in the database
const saveUser = async (request, response) => {
    try {
        const user = await User.findOne({ username: request.body.username });
        if (user) {
            response.status(200).json({ message: "User is already registered!", user: user })
        }
        else {
            const newUser = new User({
                username: request.body.username,
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                photo: request.body.photo ? request.body.photo : "",
            })

            // save new User in the database
            const savedUser = await newUser.save();
            response.status(200).json({ message: "User has been registered!", user: savedUser });
        }
    } catch (error) {
        response.status(500).json(error);
    }
}


// get detail of a specific user
const getUser = async (request, response) => {
    const userId = request?.query?.userId;
    const username = request?.query?.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        response.status(200).json(user);
    } catch (err) {
        response.status(500).json(err);
    }
}


export { saveUser, getUser };
