# fragmaDataAssignment
assignment

1. congfig file separation
    npm start:prod uses file config/production.js
    npm start:dev uses file config/development.js
    secure info add in .env and import in respective config and use for security purpose

2. callback into promise with example code of callback and promise
    in controller callbackAndPromises.controller for example code

3A. Authentication using jwt
    /register route for registering user
    /login route for checking password for authentication and fetching jwt token(token refresh on every login and expires after 48 hour)
    /userInfo route for geting user info after jwt authentication by bearer token
