const express = require('express');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;

// app.use(express.static(path.join(__dirname, '../build')));
// app.use(cors)
app.get('/api', async (req, res) => {
  // Extract color parameters from the request
  let { red, green, blue, w, h } = req.query;

  red = red || 255;
  green = green || 255;
  blue = blue || 255;
  w = w|| 500;
  h = h|| 500;

  // Convert color values and dimensions to numbers
  const [r, g, b, width, height] = [red, green, blue, w, h].map(Number);

  // Create a new image with the specified colors
  const image = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r, g, b},
    },
  })
    .png()
    .toBuffer();

  // Send the image as the response
  res.set('Content-Type', 'image/png');
  res.send(image);
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});