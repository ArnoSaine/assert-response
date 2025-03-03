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
  { code: 202, names: ["accepted"], negations: ["notAccepted", "rejected"] },
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
    negations: ["notPartialContent", "entireContent", "fullContent"],
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
    negations: ["goodRequest", "valid", "correct"],
  },
  {
    code: 401,
    names: ["unauthorized"],
    negations: ["authorized", "authenticated"],
  },
  {
    code: 402,
    names: ["paymentRequired"],
    negations: ["paymentNotRequired", "paymentOptional"],
  },
  {
    code: 403,
    names: ["forbidden"],
    negations: ["notForbidden", "allowed", "permitted"],
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
    negations: ["proxyAuthNotRequired", "proxyAuthOptional"],
  },
  {
    code: 408,
    names: ["requestTimeout"],
    negations: ["notRequestTimeout", "requestFast"],
  },
  { code: 409, names: ["conflict"], negations: ["notConflict", "match"] },
  { code: 410, names: ["gone"], negations: ["notGone", "present"] },
  {
    code: 411,
    names: ["lengthRequired"],
    negations: ["lengthNotRequired", "lengthOptional"],
  },
  {
    code: 412,
    names: ["preconditionFailed"],
    negations: [
      "successfulPrecondition",
      "preconditionMet",
      "preconditionPassed",
    ],
  },
  {
    code: 413,
    names: ["payloadTooLarge"],
    negations: ["notPayloadTooLarge", "payloadSmall"],
  },
  {
    code: 414,
    names: ["uriTooLong"],
    negations: ["uriNotTooLong", "uriShort"],
  },
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
    negations: ["expectationSuccessful", "expectationMet", "expectationPassed"],
  },
  { code: 418, names: ["teapot"], negations: ["notTeapot"] },
  {
    code: 421,
    names: ["misdirectedRequest"],
    negations: ["correctlyDirectedRequest", "directedRequest"],
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
    negations: ["successfulDependency", "dependencyMet", "dependencyPassed"],
  },
  {
    code: 425,
    names: ["tooEarly"],
    negations: ["notTooEarly", "afterSufficientTime", "onTime"],
  },
  {
    code: 426,
    names: ["upgradeRequired"],
    negations: ["upgradeNotRequired", "upgradeOptional"],
  },
  {
    code: 428,
    names: ["preconditionRequired"],
    negations: ["preconditionNotRequired", "preconditionOptional"],
  },
  {
    code: 429,
    names: ["tooManyRequests"],
    negations: ["notTooManyRequests", "fewRequests"],
  },
  {
    code: 431,
    names: ["requestHeaderFieldsTooLarge"],
    negations: ["requestHeaderFieldsAcceptable", "requestHeaderFieldsSmall"],
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
    negations: ["sufficientStorage", "storageAvailable"],
  },
  {
    code: 508,
    names: ["loopDetected"],
    negations: ["loopNotDetected", "noLoop"],
  },
  {
    code: 509,
    names: ["bandwidthLimitExceeded"],
    negations: ["bandwidthLimitNotExceeded", "bandwidthAvailable"],
  },
  { code: 510, names: ["notExtended"], negations: ["extended"] },
  {
    code: 511,
    names: ["networkAuthenticationRequired"],
    negations: [
      "networkAuthenticationNotRequired",
      "networkAuthenticationOptional",
    ],
  },
];
