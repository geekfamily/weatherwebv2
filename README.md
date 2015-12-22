# weatherwebv2
New version of the weather web app that uses html5/Jade/Node instead of [Angular.JS/Node](https://github.com/geekfamily/weatherweb)

##Tools used
- Web
  - Node JS
  - Jade - templating
  - Express - Web server
  - Socket.io
  - [material-design-lite](https://github.com/google/material-design-lite)
- [Mongo DB](https://www.mongodb.org/)
- [Forecast IO](https://forecast.io/) SDK for some descriptive text
- Deployment
  - [Heroku](https://dashboard.heroku.com/)
  - [MongoLab](https://www.mongolab.com/)

##Pre Work
Ensure you have installed NPM and Bower:

```bash
npm install && npm install -g bower
```

You will need an instance of [Mongo DB](https://www.mongodb.org/) as that is my DB of choice for this project.  When deployed on Heroku I am using a Mongo instance on the [MongoLab](https://www.mongolab.com/) hosting environment that is configured from Heroku.

If you want to use a local instance you can install Mongo using one of the following platform dependant options https://docs.mongodb.org/v3.0/installation/

##Instructions for use
Clone the repo:
```bash
git clone https://github.com/geekfamily/weatherwebv2.git
```

Alternatively you can [download](https://github.com/geekfamily/weatherwebv2/archive/master.zip)
this repository.

CD to code location
```bash
cd weatherwebv2
```

Install dependencies:
```bash
npm install
bower install
```

You will now need to create a file called config.json using your favorite editor (I use nano).  This file will hold all the connection information for the node server:
```bash
nano config.json
```

in this file you will need to configure the following:
```bash
  "serviceUrl":"https://api.particle.io/v1",
  "accessToken":"__your photon access token here__",
  "deviceId":"__your photon device ID here__",
  "requestTimeout": 30000,
  "username":"__your particle.io username__",
  "password":"__your particle.io password__",
  "forecastio":"__your forecast.io sdk key__",
  "locationLong":"__your longitude__",
  "locationLat":"__your latitiude__"
```

You will need to se some enviroment variables:
```bash
MONGOLAB_URI : mongodb://username:password@mongo_url:port/table_name?authMode=scram-sha1
PORT : 5000
```

You should now be able to test the appication
```bash
node app.js
```

I am still learning Gulp but you can use the current gulp file to get a rudimentary build of the `dist` directory:
```bash
gulp deploy
```

I am using Heroku to host my site... you can use their instructions to deploy the `dist` directory to their hosting.

