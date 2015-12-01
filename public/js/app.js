(function() {
	
	var app = angular.module('todoList',[]);

	app.controller('listController',[ '$http', function($http){

		var todoList = this;

		todoList.items = [];

		$http.get('/todos/todolist.json').success(function(data){
			todoList.items = data;

		}); 


	}]);

	app.controller('itemController', ['$http', function($http){

		this.editItem = function(item){
			item.editMode = true; 
		};

		this.inEdit = function(item){
			return (item.editMode); 
		}


	}]);

})();