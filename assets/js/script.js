var timeBlocks = $(".timeblocks");


//Will create and append a new time block, it requires and hour in 24 hours format and a text if locally storaged
function createNewTimeBlock(hour24,text) {
    var newHourBlock = $("<div>");
    newHourBlock.addClass("row hour-block");

    var newHour = $("<div>");
    newHour.addClass("hour col-1");

    var hourNumber = $("<p>");

    if (hour24>12) {
        hourNumber.text((hour24-12)+"PM");      
    }else{
        hourNumber.text(hour24+"AM");      
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


for (i = Number(moment().format("k"))-3; i < Number(moment().format("k"))+6; i++) {
    createNewTimeBlock(i,"")
}
