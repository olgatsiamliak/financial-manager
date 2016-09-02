angular.module('finBalance').component('categoryAdd', {
	templateUrl: '/templates/category-add.html',
	controller: function () {
		this.active = null;
		this.activeItem = null;
		this.activeChange = function () {
			this.active = {};
		}
	    this.edit = function (category) {
	    	this.active = category;
	    	this.activeItem = $.extend({}, category);
	    }
	    this.update = function (category) {
	        $.extend (category, this.activeItem);
	        this.active = null;
	    }
	    this.cancelEdit = function () {
	        this.active = null;
	        this.activeItem = null;
	    }
	    this.remove = function (category) {
	    	var index = this.data.indexOf(category);
			this.data.splice(index, 1);
	    }
	},
	controllerAs: 'add',
	bindings: {
		data: '='
	}
});