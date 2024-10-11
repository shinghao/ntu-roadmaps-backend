import { app } from "@azure/functions";
import getAllRoadmaps from "../handler/admin/getAllRoadmaps";

app.http("getAllRoadmaps", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "roadmaps",
  handler: getAllRoadmaps,
});
