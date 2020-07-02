import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

function renderApp() {
  const utils = render(<App />);

  function openCreateForm() {
    const button = utils.getByText("Add task");
    userEvent.click(button);
    return utils.getByPlaceholderText("Write a todo...");
  }

  function createTask(taskInput, taskText) {
    userEvent.type(taskInput, taskText);
    const addButton = utils.getByText("Add");
    userEvent.click(addButton);
  }

  return {
    ...utils,
    openCreateForm,
    createTask,
  };
}

it("renders logo", () => {
  const { getByAltText } = renderApp();

  getByAltText("logo");
});

it("renders title", () => {
  const { getByText } = renderApp();

  getByText("Todos");
});

it("renders add task button", () => {
  const { getByText } = renderApp();

  getByText("Add task");
});

it("renders show completed", () => {
  const { getByText } = renderApp();

  getByText("Add task");
});

it("shows create task form on add task click", () => {
  const { openCreateForm, queryByText } = renderApp();

  openCreateForm();
  expect(queryByText("Add task")).toBeNull();
});

it("closes create task form on cancel", () => {
  const { getByText, openCreateForm } = renderApp();

  openCreateForm();
  const cancelButton = getByText("Cancel");
  userEvent.click(cancelButton);
  getByText("Add task");
});

it("can create a task", () => {
  const { getByText, openCreateForm, createTask } = renderApp();

  const taskInput = openCreateForm();
  createTask(taskInput, "Task1");
  createTask(taskInput, "Task2");
  createTask(taskInput, "Task3");
  createTask(taskInput, "Task4");
  getByText("Task1");
  getByText("Task2");
  getByText("Task3");
  getByText("Task4");

  // Close form
  userEvent.click(getByText("Cancel"));
  getByText("Add task");
});

it("can complete a task", () => {
  const {
    getByText,
    getByAltText,
    queryByText,
    openCreateForm,
    createTask,
  } = renderApp();

  const taskInput = openCreateForm();
  createTask(taskInput, "Task1");
  getByText("Task1");

  const completeTaskIcon = getByAltText("uncompleted");
  userEvent.click(completeTaskIcon);
  expect(queryByText("Task1")).toBeNull();

  const showCompletedButton = getByText("Show completed");
  userEvent.click(showCompletedButton);
  getByText("Task1");

  // Hide completed tasks
  userEvent.click(showCompletedButton);
  expect(queryByText("Task1")).toBeNull();
});

it("can update a task", () => {
  const {
    getByText,
    getByDisplayValue,
    openCreateForm,
    createTask,
  } = renderApp();

  const taskInput = openCreateForm();
  createTask(taskInput, "Task1");
  const task = getByText("Task1");
  userEvent.click(task);

  const updateForm = getByDisplayValue("Task1");
  userEvent.type(updateForm, "Task1 Updated");
  const updateButton = getByText("Update");
  userEvent.click(updateButton);
  getByText("Task1 Updated");
});

it("can delete a task", () => {
  const {
    getByText,
    getByAltText,
    openCreateForm,
    createTask,
    queryByText,
  } = renderApp();

  const taskInput = openCreateForm();
  createTask(taskInput, "Task1");
  const task = getByText("Task1");
  userEvent.click(task);
  const deleteIcon = getByAltText("delete");
  userEvent.click(deleteIcon);
  expect(queryByText("Task1")).toBeNull();

  // Making sure the task is not "completed"
  const showCompletedButton = getByText("Show completed");
  userEvent.click(showCompletedButton);
  expect(queryByText("Task1")).toBeNull();
});

it("can uncomplete a task", () => {
  const {
    getByText,
    getByAltText,
    queryByText,
    openCreateForm,
    createTask,
  } = renderApp();
  const taskInput = openCreateForm();
  createTask(taskInput, "Task1");
  getByText("Task1");

  const completeTaskIcon = getByAltText("uncompleted");
  userEvent.click(completeTaskIcon);
  expect(queryByText("Task1")).toBeNull();

  const showCompletedButton = getByText("Show completed");
  userEvent.click(showCompletedButton);
  getByText("Task1");

  const uncompleteTaskIcon = getByAltText("completed")
  userEvent.click(uncompleteTaskIcon);

  // Hide tasks
  userEvent.click(showCompletedButton);
  getByText("Task1");
})
