# assert-response

A lightweight utility library for asserting HTTP response conditions and throwing a [`Response`](https://developer.mozilla.org/docs/Web/API/Response) with the appropriate [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status), and optional [`body`](https://developer.mozilla.org/docs/Web/API/Response/Response#body) and [`options`](https://developer.mozilla.org/docs/Web/API/Response/Response#options).

## Usage

### Ensure a resource exists

If the resource is missing, throw a `404 Not Found` response.

```ts
import { found } from "assert-response";

function loader() {
  const foo = getFoo(); // Foo | undefined

  // Throws a 404 response if foo is undefined
  found(foo);

  foo; // Type is now Foo
  // Do something with foo
}
```

### Require authentication

If the user is not authenticated, throw a `401 Unauthorized` response.

```ts
import { authorized } from "assert-response";

function action() {
  const user = getCurrentUser(); // User | null

  // Throws a 401 response if user is null
  authorized(user);

  user; // Type is now User
  // ...
}
```

### Validate a successful operation

If the operation was unsuccessful, throw a `500 Internal Server Error`.

```ts
import { noError } from "assert-response";

function action() {
  const success = processRequest(); // boolean

  // Throws a 500 response if success is false
  noError(success);
  // Do further actions
}
```

### Validate an unsuccessful operation

If the operation was successful, throw a `200 OK`.

```ts
import { internalServerError, notOk } from "assert-response";

function action() {
  const [error] = processOtherRequest(); // [string | null]

  // Throws a 200 response if error is null
  notOk(error);
  error; // Type is now string

  console.error(error);

  // Throws a 500 response if error is not null
  internalServerError(error);
}
```

### Validate permissions and resource conflicts before saving

This example ensures:

- 👋 The user is authenticated (`401 Unauthorized`).
- ✅ The user has permission to update the document (`403 Forbidden`).
- 👍 The input is valid (`400 Bad Request`).
- 🔍 The document exists (`404 Not Found`).
- 🤝 The document has not been modified since the last retrieval (`409 Conflict`).
- ⚠️ / 👌 The update is successful (`500 Internal Server Error` / `204 No Content`).

```ts
import {
  authorized,
  allowed,
  found,
  match,
  noContent,
  valid,
  internalServerError,
} from "assert-response";

interface Document {
  id: string;
  lastModified: number;
}

async function saveAndContinueEditing(doc?: Document) {
  const user = getCurrentUser();
  // 👋 Throws a 401 response if current user is null
  authorized(user, "Authentication required");
  user; // Type is now User

  // ✅ Throws a 403 response if not permitted
  allowed(
    user.permissions.includes("update-document"),
    "Permission to update document required"
  );

  // 👍 Throws a 400 response if missing update document
  valid(doc, "Missing document");

  const prevDoc: Document | undefined = await database.find(doc.id);
  // 🔍 Throws a 404 response if the document does not exist
  found(prevDoc, "Document not found");
  prevDoc; // Type is now Document

  // 🤝 Throws a 409 response if the document has been modified since last retrieval
  match(prevDoc.lastModified === doc.lastModified, "Conflict detected");

  const [error] = await database.put(doc);

  // ⚠️ Throws a 500 response if the update failed
  internalServerError(error);

  // 👌 Throws a 204 response if everything successful
  noContent(true);
}
```

---

## API

Each assertion function checks a condition and throws a `Response` with the corresponding HTTP status code if the condition is **truthy**.
Negated functions work in reverse: they throw a response when the condition is **falsy**.

You may also pass an optional [`body`](https://developer.mozilla.org/docs/Web/API/Response/Response#body) and [`options`](https://developer.mozilla.org/docs/Web/API/Response/Response#options) parameters for `Response` as the second and third arguments for the assertion function. These can either be values or functions that return the respective values.

To use these functions:

```ts
import { found, ok, redirect, valid } from "assert-response";

// Throws a 200 response if user is truthy, with a dynamic message
ok(
  user,
  () => JSON.stringify({ message: "Welcome back!" }),
  () => ({ headers: { "Content-Type": "application/json" } })
);

// Throws a 302 response with options if redirectURL is set
redirect(redirectURL, undefined, {
  headers: {
    Location: redirectURL!,
  },
});

// Validate user input (Negated function, throws 400 response if condition is falsy)
valid(isValid(input), "Invalid input");

// Ensure item is found (Negated function, throws 404 response if condition is falsy)
found(item, "Item not found");
```

### Assertion Functions

Each function is mapped to an HTTP status code.

<!-- <Assertion Functions> -->

#### Successful Responses (`200`–`299`)

| Status Code | Function _(Aliases)_          | Negated Function _(Aliases)_                                         |
| ----------- | ----------------------------- | -------------------------------------------------------------------- |
| 200         | `ok` <br> _(`successful`)_    | `notOk` <br> _(`failed`)_                                            |
| 201         | `created`                     | `notCreated` <br> _(`creationFailed`)_                               |
| 202         | `accepted`                    | `notAccepted`                                                        |
| 203         | `nonAuthoritativeInformation` | `notNonAuthoritativeInformation` <br> _(`authoritativeInformation`)_ |
| 204         | `noContent`                   | `notNoContent` <br> _(`content`)_                                    |
| 205         | `resetContent`                | `notResetContent`                                                    |
| 206         | `partialContent`              | `notPartialContent` <br> _(`entireContent`)_                         |
| 207         | `multiStatus`                 | `notMultiStatus` <br> _(`singleStatus`)_                             |
| 208         | `alreadyReported`             | `notAlreadyReported`                                                 |
| 226         | `imUsed`                      | `notImUsed`                                                          |

#### Redirection Responses (`300`–`399`)

| Status Code | Function _(Aliases)_                 | Negated Function _(Aliases)_              |
| ----------- | ------------------------------------ | ----------------------------------------- |
| 300         | `multipleChoices`                    | `notMultipleChoices`                      |
| 301         | `movedPermanently`                   | `notMovedPermanently`                     |
| 302         | `temporaryFound` <br> _(`redirect`)_ | `notTemporaryFound` <br> _(`noRedirect`)_ |
| 303         | `seeOther`                           | `notSeeOther`                             |
| 304         | `notModified`                        | `modified`                                |
| 305         | `useProxy` <br> _(`proxy`)_          | `notUseProxy`                             |
| 307         | `temporaryRedirect`                  | `notTemporaryRedirect`                    |
| 308         | `permanentRedirect`                  | `notPermanentRedirect`                    |

#### Client Error Responses (`400`–`499`)

| Status Code | Function _(Aliases)_            | Negated Function _(Aliases)_                       |
| ----------- | ------------------------------- | -------------------------------------------------- |
| 400         | `badRequest` <br> _(`invalid`)_ | `goodRequest` <br> _(`valid`)_                     |
| 401         | `unauthorized`                  | `authorized` <br> _(`authenticated`)_              |
| 402         | `paymentRequired`               | `paymentNotRequired`                               |
| 403         | `forbidden`                     | `notForbidden` <br> _(`allowed`)_                  |
| 404         | `notFound`                      | `found`                                            |
| 405         | `methodNotAllowed`              | `methodAllowed`                                    |
| 406         | `notAcceptable`                 | `acceptable`                                       |
| 407         | `proxyAuthRequired`             | `proxyAuthNotRequired`                             |
| 408         | `requestTimeout`                | `notRequestTimeout`                                |
| 409         | `conflict`                      | `notConflict` <br> _(`match`)_                     |
| 410         | `gone`                          | `notGone` <br> _(`present`)_                       |
| 411         | `lengthRequired`                | `lengthNotRequired`                                |
| 412         | `preconditionFailed`            | `notPreconditionFailed` <br> _(`preconditionMet`)_ |
| 413         | `payloadTooLarge`               | `notPayloadTooLarge`                               |
| 414         | `uriTooLong`                    | `uriNotTooLong`                                    |
| 415         | `unsupportedMediaType`          | `supportedMediaType`                               |
| 416         | `rangeNotSatisfiable`           | `rangeSatisfiable`                                 |
| 417         | `expectationFailed`             | `expectationSuccessful`                            |
| 418         | `teapot`                        | `notTeapot`                                        |
| 421         | `misdirectedRequest`            | `correctlyDirectedRequest`                         |
| 422         | `unprocessableEntity`           | `processableEntity`                                |
| 423         | `locked`                        | `unlocked` <br> _(`open`)_                         |
| 424         | `failedDependency`              | `successfulDependency` <br> _(`dependencyMet`)_    |
| 425         | `tooEarly`                      | `notTooEarly` <br> _(`afterSufficientTime`)_       |
| 426         | `upgradeRequired`               | `upgradeNotRequired`                               |
| 428         | `preconditionRequired`          | `preconditionNotRequired`                          |
| 429         | `tooManyRequests`               | `notTooManyRequests`                               |
| 431         | `requestHeaderFieldsTooLarge`   | `requestHeaderFieldsAcceptable`                    |
| 451         | `unavailableForLegalReasons`    | `availableForLegalReasons`                         |

#### Server Error Responses (`500`–`599`)

| Status Code | Function _(Aliases)_            | Negated Function _(Aliases)_                                |
| ----------- | ------------------------------- | ----------------------------------------------------------- |
| 500         | `internalServerError`           | `noError` <br> _(`notInternalServerError`)_                 |
| 501         | `notImplemented`                | `implemented`                                               |
| 502         | `badGateway`                    | `goodGateway`                                               |
| 503         | `serviceUnavailable`            | `serviceAvailable`                                          |
| 504         | `gatewayTimeout`                | `notGatewayTimeout` <br> _(`gatewayResponsive`)_            |
| 505         | `httpVersionNotSupported`       | `httpVersionSupported`                                      |
| 506         | `variantAlsoNegotiates`         | `notVariantAlsoNegotiates` <br> _(`variantNotNegotiating`)_ |
| 507         | `insufficientStorage`           | `sufficientStorage`                                         |
| 508         | `loopDetected`                  | `loopNotDetected`                                           |
| 509         | `bandwidthLimitExceeded`        | `bandwidthLimitNotExceeded`                                 |
| 510         | `notExtended`                   | `extended`                                                  |
| 511         | `networkAuthenticationRequired` | `networkAuthenticationNotRequired`                          |

<!-- </Assertion Functions> -->
