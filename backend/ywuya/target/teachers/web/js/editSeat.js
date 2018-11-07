window.onload = function () {
    curType=1;
    mapTop=0.5;
    mapLeft=0.5;
    let mapTopM=0.5;//for mouse click
    let mapLeftM=0.5;
    let gridLen=30;
    let gridLenM=30;
    let rowNum=25;
    let colNum=35;
    let canvas = document.getElementById('canvas');
    //check canvas
    if(!canvas||!canvas.getContext){
        showNotice("您的浏览器不支持canvas，请换一个浏览器试试");
        console.log("canvas fail");
        return;
    }
    console.log("canvas ok");
    let context = canvas.getContext('2d');
    canvas.width = 1600;//实际像素值
    canvas.height = 1600;
    scanBodyScale=Math.min(canvas.width/(gridLen*colNum),canvas.height/(gridLen*rowNum));
    canvasDomWid=Math.max(rowNum,colNum)*gridLen*scanBodyScale+mapLeft;//显示的大小,wid=hei
    canvasDomHei=canvasDomWid;
    canvas.style.width=canvasDomWid;
    canvas.style.height=canvasDomHei;
    $("#scan-cover").css({"left":-10,"top":-10});

    let seatMap=new SeatMap(rowNum,colNum,context,gridLen);
    seatMap.drawAllComps();
    freshScanner(canvas,rowNum,colNum,gridLen);
    moveCanvas(-10,-10);

    function setCurrentMap(newSeatMap) {
        seatMap=newSeatMap;
    }

    document.getElementById("canvas").addEventListener("mousedown", function (event) {
        let wrap = document.getElementById("canvas-wrap");
        let e = event || window.event;
        let sTop=document.body.scrollTop || document.documentElement.scrollTop;
        //x,y为canvas上的偏移
        let x = e.clientX - wrap.offsetLeft-canvas.offsetLeft,//不能有滚动条！！！
            y = e.clientY - wrap.offsetTop-canvas.offsetTop;
        // console.log("mousedown,x:" + x + " y:" + y);

        if(x>mapLeftM&&x<(mapLeftM+gridLenM*colNum)&&y>mapTopM&&y<(mapTopM+gridLenM*rowNum)){
            let r=Math.floor((y-mapLeftM)/gridLenM);
            let c=Math.floor((x-mapTopM)/gridLenM);
            if(curType===1){
                let chair=new Chair(r,c,1,gridLen);
                seatMap.addComp(chair);
            }else if(curType===2){
                let desk=new Desk(r,c,2,gridLen);
                seatMap.addComp(desk);
            }else if(curType===3){
                let door=new Door(r,c,3,gridLen);
                seatMap.addComp(door);
            }else if(curType===4){
                let selectComp=seatMap.getCompByGrid(r,c);
                if(selectComp!=null){
                    seatMap.deleteCompByGrid(r,c);
                }
            }
            freshScanner(canvas,rowNum,colNum,gridLen);
        }
    });

    // document.getElementById("canvas").addEventListener("mousemove", function (event){
    //     let wrap = document.getElementById("canvas-wrap");
    //     let e = event || window.event;
    //     let x = e.clientX - wrap.offsetLeft,//不能有滚动条！！！
    //         y = e.clientY - wrap.offsetTop;
    //     console.log("mousemove,x:" + x + " y:" + y);
    // });

    //click submit
    $("#submit-data").on("click",function () {
       submitData(seatMap);
       
    });

    //open map
    $("#select-map-bar li[data-value='0']").on("click",function () {
        loadUserMap(canvas,0);
    });
    $("#select-map-bar li[data-value='1']").on("click",function () {
        loadUserMap(canvas,1);
    });
    $("#select-map-bar li[data-value='2']").on("click",function () {
        loadUserMap(canvas,2);
    });

    //click tool bar
    $(".comp-list .chair").on("click",function () {
        // console.log("click chair");
        if(curType===1){
            curType=0;
            $(this).removeClass("active");
        }else{
            curType=1;
            $(this).addClass("active").siblings().removeClass("active");
        }

    });
    $(".comp-list .desk").on("click",function () {
        // console.log("click desk");
        if(curType===2){
            curType=0;
            $(this).removeClass("active");
        }else{
            curType=2;
            $(this).addClass("active").siblings().removeClass("active");
        }
    });
    $(".comp-list .door").on("click",function () {
        // console.log("click door");
        if(curType===3){
            curType=0;
            $(this).removeClass("active");
        }else{
            curType=3;
            $(this).addClass("active").siblings().removeClass("active");
        }

    });
    $(".comp-list .delete").on("click",function () {
        // console.log("click delete");
        if(curType===4){
            curType=0;
            $(this).removeClass("active");
        }else{
            curType=4;
            $(this).addClass("active").siblings().removeClass("active");
        }

    });

    $("#scale-larger").on("click",function () {
        // console.log("click larger");
        $scanCover=$("#scan-cover");
        if(Math.max($scanCover.width(),$scanCover.height())<70){
            showNotice("不能再放大了");
            return;
        }
        canvasDomWid=canvasDomWid*1.1;
        canvasDomHei=canvasDomHei*1.1;
        canvas.style.width=canvasDomWid+'px';
        canvas.style.height=canvasDomHei+'px';
        gridLenM=gridLenM*1.1;
        mapTopM=mapTopM*1.1
        mapLeftM=mapLeftM*1.1;
        freshScanner(canvas,rowNum,colNum,gridLen);
    });

    $("#scale-smaller").on("click",function () {
        // console.log("click smaller");
        $scanCover=$("#scan-cover");
        if(Math.max($scanCover.width(),$scanCover.height())>130){
            showNotice("不能再缩小了");
            return;
        }
        canvasDomWid=canvasDomWid*0.9;
        canvasDomHei=canvasDomHei*0.9;
        canvas.style.width=canvasDomWid+'px';
        canvas.style.height=canvasDomHei+'px';
        //注意：这里canvas的像素值没变（只是拉伸了），但是mouse click的像素值要更新
        gridLenM=gridLenM*0.9;
        mapTopM=mapTopM*0.9;
        mapLeftM=mapLeftM*0.9;
        freshScanner(canvas,rowNum,colNum,gridLen);
    });


    let scanDragging=false;
    let $scanCover=$("#scan-cover");
    let scanWrap=document.getElementById("scan-wrap");
    let scanMouseDownX,scanMouseDownY;//鼠标down位置对于cover左上角的偏移
    $scanCover.on("mousedown",function () {
        let e = event || window.event;
        let x = e.clientX - $(scanWrap).offset().left,//不能有滚动条！！！
            y = e.clientY - $(scanWrap).offset().top;
        scanMouseDownX=x-$scanCover.position().left;
        scanMouseDownY=y-$scanCover.position().top;
        scanDragging=true;
    });

    $scanCover.on("mousemove",function () {
        if(scanDragging){
            let e = event || window.event;
            let x = e.clientX - $(scanWrap).offset().left,//不能有滚动条！！！
                y = e.clientY - $(scanWrap).offset().top;
            $scanCover.css({"top":y-scanMouseDownY,"left":x-scanMouseDownX});
            moveCanvas(x-scanMouseDownX,y-scanMouseDownY);//cover左上角的坐标
        }
    });

    $scanCover.on("mouseup",function () {
        scanDragging=false;
    });

    $("#add-canvas-row").on("click",function () {
        if(rowNum>=50){
            showNotice("不能再增加了");
            return;
        }
        rowNum++;
        seatMap.addMapRow();
        clearCanvas(canvas);
        seatMap.drawAllComps();
        scanBodyScale=Math.min(canvas.width/(gridLen*colNum),canvas.height/(gridLen*rowNum));
        freshScanner(canvas,rowNum,colNum,gridLen);
        // console.log("add row to",rowNum);
    });

    $("#delete-canvas-row").on("click",function () {
        if(rowNum<=10){
            showNotice("不能再减少了");
            return;
        }
        rowNum--;
        seatMap.deleteMapRow();
        clearCanvas(canvas);
        seatMap.drawAllComps();
        scanBodyScale=Math.min(canvas.width/(gridLen*colNum),canvas.height/(gridLen*rowNum));
        freshScanner(canvas,rowNum,colNum,gridLen);
    });

    $("#add-canvas-col").on("click",function () {
        if(colNum>=50){
            showNotice("不能再增加了");
            return;
        }
        colNum++;
        seatMap.addMapCol();
        clearCanvas(canvas);
        seatMap.drawAllComps();
        scanBodyScale=Math.min(canvas.width/(gridLen*colNum),canvas.height/(gridLen*rowNum));
        freshScanner(canvas,rowNum,colNum,gridLen);
        // console.log("add col to",colNum);
    });

    $("#delete-canvas-col").on("click",function () {
        if(colNum<=10){
            showNotice("不能再减少了");
            return;
        }
        colNum--;
        seatMap.deleteMapCol();
        clearCanvas(canvas);
        seatMap.drawAllComps();
        scanBodyScale=Math.min(canvas.width/(gridLen*colNum),canvas.height/(gridLen*rowNum));
        freshScanner(canvas,rowNum,colNum,gridLen);
    });

    function loadUserMap(canvas,mapId) {
        let jsonString='';
        let rowNum=25;
        let colNum=35;
        let gridLen=30;
        let seatMap=new SeatMap(rowNum,colNum,canvas.getContext('2d'),gridLen);
        if(mapId===0){
            clearCanvas(canvas);
            seatMap.drawAllComps();
            freshScanner(canvas,rowNum,colNum,gridLen);
        }else if(mapId===1){
            jsonString='{"rowNum":28,"colNum":35,"seatData":[{"r":0,"c":1,"type":3},{"r":0,"c":2,"type":3},{"r":0,"c":3,"type":3},{"r":2,"c":3,"type":2},{"r":2,"c":4,"type":2},{"r":3,"c":3,"type":2},{"r":3,"c":4,"type":2},{"r":4,"c":3,"type":2},{"r":4,"c":4,"type":2},{"r":2,"c":2,"type":1},{"r":3,"c":2,"type":1},{"r":4,"c":2,"type":1},{"r":2,"c":5,"type":1},{"r":3,"c":5,"type":1},{"r":4,"c":5,"type":1},{"r":6,"c":3,"type":2},{"r":6,"c":4,"type":2},{"r":7,"c":3,"type":2},{"r":7,"c":4,"type":2},{"r":8,"c":3,"type":2},{"r":8,"c":4,"type":2},{"r":6,"c":2,"type":1},{"r":7,"c":2,"type":1},{"r":8,"c":2,"type":1},{"r":6,"c":5,"type":1},{"r":7,"c":5,"type":1},{"r":8,"c":5,"type":1},{"r":10,"c":2,"type":1},{"r":11,"c":2,"type":1},{"r":12,"c":2,"type":1},{"r":10,"c":5,"type":1},{"r":11,"c":5,"type":1},{"r":12,"c":5,"type":1},{"r":10,"c":3,"type":2},{"r":10,"c":4,"type":2},{"r":11,"c":3,"type":2},{"r":11,"c":4,"type":2},{"r":12,"c":3,"type":2},{"r":12,"c":4,"type":2},{"r":14,"c":3,"type":2},{"r":14,"c":4,"type":2},{"r":15,"c":3,"type":2},{"r":15,"c":4,"type":2},{"r":16,"c":3,"type":2},{"r":16,"c":4,"type":2},{"r":14,"c":2,"type":1},{"r":15,"c":2,"type":1},{"r":16,"c":2,"type":1},{"r":16,"c":5,"type":1},{"r":15,"c":5,"type":1},{"r":14,"c":5,"type":1},{"r":18,"c":2,"type":1},{"r":19,"c":2,"type":1},{"r":20,"c":2,"type":1},{"r":18,"c":5,"type":1},{"r":19,"c":5,"type":1},{"r":20,"c":5,"type":1},{"r":18,"c":4,"type":2},{"r":18,"c":3,"type":2},{"r":19,"c":3,"type":2},{"r":19,"c":4,"type":2},{"r":20,"c":3,"type":2},{"r":20,"c":4,"type":2},{"r":2,"c":8,"type":1},{"r":3,"c":8,"type":1},{"r":4,"c":8,"type":1},{"r":2,"c":11,"type":1},{"r":3,"c":11,"type":1},{"r":4,"c":11,"type":1},{"r":6,"c":8,"type":1},{"r":7,"c":8,"type":1},{"r":8,"c":8,"type":1},{"r":6,"c":11,"type":1},{"r":7,"c":11,"type":1},{"r":8,"c":11,"type":1},{"r":10,"c":8,"type":1},{"r":11,"c":8,"type":1},{"r":12,"c":8,"type":1},{"r":10,"c":11,"type":1},{"r":11,"c":11,"type":1},{"r":12,"c":11,"type":1},{"r":14,"c":8,"type":1},{"r":15,"c":8,"type":1},{"r":16,"c":8,"type":1},{"r":14,"c":11,"type":1},{"r":15,"c":11,"type":1},{"r":16,"c":11,"type":1},{"r":18,"c":8,"type":1},{"r":19,"c":8,"type":1},{"r":20,"c":8,"type":1},{"r":18,"c":11,"type":1},{"r":19,"c":11,"type":1},{"r":20,"c":11,"type":1},{"r":18,"c":9,"type":2},{"r":18,"c":10,"type":2},{"r":19,"c":9,"type":2},{"r":19,"c":10,"type":2},{"r":20,"c":9,"type":2},{"r":20,"c":10,"type":2},{"r":14,"c":9,"type":2},{"r":14,"c":10,"type":2},{"r":15,"c":9,"type":2},{"r":15,"c":10,"type":2},{"r":16,"c":9,"type":2},{"r":16,"c":10,"type":2},{"r":2,"c":9,"type":2},{"r":2,"c":10,"type":2},{"r":3,"c":9,"type":2},{"r":3,"c":10,"type":2},{"r":4,"c":9,"type":2},{"r":4,"c":10,"type":2},{"r":6,"c":9,"type":2},{"r":6,"c":10,"type":2},{"r":7,"c":9,"type":2},{"r":7,"c":10,"type":2},{"r":8,"c":9,"type":2},{"r":8,"c":10,"type":2},{"r":10,"c":9,"type":2},{"r":10,"c":10,"type":2},{"r":11,"c":9,"type":2},{"r":11,"c":10,"type":2},{"r":12,"c":9,"type":2},{"r":12,"c":10,"type":2},{"r":2,"c":14,"type":1},{"r":3,"c":14,"type":1},{"r":4,"c":14,"type":1},{"r":2,"c":17,"type":1},{"r":3,"c":17,"type":1},{"r":4,"c":17,"type":1},{"r":6,"c":14,"type":1},{"r":7,"c":14,"type":1},{"r":8,"c":14,"type":1},{"r":6,"c":17,"type":1},{"r":7,"c":17,"type":1},{"r":8,"c":17,"type":1},{"r":10,"c":14,"type":1},{"r":11,"c":14,"type":1},{"r":12,"c":14,"type":1},{"r":10,"c":17,"type":1},{"r":11,"c":17,"type":1},{"r":12,"c":17,"type":1},{"r":2,"c":15,"type":2},{"r":2,"c":16,"type":2},{"r":3,"c":15,"type":2},{"r":3,"c":16,"type":2},{"r":4,"c":15,"type":2},{"r":4,"c":16,"type":2},{"r":6,"c":15,"type":2},{"r":6,"c":16,"type":2},{"r":7,"c":15,"type":2},{"r":7,"c":16,"type":2},{"r":8,"c":15,"type":2},{"r":8,"c":16,"type":2},{"r":10,"c":15,"type":2},{"r":10,"c":16,"type":2},{"r":11,"c":15,"type":2},{"r":11,"c":16,"type":2},{"r":12,"c":15,"type":2},{"r":12,"c":16,"type":2},{"r":14,"c":14,"type":1},{"r":15,"c":14,"type":1},{"r":16,"c":14,"type":1},{"r":14,"c":17,"type":1},{"r":15,"c":17,"type":1},{"r":16,"c":17,"type":1},{"r":14,"c":15,"type":2},{"r":14,"c":16,"type":2},{"r":15,"c":15,"type":2},{"r":15,"c":16,"type":2},{"r":16,"c":15,"type":2},{"r":16,"c":16,"type":2},{"r":18,"c":15,"type":2},{"r":18,"c":16,"type":2},{"r":19,"c":15,"type":2},{"r":19,"c":16,"type":2},{"r":20,"c":15,"type":2},{"r":20,"c":16,"type":2},{"r":18,"c":14,"type":1},{"r":19,"c":14,"type":1},{"r":20,"c":14,"type":1},{"r":18,"c":17,"type":1},{"r":19,"c":17,"type":1},{"r":20,"c":17,"type":1}]}';
        }else if(mapId===2){
            jsonString='{"rowNum":25,"colNum":35,"seatData":[{"r":4,"c":0,"type":3},{"r":5,"c":0,"type":3},{"r":6,"c":0,"type":3},{"r":2,"c":3,"type":2},{"r":2,"c":4,"type":2},{"r":2,"c":5,"type":2},{"r":2,"c":6,"type":2},{"r":2,"c":7,"type":2},{"r":3,"c":4,"type":2},{"r":3,"c":3,"type":2},{"r":3,"c":5,"type":2},{"r":3,"c":6,"type":2},{"r":3,"c":7,"type":2},{"r":1,"c":3,"type":1},{"r":1,"c":5,"type":1},{"r":1,"c":7,"type":1},{"r":4,"c":3,"type":1},{"r":4,"c":5,"type":1},{"r":4,"c":7,"type":1},{"r":8,"c":3,"type":2},{"r":8,"c":4,"type":2},{"r":8,"c":5,"type":2},{"r":8,"c":6,"type":2},{"r":8,"c":7,"type":2},{"r":9,"c":3,"type":2},{"r":9,"c":4,"type":2},{"r":9,"c":5,"type":2},{"r":9,"c":6,"type":2},{"r":9,"c":7,"type":2},{"r":7,"c":3,"type":1},{"r":7,"c":5,"type":1},{"r":7,"c":7,"type":1},{"r":10,"c":3,"type":1},{"r":10,"c":5,"type":1},{"r":10,"c":7,"type":1},{"r":14,"c":3,"type":2},{"r":14,"c":4,"type":2},{"r":14,"c":5,"type":2},{"r":14,"c":6,"type":2},{"r":14,"c":7,"type":2},{"r":15,"c":3,"type":2},{"r":15,"c":4,"type":2},{"r":15,"c":5,"type":2},{"r":15,"c":6,"type":2},{"r":15,"c":7,"type":2},{"r":13,"c":3,"type":1},{"r":13,"c":5,"type":1},{"r":13,"c":7,"type":1},{"r":16,"c":3,"type":1},{"r":16,"c":5,"type":1},{"r":16,"c":7,"type":1},{"r":20,"c":3,"type":2},{"r":20,"c":4,"type":2},{"r":20,"c":5,"type":2},{"r":20,"c":6,"type":2},{"r":20,"c":7,"type":2},{"r":21,"c":3,"type":2},{"r":21,"c":4,"type":2},{"r":21,"c":5,"type":2},{"r":21,"c":6,"type":2},{"r":21,"c":7,"type":2},{"r":19,"c":3,"type":1},{"r":19,"c":5,"type":1},{"r":19,"c":7,"type":1},{"r":22,"c":3,"type":1},{"r":22,"c":5,"type":1},{"r":22,"c":7,"type":1},{"r":2,"c":11,"type":2},{"r":2,"c":12,"type":2},{"r":2,"c":13,"type":2},{"r":2,"c":14,"type":2},{"r":2,"c":15,"type":2},{"r":3,"c":11,"type":2},{"r":3,"c":12,"type":2},{"r":3,"c":13,"type":2},{"r":3,"c":14,"type":2},{"r":3,"c":15,"type":2},{"r":1,"c":11,"type":1},{"r":1,"c":13,"type":1},{"r":1,"c":15,"type":1},{"r":4,"c":11,"type":1},{"r":4,"c":13,"type":1},{"r":4,"c":15,"type":1},{"r":7,"c":11,"type":1},{"r":7,"c":13,"type":1},{"r":7,"c":15,"type":1},{"r":10,"c":11,"type":1},{"r":10,"c":13,"type":1},{"r":10,"c":15,"type":1},{"r":8,"c":11,"type":2},{"r":8,"c":12,"type":2},{"r":8,"c":13,"type":2},{"r":8,"c":14,"type":2},{"r":8,"c":15,"type":2},{"r":9,"c":11,"type":2},{"r":9,"c":12,"type":2},{"r":9,"c":13,"type":2},{"r":9,"c":14,"type":2},{"r":9,"c":15,"type":2},{"r":14,"c":11,"type":2},{"r":14,"c":12,"type":2},{"r":14,"c":13,"type":2},{"r":14,"c":14,"type":2},{"r":14,"c":15,"type":2},{"r":15,"c":15,"type":2},{"r":15,"c":14,"type":2},{"r":15,"c":13,"type":2},{"r":15,"c":12,"type":2},{"r":15,"c":11,"type":2},{"r":13,"c":11,"type":1},{"r":13,"c":13,"type":1},{"r":13,"c":15,"type":1},{"r":16,"c":11,"type":1},{"r":16,"c":13,"type":1},{"r":16,"c":15,"type":1},{"r":20,"c":11,"type":2},{"r":20,"c":12,"type":2},{"r":20,"c":13,"type":2},{"r":20,"c":14,"type":2},{"r":20,"c":15,"type":2},{"r":21,"c":11,"type":2},{"r":21,"c":12,"type":2},{"r":21,"c":14,"type":2},{"r":21,"c":13,"type":2},{"r":21,"c":15,"type":2},{"r":19,"c":11,"type":1},{"r":19,"c":13,"type":1},{"r":19,"c":15,"type":1},{"r":22,"c":11,"type":1},{"r":22,"c":13,"type":1},{"r":22,"c":15,"type":1},{"r":2,"c":19,"type":2},{"r":2,"c":20,"type":2},{"r":2,"c":21,"type":2},{"r":2,"c":22,"type":2},{"r":2,"c":23,"type":2},{"r":3,"c":19,"type":2},{"r":3,"c":20,"type":2},{"r":3,"c":21,"type":2},{"r":3,"c":22,"type":2},{"r":3,"c":23,"type":2},{"r":8,"c":19,"type":2},{"r":8,"c":20,"type":2},{"r":8,"c":21,"type":2},{"r":8,"c":22,"type":2},{"r":8,"c":23,"type":2},{"r":9,"c":20,"type":2},{"r":9,"c":19,"type":2},{"r":9,"c":21,"type":2},{"r":9,"c":22,"type":2},{"r":9,"c":23,"type":2},{"r":14,"c":19,"type":2},{"r":14,"c":20,"type":2},{"r":14,"c":21,"type":2},{"r":14,"c":22,"type":2},{"r":14,"c":23,"type":2},{"r":15,"c":19,"type":2},{"r":15,"c":20,"type":2},{"r":15,"c":21,"type":2},{"r":15,"c":22,"type":2},{"r":15,"c":23,"type":2},{"r":20,"c":19,"type":2},{"r":20,"c":20,"type":2},{"r":20,"c":21,"type":2},{"r":20,"c":22,"type":2},{"r":20,"c":23,"type":2},{"r":21,"c":19,"type":2},{"r":21,"c":20,"type":2},{"r":21,"c":21,"type":2},{"r":21,"c":22,"type":2},{"r":21,"c":23,"type":2},{"r":13,"c":19,"type":1},{"r":13,"c":21,"type":1},{"r":13,"c":23,"type":1},{"r":16,"c":19,"type":1},{"r":16,"c":21,"type":1},{"r":16,"c":23,"type":1},{"r":19,"c":19,"type":1},{"r":19,"c":21,"type":1},{"r":19,"c":23,"type":1},{"r":22,"c":19,"type":1},{"r":22,"c":21,"type":1},{"r":22,"c":23,"type":1},{"r":1,"c":19,"type":1},{"r":1,"c":21,"type":1},{"r":1,"c":23,"type":1},{"r":4,"c":19,"type":1},{"r":4,"c":21,"type":1},{"r":4,"c":23,"type":1},{"r":7,"c":19,"type":1},{"r":7,"c":21,"type":1},{"r":7,"c":23,"type":1},{"r":10,"c":19,"type":1},{"r":10,"c":21,"type":1},{"r":10,"c":23,"type":1}]}';
        }
        if(mapId>0){
            let jsonData=JSON.parse(jsonString);
            // console.log(jsonData);
            let seatData=jsonData.seatData;
            for(let i=0;i<seatData.length;i++){
                let comp;
                if(seatData[i].type===1){
                    comp=new Chair(seatData[i].r,seatData[i].c,1,gridLen);
                }else if(seatData[i].type===2){
                    comp=new Desk(seatData[i].r,seatData[i].c,2,gridLen);
                }else if(seatData[i].type===3){
                    comp=new Door(seatData[i].r,seatData[i].c,3,gridLen);
                }
                seatMap.addComp(comp);
            }
            clearCanvas(canvas);
            seatMap.drawAllComps();
            freshScanner(canvas,rowNum,colNum,gridLen);
        }
        setCurrentMap(seatMap);
    }
    
};

function clearCanvas(canvas) {
    let context=canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
}

function freshScanner(canvas,rows,cols,gridLen) {
    // console.log("fresh scanner");
    let scanWindowW=165;//scan-body显示的部分
    let scanBodyW=scanBodyScale*scanWindowW;//图片宽度
    //更新scan-cover大小
    let scanDeg=canvasDomWid/scanBodyW;
    let $scanCover=$("#scan-cover");
    let $canvasWrap=$("#canvas-wrap");
    let newW=$canvasWrap.width()/scanDeg;
    let newH=$canvasWrap.height()/scanDeg;
    $scanCover.css({"width":newW,"height":newH});
    //更新scan-body图片
    setTimeout(function () {
        let img=document.getElementById("scan-body");
        img.crossOrigin = "anonymous";
        let imgUrl=canvas.toDataURL("image/png");
        img.src = imgUrl;
        img.style.width=scanBodyW+'px';
    },300);
}

//根据scan-cover的(x,y)坐标来调整canvas的位置
function moveCanvas(x,y) {
    let $canvasWrap=$("#canvas-wrap");
    let $canvas=$("#canvas");
    let $scanCover=$("#scan-cover");
    let scanDeg=$canvasWrap.width()/$scanCover.width();//scan-cover大小已经更新
    let _x=x*scanDeg;
    let _y=y*scanDeg;
    $canvas.css({"left":-_x,"top":-_y});
}

function showNotice(message) {
    let $notice=$("#global-notice");
    $notice.find("p").html(message);
    $notice.fadeIn();
    setTimeout(function () {
        $notice.fadeOut();
    },1000);
}

$("#scanner .pull-up").on("click",function () {
    $("#scan-wrap").slideToggle();
    $(this).find("span").toggleClass("glyphicon-chevron-up").toggleClass("glyphicon-chevron-down");
});

function submitData(seatMap) {
    let jsonData={};
    let seatData=[];
    for(let i=0;i<seatMap.compList.length;i++){
        let comp=seatMap.compList[i];
        let compData={};
        compData.r=comp.getRow();
        compData.c=comp.getCol();
        compData.type=comp.getCompType();
        seatData.push(JSON.stringify(compData));
    }
    jsonData.rowNum=seatMap.getRowNum();
    jsonData.colNum=seatMap.getColNum();
    jsonData.seatData=seatData;
    let jsonString=JSON.stringify(jsonData);

    console.log(jsonString);
    $.ajax({
        type: "post",
        async: true,
        dataType: "json", //收受数据格式
        traditional: true,
        url : "/seat/import",
        cache: false,
        data: jsonData,
        success:function(data){
            console.log(data)
       }
     });
}

