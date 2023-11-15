const User = require('../models/user')
const Issue = require('../models/issue')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// User registration
const signup = async (req, res) => {
  try {
    const { username, password, role, fullname, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({ username, password: hashedPassword, role, fullname, email });
    await newUser.save();

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
}





const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    const userRole = user.role;
    // console.log("Generated Token:", token);

    // Send the token as a response
    res.status(200).json({ token, userRole });
    // console.log(token, userRole)
    
    // console.log("Generated Token:", token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};



const getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, 'username fullname email role'); 

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const userProfile = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      // console.log( userId)
      // console.log( user)

  
      if (!user) {
        return res.status(404).json({ error: 'User not found'});
      }

  

  
      // Customize the user data you want to send to the client
      const userProfile = {
        username: user.username,
        email: user.email,
        userRole: user.role
        // Add more fields as needed
      };
  
      res.json(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error', error });
    }
  };


  // function  for the specific user based on their userId
  const userTicket = async(req, res) =>{
    try {
    const userId = req.params.userID;
    console.log(userId)
    const assignedIssues = await Issue.find({ assignedTo: userId });

    if (assignedIssues.length > 0) {
      res.status(200).json(assignedIssues);
    } else {
      res.status(404).json({ message: 'No assigned issues found for the user.' });
    }
  } catch (error) {
    console.error('Error fetching user-specific tickets:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}


  // Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  try{
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Authentication required' });
  return next;

}
catch(error){
  res.status(401).json({ message: 'error' , error});
}
 
}


  


module.exports = {
  signup, 
  login, 
  getUsers,
  userProfile,
  userTicket,
  isAuthenticated
}
