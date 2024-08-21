import { app } from "@azure/functions";
import { getCourseDetails } from "../handler/user/getCourseDetails";

app.http("getCourseDetails", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "course/{courseCode}",
  handler: getCourseDetails,
});
