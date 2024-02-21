import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc auth user and get the token
// @route GET /api/users/login
// @access Public

// Assuming you have a User model with 'allowedCoordinates' field
const authUser = asyncHandler(async (req, res) => {
    const { email, password, coordinates } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const allowedCoordinates = user.allowedCoordinates;

        // Check if user's coordinates match the allowed coordinates
        if (
            coordinates.lat === allowedCoordinates.lat &&
            coordinates.lon === allowedCoordinates.lon
        ) {
            generateToken(res, user._id);

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                allowedCoordinates: user.allowedCoordinates, // Include allowed coordinates in the response
            });
        } else {
            res.status(401);
            throw new Error('Invalid coordinates');
        }
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


// @desc register user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        allowedCoordinates: {lat: 31.408128, lon: 74.2129664}
    });

    if(user){

        generateToken(res, user._id) // Generates the new token for user
        // Populating database with new user

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
        
    } else{
        res.status(400)
        throw new Error('Invalid details')
    }
});


// @desc logout user
// @route POST /api/users/logout
// @access Private

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out succssfully'})
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if(user){ 
        res.status(200);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else{
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } 
    else{
        res.status(404);
        throw new Error('User not found')
    }
});

// @desc Get all users profile
// @route GET /api/users/
// @access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if(user){
        res.staus(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});


// @desc delete user profile
// @route DELETE /api/users/:id
// @access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error('Cannot delete admin user.');
        }

        await User.deleteOne({_id: user._id})
        res.status(200).json('User successfully deleted');
    } else{
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc update user by ID
// @route PUT /api/users/:id
// @access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else{
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    updateUser,
    getUsers,
    deleteUser,
    getUserById
};






