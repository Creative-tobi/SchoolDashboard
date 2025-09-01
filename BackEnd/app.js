const express = require("express");
const dotenv = require("dotenv");
const studentRoute = require("./routes/student.routes");
const adminRoute = require("./routes/admin.routes");
const bookRoute = require("./routes/books.routes");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/db", studentRoute);
app.use("/db", adminRoute);
app.use("/db", bookRoute);

app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
