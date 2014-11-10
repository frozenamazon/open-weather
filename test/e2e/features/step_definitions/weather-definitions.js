'use strict';

var assert = require('assert');

var weatherSteps = function() {

	this.Given('I have list of cities', function (done) {
	  browser.get('/');
	  done();
	});

	this.When('I sort by descending', function (done) {
	  element( by.css('[ng-click="reverse=!reverse;sortByCities(reverse)"]') ).click().then(function(){
	  	done();
	  });
	});

	this.Then('I should see the list of cities in descending order', function (done) {
	  element( by.repeater('item in cities').row(0) ).getText().then(function(name){
		  assert.equal(name, 'Manchester');
		  done();
	  });
	});

	this.Given('I have list of cities in descending order', function (done) {
	  done();
	});

	this.When('I sort by ascending', function (done) {
	  element( by.css('[ng-click="reverse=!reverse;sortByCities(reverse)"]') ).click().then(function(){
	  	done();
	  });
	});

	this.Then('I should see the list of cities in ascending order', function (done) {
	  element( by.repeater('item in cities').row(0) ).getText().then(function(name){
		  assert.equal(name, 'Birmingham');
		  done();
	  });
	});

	this.Given('I am on the Weather app', function (done) {
	  browser.get('/')
	  done();
	});

	this.When('I select a city', function (done) {
	  element( by.repeater('item in cities').row(0) ).click().then(function(){
	  	done();
	  });
	});

	this.Then('I should see the weather of the city', function (done) {
	  element(by.tagName('h3')).getText().then(function(name){
		  assert.equal(name, 'LONDON,UK');
		  done();
	  });
	});

	this.Given('I have chosen a city', function (done) {
	  done();
	});

	this.When('I select another city', function (done) {
	  element( by.repeater('item in cities').row(1) ).click().then(function(){
	  	done();
	  });
	});

	this.Then('I should see the weather of the chosen city', function (done) {
	  element(by.tagName('h3')).getText().then(function(name){
		  assert.equal(name, 'LUTON,UK');
		  done();
	  });
	});

};

module.exports = weatherSteps;