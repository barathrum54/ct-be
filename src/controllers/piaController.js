import { InstagramService } from '../services/instagramService.js';
import sendResponse from '../utils/responseHelper.js';

const igService = new InstagramService();

export const checkInstagramLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error('Email and password are required');
  try {
    await igService.loginToInstagram(email, password).catch((err) => {
      if (err.message.toString().includes("The username you entered doesn't appear to belong to an account.")) {
        throw new Error("The username you entered doesn't appear to belong to an account.");
        // next({
        // status: 400,
        // message: "The username you entered doesn't appear to belong to an account."
        // })
      }
    });
    const check = await igService.getUserProfile(email); // Assuming email is the username
    return sendResponse(res, 200, true, check, "Login Successful");
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const fetchDataFromInstagram = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return sendResponse(res, 400, false, null, "Email and Password are required");

  try {
    await igService.loginToInstagram(email, password);
    const username = req.query.username || 'instagram';
    const userProfile = await igService.getUserProfile(username);
    res.json(userProfile);
  } catch (error) {
    next(error);
  }
};

export const fetchSingleUserPosts = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return sendResponse(res, 400, false, null, "Email and Password are required");

  try {
    await igService.loginToInstagram(email, password);
    const username = req.query.username || 'instagram';
    const userPosts = await igService.getUserPosts(username);
    res.json(userPosts);
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserData = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return sendResponse(res, 400, false, null, "Email and Password are required");

  try {
    await igService.loginToInstagram(email, password);
    const currentUserData = await igService.getCurrentUserData();
    res.json(currentUserData);
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserFriends = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return sendResponse(res, 400, false, null, "Email and Password are required");

  try {
    await igService.loginToInstagram(email, password);
    const friendsData = await igService.getCurrentUserFriends();
    res.json(friendsData);
  } catch (error) {
    next(error)
  }
};
