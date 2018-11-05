
// function loadUserMap(canvas,mapId) {
//     let jsonString='';
//     let rowNum=25;
//     let colNum=35;
//     let gridLen=30;
//     if(mapId===0){
//         let seatMap=new SeatMap(rowNum,colNum,canvas.getContext('2d'),gridLen);
//         clearCanvas(canvas);
//         seatMap.drawAllComps();
//         freshScanner(canvas,rowNum,colNum,gridLen);
//     }else if(mapId===1){
//         jsonString='{"rowNum":28,"colNum":35,"seatData":[{"r":0,"c":1,"type":3},{"r":0,"c":2,"type":3},{"r":0,"c":3,"type":3},{"r":2,"c":3,"type":2},{"r":2,"c":4,"type":2},{"r":3,"c":3,"type":2},{"r":3,"c":4,"type":2},{"r":4,"c":3,"type":2},{"r":4,"c":4,"type":2},{"r":2,"c":2,"type":1},{"r":3,"c":2,"type":1},{"r":4,"c":2,"type":1},{"r":2,"c":5,"type":1},{"r":3,"c":5,"type":1},{"r":4,"c":5,"type":1},{"r":6,"c":3,"type":2},{"r":6,"c":4,"type":2},{"r":7,"c":3,"type":2},{"r":7,"c":4,"type":2},{"r":8,"c":3,"type":2},{"r":8,"c":4,"type":2},{"r":6,"c":2,"type":1},{"r":7,"c":2,"type":1},{"r":8,"c":2,"type":1},{"r":6,"c":5,"type":1},{"r":7,"c":5,"type":1},{"r":8,"c":5,"type":1},{"r":10,"c":2,"type":1},{"r":11,"c":2,"type":1},{"r":12,"c":2,"type":1},{"r":10,"c":5,"type":1},{"r":11,"c":5,"type":1},{"r":12,"c":5,"type":1},{"r":10,"c":3,"type":2},{"r":10,"c":4,"type":2},{"r":11,"c":3,"type":2},{"r":11,"c":4,"type":2},{"r":12,"c":3,"type":2},{"r":12,"c":4,"type":2},{"r":14,"c":3,"type":2},{"r":14,"c":4,"type":2},{"r":15,"c":3,"type":2},{"r":15,"c":4,"type":2},{"r":16,"c":3,"type":2},{"r":16,"c":4,"type":2},{"r":14,"c":2,"type":1},{"r":15,"c":2,"type":1},{"r":16,"c":2,"type":1},{"r":16,"c":5,"type":1},{"r":15,"c":5,"type":1},{"r":14,"c":5,"type":1},{"r":18,"c":2,"type":1},{"r":19,"c":2,"type":1},{"r":20,"c":2,"type":1},{"r":18,"c":5,"type":1},{"r":19,"c":5,"type":1},{"r":20,"c":5,"type":1},{"r":18,"c":4,"type":2},{"r":18,"c":3,"type":2},{"r":19,"c":3,"type":2},{"r":19,"c":4,"type":2},{"r":20,"c":3,"type":2},{"r":20,"c":4,"type":2},{"r":2,"c":8,"type":1},{"r":3,"c":8,"type":1},{"r":4,"c":8,"type":1},{"r":2,"c":11,"type":1},{"r":3,"c":11,"type":1},{"r":4,"c":11,"type":1},{"r":6,"c":8,"type":1},{"r":7,"c":8,"type":1},{"r":8,"c":8,"type":1},{"r":6,"c":11,"type":1},{"r":7,"c":11,"type":1},{"r":8,"c":11,"type":1},{"r":10,"c":8,"type":1},{"r":11,"c":8,"type":1},{"r":12,"c":8,"type":1},{"r":10,"c":11,"type":1},{"r":11,"c":11,"type":1},{"r":12,"c":11,"type":1},{"r":14,"c":8,"type":1},{"r":15,"c":8,"type":1},{"r":16,"c":8,"type":1},{"r":14,"c":11,"type":1},{"r":15,"c":11,"type":1},{"r":16,"c":11,"type":1},{"r":18,"c":8,"type":1},{"r":19,"c":8,"type":1},{"r":20,"c":8,"type":1},{"r":18,"c":11,"type":1},{"r":19,"c":11,"type":1},{"r":20,"c":11,"type":1},{"r":18,"c":9,"type":2},{"r":18,"c":10,"type":2},{"r":19,"c":9,"type":2},{"r":19,"c":10,"type":2},{"r":20,"c":9,"type":2},{"r":20,"c":10,"type":2},{"r":14,"c":9,"type":2},{"r":14,"c":10,"type":2},{"r":15,"c":9,"type":2},{"r":15,"c":10,"type":2},{"r":16,"c":9,"type":2},{"r":16,"c":10,"type":2},{"r":2,"c":9,"type":2},{"r":2,"c":10,"type":2},{"r":3,"c":9,"type":2},{"r":3,"c":10,"type":2},{"r":4,"c":9,"type":2},{"r":4,"c":10,"type":2},{"r":6,"c":9,"type":2},{"r":6,"c":10,"type":2},{"r":7,"c":9,"type":2},{"r":7,"c":10,"type":2},{"r":8,"c":9,"type":2},{"r":8,"c":10,"type":2},{"r":10,"c":9,"type":2},{"r":10,"c":10,"type":2},{"r":11,"c":9,"type":2},{"r":11,"c":10,"type":2},{"r":12,"c":9,"type":2},{"r":12,"c":10,"type":2},{"r":2,"c":14,"type":1},{"r":3,"c":14,"type":1},{"r":4,"c":14,"type":1},{"r":2,"c":17,"type":1},{"r":3,"c":17,"type":1},{"r":4,"c":17,"type":1},{"r":6,"c":14,"type":1},{"r":7,"c":14,"type":1},{"r":8,"c":14,"type":1},{"r":6,"c":17,"type":1},{"r":7,"c":17,"type":1},{"r":8,"c":17,"type":1},{"r":10,"c":14,"type":1},{"r":11,"c":14,"type":1},{"r":12,"c":14,"type":1},{"r":10,"c":17,"type":1},{"r":11,"c":17,"type":1},{"r":12,"c":17,"type":1},{"r":2,"c":15,"type":2},{"r":2,"c":16,"type":2},{"r":3,"c":15,"type":2},{"r":3,"c":16,"type":2},{"r":4,"c":15,"type":2},{"r":4,"c":16,"type":2},{"r":6,"c":15,"type":2},{"r":6,"c":16,"type":2},{"r":7,"c":15,"type":2},{"r":7,"c":16,"type":2},{"r":8,"c":15,"type":2},{"r":8,"c":16,"type":2},{"r":10,"c":15,"type":2},{"r":10,"c":16,"type":2},{"r":11,"c":15,"type":2},{"r":11,"c":16,"type":2},{"r":12,"c":15,"type":2},{"r":12,"c":16,"type":2},{"r":14,"c":14,"type":1},{"r":15,"c":14,"type":1},{"r":16,"c":14,"type":1},{"r":14,"c":17,"type":1},{"r":15,"c":17,"type":1},{"r":16,"c":17,"type":1},{"r":14,"c":15,"type":2},{"r":14,"c":16,"type":2},{"r":15,"c":15,"type":2},{"r":15,"c":16,"type":2},{"r":16,"c":15,"type":2},{"r":16,"c":16,"type":2},{"r":18,"c":15,"type":2},{"r":18,"c":16,"type":2},{"r":19,"c":15,"type":2},{"r":19,"c":16,"type":2},{"r":20,"c":15,"type":2},{"r":20,"c":16,"type":2},{"r":18,"c":14,"type":1},{"r":19,"c":14,"type":1},{"r":20,"c":14,"type":1},{"r":18,"c":17,"type":1},{"r":19,"c":17,"type":1},{"r":20,"c":17,"type":1}]}';
//     }else if(mapId===2){
//         jsonString='{"rowNum":25,"colNum":35,"seatData":[{"r":4,"c":0,"type":3},{"r":5,"c":0,"type":3},{"r":6,"c":0,"type":3},{"r":2,"c":3,"type":2},{"r":2,"c":4,"type":2},{"r":2,"c":5,"type":2},{"r":2,"c":6,"type":2},{"r":2,"c":7,"type":2},{"r":3,"c":4,"type":2},{"r":3,"c":3,"type":2},{"r":3,"c":5,"type":2},{"r":3,"c":6,"type":2},{"r":3,"c":7,"type":2},{"r":1,"c":3,"type":1},{"r":1,"c":5,"type":1},{"r":1,"c":7,"type":1},{"r":4,"c":3,"type":1},{"r":4,"c":5,"type":1},{"r":4,"c":7,"type":1},{"r":8,"c":3,"type":2},{"r":8,"c":4,"type":2},{"r":8,"c":5,"type":2},{"r":8,"c":6,"type":2},{"r":8,"c":7,"type":2},{"r":9,"c":3,"type":2},{"r":9,"c":4,"type":2},{"r":9,"c":5,"type":2},{"r":9,"c":6,"type":2},{"r":9,"c":7,"type":2},{"r":7,"c":3,"type":1},{"r":7,"c":5,"type":1},{"r":7,"c":7,"type":1},{"r":10,"c":3,"type":1},{"r":10,"c":5,"type":1},{"r":10,"c":7,"type":1},{"r":14,"c":3,"type":2},{"r":14,"c":4,"type":2},{"r":14,"c":5,"type":2},{"r":14,"c":6,"type":2},{"r":14,"c":7,"type":2},{"r":15,"c":3,"type":2},{"r":15,"c":4,"type":2},{"r":15,"c":5,"type":2},{"r":15,"c":6,"type":2},{"r":15,"c":7,"type":2},{"r":13,"c":3,"type":1},{"r":13,"c":5,"type":1},{"r":13,"c":7,"type":1},{"r":16,"c":3,"type":1},{"r":16,"c":5,"type":1},{"r":16,"c":7,"type":1},{"r":20,"c":3,"type":2},{"r":20,"c":4,"type":2},{"r":20,"c":5,"type":2},{"r":20,"c":6,"type":2},{"r":20,"c":7,"type":2},{"r":21,"c":3,"type":2},{"r":21,"c":4,"type":2},{"r":21,"c":5,"type":2},{"r":21,"c":6,"type":2},{"r":21,"c":7,"type":2},{"r":19,"c":3,"type":1},{"r":19,"c":5,"type":1},{"r":19,"c":7,"type":1},{"r":22,"c":3,"type":1},{"r":22,"c":5,"type":1},{"r":22,"c":7,"type":1},{"r":2,"c":11,"type":2},{"r":2,"c":12,"type":2},{"r":2,"c":13,"type":2},{"r":2,"c":14,"type":2},{"r":2,"c":15,"type":2},{"r":3,"c":11,"type":2},{"r":3,"c":12,"type":2},{"r":3,"c":13,"type":2},{"r":3,"c":14,"type":2},{"r":3,"c":15,"type":2},{"r":1,"c":11,"type":1},{"r":1,"c":13,"type":1},{"r":1,"c":15,"type":1},{"r":4,"c":11,"type":1},{"r":4,"c":13,"type":1},{"r":4,"c":15,"type":1},{"r":7,"c":11,"type":1},{"r":7,"c":13,"type":1},{"r":7,"c":15,"type":1},{"r":10,"c":11,"type":1},{"r":10,"c":13,"type":1},{"r":10,"c":15,"type":1},{"r":8,"c":11,"type":2},{"r":8,"c":12,"type":2},{"r":8,"c":13,"type":2},{"r":8,"c":14,"type":2},{"r":8,"c":15,"type":2},{"r":9,"c":11,"type":2},{"r":9,"c":12,"type":2},{"r":9,"c":13,"type":2},{"r":9,"c":14,"type":2},{"r":9,"c":15,"type":2},{"r":14,"c":11,"type":2},{"r":14,"c":12,"type":2},{"r":14,"c":13,"type":2},{"r":14,"c":14,"type":2},{"r":14,"c":15,"type":2},{"r":15,"c":15,"type":2},{"r":15,"c":14,"type":2},{"r":15,"c":13,"type":2},{"r":15,"c":12,"type":2},{"r":15,"c":11,"type":2},{"r":13,"c":11,"type":1},{"r":13,"c":13,"type":1},{"r":13,"c":15,"type":1},{"r":16,"c":11,"type":1},{"r":16,"c":13,"type":1},{"r":16,"c":15,"type":1},{"r":20,"c":11,"type":2},{"r":20,"c":12,"type":2},{"r":20,"c":13,"type":2},{"r":20,"c":14,"type":2},{"r":20,"c":15,"type":2},{"r":21,"c":11,"type":2},{"r":21,"c":12,"type":2},{"r":21,"c":14,"type":2},{"r":21,"c":13,"type":2},{"r":21,"c":15,"type":2},{"r":19,"c":11,"type":1},{"r":19,"c":13,"type":1},{"r":19,"c":15,"type":1},{"r":22,"c":11,"type":1},{"r":22,"c":13,"type":1},{"r":22,"c":15,"type":1},{"r":2,"c":19,"type":2},{"r":2,"c":20,"type":2},{"r":2,"c":21,"type":2},{"r":2,"c":22,"type":2},{"r":2,"c":23,"type":2},{"r":3,"c":19,"type":2},{"r":3,"c":20,"type":2},{"r":3,"c":21,"type":2},{"r":3,"c":22,"type":2},{"r":3,"c":23,"type":2},{"r":8,"c":19,"type":2},{"r":8,"c":20,"type":2},{"r":8,"c":21,"type":2},{"r":8,"c":22,"type":2},{"r":8,"c":23,"type":2},{"r":9,"c":20,"type":2},{"r":9,"c":19,"type":2},{"r":9,"c":21,"type":2},{"r":9,"c":22,"type":2},{"r":9,"c":23,"type":2},{"r":14,"c":19,"type":2},{"r":14,"c":20,"type":2},{"r":14,"c":21,"type":2},{"r":14,"c":22,"type":2},{"r":14,"c":23,"type":2},{"r":15,"c":19,"type":2},{"r":15,"c":20,"type":2},{"r":15,"c":21,"type":2},{"r":15,"c":22,"type":2},{"r":15,"c":23,"type":2},{"r":20,"c":19,"type":2},{"r":20,"c":20,"type":2},{"r":20,"c":21,"type":2},{"r":20,"c":22,"type":2},{"r":20,"c":23,"type":2},{"r":21,"c":19,"type":2},{"r":21,"c":20,"type":2},{"r":21,"c":21,"type":2},{"r":21,"c":22,"type":2},{"r":21,"c":23,"type":2},{"r":13,"c":19,"type":1},{"r":13,"c":21,"type":1},{"r":13,"c":23,"type":1},{"r":16,"c":19,"type":1},{"r":16,"c":21,"type":1},{"r":16,"c":23,"type":1},{"r":19,"c":19,"type":1},{"r":19,"c":21,"type":1},{"r":19,"c":23,"type":1},{"r":22,"c":19,"type":1},{"r":22,"c":21,"type":1},{"r":22,"c":23,"type":1},{"r":1,"c":19,"type":1},{"r":1,"c":21,"type":1},{"r":1,"c":23,"type":1},{"r":4,"c":19,"type":1},{"r":4,"c":21,"type":1},{"r":4,"c":23,"type":1},{"r":7,"c":19,"type":1},{"r":7,"c":21,"type":1},{"r":7,"c":23,"type":1},{"r":10,"c":19,"type":1},{"r":10,"c":21,"type":1},{"r":10,"c":23,"type":1}]}';
//     }
//     if(mapId>0){
//         let jsonData=JSON.parse(jsonString);
//         // console.log(jsonData);
//         let seatMap=new SeatMap(rowNum,colNum,canvas.getContext('2d'),gridLen);
//         let seatData=jsonData.seatData;
//         for(let i=0;i<seatData.length;i++){
//             let comp;
//             if(seatData[i].type===1){
//                 comp=new Chair(seatData[i].r,seatData[i].c,1,gridLen);
//             }else if(seatData[i].type===2){
//                 comp=new Desk(seatData[i].r,seatData[i].c,2,gridLen);
//             }else if(seatData[i].type===3){
//                 comp=new Door(seatData[i].r,seatData[i].c,3,gridLen);
//             }
//             seatMap.addComp(comp);
//         }
//         clearCanvas(canvas);
//         seatMap.drawAllComps();
//         freshScanner(canvas,rowNum,colNum,gridLen);
//     }
//
//
// }


//nice-select
$('[name="nice-select"]').click(function(e) {
    $('[name="nice-select"]').find('ul').hide();
    $(this).find('ul').fadeIn();
    e.stopPropagation();
});
$('[name="nice-select"] li').hover(function(e) {
    $(this).toggleClass('on');
    e.stopPropagation();
});
$('[name="nice-select"] li').click(function(e) {
    var val = $(this).text();
    $(this).parents('[name="nice-select"]').find('input').val(val);
    $('[name="nice-select"] ul').fadeOut();
    e.stopPropagation();
});
$(document).click(function() {
    $('[name="nice-select"] ul').fadeOut();
});