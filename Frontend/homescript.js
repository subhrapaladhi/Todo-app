let taskList = new Array();

let input = ()=>{
    let newTask = $("form input").val();
    if(newTask!=''){
        $("form input").val('');
        $.post("http://127.0.0.1:3000/addTask",
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

        $('.taskList ul').empty();

        taskList.forEach((task,index)=>{
            console.log(task.task)
            taskElement = `<li>${task.task}<button id=i${task._id}>Delete</button></li>`;
            $('.taskList ul').append(taskElement)
            console.log(task._id)
            $(`#i${task._id}`).click(()=>{
                $.ajax({
                    url: `http://127.0.0.1:3000/delete/${task._id}`,
                    type: 'DELETE',
                    success: (result)=>{
                        if(result.delete){
                            getTaskList();
                        }else{
                            alert('cant delete the task');
                        }
                    }
                })
            })
        })
    })
}


$(document).ready(getTaskList)