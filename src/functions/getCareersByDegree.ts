import { app } from "@azure/functions";
import getCareersByDegree from "../handler/user/getCareersByDegree";

app.http("getCareersByDegree", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "careers/{degree}",
  handler: getCareersByDegree,
});
