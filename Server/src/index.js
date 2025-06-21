import { configDotenv } from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

configDotenv();
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Monogo_DB connection failed ~!! :: ", err);
  });
