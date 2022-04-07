var timeBlocks = $(".timeblocks");
var currentday = $("#currentDay")


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
    for (i = 9; i < 18; i++) {

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
        if (block.matches(".saveBtn")) {
            var toDo = block.parentElement.children[1].value;
            var todDoTime = h12textTOh24number(block.parentElement.children[0].children[0].textContent);
        }else if(block.matches("i")){
            var toDo = block.parentElement.parentElement.children[1].value;
            var todDoTime = h12textTOh24number(block.parentElement.parentElement.children[0].children[0].textContent);
        }

        var repeat = false;
        var whereRepeat = 0;

        for (i = 0; i < toDos.length; i++) {
            if (toDos[i].time == todDoTime) {
                repeat = true
                whereRepeat = i;
            }
        }

        if (repeat) {
            toDos[whereRepeat].text = toDo;
        }else{
            var tempObj = {
                text : toDo,
                time : todDoTime
            }
            toDos.push(tempObj);
        }

        localStorage.setItem("tareas",JSON.stringify(toDos))
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

var toDos = []


if (localStorage.getItem("tareas") != null) {
    var tareas = JSON.parse(localStorage.getItem("tareas"));
    toDos = JSON.parse(localStorage.getItem("tareas"));
}else{
    var tareas = [{time:25,text:""}]
}

setTimeBlocks()

timeBlocks.on("click",saveInfo)

currentday.text(moment().format("dddd, MMMM Do"))
