// let taskList = new Array('task1','task2','task3','task4','task5');



let input = ()=>{
    let newTask = $("form input").val();

    if(newTask!=''){
        createTaskList(newTask);
        $("form input").val('');
    }
    
    return false            // the prevent the form from refreshing
}

let getTaskList = (task)=>{

    $.get("/home", (data, status) => {
        alert(data);
    })

    // taskList.push(task);
    // $('.taskList ul').empty();
    // taskList.forEach((task)=>{
    //     console.log(task)
    //     taskElement = `<li>${task}<button>Delete</button></li>`;
    //     $('.taskList ul').append(taskElement)
    // })
}


$(document).ready(getTaskList)