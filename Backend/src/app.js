import express from 'express';
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import chartRouter from "./routes/chart.routes.js";
import passport from "passport";
import { Strategy as GoogleStragey } from "passport-google-oauth20"
import { config } from "./config/config.js";
import cors from "cors";
const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
passport.use(new GoogleStragey({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
},(accesToken, refreshToken, profile, done)=>{
    return done(null, profile);
}))

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/charts", chartRouter);


export default app;