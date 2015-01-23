# Hack-Michiana-Mowing

a [Sails](http://sailsjs.org) application

See https://github.com/HackMichiana/Organization/wiki/Adopt-a-Lot-South-Bend for info.

# Development

Requirements

* Node.js
* npm
* MongoDB

Installation

    git clone https://github.com/HackMichiana/adopt-a-lot-southbend.git
    cd adopt-a-lot-southbend/
    npm install -g sails bower
    npm install
    bower install
    mongoimport --db adoptalot --collection lots_data --file socrata-data.json --jsonArray
    sails lift  # with mongodb running

# Load data

    mongoimport --db adoptalot --collection lots_data --file socrata-data.json --jsonArray
