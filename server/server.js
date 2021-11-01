const { generateUploadURL } = require("./s3");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const apiPort = 5000;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/s3_url", async (req, res, next) => {
  try {
    const url = await generateUploadURL();
    res.send({ url });
  } catch (error) {
    next(error);
  }
});

app.use(function (err, req, res, next) {
  res.status(500).send("Something broke!");
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
