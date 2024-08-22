import { HttpRequest, InvocationContext } from "@azure/functions";
import degreeProgrammesJson from "../../mockData/degreeProgrammes.json";
import getDegreeOptions from "./getDegreeOptions";

test("should get degree options", async () => {
  const request = {} as unknown as HttpRequest;
  const context = {} as unknown as InvocationContext;
  const result = await getDegreeOptions(request, context);
  expect(result).toStrictEqual({ body: JSON.stringify(degreeProgrammesJson) });
});
