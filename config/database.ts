import mongoose from "mongoose";
import {config} from 'dotenv'
config();
export default function connection() {
  mongoose
    .connect('mongodb+srv://imdeepaksharma:imdeepak@cluster0.1xi9s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true, //this MongoDB driver will try to find a server to send any given operation
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
}

