import { app } from "@azure/functions";
import deleteDegree from "../handler/admin/deleteDegree";

app.http("deleteDegree", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "degree",
  handler: deleteDegree,
});
