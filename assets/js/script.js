var timeBlocks = $(".timeblocks");

var toDos = []

//Will create and append a new time block, it requires and hour in 24 hours format and a text if locally storaged
function createNewTimeBlock(hour24,text) {
    var newHourBlock = $("<div>");
    newHourBlock.addClass("row hour-block");

    var newHour = $("<div>");
    newHour.addClass("hour col-1");

    var hourNumber = $("<p>");

    if (hour24>12) {
        hourNumber.text((hour24-12)+" PM");      
    }else{
        hourNumber.text(hour24+" AM");      
    }

    var eventText = $("<input>");

    if (hour24 < moment().format("k")) {
        eventText.addClass("past col-9");       
    }else if(hour24 == moment().format("k")) {
        eventText.addClass("present col-9");       
    }else{
        eventText.addClass("future col-9");       
    }

    eventText.val(text);

    var newsaveBtn = $("<div>");
    newsaveBtn.addClass("saveBtn col-1");

    var newSaveIcon = $("<i>");
    newSaveIcon.text("💾");


    newHour.append(hourNumber);
    newsaveBtn.append(newSaveIcon);
    newHourBlock.append(newHour);
    newHourBlock.append(eventText);
    newHourBlock.append(newsaveBtn);
    timeBlocks.append(newHourBlock);
}

function setTimeBlocks() {
    for (i = Number(moment().format("k"))-3; i < Number(moment().format("k"))+6; i++) {

        var SavedText = false;
        var savedWhere = 0;
    
        for (j = 0; j < tareas.length; j++) {
            if (tareas[j].time == i) {
                SavedText = true;
                savedWhere = j;
            }
        }
    
        if (SavedText) {
            createNewTimeBlock(i,tareas[savedWhere].text);
        }else{
            createNewTimeBlock(i,"");
        }
    }
}

function saveInfo(event) {
    var block = event.target;
    if (block.matches(".saveBtn") || block.matches("i")) {
        var toDo = block.parentElement.children[1].value;
        var todDoTime = h12textTOh24number(block.parentElement.children[0].children[0].textContent);

        console.log(todDoTime);

        var tempObj = {
            text : toDo,
            time : todDoTime
        }

        console.log(tempObj);

        toDos.push(tempObj);
        localStorage.setItem("tareas",JSON.stringify(toDos))
        console.log(localStorage.getItem("tareas"));
    }
}

function h12textTOh24number(h12) {
    var newHour = h12.split(" ");
    if(newHour[1].toLowerCase() == "pm"){
        newHour[0] =  Number(newHour[0]) + 12;
        return newHour[0];
    }
    return Number(newHour[0]);
}

timeBlocks.on("click",saveInfo)

if (localStorage.getItem("tareas") != null) {
    var tareas = JSON.parse(localStorage.getItem("tareas"));
    console.log(tareas);
}else{
    var tareas = [{time:25,text:""}]
}

setTimeBlocks()
