import { describe, test } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { isDigit } from "./strings.ts";

describe("The string utilities", () => {
  describe("when checking for digits for all ASCII chars", () => {
    const DIGIT_ASCII_CODES = Array.from({ length: 10 }, (_, i) => 48 + i); // 48-57
    const NON_DIGIT_ASCII_CODES = Array.from({ length: 128 }, (_, i) => i)
      .filter(
        (code) => !DIGIT_ASCII_CODES.includes(code),
      );
    test("should identify all digits", () => {
      // given: all ASCII codes for digits
      for (const charCode of DIGIT_ASCII_CODES) {
        const char = String.fromCharCode(charCode);

        // when
        const result = isDigit(char);

        // then
        assertEquals(true, result, `Failed for digit: ${char}`);
      }
    });

    test("should identify all non-digit ASCII characters", () => {
      // given: all ASCII codes for non-digits
      for (const charCode of NON_DIGIT_ASCII_CODES) {
        const char = String.fromCharCode(charCode);

        if (charCode >= 48 && charCode <= 57) {
          continue; // Skip digits
        }

        // when
        const result = isDigit(char);

        // then
        assertEquals(false, result, `Failed for non-digit: ${char}`);
      }
    });
  });
});
