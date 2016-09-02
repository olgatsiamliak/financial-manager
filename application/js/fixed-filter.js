angular.module('finBalance').filter('fixed', function () { 
	return function (value, digits) {
		if (typeof(value) != 'number') {
			var newValue = +value;
			if (!isNaN(newValue)) value = newValue; 
			else return value;
		} 
		return value.toFixed(digits);			
	}
})