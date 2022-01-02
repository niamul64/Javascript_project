// Define UI element // grab all the element from html page
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

// Define event listeners
form.addEventListener('submit', addTask); // form submited
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks); /// if the page is loaded the "getTasks" function is called

// Define functions
// Add Task
function addTask(e) {  // form submited
      if (taskInput.value === '') {
            alert('Add a task!'); // if task input field is empty then show alert
      } else {
            // Create li element
            let li = document.createElement('li'); // il tag created.
            li.appendChild(document.createTextNode(taskInput.value + " ")); // Take the value from New task text filed
            let link = document.createElement('a'); // createing <a> for placing it inside the li tag
            link.setAttribute('href', '#'); // setting up a # link to <a>
            link.innerHTML = 'x'; // x charecter inside the tag to work as button
            li.appendChild(link); //  adding <a> insdie the <li>
            taskList.appendChild(li); // inserting into ul tag // taskList = document.querySelector('ul');
            storeTaskInLocalStorage(taskInput.value); // calling the function at 'bottom of the page'
            console.log(li);
            taskInput.value = ''; //  after adding the item to task list we are clearing the text field for HTML
      }
      e.preventDefault();// for url link disable we need to use it.
      // here we using it to prevent reload just after submitting the form.
}

// Remove Task
function removeTask(e) { //document.querySelector('ul').addEventListener('click', removeTask);
      //<ul id="tasks"> 
      //    <li>a <a href="#">x</a></li>
      //    <li>bd <a href="#">x</a></li>
      //    <li>sss <a href="#">x</a></li> 
      // </ul>
      console.log(e.target); // we will the the <a>  tag that we clicked.(single element).
      // target is the built in function to get the clicked event element. 
      if (e.target.hasAttribute("href")) {
            if (confirm("Are you sure?")) { // 'confirm' is a builtin function like 'alart'
                  let ele = e.target.parentElement; //  taking the element to a variable// the <li>
                  console.log(ele);
                  ele.remove();// Now, removing the element
                  //console.log(ele);
                  removeFromLS(ele); // calling the function with passing the just removed element to  remove form local storage
            }
      }
}

// Clear Task
function clearTask(e) { // 'clear task' button is clicked
      //taskList.innerHTML = "";
      // Faster
      while (taskList.firstChild) { // document.querySelector('ul').addEventListener('click', removeTask);
            taskList.removeChild(taskList.firstChild); // remove first child of <ul> 
      }
      localStorage.clear(); // builtin clear function to clear the whole local storage
}

// Filter Task
function filterTask(e) {
      let text = e.target.value.toLowerCase();

      document.querySelectorAll('li').forEach(task => { // take all <li>
            let item = task.firstChild.textContent;     // accesing <a> and taking text inside the <a> </a>
            if (item.toLowerCase().indexOf(text) != -1) { // if any charecter not matched the it returns -1
                  task.style.display = 'block'; // if match then show
            } else {
                  task.style.display = 'none'; // not matched the don't show
            }
      });
}

// Store in Local Storage
function storeTaskInLocalStorage(task) { // one task is coming
      let tasks;
      if (localStorage.getItem('tasks') === null) {
            tasks = []; // if no task in local storage
      } else {          //if there is tasks in local storage then get all and save to task variable
            tasks = JSON.parse(localStorage.getItem('tasks')); // local storage data is in json formate// converting to js obj
      }
      tasks.push(task);   // pusing the single task to the tasks list of local storage task
      localStorage.setItem('tasks', JSON.stringify(tasks)); // saving the task in local storage by using tasks key word, after converting to js obj--> json obj
}

function getTasks() {
      let tasks;
      if (localStorage.getItem('tasks') === null) {
            tasks = []; // if no task in local storage
      } else {          //if there is tasks in local storage then get all and save to task variable
            tasks = JSON.parse(localStorage.getItem('tasks')); // local storage data is in json formate// converting to js obj
      }

      tasks.forEach(task => {                    // traverse through the tasks we got from the local storage and show to html doc
            let li = document.createElement('li'); // creating <li>
            li.appendChild(document.createTextNode(task + " ")); // adding the task name 
            let link = document.createElement('a');               //createing <a> for placing it inside the li tag
            link.setAttribute('href', '#');                       // setting up a # link to <a>
            link.innerHTML = 'x';                                 // x charecter inside the tag to work as button
            li.appendChild(link);                                 //  adding <a> insdie the <li>
            taskList.appendChild(li);                             // inserting into ul tag // taskList = document.querySelector('ul');
      });
}

function removeFromLS(taskItem) { // recieved the single element to remove from local storage
      let tasks;
      if (localStorage.getItem('tasks') === null) { // load all task from local storage // if there is no task then task is empty list
            tasks = [];
      } else { //if there is tasks in local storage then get all and save to task variable
            tasks = JSON.parse(localStorage.getItem('tasks')); // local storage data is in json formate// converting to js obj
      }

      taskItem.removeChild(taskItem.lastChild); // <a>x</a> removing 

      tasks.forEach((task, index) => {
            if (taskItem.textContent.trim() === task) { // trim is used to remove the extra space from the text value, then then compare
                  
                  tasks.splice(index, 1); // the <li> tag slicing // structure: splice(index, how_many)
            }
      });

      localStorage.setItem('tasks', JSON.stringify(tasks)); // saving the updated array with tasks removed one item
}