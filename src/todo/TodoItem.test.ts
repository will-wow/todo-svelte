import TodoItem from "./TodoItem.svelte";

import { render, fireEvent } from "@testing-library/svelte";
import "@testing-library/jest-dom/extend-expect";

describe("TodoItem", () => {
  let todo;
  let props;
  let component;

  beforeEach(() => {
    todo = {
      id: 1,
      title: "a thing",
      createdAt: "2019-02-01",
      done: false
    };
    props = { todo, onChange: jest.fn(), onDelete: jest.fn() };

    component = render(TodoItem, { props });
  });

  it("should render an item", () => {
    expect(component.getByPlaceholderText("Enter a thing to do").value).toBe(
      "a thing"
    );
  });

  it("should call a handleChange callback", () => {
    fireEvent.click(component.getByText("Done"));

    expect(props.onChange).toHaveBeenCalledWith({ ...todo, done: true });
  });
});
