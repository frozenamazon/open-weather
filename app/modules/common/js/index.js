(function(){
	'use strict'
	
	var app = angular.module('Weather', []);

	app.controller('WeatherCtrl', ['$scope', function ($scope){
		$scope.test = '123';

	}]);

})();
