'use strict';

describe("Unit: configurationService", function(){
	var _configurationService;

	beforeEach(function(){
		//load modules
		module('Weather');

		//inject your service for testing.
        inject(function(configurationService) {
            _configurationService = configurationService;
        });
	});

    it('should return the url to obtain weather information', function() {
    	expect(angular.isDefined(_configurationService.getOpenWeatherUrl())).toBe(true);
        expect(_configurationService.getOpenWeatherUrl()).toContain('http://api.openweathermap.org/data/2.5/weather');
    });

    it('should return the url to obtain weather icon', function() {
        expect(angular.isDefined(_configurationService.getOpenWeatherIconsUrl())).toBe(true);
        expect(_configurationService.getOpenWeatherIconsUrl()).toContain('http://openweathermap.org/img/w/');
        expect(_configurationService.getOpenWeatherIconsUrl('10d')).toContain('http://openweathermap.org/img/w/10d.png');
    });

});
