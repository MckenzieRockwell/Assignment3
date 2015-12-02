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

		this.inEdit = function(){
			return (item.editMode); 
		};



		this.editItem = function(edited){ 
			console.log(edited);
			$http.post('/todos/edit', edited); 
			
		};

		// this.delete = function(){

		// };

		// this.cancel = function(){

		// }

	}]);

	app.controller('newitemController', ['$http', function($http){
		
		this.newitem = {};

		this.addItem = function(allitems){
			console.log(this.newitem); 
			allitems.push(this.newitem);
			this.newitem = {};  
		};

	}]);

})();