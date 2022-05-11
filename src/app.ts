// Import server modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Import server routes
import router from "./routes/router";
// Create express app
const app = express();

//Enable json body parsing and url encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable cookie-parser
app.use(cookieParser());

// Use express fileupload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Activate CORS
app.use(
  cors({
    origin: "*",
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Access-Control-Allow-Request-Method",
      "X-Access-Token",
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    // exposedHeaders: ["X-Access-Token"],
  })
);

// Configure routes
app.use("/api", router);

// Export app
export default app;
