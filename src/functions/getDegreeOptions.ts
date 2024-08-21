import { app } from "@azure/functions";
import { getDegreeOptions } from "../handler/user/getDegreeOptions";

app.http("getDegreeOptions", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "degrees",
  handler: getDegreeOptions,
});
