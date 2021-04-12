# Nest SaaS Starter

## Authentication

## Test API With curl

### Users

```sh
# create
curl -X POST http://localhost:3000/api/users -i -d '{"name": "John", "email": "john@doe.fr", "password": "changeme"}' -H "Content-Type: application/json"

# change password
```

### JWT (passport-jwt)

```sh
# LOGIN (generate a JWT signed token)
curl -X POST http://localhost:3000/api/auth-jwt/login -d '{"email": "john@doe.fr", "password": "changeme"}' -H "Content-Type: application/json" -i
```

**access user info**

```sh
# access endpoints by sending the JWT as an authorization Header
curl http://localhost:3000/api/auth-jwt/userinfo -H "Authorization: Bearer a.b.c" -i
```

### Server side sessions (express-session)

```sh


# log created user
curl -X POST http://localhost:3000/api/auth-session/login -i -d '{"email": "john@doe.fr", "password": "changeme"}' -H "Content-Type: application/json"

# authenticate user with its cookie
curl -X GET http://localhost:3000/api/auth-session/userinfo -i --cookie "connect.sid=abc; Path=/; HttpOnly; SameSite=Strict"
```
