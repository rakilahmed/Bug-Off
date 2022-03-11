# Bug Off

A simple and user-frinedly (free) Bug Tracking software. This software can be used for both your personal and (small) business needs.

To run it locally on your machine:

- Clone the repo `git clone https://github.com/rakilahmed/bug-off` or download the zipped folder.
- Navigate inside the folder via terminal:
  - Run `npm install` to initiate
  - Then run `npm run setup` to install all the dependencies for both server and client
  - [NOTE: To run the server, you will need to create a .env file (under the server/config folder) with your own MongoDB connection URI. Otherwise, you can only run the client!]
  - Once that's done:
    - To start the client only, run `npm start client`
    - To start the server only, run `npm run server`
    - Or to start both server and client at once, run `npm run dev`
