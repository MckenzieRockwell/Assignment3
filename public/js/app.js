(function() {
	
	var app = angular.module('todoList',[]);

	app.controller('listController',[ '$http', function($http){

		var todoList = this;

		todoList.items = [];

		$http.get('/todos/todolist.json').success(function(data){
			todoList.items = data;

		}); 


	}]);

})();