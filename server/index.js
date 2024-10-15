import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router/general.route.js";
// import MongoStore from "connect-mongo";
// import session from "express-session";
import cors from "cors";

dotenv.config(); // configuration of dot env
const PORT = process.env.PORT || 4000;

const app = express();

//Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

//sesison configure
// app.use(
//   session({
//     secret: process.env.session_secret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       maxAge: 30 * 24 * 60 * 60 * 1000, //set session for 30 days .
//     },
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_DB_URL,
//       collectionName: "session_user",
//       ttl: 24 * 60 * 60 * 1000,
//     }),
//   })
// );

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "GET READY SNOOK_CODERS" });
});

app.get("/signup", (req, res) => {
  res.json({
    success: true,

    message: "sign up Deepak",
  });
});

app.use("/api/v1", router);

try {
  const db = await mongoose.connect(process.env.MONGO_DB_URL);
  if (db) {
    app.listen(PORT, () => {
      console.log(`server started at ${PORT} and databse also connected`);
    });
  }
} catch (error) {
  console.log("error databse is not connected ", error);
}
