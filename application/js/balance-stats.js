angular.module('finBalance').component('balanceStats', {
	templateUrl: '/templates/balance-stats.html',
	controller: function() {
		this.balanceTotal = function (salary, shopping) {
			return this.totalSumm(salary) - this.totalSumm(shopping);	
		}	
		this.totalSumm = function (array) {
				var totalSumm = array.map(function (element) {
				return +element.total;
				});
				var finalSumm = totalSumm.reduce(function (sum, current) {
	        		return sum + current;
		    	});
		    	return finalSumm.toFixed(2);
		}
		var dateResult = new Date();
		this.monthArray = function (array) {
			var detailedArr = array.filter(function (element) {
				var key = new Date(element.date);
				return (key.getMonth() == dateResult.getMonth() && key.getFullYear() == dateResult.getFullYear());
			});
	    	return detailedArr;
		}
		this.yearArray = function (array) {
			var detailedArr = array.filter(function (element) {
				var key = new Date(element.date);
				return key.getFullYear() == dateResult.getFullYear();
			});
	    	return detailedArr;
		}

},
	controllerAs: 'balance',
	bindings: {
		salary: '=',
		shopping: '='
	}
});