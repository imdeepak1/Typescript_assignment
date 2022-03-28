import express from "express"
const app = express();
import router from "./routes/routes"
const port = 7000;
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
