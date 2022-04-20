import { bottom_activities, upper_activities, activity_ar } from './points_parts';
class Draw {
  constructor(ctx, canvas, results, activity = 'none'){
    this.height = canvas ? canvas.height : 0;
    this.width =  canvas ? canvas.width  : 0;
    this.ctx = ctx;
    this.activity = activity;
    this.results = results;
    this.Init();
  }

  Init = () => {
    this.my_array = { left_hand: [], right_hand: [], left_leg: [], right_leg: [] };
    this.dxBird = this.width; this.dyBird = 0; this.dxBird2 = 0; this.dyBird2 = 0; 
    this.index = 0;
  }

  setActivity = (activity) => {
    if(this.activity === activity) return;  
    this.activity = activity;
    this.Init();
  }
  setResults = (results) => {
    this.results = results;
  }
  different = (a, b) => a - b;

  drawLines = () => {
    let flag = [], in_upper = null, in_bottom = null;
    in_upper = upper_activities.find((activity) => activity === this.activity);
    in_bottom = bottom_activities.find((activity) => activity === this.activity);
    if (in_upper && this.activity.includes('left')) { flag = [1]; } 
    else if (in_upper && this.activity.includes('right')) { flag = [2]; }
    else if (in_bottom && this.activity.includes('left')) { flag = [3]; } 
    else if (in_bottom && this.activity.includes('right')) { flag = [4]; }
    else if (in_upper && in_bottom) { flag = [1, 2, 3, 4]; }
    else if(in_upper){ flag = [1, 2]; } 
    else if(in_bottom){ flag = [3, 4]; }

    if(!flag.includes(1)){
      this.my_array.right_hand = [];
    }
    if(!flag.includes(2)){
      this.my_array.left_hand = [];
    }
    if(!flag.includes(3)){
      this.my_array.left_leg = [];
    }
    if(!flag.includes(4)){
      this.my_array.right_leg = [];
    }

    let arr = [];
    if (flag.includes(3)) arr.push(15);
    if (flag.includes(4)) arr.push(16);
    if (flag.includes(5)) arr.push(27);
    if (flag.includes(6)) arr.push(28);
    for (let i in arr) {
      i = arr[i];
      let x1 = this.results.poseLandmarks[i].x * this.width;
      let x2 = this.results.poseLandmarks[i - 2].x * this.width;
      let y1 = this.results.poseLandmarks[i].y * this.height;
      let y2 = this.results.poseLandmarks[i - 2].y * this.height;
      let dx = this.different(x1, x2);
      let dy = this.different(y1, y2);
  
      dx = dx > 0 && dy > 0 ? x1 + dx : x1 - dx;
      dy = dy > 0           ? y1 + dy : y1 - dy; 
          
      if (i === 15) {
        this.my_array.right_hand.push({ 
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),   
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
      }
      if (i === 16) {
        this.my_array.left_hand.push({ 
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),   
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
      }
      if (i === 27) {
        this.my_array.left_leg.push({ 
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),   
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
      }
      if (i === 28) {
        this.my_array.right_leg.push({ 
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),   
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
      }
    }
    for(const index in this.my_array){
      const part = this.my_array[index];
      let end = part.length, start = end > 7 ? end - 7 : 0;
      part.splice(start,end).forEach((line => {
        this.ctx.lineWidth = 5; this.ctx.beginPath(); 
        this.ctx.moveTo(line.startX, line.startY); this.ctx.lineTo(line.endX, line.endY);
        this.ctx.strokeStyle = line.color; this.ctx.stroke();
      }))
    }
  }

  drawBird = () => {

    let x1 = this.results.poseLandmarks[12].x * this.width;
    let x2 = this.results.poseLandmarks[11].x * this.width;
    let y1 = this.results.poseLandmarks[12].y * this.height;
    let y2 = this.results.poseLandmarks[11].y * this.height;
  
    const distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)) * 10; 
  
    console.log('distance', distance);
    const {birdGIFPos, birdGIFNeg} = require('./Array_AR/bird');
    const index = this.index % birdGIFPos.length;
    this.index += 1;
    x1 = this.results.poseLandmarks[20].x * this.width;
    y1 = this.results.poseLandmarks[20].y * this.height;
    x2 = this.results.poseLandmarks[21].x * this.width;
    y2 = this.results.poseLandmarks[21].y * this.height;
    let img = new Image(), img2 = new Image();
     this.dxBird +=  this.dxBird <= x2 ? 1 : -1;
     this.dyBird +=  this.dyBird <= y2 ? 1 : -1;
    if( this.dxBird < 0)  this.dxBird = 0;
    if( this.dxBird > this.width)  this.dxBird = this.width;
    if( this.dyBird < 0)  this.dyBird = 0;
    if( this.dyBird > this.height)  this.dyBird = this.height;
     this. this.dxBird2 +=  this. this.dxBird2 <= x1 ? 1 : -1;
     this. this.dyBird2 +=  this. this.dyBird2 <= y1 ? 1 : -1;
    if( this. this.dxBird2 < 0)  this. this.dxBird2 = 0;
    if( this. this.dxBird2 > this.width)  this. this.dxBird2 = this.width;
    if( this. this.dyBird2 < 0)  this. this.dyBird2 = 0;
    if( this. this.dyBird2 > this.height)  this. this.dyBird2 = this.height;
    img.src =  this.dxBird <= x2 ? birdGIFPos[index] : birdGIFNeg[index];
    img2.src =  this. this.dxBird2 <= x1 ? birdGIFPos[index] : birdGIFNeg[index];
    this.ctx.drawImage(img,  this.dxBird,  this.dyBird, distance , distance);
    this.ctx.drawImage(img2,  this. this.dxBird2,  this. this.dyBird2, distance , distance);
  }

  drawGlasses = () => {
    console.log(this.results.poseLandmarks, this.ctx, this.width, this.height);
    const {glasses} = require('./Array_AR/glasses');

    let x1 = this.results.poseLandmarks[7].x * this.width;
    let x2 = this.results.poseLandmarks[8].x * this.width;

    let y1 = this.results.poseLandmarks[2].y * this.height;
    let y2 = this.results.poseLandmarks[11].y * this.height;
    const distanceWidth = Math.abs(x1 - x2) * 2; 
    const distanceHeight = Math.abs(y1 - y2) * 2;
    let img = new Image();
    img.src = glasses[0];
    img.width = distanceWidth;
    img.height = distanceHeight;
    console.log(img.src, x1, y1);
    this.ctx.drawImage(img, (this.results.poseLandmarks[0].x * this.width) - img.width / 2, (this.results.poseLandmarks[0].y * this.height) -  img.height/2, img.width, img.height);
  }

  draw = () => {
    let part = null;
    for(const index in activity_ar) {
      for(const activity in activity_ar[index]){
        if(activity === this.activity){
            part = index;
        }
      }
    }
    switch(part){
      case 'bird': this.drawBird(); break;
      case 'glasses': this.drawGlasses(); break;
      case 'rainbow': this.drawLines(); break;
      default: console.log('ar not exist for this activity'); break;
    }
  }
}

export default Draw;