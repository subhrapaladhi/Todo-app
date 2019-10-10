// let taskList = new Array('task1','task2','task3','task4','task5');
let taskList = new Array();

let input = ()=>{
    let newTask = $("form input").val();

    if(newTask!=''){
        // createTaskList(newTask);
        $("form input").val('');
        $.post("http://127.0.0.1:3000/addWebinar",      //HERE -----------------------> send a post request to backend with the name of the new task
                {
                    task: newTask
                },
                (data,status)=>{
                    if(data.save){
                        getTaskList();
                    }
                }
        )
    }
    
    return false            // the prevent the form from refreshing
}

let getTaskList = ()=>{
    $.get("http://127.0.0.1:3000/tasksList", (data, status) => {
        console.log(data);
        taskList = data.taskList;
        // taskList.push(task);
        $('.taskList ul').empty();
        taskList.forEach((task)=>{
            console.log(task)
            taskElement = `<li>${task}<button>Delete</button></li>`;
            $('.taskList ul').append(taskElement)
        })
    })
}


$(document).ready(getTaskList)