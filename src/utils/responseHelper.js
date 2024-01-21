// responseHelper.js

const sendResponse = (res, status, success, data, message) => {
    res.status(status).json({
        success,
        data,
        message
    });
};

export default sendResponse;
