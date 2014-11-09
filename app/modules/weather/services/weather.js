(function(){
	'use strict'
	
	var services = angular.module('Weather');

	/**
     * @ngdoc service
     * @name common.services.weather
     * @description
     *
     * Should call the API to obtain the information
     *
     *
     */

	services.factory('weatherService', ['$q', 'configurationService','$http', function ($q, configurationService, $http){
		var getWeatherData = function(location){

			var openWeatherUrl = configurationService.getOpenWeatherUrl();
			var deferred = $q.defer();
			$http({
				url:openWeatherUrl,
				params: {q: location}
			}).success(function(response){
				if(!angular.isUndefined(response) && (response.cod !== '404')){
					//only return location, current weather conditiions, icons,temperate, temparature range, atmospheric pressure, humidity
					var _weatherConditions = [];
					response.weather.forEach(function(condition){
						var item ={
							label: condition.main,
							icon: configurationService.getOpenWeatherIconsUrl(condition.icon)
						}

						_weatherConditions.push(item);
					});

					var weather = {
						location: location,
						longitude: response.coord.lon,
						latitude: response.coord.lat,
						weatherConditions: _weatherConditions,
						temperate: response.main.temp,
						temp_min: response.main.temp_min,
						temp_max: response.main.temp_max,
						pressure: response.main.pressure,
						humidity: response.main.humidity
					};

					deferred.resolve(weather);
				}
				else{
					deferred.reject(response);
				}
			}).error(function(response){
				deferred.reject(response);
			});

			return deferred.promise;
		};

		return{
			getWeatherData: getWeatherData
		};
	}]);

})();
