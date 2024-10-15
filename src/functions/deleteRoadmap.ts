import { app } from "@azure/functions";
import deleteRoadmap from "../handler/admin/deleteRoadmap";

app.http("deleteRoadmap", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "roadmap",
  handler: deleteRoadmap,
});
