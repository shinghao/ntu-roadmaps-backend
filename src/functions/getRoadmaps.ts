import { app } from "@azure/functions";
import getRoadmaps from "../handler/admin/getRoadmaps";

app.http("getRoadmaps", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "roadmaps",
  handler: getRoadmaps,
});
