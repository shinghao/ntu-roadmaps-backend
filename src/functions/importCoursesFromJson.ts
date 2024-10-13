import { app } from "@azure/functions";
import importCoursesFromJson from "../handler/admin/importCoursesFromJson";

app.http("importCoursesFromJson", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "import/json/courses",
  handler: importCoursesFromJson,
});
