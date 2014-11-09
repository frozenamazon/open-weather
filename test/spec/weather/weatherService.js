describe('Unit: weatherService', function(){
	var _weatherService, _httpBackend, _configurationService, weatherJson;

	beforeEach(function(){
		//load modules
		module('Weather');

		inject(function(weatherService, $httpBackend, configurationService){
			_configurationService = configurationService;
			_weatherService = weatherService;
			_httpBackend = $httpBackend;
			jasmine.getJSONFixtures().fixturesPath = 'base/test/json';
			weatherJson = getJSONFixture('weather.json')[0];
			_httpBackend.when('GET', 'http://api.openweathermap.org/data/2.5/weather?q=London,uk').respond(weatherJson);
		});
	});

	it('should have a function that hits the open weather url and sending the location as params', function(){
		expect(angular.isFunction(_weatherService.getWeatherData)).toBe(true);
		_httpBackend.expectGET('http://api.openweathermap.org/data/2.5/weather?q=London,uk');
		_weatherService.getWeatherData('London,uk');
		_httpBackend.flush();
	});

	it('should return location, current weather conditiions, icons,temperate, temparature range, atmospheric pressure, humidity', function(){
		var location = 'London,uk';
		var result;
		_weatherService.getWeatherData(location).then(function(data){
			result = data;
		});
		_httpBackend.flush();
		expect(result.location).toBe(location);
		expect(result.longitude).toBe(-0.13);
		expect(result.latitude).toBe(51.51);
		expect(result.weatherConditions.length).toBe(3);
		expect(result.weatherConditions[0].label).toBe('Rain');
		expect(result.weatherConditions[0].icon).toBe('http://openweathermap.org/img/w/10n.png');
		expect(result.temperate).toBe(282.49);
		expect(result.temp_min).toBe(281.15);
		expect(result.temp_max).toBe(284.15);
		expect(result.pressure).toBe(1001);
		expect(result.humidity).toBe(87);
	});

});

describe('Unit: weatherService error testing', function(){
	var _weatherService, _httpBackend, _configurationService, weatherJson;

	beforeEach(function(){
		//load modules
		module('Weather');

		inject(function(weatherService, $httpBackend, configurationService){
			_configurationService = configurationService;
			_weatherService = weatherService;
			_httpBackend = $httpBackend;
			var error = {'message':'Error: Not found city','cod':'404'};
			_httpBackend.when('GET', 'http://api.openweathermap.org/data/2.5/weather?q=London,uk').respond(error);
		});
	});

	it('should return error message', function(){
		var success, error;
		_weatherService.getWeatherData('London,uk').then(function(data){
			success = data;
		}, function(errorResponse){
			error = errorResponse;
		});
		_httpBackend.flush();
		expect(angular.isUndefined(success)).toBe(true);
		expect(error.cod).toBe('404');
		expect(error.message).toBe('Error: Not found city');
	});

});