var config = {
  "development": {
    "host": "localhost",
    "user": "",
    "password": "",
    "database": "",
    "secret": "",
    "connectionLimit": 15,
    "tokenExpiry": 86400
  }
}

var defaultConfig = config.development

console.log(defaultConfig)

//setting global config
global.config = defaultConfig