const userRepo = require("../repos/user-repo/user-repo");

const loginUser = async (req, res, next) => {
    console.log("login route is not implemented yet");
}

const signup = async (req, res, next) => {
    // validate inputs  

    // send email and password out to create user
    const {email, password} = req.body;
    const repo = new userRepo.UserRepo();
    repo.Create({email, password});
    // create a token for the user
}

module.exports = {loginUser, signup}