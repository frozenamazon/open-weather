/**
 * This file uses the Page Object pattern to define a test
 */

var WeatherPage = function() {

  this.locationName = element(by.tagName('h3'));
  this.cities = element.all(by.repeater('item in cities'));
  this.sort = element( by.css('[ng-click="reverse=!reverse;sortByCities(reverse)"]') );
  this.temperature = element(by.binding('weather.temperate'));;

  this.navigate = function() {
    browser.get('/');
  };
};


module.exports = new WeatherPage();