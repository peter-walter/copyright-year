import { describe, it, expect } from "vitest";
import copyrightYear from "../src/copyrightYear";

describe("copyrightYear", () => {
    it("should remain unchanged if the current year and declared year matches", () => {
        const element = document.createElement("span");
        element.textContent = `${new Date().getFullYear()}`;
        copyrightYear(element);

        expect(element.textContent).toBe(`${new Date().getFullYear()}`);
    });

    it("should update with a range if the declared year is in the past", () => {
        const element = document.createElement("span");
        element.textContent = "2000";
        copyrightYear(element);

        expect(element.textContent).toBe("2000 - " + new Date().getFullYear());
    });

    it("should throw an error if the declared year is before 1911", () => {
        const element = document.createElement("span");
        element.textContent = "1900";

        expect(() => copyrightYear(element)).toThrowError("Invalid year: Cannot be before copyright law (1911).");
    });

    it("should throw an error if the declared year is in the future", () => {
        const nextYear = new Date().getFullYear() + 1;
        const element = document.createElement("span");
        element.textContent = `${nextYear}`;

        expect(() => copyrightYear(element)).toThrowError("Invalid year: Cannot be in the future.");
    });

    it("should throw an error for non-numeric input", () => {
        const element = document.createElement("span");
        element.textContent = "not a year";

        expect(() => copyrightYear(element)).toThrowError("Invalid year: Must be an integer.");
    });

    it("should return without errors if the element is null", () => {
        expect(() => copyrightYear(null)).not.toThrow();
    });

    it("should handle whitespace around numbers", () => {
        const element = document.createElement("span");
        element.textContent = "  2015  ";
        copyrightYear(element);

        expect(element.textContent).toBe("2015 - " + new Date().getFullYear());
    });

    it("should update multiple elements when given a selector", () => {
        document.body.innerHTML = `
            <span class="copyright">2010</span>
            <span class="copyright">2015</span>
        `;
        copyrightYear(".copyright");

        document.querySelectorAll(".copyright").forEach(element => {
            const declaredYear = parseInt(element.textContent?.trim() || "", 10);
            expect(element.textContent).toBe(`${declaredYear} - ${new Date().getFullYear()}`);
        });
    });

    it("should not update and not throw an error if invalid selector is used", () => {
        document.body.innerHTML = `
            <span class="copyright">2010</span>
            <span class="copyright">2015</span>
        `;
        copyrightYear('.copywrong');

        document.querySelectorAll(".copyright").forEach(element => {
            const declaredYear = parseInt(element.textContent?.trim() || "", 10);
            expect(element.textContent).toBe(`${declaredYear}`);
        });
    });

    it("should do nothing if no elements match the selector", () => {
        expect(() => copyrightYear(".nonexistent")) .not.toThrow();
    });
});
