'use strict';

describe("Unit: MainCtrl", function(){
	var _scope, _weatherCtrl;

	beforeEach(function(){
		//load modules
		module('Weather');

		inject(function($rootScope, $controller){
			var _controller = $controller;
			_scope = $rootScope.$new();
			_weatherCtrl = $controller('MainCtrl', {
				$scope: _scope
			});

		});
	});

	it('should check that it has a weather template page', function(){
		expect(_scope.weatherPage).toBe('modules/weather/partials/weather.html');
	});

});