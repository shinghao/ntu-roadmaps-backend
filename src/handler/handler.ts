// This is a wrapper handler for all handlers (Azure function handlers specific)

import {
  InvocationContext,
  HttpRequest,
  HttpResponseInit,
} from "@azure/functions";
import { HttpStatusCode } from "../model/error";

interface ErrorInfo {
  statusCode: HttpStatusCode;
}

const errorMap: { [key: string]: ErrorInfo } = Object.freeze({
  ValidationError: {
    statusCode: HttpStatusCode.BAD_REQUEST,
  },
  NotFoundError: {
    statusCode: HttpStatusCode.NOT_FOUND,
  },
  InternalServerError: {
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  },
});

const handler = (
  fn: (request: HttpRequest, context: InvocationContext) => Promise<any>
) => {
  return async (
    request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> => {
    try {
      const result = await fn(request, context);
      return { body: JSON.stringify(result) };
    } catch (error: unknown) {
      const errorType =
        (error instanceof Error && error.constructor.name) ||
        "InternalServerError";
      const errorInfo = errorMap[errorType] || errorMap["InternalServerError"];

      return {
        status: errorInfo.statusCode,
        body: JSON.stringify({
          error:
            error instanceof Error ? error.message : "Internal Server Error",
        }),
      };
    }
  };
};

export default handler;
