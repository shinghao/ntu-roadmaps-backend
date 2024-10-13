import { app } from "@azure/functions";
import importDegreesFromJson from "../handler/admin/importDegreesFromJson";

app.http("importDegreesFromJson", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "import/json/degrees",
  handler: importDegreesFromJson,
});
