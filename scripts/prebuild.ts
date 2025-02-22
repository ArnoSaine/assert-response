import { markdownTable } from "markdown-table";
import { readFile, writeFile } from "node:fs/promises";
import { STATUS_CODES } from "node:http";
import { codes, mustNotContainBodyCodes } from "../codes.ts";

function jsDocComment(code: number, negate = false) {
  const text = STATUS_CODES[code];
  const status = `${code} ${text}`;
  const truthiness = negate ? "falsy" : "truthy";

  return `/**
 * Throws a \`Response\` with status \`${status}\` if the condition is ${truthiness}.
 *
 * @param condition - The condition to assert. If ${truthiness}, a response is thrown.
 * @param body - Optional response body, or a function returning a body.
 * @param init - Optional response init options, or a function returning init options.
 * @throws {Response} - A \`Response\` object with status \`${status}\` and the given body/init.
 */`;
}

await writeFile(
  "src/main.ts",
  `export type HttpResponseAssertion = (
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

${codes.map(
  ({
    code,
    names: [name, ...aliases],
    negations: [negation, ...negationAliases],
  }) => {
    return `${jsDocComment(code)}
export const ${name}: HttpResponseAssertionFalsy = createResponseAssertionFunction(${code}${
      mustNotContainBodyCodes.includes(code) ? "" : `, "${STATUS_CODES[code]}"`
    });
${
  aliases.length
    ? `export { ${aliases
        .map((fnAlias) => `${name} as ${fnAlias}`)
        .join(", ")} };
`
    : ""
}${jsDocComment(code, true)}
export const ${negation}: HttpResponseAssertion = negate(${name});
${
  negationAliases.length
    ? `export { ${negationAliases
        .map((negateAlias) => `${negation} as ${negateAlias}`)
        .join(", ")} };
`
    : ""
}`;
  }
).join(`
`)}`
);

const groups = {
  200: "Successful Responses",
  300: "Redirection Responses",
  400: "Client Error Responses",
  500: "Server Error Responses",
};

const printFunctions = ([name, ...aliases]: string[]) =>
  `\`${name}\`${
    aliases.length
      ? ` <br> _(${aliases.map((name) => `\`${name}\``).join(", ")})_`
      : ""
  }`;

await writeFile(
  "README.md",
  (
    await readFile("README.md", "utf-8")
  ).replace(
    /<!-- <Assertion Functions> -->([\S\s]*?)<!-- <\/Assertion Functions> -->/m,
    `<!-- <Assertion Functions> -->

${Object.entries(
  Object.groupBy(codes, ({ code }) => Math.floor(code / 100) * 100)
).map(
  ([group, codes]) =>
    `#### ${groups[group as unknown as keyof typeof groups]} (\`${group}\`–\`${
      Number(group) + 99
    }\`)

${markdownTable([
  ["Status Code", "Function _(Aliases)_", "Negated Function _(Aliases)_"],
  ...codes.map(({ code, names, negations }) => [
    String(code),
    printFunctions(names),
    printFunctions(negations),
  ]),
])}`
).join(`

`)}

<!-- </Assertion Functions> -->`
  )
);
