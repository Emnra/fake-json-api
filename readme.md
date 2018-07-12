## Fake JSON API

This is a simple application to create a fake JSON API with [JWT authentication](https://jwt.io/introduction/) + [JSON Server](https://github.com/typicode/json-server) + [Faker JS](https://github.com/marak/Faker.js/) to generate random data.

### Install packages & Run

```bash
$ npm install
$ node server
```

### How to login?

You can login by sending a POST request to:

```
POST http://localhost:3000/auth/login
```
with the following username and password:

```
{
  "email": "your_email_here@email.com",
  "password":"your_password"
}
```

You should receive an access token with the following format: 

```
{
   "access_token": "<ACCESS_TOKEN>"
}
```


You must send the following authorization headers with any request to the protected endpoints:

```
Authorization: Bearer <ACCESS_TOKEN>
```
