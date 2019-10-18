let id = window.location.href.slice(-24)

let initialize = ()=>{
    $.ajax({
        url: `http://127.0.0.1:3000/data/${id}`,
        type: "GET",
        success: (result)=>{
            if(result){
                console.log('data found\n',result);
            }else{
                console.log('no data found');
            }
        }
    })
}

let addDetails = ()=>{
    let data = $('#details').val();
    $('#details').val('')
    $.ajax({
        url: `http://127.0.0.1:3000/update/${id}`,
        type: "PUT",
        data: {'details': data},
        success: (data, status)=>{
            if(data){
                console.log('got someting')
            }
        }
    })
    return false
}


initialize();