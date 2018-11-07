class SeatMap{
    constructor(rows,cols,context,gridLen){
        this.rows=rows;
        this.cols=cols;
        this.compList=[];
        // this.fakeList=[];
        this.context=context;
        this.gridLen=gridLen;
        //初始化二维数组
        this.gridRecord=new Array();
        for(let i=0;i<rows;i++){
            this.gridRecord[i]=new Array();
            for(let j=0;j<cols;j++){
                this.gridRecord[i][j]=0;
            }
        }
    }
    getRowNum(){
        return this.rows;
    }
    getColNum(){
        return this.cols;
    }
    changeScale(gridLen){
        this.gridLen=gridLen;
        for(let i=0;i<this.compList.length;i++){
            this.compList[i].changeScale(gridLen);
        }
    }
    addComp(comp){
        let r=comp.getRow();
        let c=comp.getCol();
        if(r>=0&&r<this.rows&&c>=0&&c<this.cols&&this.gridRecord[r][c]===0){
            this.compList.push(comp);
            comp.drawSelf(this.context);
            this.gridRecord[r][c]=comp.getCompType();
        }
    }
    addFake(){

    }
    getCompByGrid(r,c){
        for(let i=0;i<this.compList.length;i++){
            if(this.compList[i].getRow()===r&&this.compList[i].getCol()===c){
                return this.compList[i];
            }
        }
        return null;
    }
    deleteCompByGrid(r,c){
        if(!(r>=0&&r<this.rows&&c>=0&&c<this.cols)) return;
        for(let i=0;i<this.compList.length;i++){
            if(this.compList[i].getRow()===r&&this.compList[i].getCol()===c){
                this.compList.splice(i,1);
                this.context.clearRect(c*this.gridLen+mapLeft+this.gridLen*0.1,r*this.gridLen+mapTop+this.gridLen*0.1,this.gridLen*0.8,this.gridLen*0.8);
                this.gridRecord[r][c]=0;
                return;
            }
        }
    }
    drawAllComps(){
        this.context.beginPath();
        this.context.lineWidth = 1;
        this.context.strokeStyle = "#aaaaaa";
        for(let i=0;i<this.compList.length;i++){
            this.compList[i].drawSelf(this.context);
        }
        for(let i=0;i<=this.rows;i++){
            this.context.moveTo(mapLeft,mapTop+i*this.gridLen);
            this.context.lineTo(mapLeft+this.cols*this.gridLen,mapTop+i*this.gridLen);
            this.context.stroke();
        }
        for(let i=0;i<=this.cols;i++){
            this.context.moveTo(mapLeft+i*this.gridLen,mapTop);
            this.context.lineTo(mapLeft+i*this.gridLen,mapTop+this.rows*this.gridLen);
            this.context.stroke();
        }
        this.context.closePath();
    }
    addMapRow(){
        let newRow=new Array();
        this.gridRecord.push(newRow);
        for(let i=0;i<this.cols;i++){
            this.gridRecord[this.rows][i]=0;
        }
        this.rows++;
    }
    deleteMapRow(){
        for(let i=0;i<this.cols;i++){
            this.gridRecord[this.rows-1].pop();
        }
        for(let i=0;i<this.compList.length;i++){
            if(this.compList[i].getRow()===(this.rows-1)){
                this.compList.splice(i,1);
            }
        }
        this.rows--;
    }
    addMapCol(){
        for(let i=0;i<this.rows;i++){
            this.gridRecord[i][this.cols]=0;
        }
        this.cols++;
    }
    deleteMapCol(){
        for(let i=0;i<this.rows;i++){
            this.gridRecord[i].pop();
        }
        for(let i=0;i<this.compList.length;i++){
            if(this.compList[i].getCol()===(this.cols-1)){
                this.compList.splice(i,1);
            }
        }
        this.cols--;
    }
}

class Comp{
    constructor(row,col,type,gridLen){
        this.row=row;
        this.col=col;
        this.type=type;
        this.gridLen=gridLen;
    }
    getRow(){
        return this.row;
    }
    getCol(){
        return this.col;
    }
    getCompType(){
        return this.type;
    }
    changeScale(gridLen){
        this.gridLen=gridLen;
    }
}

class Chair extends Comp{
    constructor(row,col,type,gridLen){
        super(row,col,type,gridLen);
        this.type=1;
    }
    drawSelf(context){
        let icon = new Image();
        // let timeStamp = +new Date();
        icon.src = "../images/seat.png";
        // icon.src = "http://www.web-tinker.com/share/lena_64px.png"+'?'+timeStamp;
        // icon.crossOrigin = "anonymous";

        let x=this.col*this.gridLen+mapLeft;
        let y=this.row*this.gridLen+mapTop;
        let _this=this;
        icon.onload = function(){
            // context.drawImage(icon,x,y,_this.gridLen,_this.gridLen);
            //只画格子3/5部分，防止删除的时候影响格子线
            context.fillStyle="#37BC9B";
            context.fillRect(x+_this.gridLen*0.2,y+_this.gridLen*0.2,_this.gridLen*0.6,_this.gridLen*0.6);
            // context.fillRect(x,y,_this.gridLen*0.6,_this.gridLen*0.6);
            // console.log("draw comp,x:",x,"y:",y);
        }
    }

}

class Desk extends Comp{
    constructor(row,col,type,gridLen){
        super(row,col,type,gridLen);
        this.type=2;
    }
    drawSelf(context){
        let icon = new Image();
        icon.src = "../images/desk.png";
        let x=this.col*this.gridLen+mapLeft;
        let y=this.row*this.gridLen+mapTop;
        let _this=this;
        icon.onload = function(){
            // context.drawImage(icon,x,y,_this.gridLen,_this.gridLen);
            context.fillStyle="#FFA631";
            context.fillRect(x+_this.gridLen*0.2,y+_this.gridLen*0.2,_this.gridLen*0.6,_this.gridLen*0.6);
        }
    }

}

class Door extends Comp{
    constructor(row,col,type,gridLen){
        super(row,col,type,gridLen);
        this.type=3;
    }
    drawSelf(context){
        let icon = new Image();
        // icon.crossOrigin = "anonymous";
        icon.src = "../images/door.png";
        let x=this.col*this.gridLen+mapLeft;
        let y=this.row*this.gridLen+mapTop;
        let _this=this;
        icon.onload = function(){
            // context.drawImage(icon,x,y,_this.gridLen,_this.gridLen);
            context.fillStyle="#967ADC";
            context.fillRect(x+_this.gridLen*0.2,y+_this.gridLen*0.2,_this.gridLen*0.6,_this.gridLen*0.6);
        }
    }

}