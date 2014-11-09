(function(){
	'use strict'

	/**
     * @ngdoc function
     * @name common.services.weather
     * @description
     *
     * 
     *
     *
     */
	
	var app = angular.module('Weather');

	app.controller('WeatherCtrl', ['$scope', 'weatherService', '$filter' ,function ($scope, weatherService, $filter){

		var maps = document.getElementById('googleMaps');

		$scope.country = 'uk';
		
		$scope.cities = 
			[{cities: 'London'}, 
			{cities: 'Luton'},
			{cities: 'Manchester'},
			{cities:  'Birmingham'}];

		$scope.sortByCities = function(reverse){
			$scope.cities = $filter('orderBy')($scope.cities, 'cities', reverse);
		};

		$scope.getWeatherDataByCity = function(location){
			$scope.error = '';

			location += "," + $scope.country;
			weatherService.getWeatherData(location).then(function(response){
				$scope.weather = response;
				maps.src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDFRsvsPJUqXrGvyQ-NExGFauUC5gfCJTY&q=' + $scope.weather.location;
			},function(error){
				$scope.error = error;
			});
		};

	}]);

})();
