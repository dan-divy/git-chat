[![spruce-banner](./public/images/logo/banner.png)](http://mygurukulonline.in)

Spruce is a tiny but powerful open-source social networking platform made with Node.js and MongoDB
[![Gitter](https://badges.gitter.im/spruce-social/community.svg)](https://gitter.im/spruce-social/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
_Deployed on an Amazon EC2 instance [here](http://spruce.divy.work)_

Get the live MongoDB stats out [here](https://cloud.mongodb.com/freemonitoring/cluster/SQXXT6OAMR757LIEYJRN3WDUCIRAEYYV).

![](./public/images/intro.gif)

## Features

* Sign in using local authentication or using your Instagram account.
* Search for your other users.
* All feeds divided into 3 categories -
	* thoughts (tweets)
	* events (location can be specified)
	* moments (personal post)
* Like and comment on a feed.
* View your/others profile.
* Follow a particular user and get notified for his/her activities.
* Change your profile picture, bio, people who follow you etc.
* Some extras (games)

And a lot more to be added soon...

## To Do's
* Change the name (Issue #3)
* Activity feature for user to see follow requests and his/her daily activity.
* Sign in using FaceBook, Twitter and Google accounts.
* Chat one-one or create a room/group.

## Requirements

* [Node.js](https://nodejs.org)  
	- expressjs [ExpressJS HTTP middleware](https://npmjs.org/package/express)
	- ejs [Embedded JavaScript templates](https://npmjs.org/package/ejs)		
* [MongoDB](http://mongodb.org)


## Installation

Clone the repo locally then install all the dependencies using [NPM](https://npmjs.org/)

```bash
$ git clone https://github.com/DivySrivastava/spruce.git
$ cd spruce
$ npm i
```

## Local Development
Before running, we need to add the Instgram and Google API Credentials to the project.
Under the `config` directory of the repo, you will find `instagram.js` and `google.js`.
We need to add the `<CLIENT_ID>`, `<CLIENT_SECRET>` and `<host>:<port>` with our own API credentials

```js
/** REPLACE YOUR API CREDENTIALS HERE **/
var in_client_id = 'XXXXXXXXXXXXXXXXXX', // <CLIENT_ID>
    in_client_secret = 'XXXXXXXXXXXXXXXXXXXX', // <CLIENT_SECRET>
```

Now Replace the `<host>` & `<port>` with the redirect uri specified in the [Instagram API Dashboard](https://www.instagram.com/developer) and [Google API Dashboard](https://developers.google.com).
Default is `http://localhost:80/account/oauth`.
```js
var in_redirect_uri = 'http://localhost:80/account/oauth/:service'
```

Finally start the MongoDB server in a seperate bash/pm2
```bash
$ mongod
```
and then start the spruce server via `npm`.
```bash
$ npm start
```   
## To know

spruce uses [mongoose](https://npmjs.org/package/mongoose) as an ORM for performing CRUD operations on MongoDB and [express.js](https://npmjs.com/package/express) for server-side HTTP routing.

**This project needs contributors!!**

## Authors
 - [Divy Srivastava](http://github.com/DivySrivastava)
 - [Dan](https://github.com/MayorChano)

## License

(The MIT License)

Copyright (c) 2019 Divy Srivastava <dj.srivastava23@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
