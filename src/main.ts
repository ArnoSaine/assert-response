export type HttpResponseAssertion = (
  condition?: unknown,
  body?: BodyInit | (() => BodyInit),
  init?: ResponseInit | (() => ResponseInit)
) => asserts condition;

export type Falsy = false | 0 | "" | null | undefined;

export type HttpResponseAssertionFalsy = (
  condition?: unknown,
  body?: BodyInit | (() => BodyInit),
  init?: ResponseInit | (() => ResponseInit)
) => asserts condition is Falsy;

function createResponseAssertionFunction(status: number, message?: string): HttpResponseAssertion {
  return (condition, body, init) => {
    if (condition) {
      throw new Response(
        (typeof body === "function" ? body() : body) ?? message,
        { status, ...(typeof init === "function" ? init() : init) }
      );
    }
  };
}

function negate(assert: HttpResponseAssertion): HttpResponseAssertionFalsy {
  return (condition, ...rest) => assert(!condition, ...rest);
}

/**
 * Throws a `Response` with status `200 OK` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `200 OK` and the given body/init.
 */
export const ok: HttpResponseAssertionFalsy = createResponseAssertionFunction(200, "OK");
export { ok as successful };
/**
 * Throws a `Response` with status `200 OK` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `200 OK` and the given body/init.
 */
export const notOk: HttpResponseAssertion = negate(ok);
export { notOk as failed };

/**
 * Throws a `Response` with status `201 Created` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `201 Created` and the given body/init.
 */
export const created: HttpResponseAssertionFalsy = createResponseAssertionFunction(201, "Created");
/**
 * Throws a `Response` with status `201 Created` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `201 Created` and the given body/init.
 */
export const notCreated: HttpResponseAssertion = negate(created);
export { notCreated as creationFailed };

/**
 * Throws a `Response` with status `202 Accepted` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `202 Accepted` and the given body/init.
 */
export const accepted: HttpResponseAssertionFalsy = createResponseAssertionFunction(202, "Accepted");
/**
 * Throws a `Response` with status `202 Accepted` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `202 Accepted` and the given body/init.
 */
export const notAccepted: HttpResponseAssertion = negate(accepted);
export { notAccepted as rejected };

/**
 * Throws a `Response` with status `203 Non-Authoritative Information` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `203 Non-Authoritative Information` and the given body/init.
 */
export const nonAuthoritativeInformation: HttpResponseAssertionFalsy = createResponseAssertionFunction(203, "Non-Authoritative Information");
/**
 * Throws a `Response` with status `203 Non-Authoritative Information` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `203 Non-Authoritative Information` and the given body/init.
 */
export const notNonAuthoritativeInformation: HttpResponseAssertion = negate(nonAuthoritativeInformation);
export { notNonAuthoritativeInformation as authoritativeInformation };

/**
 * Throws a `Response` with status `204 No Content` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `204 No Content` and the given body/init.
 */
export const noContent: HttpResponseAssertionFalsy = createResponseAssertionFunction(204);
/**
 * Throws a `Response` with status `204 No Content` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `204 No Content` and the given body/init.
 */
export const notNoContent: HttpResponseAssertion = negate(noContent);
export { notNoContent as content };

/**
 * Throws a `Response` with status `205 Reset Content` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `205 Reset Content` and the given body/init.
 */
export const resetContent: HttpResponseAssertionFalsy = createResponseAssertionFunction(205);
/**
 * Throws a `Response` with status `205 Reset Content` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `205 Reset Content` and the given body/init.
 */
export const notResetContent: HttpResponseAssertion = negate(resetContent);

/**
 * Throws a `Response` with status `206 Partial Content` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `206 Partial Content` and the given body/init.
 */
export const partialContent: HttpResponseAssertionFalsy = createResponseAssertionFunction(206, "Partial Content");
/**
 * Throws a `Response` with status `206 Partial Content` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `206 Partial Content` and the given body/init.
 */
export const notPartialContent: HttpResponseAssertion = negate(partialContent);
export { notPartialContent as entireContent, notPartialContent as fullContent };

/**
 * Throws a `Response` with status `207 Multi-Status` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `207 Multi-Status` and the given body/init.
 */
export const multiStatus: HttpResponseAssertionFalsy = createResponseAssertionFunction(207, "Multi-Status");
/**
 * Throws a `Response` with status `207 Multi-Status` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `207 Multi-Status` and the given body/init.
 */
export const notMultiStatus: HttpResponseAssertion = negate(multiStatus);
export { notMultiStatus as singleStatus };

/**
 * Throws a `Response` with status `208 Already Reported` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `208 Already Reported` and the given body/init.
 */
export const alreadyReported: HttpResponseAssertionFalsy = createResponseAssertionFunction(208, "Already Reported");
/**
 * Throws a `Response` with status `208 Already Reported` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `208 Already Reported` and the given body/init.
 */
export const notAlreadyReported: HttpResponseAssertion = negate(alreadyReported);

/**
 * Throws a `Response` with status `226 IM Used` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `226 IM Used` and the given body/init.
 */
export const imUsed: HttpResponseAssertionFalsy = createResponseAssertionFunction(226, "IM Used");
/**
 * Throws a `Response` with status `226 IM Used` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `226 IM Used` and the given body/init.
 */
export const notImUsed: HttpResponseAssertion = negate(imUsed);

/**
 * Throws a `Response` with status `300 Multiple Choices` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `300 Multiple Choices` and the given body/init.
 */
export const multipleChoices: HttpResponseAssertionFalsy = createResponseAssertionFunction(300, "Multiple Choices");
/**
 * Throws a `Response` with status `300 Multiple Choices` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `300 Multiple Choices` and the given body/init.
 */
export const notMultipleChoices: HttpResponseAssertion = negate(multipleChoices);

/**
 * Throws a `Response` with status `301 Moved Permanently` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `301 Moved Permanently` and the given body/init.
 */
export const movedPermanently: HttpResponseAssertionFalsy = createResponseAssertionFunction(301, "Moved Permanently");
/**
 * Throws a `Response` with status `301 Moved Permanently` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `301 Moved Permanently` and the given body/init.
 */
export const notMovedPermanently: HttpResponseAssertion = negate(movedPermanently);

/**
 * Throws a `Response` with status `302 Found` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `302 Found` and the given body/init.
 */
export const temporaryFound: HttpResponseAssertionFalsy = createResponseAssertionFunction(302, "Found");
export { temporaryFound as redirect };
/**
 * Throws a `Response` with status `302 Found` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `302 Found` and the given body/init.
 */
export const notTemporaryFound: HttpResponseAssertion = negate(temporaryFound);
export { notTemporaryFound as noRedirect };

/**
 * Throws a `Response` with status `303 See Other` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `303 See Other` and the given body/init.
 */
export const seeOther: HttpResponseAssertionFalsy = createResponseAssertionFunction(303, "See Other");
/**
 * Throws a `Response` with status `303 See Other` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `303 See Other` and the given body/init.
 */
export const notSeeOther: HttpResponseAssertion = negate(seeOther);

/**
 * Throws a `Response` with status `304 Not Modified` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `304 Not Modified` and the given body/init.
 */
export const notModified: HttpResponseAssertionFalsy = createResponseAssertionFunction(304);
/**
 * Throws a `Response` with status `304 Not Modified` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `304 Not Modified` and the given body/init.
 */
export const modified: HttpResponseAssertion = negate(notModified);

/**
 * Throws a `Response` with status `305 Use Proxy` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `305 Use Proxy` and the given body/init.
 */
export const useProxy: HttpResponseAssertionFalsy = createResponseAssertionFunction(305, "Use Proxy");
export { useProxy as proxy };
/**
 * Throws a `Response` with status `305 Use Proxy` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `305 Use Proxy` and the given body/init.
 */
export const notUseProxy: HttpResponseAssertion = negate(useProxy);

/**
 * Throws a `Response` with status `307 Temporary Redirect` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `307 Temporary Redirect` and the given body/init.
 */
export const temporaryRedirect: HttpResponseAssertionFalsy = createResponseAssertionFunction(307, "Temporary Redirect");
/**
 * Throws a `Response` with status `307 Temporary Redirect` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `307 Temporary Redirect` and the given body/init.
 */
export const notTemporaryRedirect: HttpResponseAssertion = negate(temporaryRedirect);

/**
 * Throws a `Response` with status `308 Permanent Redirect` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `308 Permanent Redirect` and the given body/init.
 */
export const permanentRedirect: HttpResponseAssertionFalsy = createResponseAssertionFunction(308, "Permanent Redirect");
/**
 * Throws a `Response` with status `308 Permanent Redirect` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `308 Permanent Redirect` and the given body/init.
 */
export const notPermanentRedirect: HttpResponseAssertion = negate(permanentRedirect);

/**
 * Throws a `Response` with status `400 Bad Request` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `400 Bad Request` and the given body/init.
 */
export const badRequest: HttpResponseAssertionFalsy = createResponseAssertionFunction(400, "Bad Request");
export { badRequest as invalid };
/**
 * Throws a `Response` with status `400 Bad Request` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `400 Bad Request` and the given body/init.
 */
export const goodRequest: HttpResponseAssertion = negate(badRequest);
export { goodRequest as valid, goodRequest as correct };

/**
 * Throws a `Response` with status `401 Unauthorized` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `401 Unauthorized` and the given body/init.
 */
export const unauthorized: HttpResponseAssertionFalsy = createResponseAssertionFunction(401, "Unauthorized");
/**
 * Throws a `Response` with status `401 Unauthorized` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `401 Unauthorized` and the given body/init.
 */
export const authorized: HttpResponseAssertion = negate(unauthorized);
export { authorized as authenticated };

/**
 * Throws a `Response` with status `402 Payment Required` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `402 Payment Required` and the given body/init.
 */
export const paymentRequired: HttpResponseAssertionFalsy = createResponseAssertionFunction(402, "Payment Required");
/**
 * Throws a `Response` with status `402 Payment Required` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `402 Payment Required` and the given body/init.
 */
export const paymentNotRequired: HttpResponseAssertion = negate(paymentRequired);
export { paymentNotRequired as paymentOptional };

/**
 * Throws a `Response` with status `403 Forbidden` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `403 Forbidden` and the given body/init.
 */
export const forbidden: HttpResponseAssertionFalsy = createResponseAssertionFunction(403, "Forbidden");
/**
 * Throws a `Response` with status `403 Forbidden` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `403 Forbidden` and the given body/init.
 */
export const notForbidden: HttpResponseAssertion = negate(forbidden);
export { notForbidden as allowed, notForbidden as permitted };

/**
 * Throws a `Response` with status `404 Not Found` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `404 Not Found` and the given body/init.
 */
export const notFound: HttpResponseAssertionFalsy = createResponseAssertionFunction(404, "Not Found");
/**
 * Throws a `Response` with status `404 Not Found` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `404 Not Found` and the given body/init.
 */
export const found: HttpResponseAssertion = negate(notFound);

/**
 * Throws a `Response` with status `405 Method Not Allowed` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `405 Method Not Allowed` and the given body/init.
 */
export const methodNotAllowed: HttpResponseAssertionFalsy = createResponseAssertionFunction(405, "Method Not Allowed");
/**
 * Throws a `Response` with status `405 Method Not Allowed` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `405 Method Not Allowed` and the given body/init.
 */
export const methodAllowed: HttpResponseAssertion = negate(methodNotAllowed);

/**
 * Throws a `Response` with status `406 Not Acceptable` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `406 Not Acceptable` and the given body/init.
 */
export const notAcceptable: HttpResponseAssertionFalsy = createResponseAssertionFunction(406, "Not Acceptable");
/**
 * Throws a `Response` with status `406 Not Acceptable` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `406 Not Acceptable` and the given body/init.
 */
export const acceptable: HttpResponseAssertion = negate(notAcceptable);

/**
 * Throws a `Response` with status `407 Proxy Authentication Required` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `407 Proxy Authentication Required` and the given body/init.
 */
export const proxyAuthRequired: HttpResponseAssertionFalsy = createResponseAssertionFunction(407, "Proxy Authentication Required");
/**
 * Throws a `Response` with status `407 Proxy Authentication Required` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `407 Proxy Authentication Required` and the given body/init.
 */
export const proxyAuthNotRequired: HttpResponseAssertion = negate(proxyAuthRequired);
export { proxyAuthNotRequired as proxyAuthOptional };

/**
 * Throws a `Response` with status `408 Request Timeout` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `408 Request Timeout` and the given body/init.
 */
export const requestTimeout: HttpResponseAssertionFalsy = createResponseAssertionFunction(408, "Request Timeout");
/**
 * Throws a `Response` with status `408 Request Timeout` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `408 Request Timeout` and the given body/init.
 */
export const notRequestTimeout: HttpResponseAssertion = negate(requestTimeout);
export { notRequestTimeout as requestFast };

/**
 * Throws a `Response` with status `409 Conflict` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `409 Conflict` and the given body/init.
 */
export const conflict: HttpResponseAssertionFalsy = createResponseAssertionFunction(409, "Conflict");
/**
 * Throws a `Response` with status `409 Conflict` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `409 Conflict` and the given body/init.
 */
export const notConflict: HttpResponseAssertion = negate(conflict);
export { notConflict as match };

/**
 * Throws a `Response` with status `410 Gone` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `410 Gone` and the given body/init.
 */
export const gone: HttpResponseAssertionFalsy = createResponseAssertionFunction(410, "Gone");
/**
 * Throws a `Response` with status `410 Gone` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `410 Gone` and the given body/init.
 */
export const notGone: HttpResponseAssertion = negate(gone);
export { notGone as present };

/**
 * Throws a `Response` with status `411 Length Required` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `411 Length Required` and the given body/init.
 */
export const lengthRequired: HttpResponseAssertionFalsy = createResponseAssertionFunction(411, "Length Required");
/**
 * Throws a `Response` with status `411 Length Required` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `411 Length Required` and the given body/init.
 */
export const lengthNotRequired: HttpResponseAssertion = negate(lengthRequired);
export { lengthNotRequired as lengthOptional };

/**
 * Throws a `Response` with status `412 Precondition Failed` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `412 Precondition Failed` and the given body/init.
 */
export const preconditionFailed: HttpResponseAssertionFalsy = createResponseAssertionFunction(412, "Precondition Failed");
/**
 * Throws a `Response` with status `412 Precondition Failed` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `412 Precondition Failed` and the given body/init.
 */
export const successfulPrecondition: HttpResponseAssertion = negate(preconditionFailed);
export { successfulPrecondition as preconditionMet, successfulPrecondition as preconditionPassed };

/**
 * Throws a `Response` with status `413 Payload Too Large` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `413 Payload Too Large` and the given body/init.
 */
export const payloadTooLarge: HttpResponseAssertionFalsy = createResponseAssertionFunction(413, "Payload Too Large");
/**
 * Throws a `Response` with status `413 Payload Too Large` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `413 Payload Too Large` and the given body/init.
 */
export const notPayloadTooLarge: HttpResponseAssertion = negate(payloadTooLarge);
export { notPayloadTooLarge as payloadSmall };

/**
 * Throws a `Response` with status `414 URI Too Long` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `414 URI Too Long` and the given body/init.
 */
export const uriTooLong: HttpResponseAssertionFalsy = createResponseAssertionFunction(414, "URI Too Long");
/**
 * Throws a `Response` with status `414 URI Too Long` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `414 URI Too Long` and the given body/init.
 */
export const uriNotTooLong: HttpResponseAssertion = negate(uriTooLong);
export { uriNotTooLong as uriShort };

/**
 * Throws a `Response` with status `415 Unsupported Media Type` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `415 Unsupported Media Type` and the given body/init.
 */
export const unsupportedMediaType: HttpResponseAssertionFalsy = createResponseAssertionFunction(415, "Unsupported Media Type");
/**
 * Throws a `Response` with status `415 Unsupported Media Type` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `415 Unsupported Media Type` and the given body/init.
 */
export const supportedMediaType: HttpResponseAssertion = negate(unsupportedMediaType);

/**
 * Throws a `Response` with status `416 Range Not Satisfiable` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `416 Range Not Satisfiable` and the given body/init.
 */
export const rangeNotSatisfiable: HttpResponseAssertionFalsy = createResponseAssertionFunction(416, "Range Not Satisfiable");
/**
 * Throws a `Response` with status `416 Range Not Satisfiable` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `416 Range Not Satisfiable` and the given body/init.
 */
export const rangeSatisfiable: HttpResponseAssertion = negate(rangeNotSatisfiable);

/**
 * Throws a `Response` with status `417 Expectation Failed` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `417 Expectation Failed` and the given body/init.
 */
export const expectationFailed: HttpResponseAssertionFalsy = createResponseAssertionFunction(417, "Expectation Failed");
/**
 * Throws a `Response` with status `417 Expectation Failed` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `417 Expectation Failed` and the given body/init.
 */
export const expectationSuccessful: HttpResponseAssertion = negate(expectationFailed);
export { expectationSuccessful as expectationMet, expectationSuccessful as expectationPassed };

/**
 * Throws a `Response` with status `418 I'm a Teapot` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `418 I'm a Teapot` and the given body/init.
 */
export const teapot: HttpResponseAssertionFalsy = createResponseAssertionFunction(418, "I'm a Teapot");
/**
 * Throws a `Response` with status `418 I'm a Teapot` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `418 I'm a Teapot` and the given body/init.
 */
export const notTeapot: HttpResponseAssertion = negate(teapot);

/**
 * Throws a `Response` with status `421 Misdirected Request` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `421 Misdirected Request` and the given body/init.
 */
export const misdirectedRequest: HttpResponseAssertionFalsy = createResponseAssertionFunction(421, "Misdirected Request");
/**
 * Throws a `Response` with status `421 Misdirected Request` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `421 Misdirected Request` and the given body/init.
 */
export const correctlyDirectedRequest: HttpResponseAssertion = negate(misdirectedRequest);
export { correctlyDirectedRequest as directedRequest };

/**
 * Throws a `Response` with status `422 Unprocessable Entity` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `422 Unprocessable Entity` and the given body/init.
 */
export const unprocessableEntity: HttpResponseAssertionFalsy = createResponseAssertionFunction(422, "Unprocessable Entity");
/**
 * Throws a `Response` with status `422 Unprocessable Entity` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `422 Unprocessable Entity` and the given body/init.
 */
export const processableEntity: HttpResponseAssertion = negate(unprocessableEntity);

/**
 * Throws a `Response` with status `423 Locked` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `423 Locked` and the given body/init.
 */
export const locked: HttpResponseAssertionFalsy = createResponseAssertionFunction(423, "Locked");
/**
 * Throws a `Response` with status `423 Locked` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `423 Locked` and the given body/init.
 */
export const unlocked: HttpResponseAssertion = negate(locked);
export { unlocked as open };

/**
 * Throws a `Response` with status `424 Failed Dependency` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `424 Failed Dependency` and the given body/init.
 */
export const failedDependency: HttpResponseAssertionFalsy = createResponseAssertionFunction(424, "Failed Dependency");
/**
 * Throws a `Response` with status `424 Failed Dependency` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `424 Failed Dependency` and the given body/init.
 */
export const successfulDependency: HttpResponseAssertion = negate(failedDependency);
export { successfulDependency as dependencyMet, successfulDependency as dependencyPassed };

/**
 * Throws a `Response` with status `425 Too Early` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `425 Too Early` and the given body/init.
 */
export const tooEarly: HttpResponseAssertionFalsy = createResponseAssertionFunction(425, "Too Early");
/**
 * Throws a `Response` with status `425 Too Early` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `425 Too Early` and the given body/init.
 */
export const notTooEarly: HttpResponseAssertion = negate(tooEarly);
export { notTooEarly as afterSufficientTime, notTooEarly as onTime };

/**
 * Throws a `Response` with status `426 Upgrade Required` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `426 Upgrade Required` and the given body/init.
 */
export const upgradeRequired: HttpResponseAssertionFalsy = createResponseAssertionFunction(426, "Upgrade Required");
/**
 * Throws a `Response` with status `426 Upgrade Required` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `426 Upgrade Required` and the given body/init.
 */
export const upgradeNotRequired: HttpResponseAssertion = negate(upgradeRequired);
export { upgradeNotRequired as upgradeOptional };

/**
 * Throws a `Response` with status `428 Precondition Required` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `428 Precondition Required` and the given body/init.
 */
export const preconditionRequired: HttpResponseAssertionFalsy = createResponseAssertionFunction(428, "Precondition Required");
/**
 * Throws a `Response` with status `428 Precondition Required` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `428 Precondition Required` and the given body/init.
 */
export const preconditionNotRequired: HttpResponseAssertion = negate(preconditionRequired);
export { preconditionNotRequired as preconditionOptional };

/**
 * Throws a `Response` with status `429 Too Many Requests` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `429 Too Many Requests` and the given body/init.
 */
export const tooManyRequests: HttpResponseAssertionFalsy = createResponseAssertionFunction(429, "Too Many Requests");
/**
 * Throws a `Response` with status `429 Too Many Requests` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `429 Too Many Requests` and the given body/init.
 */
export const notTooManyRequests: HttpResponseAssertion = negate(tooManyRequests);
export { notTooManyRequests as fewRequests };

/**
 * Throws a `Response` with status `431 Request Header Fields Too Large` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `431 Request Header Fields Too Large` and the given body/init.
 */
export const requestHeaderFieldsTooLarge: HttpResponseAssertionFalsy = createResponseAssertionFunction(431, "Request Header Fields Too Large");
/**
 * Throws a `Response` with status `431 Request Header Fields Too Large` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `431 Request Header Fields Too Large` and the given body/init.
 */
export const requestHeaderFieldsAcceptable: HttpResponseAssertion = negate(requestHeaderFieldsTooLarge);
export { requestHeaderFieldsAcceptable as requestHeaderFieldsSmall };

/**
 * Throws a `Response` with status `451 Unavailable For Legal Reasons` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `451 Unavailable For Legal Reasons` and the given body/init.
 */
export const unavailableForLegalReasons: HttpResponseAssertionFalsy = createResponseAssertionFunction(451, "Unavailable For Legal Reasons");
/**
 * Throws a `Response` with status `451 Unavailable For Legal Reasons` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `451 Unavailable For Legal Reasons` and the given body/init.
 */
export const availableForLegalReasons: HttpResponseAssertion = negate(unavailableForLegalReasons);

/**
 * Throws a `Response` with status `500 Internal Server Error` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `500 Internal Server Error` and the given body/init.
 */
export const internalServerError: HttpResponseAssertionFalsy = createResponseAssertionFunction(500, "Internal Server Error");
/**
 * Throws a `Response` with status `500 Internal Server Error` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `500 Internal Server Error` and the given body/init.
 */
export const noError: HttpResponseAssertion = negate(internalServerError);
export { noError as notInternalServerError };

/**
 * Throws a `Response` with status `501 Not Implemented` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `501 Not Implemented` and the given body/init.
 */
export const notImplemented: HttpResponseAssertionFalsy = createResponseAssertionFunction(501, "Not Implemented");
/**
 * Throws a `Response` with status `501 Not Implemented` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `501 Not Implemented` and the given body/init.
 */
export const implemented: HttpResponseAssertion = negate(notImplemented);

/**
 * Throws a `Response` with status `502 Bad Gateway` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `502 Bad Gateway` and the given body/init.
 */
export const badGateway: HttpResponseAssertionFalsy = createResponseAssertionFunction(502, "Bad Gateway");
/**
 * Throws a `Response` with status `502 Bad Gateway` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `502 Bad Gateway` and the given body/init.
 */
export const goodGateway: HttpResponseAssertion = negate(badGateway);

/**
 * Throws a `Response` with status `503 Service Unavailable` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `503 Service Unavailable` and the given body/init.
 */
export const serviceUnavailable: HttpResponseAssertionFalsy = createResponseAssertionFunction(503, "Service Unavailable");
/**
 * Throws a `Response` with status `503 Service Unavailable` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `503 Service Unavailable` and the given body/init.
 */
export const serviceAvailable: HttpResponseAssertion = negate(serviceUnavailable);

/**
 * Throws a `Response` with status `504 Gateway Timeout` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `504 Gateway Timeout` and the given body/init.
 */
export const gatewayTimeout: HttpResponseAssertionFalsy = createResponseAssertionFunction(504, "Gateway Timeout");
/**
 * Throws a `Response` with status `504 Gateway Timeout` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `504 Gateway Timeout` and the given body/init.
 */
export const notGatewayTimeout: HttpResponseAssertion = negate(gatewayTimeout);
export { notGatewayTimeout as gatewayResponsive };

/**
 * Throws a `Response` with status `505 HTTP Version Not Supported` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `505 HTTP Version Not Supported` and the given body/init.
 */
export const httpVersionNotSupported: HttpResponseAssertionFalsy = createResponseAssertionFunction(505, "HTTP Version Not Supported");
/**
 * Throws a `Response` with status `505 HTTP Version Not Supported` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `505 HTTP Version Not Supported` and the given body/init.
 */
export const httpVersionSupported: HttpResponseAssertion = negate(httpVersionNotSupported);

/**
 * Throws a `Response` with status `506 Variant Also Negotiates` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `506 Variant Also Negotiates` and the given body/init.
 */
export const variantAlsoNegotiates: HttpResponseAssertionFalsy = createResponseAssertionFunction(506, "Variant Also Negotiates");
/**
 * Throws a `Response` with status `506 Variant Also Negotiates` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `506 Variant Also Negotiates` and the given body/init.
 */
export const notVariantAlsoNegotiates: HttpResponseAssertion = negate(variantAlsoNegotiates);
export { notVariantAlsoNegotiates as variantNotNegotiating };

/**
 * Throws a `Response` with status `507 Insufficient Storage` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `507 Insufficient Storage` and the given body/init.
 */
export const insufficientStorage: HttpResponseAssertionFalsy = createResponseAssertionFunction(507, "Insufficient Storage");
/**
 * Throws a `Response` with status `507 Insufficient Storage` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `507 Insufficient Storage` and the given body/init.
 */
export const sufficientStorage: HttpResponseAssertion = negate(insufficientStorage);
export { sufficientStorage as storageAvailable };

/**
 * Throws a `Response` with status `508 Loop Detected` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `508 Loop Detected` and the given body/init.
 */
export const loopDetected: HttpResponseAssertionFalsy = createResponseAssertionFunction(508, "Loop Detected");
/**
 * Throws a `Response` with status `508 Loop Detected` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `508 Loop Detected` and the given body/init.
 */
export const loopNotDetected: HttpResponseAssertion = negate(loopDetected);
export { loopNotDetected as noLoop };

/**
 * Throws a `Response` with status `509 Bandwidth Limit Exceeded` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `509 Bandwidth Limit Exceeded` and the given body/init.
 */
export const bandwidthLimitExceeded: HttpResponseAssertionFalsy = createResponseAssertionFunction(509, "Bandwidth Limit Exceeded");
/**
 * Throws a `Response` with status `509 Bandwidth Limit Exceeded` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `509 Bandwidth Limit Exceeded` and the given body/init.
 */
export const bandwidthLimitNotExceeded: HttpResponseAssertion = negate(bandwidthLimitExceeded);
export { bandwidthLimitNotExceeded as bandwidthAvailable };

/**
 * Throws a `Response` with status `510 Not Extended` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `510 Not Extended` and the given body/init.
 */
export const notExtended: HttpResponseAssertionFalsy = createResponseAssertionFunction(510, "Not Extended");
/**
 * Throws a `Response` with status `510 Not Extended` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `510 Not Extended` and the given body/init.
 */
export const extended: HttpResponseAssertion = negate(notExtended);

/**
 * Throws a `Response` with status `511 Network Authentication Required` if the condition is truthy.
 *
 * @param condition - The condition to assert. If truthy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `511 Network Authentication Required` and the given body/init.
 */
export const networkAuthenticationRequired: HttpResponseAssertionFalsy = createResponseAssertionFunction(511, "Network Authentication Required");
/**
 * Throws a `Response` with status `511 Network Authentication Required` if the condition is falsy.
 *
 * @param condition - The condition to assert. If falsy, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A `Response` object with status `511 Network Authentication Required` and the given body/init.
 */
export const networkAuthenticationNotRequired: HttpResponseAssertion = negate(networkAuthenticationRequired);
export { networkAuthenticationNotRequired as networkAuthenticationOptional };
