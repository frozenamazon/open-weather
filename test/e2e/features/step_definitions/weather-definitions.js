'use strict';

var assert = require('assert');

var weatherSteps = function() {

	var weather = require('./weather_page.js');//page object for weather

	this.Given('I am on the Weather app', function (done) {
	  weather.navigate();
	  done();
	});

	this.When('I select a city', function (done) {
	  weather.cities.get(0).click().then(function(){
	  	done();
	  });
	});

	this.Then('I should see the weather of the city', function (done) {
	  weather.locationName.getText().then(function(name){
		  assert.equal(name, 'LONDON,UK');
		  done();
	  });
	});


	this.Given('I have chosen a city', function (done) {
	  done();
	});

	this.When('I select another city', function (done) {
	  weather.cities.get(1).click().then(function(){
	  	done();
	  });
	});

	this.Then('I should see the weather of the chosen city', function (done) {
	  weather.locationName.getText().then(function(name){
		  assert.equal(name, 'LUTON,UK');
		  done();
	  });
	});


	this.Given('I have list of cities', function (done) {
	  done();
	});

	this.When('I sort by descending', function (done) {
	  weather.sort.click().then(function(){
	  	done();
	  });
	});

	this.Then('I should see the list of cities in descending order', function (done) {
	  weather.cities.get(0).getText().then(function(name){
		  assert.equal(name, 'Manchester');
		  weather.cities.get(3).getText().then(function(name){
			  assert.equal(name, 'Birmingham');
			  done();
		  });
	  });
	});
	

	this.Given('I have list of cities in descending order', function (done) {
	  done();
	});

	this.When('I sort by ascending', function (done) {
	  weather.sort.click().then(function(){
	  	done();
	  });
	});

	this.Then('I should see the list of cities in ascending order', function (done) {
	  weather.cities.get(0).getText().then(function(name){
		  assert.equal(name, 'Birmingham');
		  weather.cities.get(3).getText().then(function(name){
			  assert.equal(name, 'Manchester');
			  done();
		  });
	  });
	});

};

module.exports = weatherSteps;