import { HttpRequest, InvocationContext } from "@azure/functions";
import careersJson from "../../mockData/careers.json";
import getCareers from "./getCareers";

test("valid degree should return career options", async () => {
  const degree = "Computer Science";
  const careerFound = careersJson.filter((career) =>
    career.degrees.includes(degree)
  );
  const request = { params: { degree } } as unknown as HttpRequest;
  const context = {} as unknown as InvocationContext;
  const result = await getCareers(request, context);

  expect(result).toStrictEqual({ body: JSON.stringify(careerFound) });
});
