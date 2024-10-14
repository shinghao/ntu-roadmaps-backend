import { app } from "@azure/functions";
import deleteRoadmap from "../handler/admin/deleteRoadmap";

app.http("deleteCourse", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "roadmap",
  handler: deleteRoadmap,
});
