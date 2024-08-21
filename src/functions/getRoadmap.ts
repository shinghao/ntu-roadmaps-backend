import { app } from "@azure/functions";
import { getRoadmap } from "../handler/user/getRoadmap";

app.http("getRoadmap", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "roadmap/{degree}/{cohort}/{type}",
  handler: getRoadmap,
});
