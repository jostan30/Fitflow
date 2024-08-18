const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const multer = require('multer');

// CONNECT MY FILE

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/templates', express.static(path.join(__dirname, 'templates')))
app.use('/gallery', express.static(path.join(__dirname, 'gallery')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// DATABASE CONNECTIVETY


// Connect to MongoDB once when the server starts
const url = 'mongodb://127.0.0.1:27017/Fitflow'; // Specify the database name in the URL
const client = new MongoClient(url);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

connectToDatabase();

// DATABASE OPERATIONS
app.post('/register', async (req, res) => {           //REGISTERATION OF USERS
    try {
        const db = client.db(); // Specify the database name
        const collection = db.collection('user');

        const { username, password } = req.body;
        console.log(username  + " " + password);

        // Check if the username already exists in the database
        const existingUser = await collection.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // If the username doesn't exist, insert the new user into the database
        await collection.insertOne({ username, password });

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'An error occurred during signup' });
    }
});


app.post('/sign', async (req, res) => {     //SIGNIN USERS
    try {
        const db = client.db(); 
        const collection = db.collection('user');

        const { username, password } = req.body;
        console.log(username  + " " + password);
        const user = await collection.findOne({ username, password });

        if (user) {
            res.status(200).json({ message: 'Login successful' });
            res.end();
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ error: 'An error occurred during authentication' });
    }
});



//COMMUNITY SUPPORT  SECTION STARTS HERE        


// In-memory data store for posts (replace with database in production)
let posts = [];

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Files will be temporarily stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Upload image
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'no file uploaded' });
  }

  // Create post object and add to posts array
  const newPost = {
    imageUrl: `/uploads/${req.file.filename}`, // Path to uploaded image
    caption: req.body.caption || '' // Caption (default to empty string)
  };
  posts.push(newPost);
  
  res.status(201).json(newPost);
});


const fs = require('fs');

// Save user posts
app.post('/save-posts', (req, res) => {
    const userPosts = req.body;
    const jsonUserPosts = JSON.stringify(userPosts); // Convert user posts array to JSON string

    // Write JSON data to a file
    fs.writeFile('userPosts.json', jsonUserPosts, (err) => {
        if (err) {
            console.error('Error writing user posts to file:', err);
            res.status(500).json({ error: 'Failed to save user posts' });
        } else {
            console.log('User posts saved to file');
            res.sendStatus(200);
        }
    });
});

//CALORIE TRACKER SECTION

// Route to add food item
app.post('/addFood', (req, res) => {
    const { food, quantity, calories } = req.body;

    totalCalories += calories * quantity;
    foodList.push({ food, quantity, calories });

    res.json({ totalCalories, foodList });
});

// Route to remove food item
app.delete('/removeFood/:index', (req, res) => {
    const { index } = req.params;

    if (index >= 0 && index < foodList.length) {
        totalCalories -= foodList[index].calories * foodList[index].quantity;
        foodList.splice(index, 1);
        res.json({ totalCalories, foodList });
    } else {
        res.status(400).json({ error: 'Invalid index' });
    }
});


// ROUTES
app.get('/register',(req,res)=> {
    res.sendFile(path.join(__dirname,'templates','register.html'))
});

app.get( '/' ,(req,res) => {
    res.sendFile(path.join(__dirname,'templates','sign.html'))
});

app.get('/home', (req,res)=> {
    res.sendFile(path.join(__dirname,('templates'),'home.html'));
})

app.get('/CommunitySupport', (req,res)=> {
    res.sendFile(path.join(__dirname,('templates'),'support.html'));
})


app.get('/ActivityTracker', (req, res) => {
    res.redirect('http://192.168.61.69');
});

app.get('/CalorieTracker', (req, res) => {
    res.sendFile(path.join(__dirname,('templates'),'calorie.html'))
});

app.get('/Platform', (req, res) => {
    res.sendFile(path.join(__dirname,('templates'),'platform.html'))
});




// APP RIZZLER
app.listen(port ,() =>{
    console.log(`App listening at port ${port}`);
})