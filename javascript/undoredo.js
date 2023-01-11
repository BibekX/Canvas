$("#undo").click(() => {
    var ctx = contextReal;
    
    if (step > -1) {
        step--;
        rstep++;
        ctx.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        loadCard.src = saveCard[step];
        redolist.push(saveCard.pop());
        console.log(`removed from Savedcard and saved to the redolist`);
        loadCard.onload = function () {
            ctx.drawImage(loadCard, 0, 0);
        }
        console.log(`this is loading from saveCard[${step}]`);
    }
});

$("#redo").click(() => {
    var ctx = contextReal;
    // ctx.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    rstep++
    if (step <= saveCard.length) {
        console.log(`redo fired`)
        step++;
        // if (rstep == -1){rstep = 0}
        loadCard.src = redolist.pop();  //pop off redolist
        saveCard.push(loadCard.src);   // save to saveCard
        console.log(`this is poped from redolist
        and push to saveCard`);
        loadCard.onload = function () {
            ctx.drawImage(loadCard, 0, 0);
        }
    }

});

// it save and add step and save to saveCard
function savetosaveCard () {
    step++
    if (step < saveCard.length) { 
        saveCard.length = step;
        console.log(`reset Savecard ${step} < ${saveCard.length}`)
     }
    saveCard.push(canvasReal.toDataURL());
    console.log(`this saved to saveCard`);
}