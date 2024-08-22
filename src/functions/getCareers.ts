import { app } from "@azure/functions";
import getCareers from "../handler/user/getCareers";

app.http("getCareers", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "careers/{degree}",
  handler: getCareers,
});
