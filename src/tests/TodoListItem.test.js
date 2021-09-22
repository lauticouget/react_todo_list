import { expect } from "chai";
import { getBorderStyleForDate } from "../todos/TodoListItem";

describe("getBorderStyleForDate", () => {
  it("returns none when the date is less than five days ago", () => {
    const now = Date.now();
    const createdAt = now - 60000 * 3;

    const expected = "none";
    const actual = getBorderStyleForDate(createdAt, now);

    expect(actual).to.equal(expected);
  });
  it("returns red when the date is more than five days ago", () => {
    const createdAt = Date(Date.now() - 60000 * 7);
    const now = Date.now();

    const expected = "2px solid red";
    const actual = getBorderStyleForDate(createdAt, now);

    expect(actual).to.equal(expected);
  });
});
