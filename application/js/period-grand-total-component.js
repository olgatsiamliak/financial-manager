angular.module('finBalance').component('periodGrandTotal', {
	templateUrl: '/templates/period-grand-total.html',
	controller: function() {
		var dateResult = new Date();
		this.monthTotal = function (array) {			
			var detailedArr = array.filter(function (element) {
				var key = new Date(element.date);
				return (key.getMonth() == dateResult.getMonth() && key.getFullYear() == dateResult.getFullYear());
			});
			var totalSumm = detailedArr.map(function (element) {
				return +element.total;
			});
			var finalSumm = totalSumm.reduce(function (sum, current) {
        		return sum + current;
	    	});
	    	return finalSumm.toFixed(2);				
		}
		this.dayTotal = function (array) {
			var detailedArr = array.filter(function (element) {
				var key = new Date(element.date);
				return (key.getDate() == dateResult.getDate() && key.getFullYear() == dateResult.getFullYear() && key.getMonth() == dateResult.getMonth());
			});
			if  (detailedArr[0] == undefined)  return 0;
			else {
				var totalSumm = detailedArr.map(function (element) {
				return +element.total;
			});
			var finalSumm = totalSumm.reduce(function (sum, current) {
        		return sum + current;
	    	});
	    	return finalSumm.toFixed(2);
	    } 			
		}
		this.yearTotal = function (array) {
			var detailedArr = array.filter(function (element) {
				var key = new Date(element.date);
				return key.getFullYear() == dateResult.getFullYear();
			});
			var totalSumm = detailedArr.map(function (element) {
				return +element.total;
			});
			var finalSumm = totalSumm.reduce(function (sum, current) {
        		return sum + current;
	    	});
	    	return finalSumm.toFixed(2);
	    }
},
	controllerAs: 'periods',
	bindings: {
		data: '='
	}
});