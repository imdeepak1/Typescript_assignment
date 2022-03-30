import express from "express"
import {config} from "dotenv"
config();
const app = express();
import router from "./routes/api.routes"
const port = process.env.PORT;
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
