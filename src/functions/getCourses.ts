import { app } from "@azure/functions";
import getCourses from "../handler/admin/getCourses";

app.http("getCourses", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "courses",
  handler: getCourses,
});
