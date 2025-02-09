# copyrightYear

A JavaScript utility for updating HTML elements with a copyright year range.

## Installation

Install the package via npm:

```sh
npm install copyright-year
```

## Usage

Import and use the function in your JavaScript or TypeScript project:

### JavaScript (CommonJS)
```js
const copyrightYear = require("copyright-year").default;

copyrightYear(".copyright");
```

### TypeScript / ES Module
```ts
import copyrightYear from "copyright-year";

copyrightYear(".copyright");
```

## Function Signature
```ts
/**
 * Updates one or more HTML elements to display a copyright year range.
 *
 * This function reads the inner text of the given HTML element(s),
 * validates it as a year, and updates it to a range (e.g., "2000 - 2024")
 * if the declared year is in the past.
 *
 * - If the declared year matches the current year, it remains unchanged.
 * - If the declared year is in the past, it updates to a range.
 * - Throws an error for invalid or out-of-range years.
 * - Returns without modification if `element` is `null`.
 *
 * @param {HTMLElement | string | null} target - The HTML element, selector string, or null.
 *
 * @throws {Error} If the year is non-numeric, not an integer, before 1911, or in the future.
 *
 * @example
 * ```html
 * <span class="copyright">2010</span>
 * <script>
 *   copyrightYear(".copyright");
 *   // Updates text to "2010 - 2024" (if the current year is 2024)
 * </script>
 * ```
 */
export default function copyrightYear(target: HTMLElement | string | null): void;
```

## Examples

- **Updating an HTML element**:
  ```html
  <span class="copyright">2015</span>
  <script>
    copyrightYear(".copyright");
    // Updates text to "2015 - 2024" if the current year is 2024
  </script>
  ```

## License

This package is released under the MIT License.
