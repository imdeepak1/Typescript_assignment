import connection from "./database/mongo.db";
import express from "express";
import { config } from "dotenv";
import morgan from "morgan"
import * as swagger from "swagger-express-ts"
import { SwaggerDefinitionConstant } from "swagger-express-ts";
const app = express();
config();
import router from "./routes/api.routes";
const port = process.env.PORT;
connection();
app.use(express.json());
app.use("/", router);
app.use(morgan('dev'))
app.use("/api-docs/swagger", express.static('swagger'))
app.use("/api-docs/swagger/assets", express.static('node_modules/swagger-ui-dist'))
app.use( swagger.express(
  {
      definition : {
          info : {
              title : "7-API-PROJECT" ,
              version : "1.0"
          } ,
          // Models can be defined here
      }
  }
) );

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
