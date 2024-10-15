import { app } from "@azure/functions";
import deleteCareer from "../handler/admin/deleteCareer";

app.http("deleteCareer", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "career",
  handler: deleteCareer,
});
