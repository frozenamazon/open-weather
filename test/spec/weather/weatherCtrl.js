describe("Unit: WeatherCtrl", function(){
	var _scope, _weatherCtrl, _weatherService;

	beforeEach(function(){
		//load modules
		module('Weather');

		inject(function($rootScope, $controller, weatherService, $q, $filter){
			var _controller = $controller;
			_scope = $rootScope.$new();
			_weatherService = weatherService;

			var data = {
				location: 'London,uk',
				longitude: -0.13,
				latitude: 51.51,
				weatherConditions: [{
			        "label": "Rain",
			        "icon": "10n"
			    }, {
			        "label": "Mist",
			        "icon": "50n"
			    }, {
			        "label": "Fog",
			        "icon": "50n"
			    }],
				temperate: 282.49,
				temp_min: 281.15,
				temp_max: 284.15,
				pressure: 1001,
				humidity: 87
			};

			var dummyElement = document.createElement('iframe');
			document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);

			var getWeatherDataDeferred = $q.defer();
			getWeatherDataDeferred.resolve(data);
			spyOn(_weatherService, 'getWeatherData').and.returnValue(getWeatherDataDeferred.promise);

			_weatherCtrl = $controller('WeatherCtrl', {
				$scope: _scope,
				weatherService: _weatherService
			});

		});
	});

	it('sets the country to uk', function(){
		expect(_scope.country).toContain('uk');
	});

	it('has a list of UK cities', function(){
		expect(_scope.cities[0].cities).toContain('London');
		expect(_scope.cities[1].cities).toContain('Luton');
		expect(_scope.cities[2].cities).toContain('Manchester');
		expect(_scope.cities[3].cities).toContain('Birmingham');
	});

	it('sort ascending order on city names', function(){
		_scope.sortByCities(false);
		expect(_scope.cities[0].cities).toContain('Birmingham');
		expect(_scope.cities[1].cities).toContain('London');
		expect(_scope.cities[2].cities).toContain('Luton');
		expect(_scope.cities[3].cities).toContain('Manchester');
	});

	it('sort descending order on city names', function(){
		_scope.sortByCities(true);
		expect(_scope.cities[0].cities).toContain('Manchester');
		expect(_scope.cities[1].cities).toContain('Luton');
		expect(_scope.cities[2].cities).toContain('London');
		expect(_scope.cities[3].cities).toContain('Birmingham');
	});

	it('should set scope.weather with the value from services and iframe for google maps', function(){
		_scope.getWeatherDataByCity('London');
		expect(_weatherService.getWeatherData).toHaveBeenCalledWith('London,uk');
		_scope.$apply();
		expect(document.getElementById().src).toContain('https://www.google.com/maps/embed/v1/place?key=AIzaSyDFRsvsPJUqXrGvyQ-NExGFauUC5gfCJTY&q=');
		expect(_scope.weather.location).toBe('London,uk');
		expect(_scope.weather.longitude).toBe(-0.13);
		expect(_scope.weather.latitude).toBe(51.51);
		expect(_scope.weather.weatherConditions.length).toBe(3);
		expect(_scope.weather.weatherConditions[0].label).toBe('Rain');
		expect(_scope.weather.weatherConditions[0].icon).toBe('10n');
		expect(_scope.weather.temperate).toBe(282.49);
		expect(_scope.weather.temp_min).toBe(281.15);
		expect(_scope.weather.temp_max).toBe(284.15);
		expect(_scope.weather.pressure).toBe(1001);
		expect(_scope.weather.humidity).toBe(87);
	});

});

describe("Unit: WeatherCtrl error test", function(){
	var _scope, _weatherCtrl, _weatherService;

	beforeEach(function(){
		//load modules
		module('Weather');

		inject(function($rootScope, $controller, weatherService, $q){
			var _controller = $controller;
			_scope = $rootScope.$new();
			_weatherService = weatherService;

			var error = {'message':'Error: Not found city','cod':'404'};
			var getWeatherDataDeferred = $q.defer();
			getWeatherDataDeferred.reject(error);
			spyOn(_weatherService, 'getWeatherData').and.returnValue(getWeatherDataDeferred.promise);

			_weatherCtrl = $controller('WeatherCtrl', {
				$scope: _scope,
				weatherService: _weatherService
			});

		});
	});

	it('should set scope.weather with the value from services', function(){
		_scope.getWeatherDataByCity('London');
		expect(_weatherService.getWeatherData).toHaveBeenCalledWith('London,uk');
		_scope.$apply();
		expect(_scope.error.message).toBe('Error: Not found city');
		expect(_scope.error.cod).toBe('404');
	});

});