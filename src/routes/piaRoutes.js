import express from 'express';
import { checkInstagramLogin, fetchDataFromInstagram, fetchSingleUserPosts, getCurrentUserData, getCurrentUserFriends } from '../controllers/piaController.js';

const router = express.Router();

// Route to fetch specific user data from Instagram
router.get('/fetch', fetchDataFromInstagram);

// Route to get the current logged-in user's data
router.get('/current', getCurrentUserData);

// Route to get the list of accounts the current user is following
router.get('/friends', getCurrentUserFriends);
// Route to fetch a single users posts with username
router.get('/posts', fetchSingleUserPosts);

// Route to check if user can login to Instagram
router.post('/login', checkInstagramLogin);

export default router;
