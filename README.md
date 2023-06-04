# AngularMovieseat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Mobile development

Run `npm run android` to start the project in android studio
Run `npm run sync` to build the application and sync the dist folder with the android folder

# Deep link testing

Run `adb shell am start -W -a android.intent.action.VIEW -d "https://www.moviese.at" com.movieseat.app` to initiate deep link simulation

# To create icons

Run `npx @capacitor/assets generate --iconBackgroundColor '#280028' --iconBackgroundColorDark '#280028' --android`
