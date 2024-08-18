import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

app.http("getDegreeOptions", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "degrees",
  handler: () => {
    return { body: "nice!" };
  },
});
