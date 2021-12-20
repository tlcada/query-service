# Connector Service

The basic commands are listed below.

## Create .env file in root dir

- DATABASE.PG.USER=
- DATABASE.PG.PASSWORD=
- DATABASE.PG.HOST=

## Basic commands

| Command       | Description |
|:--------------| :--- |
| npm install   | `Install packages` |
| npm start     | `Run app` |
| npm run test  | `Run tests` |

## Coverage

You will find the test report from the "coverage" folder after running the tests. 

## REST API

Some endpoints are protected with basic auth. You can find the username and password in the config.ts file.

| Path                    | Description          | Protected |
|:------------------------|:---------------------|:----------|
| /api/[version]          | `API Base Path`      | true      |
| /api/v1                 | `Swagger Docs`       | true      |
| /metrics                | `Prometheus Metrics` | true      |

## Tests

Make sure the database connection is OK before running the tests. App does not use mock data responses. 
