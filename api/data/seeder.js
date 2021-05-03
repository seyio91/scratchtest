const logger = require("../src/config/winston");
const fs = require("fs");
const fastcsv = require("fast-csv");
const path = require("path");
const { dbQuery } = require("../src/db/dbQuery");
const createTables = require("../src/db/populate");

const seedDatabase = async () => {
  fs.createReadStream(path.resolve(__dirname, "data.csv"))
    .pipe(fastcsv.parse({ headers: true }))
    .on("error", (error) => logger.error(error))
    .on("data", async (row) => {
      let insertQuery = `INSERT INTO users(name) VALUES($1) RETURNING *
        `;
      let params = [row["name"]];
      try {
        const { rows } = await dbQuery(insertQuery, params);
        logger.info(`Added User ${rows[0].name}`);
      } catch (error) {
        logger.error(error);
        process.exit(1);
      }
    })
    .on("end", (rowCount) => {
      logger.info(`Restoring ${rowCount} rows`);
    });
};

const seeder = async () => {
  await createTables();
  await seedDatabase();
};

seeder().then(logger.info("Running Restore Script"));
