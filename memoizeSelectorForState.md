# useSelector hook re-run everytine an action dispatched & during that if the specific state(s) value that consumed by the said component changes then it will make component re-render

```ts
const selectTodos = (state) => state.todos;

const selectTodoIds = (state) => state.todos.map((todo) => todo.id);

// In this example, calling useSelector(selectTodoIds) will always cause the
// component to re-render after every action,
// because .map() will be returning a new array reference every time.

// # solution: memoize with reslect library ( src/features/todos/todosSlice.js )

import { createSelector } from "reselect";

export const selectTodoIds = createSelector(
  // First, pass one or more "input selector" functions:
  (state) => state.todos,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (todos) => todos.map((todo) => todo.id)
);

// # selectors with multiple arguments: ( src/features/todos/todosSlice.js )

import { createSelector } from "reselect";
import { StatusFilters } from "../filters/filtersSlice";

export const selectFilteredTodos = createSelector(
  // First input selector: all todos
  (state) => state.todos,
  // Second input selector: current status filter
  (state) => state.filters.status,
  // Output selector: receives both values
  (todos, status) => {
    if (status === StatusFilters.All) {
      return todos;
    }

    const completedStatus = status === StatusFilters.Completed;
    // Return either active or completed todos based on filter
    return todos.filter((todo) => todo.completed === completedStatus);
  }
);

// selector first argument just needs to be a fn , so it might be a memoize select fn too

export const selectFilteredTodoIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilteredTodos,
  // And derive data in the output selector
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
);

// # maintaining both state.todos & state.filters to memoize

export const selectFilteredTodos = createSelector(
  // First input selector: all todos
  selectTodos,
  // Second input selector: all filter values
  (state) => state.filters,
  // Output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters;
    const showAllCompletions = status === StatusFilters.All;
    if (showAllCompletions && colors.length === 0) {
      return todos;
    }

    const completedStatus = status === StatusFilters.Completed;
    // Return either active or completed todos based on filter
    return todos.filter((todo) => {
      const statusMatches = showAllCompletions || todo.completed === completedStatus;
      const colorMatches = colors.length === 0 || colors.includes(todo.color);
      return statusMatches && colorMatches;
    });
  }
);

// since seleecTodos is being repeated, thus abstracted

export const selectTodos = (state) => state.todos; // returns array

export const selectTodoById = (state, todoId) => {
  return selectTodos(state).find((todo) => todo.id === todoId);
};

// usage: src/features/todos/TodoList.js

import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import { selectTodoIds } from "./todosSlice";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const todoIds = useSelector(selectTodoIds);

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />;
  });

  return <ul className="todo-list">{renderedListItems}</ul>;
};
```
