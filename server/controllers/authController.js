import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';

export const register = async (req, res) => {
  try {
    const { name,email, password } = req.body;
    console.log('Email:', email);
    console.log('Password:', password);

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
    const user = await User.create({ name, email, password: hashedPassword }); // Creating the user
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};




export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Attempting to login with email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};




const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Generates a URL for the user to consent to access their Gmail
export const getGoogleAuthURL = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
  });
  res.json({ authUrl });
};

// Callback to handle Google authentication and store the token
export const googleCallback = async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store token in the user's database record
    const user = await User.findById(req.user.id);
    user.googleTokens = tokens;
    await user.save();

    res.json({ message: 'Google account connected successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error connecting Google account', error });
  }
};

// Send email using the user's Gmail account
export const sendEmailWithGmail = async (user, recipient, subject, message) => {
  oauth2Client.setCredentials(user.googleTokens);
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const email = [
    `To: ${recipient}`,
    'Subject: ' + subject,
    '',
    message,
  ].join('\n');

  const encodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedEmail },
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error.message);
    return false;
  }
};
