require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from current directory (since server.js is in portfolio folder)
app.use(express.static(path.join(__dirname)));

// Serve images from images folder in current directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name} (Portfolio Contact)`,
      text: message,
      html: `<p>You have a new contact request</p>
             <h3>Contact Details</h3>
             <ul>
               <li>Name: ${name}</li>
               <li>Email: ${email}</li>
             </ul>
             <h3>Message</h3>
             <p>${message}</p>`
    };
    
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

// Serve HTML file from current directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'mutambo_portfolio.html'));
});

// Handle other routes
app.get('*', (req, res) => {
  res.redirect('/');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));