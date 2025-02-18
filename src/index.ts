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
export default function copyrightYear(
  target: HTMLElement | string | null,
): void {
  if (!target) return;

  if (typeof target === "string") {
    document.querySelectorAll<HTMLElement>(target).forEach(updateElement);
  } else {
    updateElement(target);
  }
}

/**
 * Helper function to update a single HTML element.
 *
 * @param {HTMLElement} element - The HTML element to update.
 */
function updateElement(element: HTMLElement | null): void {
  if (!element || !(element instanceof HTMLElement)) return;

  const thisYear = new Date().getFullYear();
  const declaredYear = parseInt(element.textContent?.trim() || "", 10);

  if (!Number.isInteger(declaredYear))
    throw new Error("Invalid year: Must be an integer.");
  if (declaredYear < 1911)
    throw new Error("Invalid year: Cannot be before copyright law (1911). ");
  if (declaredYear > thisYear)
    throw new Error("Invalid year: Cannot be in the future.");

  element.textContent =
    declaredYear < thisYear ? `${declaredYear} - ${thisYear}` : `${thisYear}`;
}
