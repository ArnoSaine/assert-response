import * as assert from "node:assert";
import { describe, it } from "node:test";
import { codes, mustNotContainBodyCodes } from "../codes.ts";
import * as assertResponse from "./main.ts";
import {
  allowed,
  authorized,
  failed,
  found,
  internalServerError,
  match,
  noContent,
  noError,
  notFound,
  notOk,
  ok,
  redirect,
  unauthorized,
  valid,
  type Falsy,
} from "./main.ts";

const test = <T>(x: T) => x;

function safe<Block extends () => unknown>(block: Block) {
  try {
    return [null, block()] as const;
  } catch (error) {
    return [error] as const;
  }
}

async function assertStatusAndBody(
  block: () => unknown,
  status: number,
  body?: string
) {
  const [response] = safe(block);
  assert.ok(response instanceof Response);
  assert.equal(response.status, status);
  if (typeof body === "string") {
    assert.equal(await response.text(), body);
  }
  return response;
}

type User = { name: string; roles: string[]; permissions: string[] };
type Foo = { foo: string };
interface Document {
  id: string;
  lastModified: number;
}
const user: User | null = {
  name: "Example",
  roles: ["user"],
  permissions: ["update-document"],
};
const error: string | null = "Oops!";
const foo: Foo | undefined = { foo: "bar" };

describe("Examples", () => {
  describe("Ensure a resource exists", () => {
    it("Throws a 404 response if foo is undefined", async () => {
      await assertStatusAndBody(
        () => {
          const foo = test<Foo | undefined>(undefined);
          // @ts-expect-error
          test<Foo>(foo);
          found(foo);
          test<Foo>(foo);
        },
        404,
        "Not Found"
      );
    });

    it("Does not throw if foo is defined", () => {
      assert.doesNotThrow(() => {
        found(foo);
      });
    });
  });

  describe("Require authentication", () => {
    it("Throws a 401 response if user is null", async () => {
      await assertStatusAndBody(
        () => {
          const user = test<User | null>(null);
          // @ts-expect-error
          test<User>(user);
          authorized(user);
          test<User>(user);
        },
        401,
        "Unauthorized"
      );
    });

    it("Does not throw if user is defined", () => {
      assert.doesNotThrow(() => {
        authorized(user);
      });
    });
  });

  describe("Validate a successful operation", () => {
    it("Throws a 500 response if success is false", async () => {
      await assertStatusAndBody(
        () => {
          const success = test<boolean>(false);
          // @ts-expect-error
          test<true>(success);
          noError(success);
          test<true>(success);
        },
        500,
        "Internal Server Error"
      );
    });

    it("Does not throw if success is true", () => {
      assert.doesNotThrow(() => {
        noError(true);
      });
    });
  });

  describe("Validate an unsuccessful operation", () => {
    it("Throws a 200 response if error is null", async () => {
      function block(error: string | null) {
        // @ts-expect-error
        test<string>(error);
        notOk(error);
        test<string>(error);
        internalServerError(error);
        test<Falsy>(error); // never
      }
      await assertStatusAndBody(() => block(null), 200, "OK");
      await assertStatusAndBody(
        () => block(error),
        500,
        "Internal Server Error"
      );
    });
  });

  describe("Validate permissions and resource conflicts before saving", () => {
    const doc = { id: "123", lastModified: 123 };
    const modifiedDoc = { id: "123", lastModified: 456 };
    function saveAndContinueEditing(
      user?: User,
      doc?: Document,
      prevDoc?: Document,
      error?: string
    ) {
      // 👋 Throws a 401 response if current user is null
      authorized(user, "Authentication required");

      // ✅ Throws a 403 response if not permitted
      allowed(
        user.permissions.includes("update-document"),
        "Permission to update document required"
      );

      // 👍 Throws a 400 response if missing update document
      valid(doc, "Missing document");

      // 🔍 Throws a 404 response if the document does not exist
      found(prevDoc, "Document not found");

      // 🤝 Throws a 409 response if the document has been modified since last retrieval
      match(prevDoc.lastModified === doc.lastModified, "Conflict detected");

      // ⚠️ Throws a 500 response if the update failed
      internalServerError(error);

      // 👌 Throws a 204 response if everything successful
      noContent(true);
    }
    it("Throws a 204 response if unauthenticated", async () => {
      await assertStatusAndBody(
        () => saveAndContinueEditing(),
        401,
        "Authentication required"
      );
    });
    it("Throws a 400 response if missing input document", async () => {
      await assertStatusAndBody(
        () => saveAndContinueEditing(user),
        400,
        "Missing document"
      );
    });
    it("Throws a 404 response if document not found", async () => {
      await assertStatusAndBody(
        () => saveAndContinueEditing(user, doc),
        404,
        "Document not found"
      );
    });
    it("Throws a 409 response if conflict detected", async () => {
      await assertStatusAndBody(
        () => saveAndContinueEditing(user, doc, modifiedDoc),
        409,
        "Conflict detected"
      );
    });
    it("Throws a 500 response if error occurred", async () => {
      await assertStatusAndBody(
        () => saveAndContinueEditing(user, doc, doc, error),
        500,
        "Internal Server Error"
      );
    });
    it("Throws a 204 response if everything successful", async () => {
      await assertStatusAndBody(
        () => saveAndContinueEditing(user, doc, doc),
        204,
        ""
      );
    });
  });
});

describe("API", () => {
  describe("Function", () => {
    it("Does not throw if condition is falsy", async () => {
      assert.doesNotThrow(() => ok());
      assert.doesNotThrow(() => ok(false));
    });
    it("Throws a 200 response if condition is truthy", async () => {
      await assertStatusAndBody(() => ok(true), 200, "OK");
      await assertStatusAndBody(() => ok([]), 200, "OK");
    });
    it("Does not throw response with custom body if condition is falsy", async () => {
      assert.doesNotThrow(() =>
        ok(
          undefined,
          () => JSON.stringify({ message: "Welcome back!" }),
          () => ({ headers: { "Content-Type": "application/json" } })
        )
      );
    });
    it("Throws a 200 response with custom body", async () => {
      const response = await assertStatusAndBody(
        () =>
          ok(
            true,
            () => JSON.stringify({ message: "Welcome back!" }),
            () => ({ headers: { "Content-Type": "application/json" } })
          ),
        200,
        '{"message":"Welcome back!"}'
      );
      assert.equal(response.headers.get("Content-Type"), "application/json");
    });

    const redirectURL = "/other.html";
    it("Throws a 302 response with options if redirectURL is set", async () => {
      const response = await assertStatusAndBody(
        () =>
          redirect(redirectURL, undefined, {
            headers: {
              Location: redirectURL!,
            },
          }),
        302,
        "Found"
      );
      assert.equal(response.headers.get("Location"), "/other.html");
    });
    it("Does not throw a 302 response with options if redirectURL is not set", async () => {
      assert.doesNotThrow(() =>
        redirect(undefined, undefined, {
          headers: {
            Location: redirectURL!,
          },
        })
      );
    });
    it("Throws a 200 response with JSON body", async () => {
      const response = await assertStatusAndBody(
        () => ok(foo, () => JSON.stringify(foo)),
        200
      );
      const data = await response.json();
      assert.deepEqual(data, foo);
    });
  });

  describe("Negated function", () => {
    it("Does not throw if condition is truthy", async () => {
      assert.doesNotThrow(() => notOk(true));
      assert.doesNotThrow(() => notOk([]));
    });
    it("Throws a 200 response if condition is falsy", async () => {
      await assertStatusAndBody(() => notOk(), 200, "OK");
      await assertStatusAndBody(() => notOk(false), 200, "OK");
    });
  });

  describe("Other examples", () => {
    it("Throws a 200 response if condition is falsy", async () => {
      await assertStatusAndBody(
        () => valid(false, "Invalid input"),
        400,
        "Invalid input"
      );
      await assertStatusAndBody(
        () => found(null, "Item not found"),
        404,
        "Item not found"
      );
    });
  });

  for (const {
    code,
    names: [name],
  } of codes) {
    const assertFn = assertResponse[name as keyof typeof assertResponse];

    if (mustNotContainBodyCodes.includes(code)) {
      it(`Throws Error on non-empty body (${name})`, () => {
        const [error] = safe(() => assertFn(true, "Custom Body"));
        assert.ok(error instanceof Error);
      });
      it(`Throws Response on empty body (${name})`, async () => {
        const [response] = safe(() => assertFn(true));
        assert.ok(response instanceof Response);
      });
    } else {
      it(`Throws Response on non-empty body (${name})`, async () => {
        const [response] = safe(() => assertFn(true, "Custom Body"));
        assert.ok(response instanceof Response);
      });
    }
  }
});

function okTypings() {
  ok(error);
  test<Falsy>(error);
  // @ts-expect-error
  test<string>(error);
}

function failTypings() {
  failed(error);
  test<string>(error);
  // @ts-expect-error
  test<Falsy>(error);
}

function authorizedTypings() {
  // @ts-expect-error
  user.name;
  authorized(user);
  user.name;
  test<User>(user);
}

function unauthorizedTypings() {
  // @ts-expect-error
  user.name;
  unauthorized(user);
  // @ts-expect-error
  user.name;
  test<null>(user);
}

function foundTypings() {
  // @ts-expect-error
  foo.foo;
  found(foo);
  foo.foo;
  test<Foo>(foo);
}

function notFoundTypings() {
  // @ts-expect-error
  foo.foo;
  notFound(foo);
  // @ts-expect-error
  foo.foo;
  test<undefined>(foo);
}
