# Axis

This project implements a basic API in NodeJS such as example about API REST

*Maybe this app would be used in TDC conference*

## Tools and requirements
 * NodeJS 8+
 * Docker
 * Restify
 * Mongoose
 * MongoDB (docker)

 ## How to run

 After your install nodeJS 8+ and docker just run, app will run on 8000 port and localhost, no magic

 ```shell
    make run
```

curl -i http://localhost:8000/veiculos

This aplication accept the follow verbs GET, POST, PUT, PATCH end DELETE

## How to run tests

 ```shell
    make test
```

for coverage

 ```shell
    make cov
```

Coverage summary

```shell
    Statements   : 68.8% ( 86/125 )
    Branches     : 60% ( 12/20 )
    Functions    : 57.14% ( 4/7 )
    Lines        : 70.59% ( 84/119 )
```


Especification

```json
    { 
        vehicle:   string,
        brand:     string,
        sold:      bool,
        created:   datetime,
        updated:   datetime, 
    }
```

API endpoints

```shell
    GET /veiculos
    GET /veiculos/find?q={termo}
    GET /veiculos/{id}
    POST /veiculos
    PUT /veiculos/{id}
    PATCH /veiculos/{id}
    DELETE /veiculos/{id}
```



TODO:

    - [ ]: build and run on docker in dev mode


PS: Dont ask me why some pieces was in portuguese and others in english, just accept :)

Name reference.

AXIS

https://en.wikipedia.org/wiki/Axis_mundi