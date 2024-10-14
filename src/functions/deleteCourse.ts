import { app } from "@azure/functions";
import deleteCourse from "../handler/admin/deleteCourse";

app.http("deleteCourse", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "course",
  handler: deleteCourse,
});
