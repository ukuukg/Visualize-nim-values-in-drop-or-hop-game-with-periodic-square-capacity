isPositiveInteger=(num)=>{
  return Number.isInteger(num) && num > 0;
}

document.getElementById("confirm").addEventListener("click",(e)=>{
    first_capacity=Number(document.getElementById("first capacity").value);
    second_capacity=Number(document.getElementById("second capacity").value);
    board_length=Number(document.getElementById("board length").value);

    if(isPositiveInteger(board_length)&&isPositiveInteger(second_capacity)&&isPositiveInteger(first_capacity)){
        document.getElementById("nim-value-table-title").style.visibility="visible";
        document.getElementById("nim-value-table").innerHTML="";
        fetch(`/compute?first_capacity=${first_capacity}&second_capacity=${second_capacity}&board_length=${board_length}`).then(result=>result.json()).then(result=>{
            let p="<tr><td></td>";
            for(let i=0;i<result[0].length;i++){
                p=p+`<td>${i}</td>`;
            }
            p=p+"</tr>";
            for(let i=0;i<result.length-1;i++){
                p=p+`<tr><td>${i}</td>`;
                for(let j=0;j<result[i].length;j++){
                    switch(result[i][j]){
                        case "0":
                            p=p+"<td style=\"background-color: #F0E68C\">0</td>";
                        break;
                        case "1":
                            p=p+"<td style=\"background-color: #87CEFA\">1</td>";
                        break;
                        case "2":
                            p=p+"<td style=\"background-color: #FF69B4\">2</td>";
                        break;
                        case "3":
                            p=p+"<td style=\"background-color: #90EE90\">3</td>";
                        break;
                    }
                }
                p=p+"</tr>";
            }
            document.getElementById("nim-value-table").innerHTML=p;
        });
    }else{
        alert("The input values need to be positive integers");
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("confirm").click();
    }
});