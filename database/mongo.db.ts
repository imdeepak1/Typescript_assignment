import mongoose from "mongoose";
export default function connection() {
  const connectionMongo = String(process.env.MONGO_URI);
  console.log(connectionMongo);
  mongoose
    .connect(connectionMongo, {
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
