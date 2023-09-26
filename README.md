# Movieseat

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

Run `adb shell am start -W -a android.intent.action.VIEW -d "https://www.moviese.at/movie/moonrise-kingdom" com.movieseat.app` to initiate deep link simulation

# To create icons

Run `npx @capacitor/assets generate --iconBackgroundColor '#280028' --iconBackgroundColorDark '#280028' --android`

# Angular Universal

 - `yarn build:ssr`
 - move dist folder to server
 - restart nginx

# NGINX tips

 - `nano /etc/nginx/sites-available/movieseat`
 - `sudo nginx -t`
 - `sudo systemctl restart nginx`

# PM2 tips

 - `pm2 list`
 - `pm2 start "yarn serve:ssr" --name "Movieseat" --watch /root/angular-movieseat/dist/angular-movieseat/browser`
 - `pm2 start "yarn server" --name "Movieseat Server"`
 - `pm2 start "yarn studio" --name "Prisma studio"`
 - `pm2 restart all`
 - `pm2 logs`

# Docker database commands

 - `docker-compose up`
 - `docker exec -it movieseat bash`
 - `psql -U postgres`
 - `\c movieseat postgres`

 Check data:
 - `\dt+`
 - `TABLE "User";`

\password postgres
 - to create a user: `CREATE USER new_username WITH PASSWORD 'password';`
 - allow for create db: `ALTER USER new_username CREATEDB;`
 - to grabnt schema usage: `GRANT USAGE ON SCHEMA public TO new_username;`
 - to grant all privileges: `GRANT ALL PRIVILEGES ON DATABASE your_database_name TO new_username;`
 - to grand all priv on schema: `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO new_username;`
 - not needed: `GRANT, SELECT, INSERT, UPDATE, DELETE ON TABLE _prisma_migrations TO your_username;`

 
# Prisma commands

 - `npx prisma migrate dev --name <NAME>`
 - `npx prisma migrate deploy` on server
 - `npx prisma generate` on server
