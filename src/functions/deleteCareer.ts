import { app } from "@azure/functions";
import deleteCareer from "../handler/admin/deleteCareer";

app.http("deleteCourse", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "career",
  handler: deleteCareer,
});
