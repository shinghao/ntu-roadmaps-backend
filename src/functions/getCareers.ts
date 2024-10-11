import { app } from "@azure/functions";
import getCareers from "../handler/admin/getCareers";

app.http("getCareers", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "careers",
  handler: getCareers,
});
