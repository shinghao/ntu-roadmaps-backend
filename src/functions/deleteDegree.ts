import { app } from "@azure/functions";
import deleteDegree from "../handler/admin/deleteDegree";

app.http("deleteCourse", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "degree",
  handler: deleteDegree,
});
