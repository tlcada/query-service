# Connector Service

The basic commands are listed below.

## Create .env file in root dir

- DATABASE.PG.USER=
- DATABASE.PG.PASSWORD=
- DATABASE.PG.HOST=
- MOCK_DATA_ON=false

## Create database

You can find the schemas in the schema folder.

## Basic commands

HTTPS is enabled by default. If you want to use HTTP connection go to config.ts file.

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

If you do not define DATABASE.PG.HOST environment variable or it is empty, some postgresql tests will be skipped or mock data is used because then the PG database is probably not configured.
