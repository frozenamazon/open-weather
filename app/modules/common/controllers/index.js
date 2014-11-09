(function(){
	'use strict'

	/**
     * @ngdoc function
     * @name common.controllers.index
     * @description
     *
     * Main js file
     *
     *
     */
	
	var app = angular.module('Weather', []);

	app.controller('MainCtrl', ['$scope', function ($scope){
		$scope.weatherPage = 'modules/weather/partials/weather.html';

	}]);

})();
