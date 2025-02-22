export const mustNotContainBodyCodes = [204, 205, 304];

export const codes = [
  {
    code: 200,
    names: ["ok", "successful"],
    negations: ["notOk", "failed"],
  },
  {
    code: 201,
    names: ["created"],
    negations: ["notCreated", "creationFailed"],
  },
  { code: 202, names: ["accepted"], negations: ["notAccepted"] },
  {
    code: 203,
    names: ["nonAuthoritativeInformation"],
    negations: ["notNonAuthoritativeInformation", "authoritativeInformation"],
  },
  {
    code: 204,
    names: ["noContent"],
    negations: ["notNoContent", "content"],
  },
  { code: 205, names: ["resetContent"], negations: ["notResetContent"] },
  {
    code: 206,
    names: ["partialContent"],
    negations: ["notPartialContent", "entireContent"],
  },
  {
    code: 207,
    names: ["multiStatus"],
    negations: ["notMultiStatus", "singleStatus"],
  },
  {
    code: 208,
    names: ["alreadyReported"],
    negations: ["notAlreadyReported"],
  },
  { code: 226, names: ["imUsed"], negations: ["notImUsed"] },

  {
    code: 300,
    names: ["multipleChoices"],
    negations: ["notMultipleChoices"],
  },
  {
    code: 301,
    names: ["movedPermanently"],
    negations: ["notMovedPermanently"],
  },
  {
    code: 302,
    names: ["temporaryFound", "redirect"],
    negations: ["notTemporaryFound", "noRedirect"],
  },
  { code: 303, names: ["seeOther"], negations: ["notSeeOther"] },
  { code: 304, names: ["notModified"], negations: ["modified"] },
  { code: 305, names: ["useProxy", "proxy"], negations: ["notUseProxy"] },
  {
    code: 307,
    names: ["temporaryRedirect"],
    negations: ["notTemporaryRedirect"],
  },
  {
    code: 308,
    names: ["permanentRedirect"],
    negations: ["notPermanentRedirect"],
  },

  {
    code: 400,
    names: ["badRequest", "invalid"],
    negations: ["goodRequest", "valid"],
  },
  {
    code: 401,
    names: ["unauthorized"],
    negations: ["authorized", "authenticated"],
  },
  {
    code: 402,
    names: ["paymentRequired"],
    negations: ["paymentNotRequired"],
  },
  {
    code: 403,
    names: ["forbidden"],
    negations: ["notForbidden", "allowed"],
  },
  {
    code: 404,
    names: ["notFound"],
    negations: ["found"],
  },
  {
    code: 405,
    names: ["methodNotAllowed"],
    negations: ["methodAllowed"],
  },
  { code: 406, names: ["notAcceptable"], negations: ["acceptable"] },
  {
    code: 407,
    names: ["proxyAuthRequired"],
    negations: ["proxyAuthNotRequired"],
  },
  {
    code: 408,
    names: ["requestTimeout"],
    negations: ["notRequestTimeout"],
  },
  { code: 409, names: ["conflict"], negations: ["notConflict", "match"] },
  { code: 410, names: ["gone"], negations: ["notGone", "present"] },
  {
    code: 411,
    names: ["lengthRequired"],
    negations: ["lengthNotRequired"],
  },
  {
    code: 412,
    names: ["preconditionFailed"],
    negations: ["notPreconditionFailed", "preconditionMet"],
  },
  {
    code: 413,
    names: ["payloadTooLarge"],
    negations: ["notPayloadTooLarge"],
  },
  { code: 414, names: ["uriTooLong"], negations: ["uriNotTooLong"] },
  {
    code: 415,
    names: ["unsupportedMediaType"],
    negations: ["supportedMediaType"],
  },
  {
    code: 416,
    names: ["rangeNotSatisfiable"],
    negations: ["rangeSatisfiable"],
  },
  {
    code: 417,
    names: ["expectationFailed"],
    negations: ["expectationSuccessful"],
  },
  { code: 418, names: ["teapot"], negations: ["notTeapot"] },
  {
    code: 421,
    names: ["misdirectedRequest"],
    negations: ["correctlyDirectedRequest"],
  },
  {
    code: 422,
    names: ["unprocessableEntity"],
    negations: ["processableEntity"],
  },
  { code: 423, names: ["locked"], negations: ["unlocked", "open"] },
  {
    code: 424,
    names: ["failedDependency"],
    negations: ["successfulDependency", "dependencyMet"],
  },
  {
    code: 425,
    names: ["tooEarly"],
    negations: ["notTooEarly", "afterSufficientTime"],
  },
  {
    code: 426,
    names: ["upgradeRequired"],
    negations: ["upgradeNotRequired"],
  },
  {
    code: 428,
    names: ["preconditionRequired"],
    negations: ["preconditionNotRequired"],
  },
  {
    code: 429,
    names: ["tooManyRequests"],
    negations: ["notTooManyRequests"],
  },
  {
    code: 431,
    names: ["requestHeaderFieldsTooLarge"],
    negations: ["requestHeaderFieldsAcceptable"],
  },
  {
    code: 451,
    names: ["unavailableForLegalReasons"],
    negations: ["availableForLegalReasons"],
  },

  {
    code: 500,
    names: ["internalServerError"],
    negations: ["noError", "notInternalServerError"],
  },
  { code: 501, names: ["notImplemented"], negations: ["implemented"] },
  { code: 502, names: ["badGateway"], negations: ["goodGateway"] },
  {
    code: 503,
    names: ["serviceUnavailable"],
    negations: ["serviceAvailable"],
  },
  {
    code: 504,
    names: ["gatewayTimeout"],
    negations: ["notGatewayTimeout", "gatewayResponsive"],
  },
  {
    code: 505,
    names: ["httpVersionNotSupported"],
    negations: ["httpVersionSupported"],
  },
  {
    code: 506,
    names: ["variantAlsoNegotiates"],
    negations: ["notVariantAlsoNegotiates", "variantNotNegotiating"],
  },
  {
    code: 507,
    names: ["insufficientStorage"],
    negations: ["sufficientStorage"],
  },
  { code: 508, names: ["loopDetected"], negations: ["loopNotDetected"] },
  {
    code: 509,
    names: ["bandwidthLimitExceeded"],
    negations: ["bandwidthLimitNotExceeded"],
  },
  { code: 510, names: ["notExtended"], negations: ["extended"] },
  {
    code: 511,
    names: ["networkAuthenticationRequired"],
    negations: ["networkAuthenticationNotRequired"],
  },
];
