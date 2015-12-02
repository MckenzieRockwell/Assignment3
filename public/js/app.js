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

		this.completedChanged = function(toggled){
			if(toggled.completed){
				toggled.editMode = false;
			}

			$http.post('/todos/edit', toggled).success(function(){
				console.log('it worked'); 
			}); 
		}; 

		this.editItem = function(edited){ 
			console.log(edited);
			$http.post('/todos/edit', edited).success(function(){
				edited.editMode = false;
			}); 

		};

		this.deleteItem = function(deleted){ 
			var index = todoList.items.indexOf(deleted);
			var thisid = deleted._id;
			$http.post('/todos/delete', {id:thisid}).success(function(){
				todoList.items.splice(index, 1);
			}); 
		}; 


		this.cancelEdit = function(reverted){
			var index = todoList.items.indexOf(reverted);
			var thisid = reverted._id;
			console.log(reverted);
			$http.post('/todos/getitem.json', {id:thisid}).success(function(item) {
				todoList.items.splice(index, 1, item); 
			});
		};


	}]);

	app.controller('newitemController', ['$http', function($http){
		
		this.newitem = {};

		this.addItem = function(){

			var newItem = this.newitem;
			$http.post('/todos/add', this.newitem).success(function(){
				todoList.items.push(newItem);
			});

			this.newitem = {};  
		};

	}]);

})();