import express from 'express';
const router = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    updateUser,
    getUsers,
    deleteUser,
    getUserById
 } from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router.route('/profile').put(protect, updateUserProfile).get(protect, getUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

export default router;