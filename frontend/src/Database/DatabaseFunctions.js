function taskFiller(taskList){

  try{
      var elements = Array(38);
      for(let i = 0; i < elements.length; i++){
          elements[i]='<tr>'
                  +'<th scope="row">{i+1}</th>'
                  +'<td>{taskList.description}</td>'
                  +'<td>{taskList.department}</td>'
                  +'<td>{taskList.deadline}</td>'
                  +'<td><button><img src={trash} alt =""/></button></td>'
                  +'<td>{taskList.confirmationDate}</td>'
                  +'<td>{taskList.employee}</td>'
                  +'<td>{taskList.member_assigned}</td>'
                  +'</tr>';
    }
    console.log(elements);
    return elements;
  }catch(e){
    console.log("there was an error");
    console.log(e);
    return e;
  }
};