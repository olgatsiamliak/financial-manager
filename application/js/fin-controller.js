angular.module('finBalance').controller('FinCtrl', function($scope, $filter) {
	this.date =  new Date();
	var savedData = localStorage.getItem('model');
	if (savedData !== undefined) {
		var code = JSON.parse(savedData);
		this.salaryArea = code.salary;
		this.shoppingArea = code.shopping;
		this.activeCurrency = code.currency;
		this.salaryCategory = code.salaryCategory;
		this.shoppingCategory = code.shoppingCategory;
	} else {
        this.salaryArea = [
 			{"id":1,"date": new Date(2015, 6, 20),"name":"зарплата","total":300},
 			{"id":2,"date": new Date(2015, 7, 25),"name":"аванс","total":500},
 			{"id":3,"date": new Date(2016, 6, 25),"name":"премия","total":200},
 			{"id":4,"date": new Date(2016, 6, 25),"name":"зарплата","total":250},
 			{"id":5,"date": new Date(2016, 7, 28),"name":"премия","total":350},
 			{"id":6,"date": new Date(2016, 7, 31),"name":"аванс","total":150},
 			{"id":7,"date": new Date(2016, 7, 31),"name":"зарплата","total":300},
 			{"id":8,"date": new Date(2016, 7, 31),"name":"премия","total":300}
        ];
		this.shoppingArea = [
			{"id":1,"date": new Date(2015, 6, 20),"name":"продукты","total":50},
			{"id":2,"date": new Date(2015, 6, 25),"name":"транспорт","total":11.2},
			{"id":3,"date": new Date(2016, 7, 20),"name":"транспорт","total":11.2},
			{"id":4,"date": new Date(2016, 6, 29),"name":"коммунальные платежи","total":45},
			{"id":5,"date": new Date(2016, 7, 25),"name":"мобильный телефон","total":45},
			{"id":6,"date": new Date(2016, 7, 26),"name":"развлечения","total":30},
			{"id":7,"date": new Date(2016, 7, 31),"name":"продукты","total":25},
			{"id":8,"date": new Date(2016, 7, 31),"name":"транспорт","total":11.2},
			{"id":9,"date": new Date(2016, 7, 31),"name":"продукты","total":65},
			{"id":10,"date": new Date(2016, 7, 31),"name":"коммунальные платежи","total":15}
		];
	    this.shoppingCategory = [
		    {name: 'продукты'},
			{name: 'коммунальные платежи'},
			{name: 'развлечения'},
			{name: 'мобильный телефон'},
			{name: 'транспорт'}
	];
	    this.salaryCategory = [
		{name: 'зарплата'},
		{name: 'аванс'},
		{name: 'премия'}
	];
		this.activeCurrency = 'USD';
	}
	this.currency = [
	    {id: 1, name: 'USD', rate: '1'},
		{id: 2, name: 'EUR', rate: '0.89'},
		{id: 3, name: 'RUB', rate: '64.93'},
		{id: 4, name: 'BYN', rate: '1.96'}
	];
	this.modelCurrency = null;
	this.editCurrency = function (activeCurrency) {
		activeCurrency.substring();
	}
	this.updateCurrency = function () {
		var rate = this.currency.filter(function (element) {
				if (element.name == this.activeCurrency)
			return element.rate;
		}, this);
        var rateOld = rate[0];
        var result = rateOld.rate;
        var newRate = this.currency.filter(function (element) {
				if (element.name == this.modelCurrency)
			return element.rate;
		}, this);
		var rateNV = newRate[0];
        var resultNV = rateNV.rate;
        var countRates = this.salaryArea.map(function (element, array) {
            return +element.total / result * resultNV;
		 }, this)
		 var countRatesShop = this.shoppingArea.map(function (result, element) {
		    return {
		    	total: +element.total / +result * +resultNV
		    };
		 })
		 this.activeCurrency = this.modelCurrency;	
	};
	this.cancelCurrency = function () {
		 this.modelCurrency = this.activeCurrency;
	};
	this.periods = [
		{name: 'Весь период'},
	    {name: '1 год'},
	    {name: 'Текущий месяц'}
	];
	this.totalSumm = function (array) {
		var totalArray = array.map(function (element) {
		return +element.total;
		})
		var totalSumm = totalArray.reduce(function (sum, current) {
        return sum + current;
	    });
	    return totalSumm;
	}
	this.activeCategory = [];
	this.activeCategoryChange = function (array) {
        this.activeCategory = array;
	}
	this.save = function (activeCategory) {
		this.activeCategory.push({name: this.activeCategory.name});
		this.activeCategory = [];
	};	
    this.choice = [];
    this.activeArray = [];
    this.addRecord = function (array, active) {
    	this.activeArray = array;
    	this.choice = active;
    	this.selected = active[0];
    	this.activeRecord = {};
    	this.activeRecord.id = array.length + 1;
    	this.activeRecord.date = new Date();
    	this.activeRecord.name = this.selected.name;
    	var self = this;   
    	$scope.$watch(function() {
    		if (self.activeRecord !== null) return self.selected.name;
		}, function(newVal, oldVal, $scope) {
			if (self.activeRecord !== null) self.activeRecord.name = newVal;
		}, true)
    	}    	
    this.addPrice = function () {
        this.activeArray.push(this.activeRecord);
        this.activeRecord = null;
        this.activeArray = [];
    }
    this.cancel = function () {
		this.activeCategory = [];
		this.activeCurrency
		this.choice = [];
		this.activeArray = [];
		this.activeRecord = null;
	}
	this.categoryNumber = function(array) {
		return array.length;
	}
	var self = this;
	$scope.$watch(function () {
		return {
            salary: self.salaryArea,
            shopping: self.shoppingArea,
            currency: self.activeCurrency,
            salaryCategory: self.salaryCategory,
            shoppingCategory: self.shoppingCategory
        };
	}, function(newVal, oldVal, $scope) {
		localStorage.setItem('model', JSON.stringify(angular.merge({}, newVal))); 
    }, true);
});