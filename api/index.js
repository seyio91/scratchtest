const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const Logger = require("./src/config/winston");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const { userRouter } = require("./src/routes");
const createTables = require("./src/db/populate");

const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: Logger.stream,
  })
);

app.get("/", (_, res) =>
  res.status(200).json({
    status: 200,
    message: `SCRATCH API is alive!!!`,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1", userRouter);

app.use((_, res) => {
  res.status(404).send({
    status: 404,
    error: "Not found",
  });
});

app.use((error, _, res, next) => {
  Logger.error(error);
  res.status(error.status || 500).json({
    status: "error",
    message: error.message,
    stack: error.stack,
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  Logger.info(`Listening on port ${port}!`);
  createTables().then(Logger.info("connected to db"));
});
