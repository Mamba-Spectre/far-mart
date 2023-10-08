require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cors = require("cors");
const connectDB = require("./mongodb/connect.js");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 1000000000, files: 2 },
});

app.use("/api", routes);

// BItley API
// app.post("/upload", upload.array("file"), async (req, res) => {
//   try {
//     const results = await s3Uploadv2(req.files);
//     const s3Url = results[0].Location;

//     axios
//       .post(
//         "https://api-ssl.bitly.com/v4/shorten",
//         {
//           long_url: s3Url,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then(async (response) => {
//         const shortenedUrl = response.data.id;
//         console.log(`Shortened URL: ${shortenedUrl}`);

//         return res.json({ shortenedUrl });
//       })
//       .catch((error) => {
//         console.error(error);
//         return res.status(500).json({ error: "Error shortening URL" });
//       });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Error uploading to S3" });
//   }
// });

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "test File must be an image",
      });
    }
  }
});

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
