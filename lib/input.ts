import { splitBy, splitByNewLine, splitBySpace } from "@strings";
import { createMatrix } from "@arrays";
import { Level, Report } from "../2024/day_2/fusion-utils.ts";

export const readSessionToken: () => string = () => {
  const sessionCookie = Deno.args[0] ?? Deno.env.get("ADVENT_SESSION_COOKIE");

  if (!sessionCookie) {
    console.error("Usage: ./main.ts <session_cookie>");
    console.error(
      "Alternatively, set the session cookie as an environment variable: ADVENT_SESSION_COOKIE",
    );
    Deno.exit(1);
  }
  return sessionCookie;
};

export const downloadInput: (
  url: string,
  sessionCookie: string,
) => Promise<string> = async (
  url,
  sessionCookie,
) => {
  try {
    const response = await fetch(url, {
      headers: {
        "Cookie": `session=${sessionCookie}`,
      },
    });

    if (!response.ok) {
      const errorDetails = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        url: response.url,
      };
      const responseBody = await response.text().catch(() =>
        "Failed to parse body"
      );

      throw new Error(
        `Failed to fetch ${url}:\nRequest Headers: ${
          JSON.stringify(
            {
              Cookie: `session=${sessionCookie}`,
            },
            null,
            2,
          )
        }\nResponse Details: ${
          JSON.stringify(errorDetails, null, 2)
        }\nResponse Body: ${responseBody}`,
      );
    }

    return await response.text();
  } catch (error) {
    throw new Error(
      `An unexpected error occurred while fetching ${url}: ${
        (error as Error).message || error
      }`,
    );
  }
};

export class InputParser<I = string, T = unknown> {
  private parsed: T | null = null;

  constructor(public raw: I) {}

  public printInput(inputMapperFn?: (input: I) => string): this {
    console.log("Input is:");
    if (inputMapperFn) {
      console.log(inputMapperFn(this.raw));
    } else {
      console.log(this.raw);
    }
    return this;
  }

  public parseLines<U>(parseFn: (input: I) => U): InputParser<I, U> {
    this.parsed = parseFn(this.raw) as unknown as T;
    return this as unknown as InputParser<I, U>;
  }

  public printParsed(printParsedFn?: (parsed: T) => void): this {
    if (this.parsed === null) {
      console.warn("Nothing parsed yet, cannot apply print function");
      return this;
    }
    console.log("Parsed input is:");
    if (printParsedFn) {
      printParsedFn(this.parsed);
    } else {
      console.log(JSON.stringify(this.parsed, null, 2));
    }
    return this;
  }

  public getParsed(): T {
    if (this.parsed === null) {
      throw new Error("Invalid state: nothing parsed yet");
    }
    return this.parsed;
  }
}

export function parseItems<V = unknown, I = unknown>(
  input: string,
  valueSeparator: string,
  mapStringToValue: (char: string, index?: number) => V = (
    char,
    index,
  ) => char as V,
  mapValueToItem: (value: V, index?: number) => I = (
    value,
    index,
  ) => value as unknown as I,
  lineSeparator: string = "\n",
) {
  const lines = splitBy(input, lineSeparator);
  const items: I[] = [];
  let index = 0;
  for (const line of lines) {
    const values: V[] = [];
    for (const value of splitBy(line, valueSeparator)) {
      values.push(mapStringToValue(value, index));
    }
    const valuesMappedToItems = values.map((v, index) =>
      mapValueToItem(v, index)
    );
    items.push(...valuesMappedToItems);
    index++;
  }
  return items;
}

export function parseMatrix<T = unknown>(
  input: string,
  initialValue: T = " " as T,
  mapCellValueFn: (char: string) => T = (char) => char as T,
): T[][] {
  const rows = splitByNewLine(input);
  const colCount = rows[0]?.length || 0; // Handle edge cases with empty input
  const matrix: T[][] = createMatrix(rows.length, colCount, initialValue);

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      matrix[i][j] = mapCellValueFn(rows[i].charAt(j));
    }
  }

  return matrix;
}
