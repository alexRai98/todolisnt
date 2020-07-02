# Todoisnt

Todoisnt was created with `create-react-app`, with a few modifications:

- The app icons are inside `src/images/icons`
- The app logo is inside `src/images`.
- Automated tests are added.

## Live app

We have a live app with a solution to the project version 1 [here](https://todoisnt-codeable.netlify.app/)

## Setup

Run `yarn install` to setup your application. You cannot use `npm` because
the project has already used `yarn` and they cannot be mixed.

## Running the app

Run `yarn start` to run the application

## Tests

There are 11 automated tests that test the main features from the version
1 of the project. Version 2 of the project does not have any tests at the moment;
feel free to add more tests if it is something you want to explore!

You cannot modify any of the tests.

## Running tests

Use `yarn test` to run the app automated test suite in watch mode. The
watch mode will execute the tests everytime your code changes.

If you just want to run the tests once you can run `CI=true yarn test`.

## Test considerations

To be able to write the tests before knowing how you are going to create
the app, a few assumptions were made. You need to follow this assumptions
when making your application to make the tests pass.

- The logo has an `alt` attribute set to "logo"
- The checkbox for an `uncompleted` task is an `img` and has the alt text set to `uncompleted`
- The checkbox for an `completed` task is an `img` and has the alt text set to `completed`
- The trash icon used to delete a task is an `img` with the alt text `delete`

## Are automated tests used for grading?

No, but they will help us to grade faster. The final functionality of the product
is still the main thing we consider for grading.

## FAQ

### I have a problem with a test

You can reach out to an instructor 🙂
