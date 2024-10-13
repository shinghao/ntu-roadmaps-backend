import { app } from "@azure/functions";
import importCareersFromJson from "../handler/admin/importCareersFromJson";

app.http("importCareersFromJson", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "import/json/careers",
  handler: importCareersFromJson,
});
