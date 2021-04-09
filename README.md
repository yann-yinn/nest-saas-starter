# Nest SaaS Starter

## Test API With curl

```sh
# create a new user
curl -X POST http://localhost:3000/api/users -i -d '{"name": "John", "email": "john@doe.fr", "password": "changeme"}' -H "Content-Type: application/json"


# log created user
curl -X POST http://localhost:3000/api/auth-session/login -i -d '{"email": "john@doe.fr", "password": "changeme"}' -H "Content-Type: application/json"

# authenticate user with its cookie
curl -X GET http://localhost:3000/api/auth-session/userinfo -i --cookie "connect.sid=s%3AqvqNpLfNfEyOwUUUbK6gOkJUUlYMGRc7.xKU9A2KmOqN0FSDG3MalcwPvcon2OtsgHQxP6mEE%2BQY; Path=/; HttpOnly; SameSite=Strict"
```
