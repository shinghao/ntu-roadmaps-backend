import { app } from "@azure/functions";
import getAllCourses from "../handler/admin/getAllCourses";

app.http("getAllCourses", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "courses/all",
  handler: getAllCourses,
});
