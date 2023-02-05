const main = document.getElementById("main-container");
const grid = document.getElementById("grid");
const form = document.getElementById("todoform");

//
var ActiveCardItem = null;
//
var IS_EMPTY = true;
var itemCount = 0;
//

function openForm(me) {
	if (me.classList.contains("addtask")) {
		// console.log("true in open from");
		ActiveCardItem = me.parentNode;
		form.innerHTML = ` <label for="task">Add task</label>
            <input id="task" name="task" type="text" placeholder="clime himalaya">
            <div class="action">
                <button onclick="addTask()">Add</button>
                <button onclick="closeForm()">Close</button>
            </div>`;
	} else {
		form.innerHTML = `<label for="todo">Add To Do Item</label>
            <input id="todo" name="todo" type="text" placeholder="trip to USA">
            <div class="action">
                <button onclick="addTodoItem()">Add</button>
                <button onclick="closeForm()">Close</button>
            </div>`;
	}
	form.classList.add("active");
	main.classList.add("blur");
}
function closeForm() {
	form.classList.remove("active");
	main.classList.remove("blur");
	ActiveCardItem = null;
}
function addTodoItem() {
	const todoInput = document.getElementById("todo");
	let inputText = todoInput.value;
	todoInput.value = "";
	if (inputText == "") {
		closeForm();
		alert("please give/fill  todo / information");
		return;
	}
	createNewTodoItem(inputText);
	// console.log(inputText);
	closeForm();
}
//create a new todo item card
function createNewTodoItem(text) {
	const newTodo = document.createElement("div");
	// newTodo.id = "card";
	newTodo.classList.add("card");
	newTodo.innerHTML = `
                <h4 class="title">${text}</h4>
                <ul class="tasklist">
                </ul>
                <i class="fa-solid fa-circle-plus addtask" onclick="openForm(this)"></i>
                <i class="fa-solid fa-trash-can can" onclick="deleteItem(this)"></i>
            `;
	if (grid.childElementCount == 1 && IS_EMPTY) {
		IS_EMPTY = false;
		grid.innerHTML = "";
	}
	grid.appendChild(newTodo);
}

//related to single item specific ===================================
function deleteItem(self) {
	// console.log(e);
	let canBtn = self;
	const parentCard = canBtn.parentNode;
	// console.log(parentCard);
	parentCard.remove();
	//deleted last item
	if (grid.childElementCount == 0 && !IS_EMPTY) {
		IS_EMPTY = true;
		grid.innerHTML = ` <div name="empty" class="empty">
                There are no current To Do Item
            </div>`;
	}
}
function addTask() {
	const taskInput = document.getElementById("task");
	let inputText = taskInput.value;
	// console.log(inputText);
	taskInput.value = "";
	if (inputText == "") {
		closeForm();
		alert("please give/fill task / information");
		return;
	}
	if (ActiveCardItem == null) {
		closeForm();
		alert("please select any todo item");
		return;
	}
	createNewTask(self, inputText);
	closeForm();
}
function createNewTask(self, text) {
	const newTask = document.createElement("li");
	newTask.innerHTML = `<li>
                        ${text}
                        <button onclick="markDone(this)">Mark Done</button>
                    </li>`;
	const parentCard = ActiveCardItem;
	// console.log(parentCard);
	const UL = parentCard.children.item(1);
	// console.log(UL);
	UL.appendChild(newTask);
}

function markDone(self) {
	const LI = self.parentNode;
	LI.classList.add("done");
	self.remove();
}

///////////////////////////////////////////
console.log("Script is ruuning fine");
