import { app } from "@azure/functions";
import getAllCareers from "../handler/admin/getAllCareers";

app.http("getAllCareers", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "careers/all",
  handler: getAllCareers,
});
