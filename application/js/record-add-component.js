angular.module('finBalance').component('recordAdd', {
	templateUrl: '/templates/record-add.html',
	controller: function(){
		
	},
	controllerAs: 'add',
	bindings: {
		record: '=',
		active: '=',
		choice: '=',
		selected: '='
	}
});