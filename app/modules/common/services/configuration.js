(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name common.services.configuration
     * @description
     *
     * Configuration constants class to hold and return all configurable items.
     *
     *
     */

    var app = angular.module('Weather');

    app.factory('configurationService', function() {

            var getOpenWeatherUrl = function() {
                return 'http://api.openweathermap.org/data/2.5/weather';
            };

            var getOpenWeatherIconsUrl = function(icon) {
                return 'http://openweathermap.org/img/w/' + icon + '.png';
            };

            return {
                getOpenWeatherUrl: getOpenWeatherUrl,
                getOpenWeatherIconsUrl: getOpenWeatherIconsUrl
            };
        });
}());