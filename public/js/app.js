(function() {
	
	var app = angular.module('todoList',[]);

	var todoList = {}; 

	app.controller('listController',[ '$http', function($http){

		todoList = this;

		todoList.items = [];

		$http.get('/todos/todolist.json').success(function(data){
			todoList.items = data; 
		}); 

		this.getItems = function(){
			return todoList.items; 
		}
		

	}]);

	app.controller('itemController', ['$http', function($http){

		this.inEdit = function(){
			return (item.editMode); 
		};

		this.editItem = function(edited){ 
			console.log(edited);
			$http.post('/todos/edit', edited).success(function(){
				edited.editMode = false;
			}); 

		};

		this.deleteItem = function(edited){
			console.log(edited); 
			var index = todoList.items.indexOf(edited);
			var thisid = edited._id; 
			console.log(thisid); 
			$http.post('/todos/delete', {id:thisid}).success(function(){
				todoList.items.splice(index, 1);
			}); 
		}; 

		// this.cancel = function(){


	}]);

	app.controller('newitemController', ['$http', function($http){
		
		this.newitem = {};

		this.addItem = function(allitems){
			console.log(this.newitem);
			todoList.items.push(this.newitem);

			$http.post('/todos/add', this.newitem);
			this.newitem = {};  
		};

	}]);

})();