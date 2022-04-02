

//Get element from the DOM
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clear = document.querySelector('#clear-task')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')
const finalDel = document.querySelector('#finalDel')
const delBtn = document.querySelector("#delBtn")
const error = document.querySelector('#error')
const close = document.querySelector('#close')

// Load Event Listeners
loadEvents()

function loadEvents(){
     // Load DOM event
    
     document.addEventListener('DOMContentLoaded', getTasks)

    //form Events
   
    form.addEventListener('submit', addTask)

    //Remove event and mark as done

    taskList.addEventListener('click', (e)=>{
        removeTask(e)
        markAsDone(e)
    })

    // clear tasks

    clear.addEventListener('click', clearTasks)

    // Filter task

    filter.addEventListener('keyup', filterTasks)
    taskInput.addEventListener('keyup', clearError)


}

function addTask(e){
   e.preventDefault();
   if(taskInput.value == ''){
       error.classList.add('error')
       error.innerHTML = "Please input a task..."
   } 

   // create Element
   else{

   item = `<li class='list-group-item'>${taskInput.value}
   <a href='#' class='btn btn-danger float-right mx-2' id='deleteItem'>Delete</a>
   <a href='#' class='btn btn-success float-right' id='doneItem'>Done</a>
          </li>`
   taskList.innerHTML += item 
  

   // Store in localStorage
   storeInLocalStorage(taskInput.value)

   // clear input field
   taskInput.value = ''
   }
   

}

function clearError(){
    error.innerHTML = '';
    error.classList.remove('error')
}

function removeTask(e){
  
  if(e.target.matches('a') && e.target.id === 'deleteItem'){
    //   if(confirm("Are you sure you want to delete item?")){
        finalDel.click();
        delBtn.addEventListener('click', ()=>{
            e.target.parentElement.remove();
            removeFromLocalStorage(e.target.parentElement)
            close.click();
        })
      
    //   }
  }
}

function removeFromLocalStorage(taskItem){
    joined = taskItem.innerText.split("       ")
    mainText = joined[0].trim()
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else{ 
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((item ,index)=>{
      if(mainText === item ){
          
          tasks.splice(index,1)
      }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
}


function clearTasks(){
    // taskList.innerHTML = '';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
   
    localStorage.setItem('tasks', JSON.stringify([]))
}

function filterTasks(e){
    const searchText = e.target.value.toLowerCase()
    document.querySelectorAll('.list-group-item').forEach((task)=>{
       const item = task.firstChild;
       if(item.toLowerCase().includes(searchText)){
        task.style.display = 'block'
       }
    //    if(item.toLowerCase().indexOf(searchText) != -1){
    //        task.style.display = 'block'
    //    } 
       else{
           task.style.display = 'none'
       }
    })
   
}

function  storeInLocalStorage(task){
    let tasks;
    // if(localStorage.getItem('tasks') === null){
        // tasks = []
    // } else{ 
        tasks = JSON.parse(localStorage.getItem('tasks')??[])
    // }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function getTasks(){
    let tasks;
    // if(localStorage.getItem('tasks') === null){
    //     tasks = []
    // } else{  
        tasks = JSON.parse(localStorage.getItem('tasks') ??[]);
    // }
    tasks.forEach((val)=>{
        item = `<li class=list-group-item>${val}
        <a href='#' class='btn btn-danger float-right mx-2' id='deleteItem'>Delete</a>
        <a href='#' class='btn btn-success float-right' id='doneItem'>Done</a>
               </li>`
        taskList.innerHTML += item 
    })
}

function markAsDone(e){
    if(e.target.matches('a') && e.target.id === 'doneItem'){
        e.preventDefault();
          e.target.parentElement.classList.toggle('done');
        
    }
}


const myPromise = new Promise((resolve, reject) => {
    let state = true;
    if(state){
        resolve('ok')
    } else{
        reject('Nope')
    }
})

myPromise
.then((response)=>{
    console.log(response)
})
.catch(error => {
    console.log(error)
})

const logon = ()=>{
    console.log('Hi')
}
setTimeout(logon, 3000)

const anotherPromise = new Promise((resolve, reject)=>{
   setTimeout(()=>{
    resolve('I love you')
   }, 4000)
  
})
.then((response)=>{
   console.log(response)
})

// Writing an achyncronous function

async function myAsync(){
    return 'Hello';
}
// some git command
// Git init -- inititialize local new repository
// git status -- shows what we have in our staging area
// git add add files and folders to the staging area
// git commist commit files in the staging area to local repository
// git push Takes a local repository and pushes  to the remote repository