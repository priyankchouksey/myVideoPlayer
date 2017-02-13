var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
// The URL we will scrape from - in our example Anchorman 2.

    url = 'http://www.imdb.com/title/tt1229340/';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request
        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);
            console.log(html);
            // Finally, we'll define the variables we're going to capture

            var title, release, rating;
            var json = { title : "", release : "", rating : ""};
            $('.header').filter(function(){

            // Let's store the data we filter into a variable so we can easily see what's going on.

            var data = $(this);

            // In examining the DOM we notice that the title rests within the first child element of the header tag. 
            // Utilizing jQuery we can easily navigate and get the text by writing the following code:
            console.log(data);
            title = data.children().first().text();

            // Once we have our title, we'll store it to the our json object.

            json.title = title;
            console.log(json);
            })
        }
        console.log(json);
    })
});

app.get('/brute', function(req, res){
    var result = '';
    var str1 = '';
    var str2 = '';
    for(var i = 0; i < 5; i++){
        for( var j =65; j < 92; j++){
            str2 = str1 + String.fromCharCode(j);
            result = result + ' ' + str2 + ':';
        }
        str1 = str2;
    }
    res.send(result);
});

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;