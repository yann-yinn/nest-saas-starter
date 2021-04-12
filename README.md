# Nest SaaS Starter

## Authentication

## Test API With curl

### Users

```sh
# create a new user
curl -X POST http://localhost:3000/api/users -i -d '{"name": "John", "email": "john@doe.fr", "password": "changeme"}' -H "Content-Type: application/json"

# (loggin required) reset password
curl -X POST http://localhost:3000/api/users/reset-password -i -d '{"name": "John", "email": "john@doe.fr", "password": "changeme", "newPassword", "Naoned44BZH"}' -H "Content-Type: application/json"

# reset password
```

### JWT (passport-jwt)

```sh
# login (generate a JWT signed token)
curl -X POST http://localhost:3000/api/auth-jwt/login -d '{"email": "john@doe.fr", "password": "changeme"}' -H "Content-Type: application/json" -i

# userinfo (login required)
curl http://localhost:3000/api/auth-jwt/userinfo -H "Authorization: Bearer a.b.c" -i
```

### Server side sessions (express-session)

```sh


# log created user
curl -X POST http://localhost:3000/api/auth-session/login -i -d '{"email": "john@doe.fr", "password": "changeme"}' -H "Content-Type: application/json"

# authenticate user with its cookie
curl -X GET http://localhost:3000/api/auth-session/userinfo -i --cookie "connect.sid=abc; Path=/; HttpOnly; SameSite=Strict"
```
