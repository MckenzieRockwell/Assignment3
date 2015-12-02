/*
Author: Mckenzie Rockwell
website: express portfolio todo list
Descript: This file contains the the application logic for the todoList. 
it works with angular to expedite the process of creating asychronous page updates
and server interactions.

*/

(function() {
	
	var app = angular.module('todoList',[]);

	var todoList = {}; 

/*
Below is the controller for the todo list as a whole it's only function
is populating the list of todo items initially at page load. The object which
contains this list is instantiated outside the controller in the encompassing
scope so that the other controllers can access it. 
*/

	app.controller('listController',[ '$http', function($http){

		todoList = this;

		todoList.items = [];

		$http.get('/todos/todolist.json').success(function(data){
			todoList.items = data; 
		}); 

	}]);

/*
Below is the controller for the behavior of various individual todo items.
This is bond to the scope of each item specific row div. angular's built in
http service is included as a dependency to be injected.
Editing the items in the todoList.item array automatically causes the page to update
thanks to angulars two way data binding.

	In editItem, deleteItem, and in cancelEdit altering
this array is necessary because not all of the desired changes happen simply
as a result of the form controller interaction. In these functions it is reasonable to
put these operations inside of the success callback from the server post. It may
give the page a less responsive feel but it prevents the displaying of updates
which haven't actually excuted properly. This approach doesn't mean that
the server has to do more work than it would have.


*/


	app.controller('itemController', ['$http', function($http){

		this.completedChanged = function(toggled){
			if(toggled.completed){
				toggled.editMode = false;
			}
			console.log(toggled); 

			$http.post('/todos/edit', toggled);
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


/*
	Added a new todo item gets it's own controller just for the sake of good
	organization. It's bond the the new item form at the bottom of the list.
*/

	app.controller('newitemController', ['$http', function($http){
		
		this.newitem = {};

		this.addItem = function(){

			var newItem = this.newitem;
			$http.post('/todos/add', this.newitem).success(function(thisitem){
				todoList.items.push(thisitem);
			});

			this.newitem = {};  
		};

	}]);

})();