describe("Unit: WeatherCtrl", function(){
	var _scope, _weatherCtrl;

	beforeEach(function(){
		//load modules
		module('Weather');

		inject(function($rootScope, $controller){
			var _controller = $controller;
			_scope = $rootScope.$new();
			_weatherCtrl = $controller('WeatherCtrl', {
				$scope: _scope
			});

		});
	});

	it('should check that test is correct', function(){
		expect(_scope.test).toBe('123');
	});

});