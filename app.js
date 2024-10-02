const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const feedRoutes = require("./routes/feed"); 
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("combined"));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api", feedRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
