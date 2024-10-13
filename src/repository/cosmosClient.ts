import { CosmosClient } from "@azure/cosmos";

const COSMOS_DB_DATABASE_NAME = process.env.COSMOS_DB_DATABASE_NAME as string;
const COSMOS_DB_CONNECTION_STRING = process.env
  .COSMOS_DB_CONNECTION_STRING as string;

const client = new CosmosClient(COSMOS_DB_CONNECTION_STRING);

const coursesContainer = client
  .database(COSMOS_DB_DATABASE_NAME)
  .container("Courses");

const careersContainer = client
  .database(COSMOS_DB_DATABASE_NAME)
  .container("Careers");

const roadmapsContainer = client
  .database(COSMOS_DB_DATABASE_NAME)
  .container("Roadmaps");

const degreesContainer = client
  .database(COSMOS_DB_DATABASE_NAME)
  .container("Degrees");

export {
  coursesContainer,
  careersContainer,
  roadmapsContainer,
  degreesContainer,
};
