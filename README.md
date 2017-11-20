# Signs Localizer
This web app provides you a way to enter traffic signs and localize them on a map to solve the [challenge](https://github.com/BMWGroupTechnologyOfficeUSA/dli-coding-challenge) proposed in BMW github. In my solution I used Node.js in [Express](https://expressjs.com/), a framework based on the REST paradigm.

## Modules and Packages
Bellow, it is listed all the packages used in my implementation. I chose [npm](https://www.npmjs.com/) to manage and install packages, make sure you have it installed and run all the commands bellow if you wish to build the web service from source.

```npm install express --save```
This command install the Express framework.

```npm install mongoose```
The [moongose](http://mongoosejs.com/) is a node.js connector for [MongoDb](https://www.mongodb.com/cloud/atlas/lp/general?jmp=search&utm_source=google&utm_campaign=Americas-US-MongoDB-to-Atlas-Brand-Alpha&utm_keyword=mongodb&utm_device=c&utm_network=g&utm_medium=cpc&utm_creative=223327451948&utm_matchtype=e&_bt=223327451948&_bk=mongodb&_bm=e&_bn=g&gclid=CjwKCAiA9MTQBRAREiwAzmytw_rP12jLhzHfplt4NGZnM3L0P9Hl7tJC1BnhUAdOPDO2PWfJho7E2xoCCsAQAvD_BwE), the non-sql database of my choice for persistent storage.

```npm install mongoose-double```
Without this package mongoose cannot handle double values (such as our coordinates) by default (even though MongoDB can).

```npm install mustache --save```
[Mustache](https://www.npmjs.com/package/mustache) is a logic-less template syntax in JavaScript that facilitate accessing values transmitted by the back-end to the front-end when rendering a view.

```npm install body-parser```
The [body-parser](https://www.npmjs.com/package/body-parser) parse incoming request bodies from a URL.

## Running it locally
Once all the packages above are installed, the app can be ran by calling the the api on the project's root directory.
```node server.js```

### Inserting a new sign
Fill the field "Sign Name" and "Coordinates" on the first row.

* Sign Name is a enum that takes the following entries: ***'SPEED_LIMIT_30', 'SPEED_LIMIT_50', 'SPEED_LIMIT_70', 'PASSING_RESTRICTION', 'STOP', 'NO_PARKING', 'NO_U_TURN', 'NO_LEFT_TURN', 'NO_RIGHT_TURN', 'NO_TRUCK', 'RIGHT_TURN_AHEAD', 'LEFT_TURN_AHEAD'***
*  Coordinates should be enter as ***Latitude,Longitude***

#### Example
| Sign Name | Coordinates |
|-----------|-------------|
| NO_PARKING|41.911748, -87.651921 |

### Retrieving Signs Map
To retrieve a map with the closest signs enter the coordinates on the second row and the maximum distance in **meters** of the signs that will be retrieved.
#### Example
| Coordinates | Radius (m)|
|-----------|-------------|
|41.911748, -87.651921 | 1000|

## Persistent Database
My choice for persistent storage was the NoSQL database MongoDB. This types of databases stand out for their low latency, high performance, easy scalability and how easy they are to integrate with mobile applications, factors that are very welcome when remembered that the final goal of this project is to be deployed in a crescent fleet of BMW vehicles. 
Current I am storing my MongoDB in a free demo subscription at [mLab](https://mlab.com/).
 
## Displaying Maps
When it comes to find things on a map nothing is more familiar to us than GoogleMaps, therefore that was my choice when the retrieve signs options is selected. The file ```views/map.html``` takes care of plotting the map.

## Project Map
### api
This folder is divided in the JS files for the controllers and models.
### node_modules
Here is where **npm** installed all the packages mentioned before.
### views
Contains the HTML files for the views of the project.
### app.js
Has the global configurations of my web app and import all the required modules and data models.
### db.js
This file contain the information required to connect to the database.
### server.js
Sets the the port to listen to and starts the app (see command above).

## Next Steps
The next steps to improve this app would be:
1. Add a login page that takes an user name and a password.
2. Encode files containing sensitive information (such as the Google Maps key). 
