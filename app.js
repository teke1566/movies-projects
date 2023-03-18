const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
const port = 3000;

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

// Add this line to serve our index.html page
//app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'upload.html'));
});

app.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    const name = req.body.name;
    const { image } = req.files;
    // If no image submitted, exit
    if (!image) {
        console.log("no image");
        return res.sendStatus(400);
    }
    // If does not have image mime type prevent from uploading
    if (/^image/.test(req.files.mimetype)) {
        console.log("Error, no meme type");
        return res.sendStatus(400);
    }
    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/images/' + image.name);

    console.log(name, image.name);
    // All good
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});