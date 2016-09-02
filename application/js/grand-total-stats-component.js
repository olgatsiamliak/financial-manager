angular.module('finBalance').component('grandTotalStats', {
	templateUrl: '/templates/grand-total-stats.html',
	controller: function($scope){
		function computeStats(array){
			var hash = array.reduce(function (result, element) {
				var key = element.name;
				var value = +element.total;
				result[key] = (result[key] || 0) + value;
				return result;
			}, {});
			var keys = Object.keys(hash);
			var grandTotal = array.reduce(function (result, element){
				return result + +element.total;
			}, 0);
			return keys.map(function(key){
				return {
					name : key,
					total: hash[key],
					percentage: +(hash[key] / grandTotal * 100).toFixed(2)					
				}
			});
		};
		function fractionsToPaths(fractions){
			const R = 50;
			var angles = fractions.reduce(function(result, fraction, index){
				result.push(result[index] - fraction * 2 * Math.PI);
				return result;
			}, [0]);
			var coords = angles.map((a) => ({
				x: R * Math.cos(a) + R,
				y: R * Math.sin(a) + R
			}));
			return coords.map(function(element, index, all){
				if(index == all.length - 1) return null;
				var isLarge = angles[index] > Math.PI;
				var x = element.x;
				var y = element.y;
				if (isLarge) {
					return 'M 50 50' + ' L ' + x.toFixed(2) + ' ' + y.toFixed(2) +
				' A 50 50 0 ' + +isLarge + ' ' + '1' + ' '
				+ all[index + 1].x.toFixed(2) + ' ' + all[index + 1].y.toFixed(2) + ' Z';
			} else  {
				return 'M 50 50' + ' L ' + x.toFixed(2) + ' ' + y.toFixed(2) +
				' A 50 50 0 ' + +isLarge + ' ' + '0' + ' '
				+ all[index + 1].x.toFixed(2) + ' ' + all[index + 1].y.toFixed(2) + ' Z';
			}
			}).slice(0, -1);
		}
		$scope.stats = [];
		$scope.paths = [];
		$scope.$watch('$ctrl.data', function(newData){
			$scope.stats = computeStats (newData);
			$scope.paths = fractionsToPaths($scope.stats.map(s => s.percentage / 100));
		}, true);
		$scope.gridline = function () {			

		}		
		$scope.number = function () {
			return $scope.stats.length;
		}
		$scope.graphHeight = function () {
			var result = 100 / $scope.number();
			return result.toFixed(2);
		}
		$scope.moveTop = function ($index) {
			var result = $scope.graphHeight() * $index;
			return result.toFixed(2);
		}
		$scope.bcolor = function ($index) { 
			return {
				rgbaF: 30*($index + 1)
			};
		}
	},
	controllerAs: '$ctrl',
	bindings: {
		data: '='
	}
});