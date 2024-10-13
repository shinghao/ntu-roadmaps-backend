import { app } from "@azure/functions";
import importRoadmapsFromJson from "../handler/admin/importRoadmapsFromJson";

app.http("importRoadmapsFromJson", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "import/json/roadmaps",
  handler: importRoadmapsFromJson,
});
