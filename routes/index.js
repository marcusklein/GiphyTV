var express = require('express');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.get('/:search?', function(req, res, next) {

  // Should we display random gif?
  var random = false;

  var d = new Date();
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";


  var searchTerm = "";
  if(req.params.search){
    searchTerm = req.params.search;
  } else {
    searchTerm = weekday[d.getDay()];
  }


  var giphyApiURL = () => {
    if(random) {
      return 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=houses&rating=pg';
    }
    return 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + searchTerm + '&rating=pg';
  };


  request(giphyApiURL(), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var image = JSON.parse(body).data.image_original_url;

      //image = "http://i.makeagif.com/media/5-09-2016/k0gAiP.gif";

      res.render('index', { image: image });
    }
  });

});

module.exports = router;