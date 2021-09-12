# fourseveneight

This is the repository for fourseveneight, a professional networking, media application similar to Medium, StackOverflow, and Quora. It implements secure authentication, responsive design, and the capability to send mass automated business emails. The application's backend is built in Node and Express, with Typescript as the language and MongoDB as the database. The frontend is built in React.js with Redux for app-wide state management, and the site is styled using SCSS. This was a choice I made because I believe it is more efficient than using CSS Modules, although that's a valid approach.

To replicate this project, please clone the repository. Once that is done, please navigate to server/config and create a file called "config.env". In it, create the following key-value pairs:

DATABASE_URI = your-database-uri (Must be a valid MongoDB connection string. If you are using another database you will have to rewrite most of the logic).
DATABASE_PASSWORD = your-database-password
PORT = 8000 (or whatever port you'd like)
EMAIL_USERNAME = the-email-username-of-your-preferred-service (You'll get this once you generate your api key)
EMAIL_PASSWORD = your-email-password
EMAIL_HOST = your-email-host
EMAIL_PORT = your-email-port
EMAIL_FROM = your-desired-email-from-address
JWT_SECRET = your-jwt-secret
Once you've created this file, please cd into "server" and run the following command in the terminal: npm i. Once you've done that, cd into the client directory and run the same command. This will install all the necessary dependencies. If you are getting an error, please make sure that you have typescript and node.js installed before trying again. Once this process is complete, cd back into server and run the command: npm run dev. This will start the application. If you've done things properly, you will see a message in your terminal stating: "Database connection successful as of {the current date}" and immediately after that, you should see "react-scripts-start" and the development server for the frontend will launch. Your backend will run on whatever port you specified in your config.env file and your client will probably run on port 3000 (that is the default) but if something is already active on that port, then it may launch on a different port.
