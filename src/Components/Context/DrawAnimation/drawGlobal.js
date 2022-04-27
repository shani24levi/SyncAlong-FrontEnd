import { bottom_activities, upper_activities, activity_ar } from './points_parts';
import React from 'react';
class Draw  extends React.Component {
  constructor(ctx, canvas, results, activity = 'none'){
    super(ctx, canvas, results, activity);
    this.height = canvas ? canvas.height : 0;
    this.width =  canvas ? canvas.width  : 0;
    this.ctx = ctx;
    this.activity = activity;
    this.results = results;
    this.Init();
  }

  Init = () => {
    console.log('Init');
    this.left_hand = [], this.right_hand = [], this.left_leg = [], this.right_leg = [];
    this.dxBird = this.width; this.dyBird = 0; this.dxBird2 = 0; this.dyBird2 = 0; 
    this.index = 0; this.cahngeWalk = true;
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

  drawLines = async() => {

    let flag = [], in_upper = null, in_bottom = null;
    this.activity = 'hands-x';
    in_upper = upper_activities.find((activity) => activity === this.activity);
    in_bottom = bottom_activities.find((activity) => activity === this.activity);
    if (in_upper && this.activity.includes('left')) { flag = [1]; } 
    else if (in_upper && this.activity.includes('right')) { flag = [2]; }
    else if (in_bottom && this.activity.includes('left')) { flag = [3]; } 
    else if (in_bottom && this.activity.includes('right')) { flag = [4]; }
    else if (in_upper && in_bottom) { flag = [1, 2, 3, 4]; }
    else if(in_upper){ flag = [1, 2]; } 
    else if(in_bottom){ flag = [3, 4]; }

    let arr = [];
    if (flag.includes(1)) arr.push(15);
    if (flag.includes(2)) arr.push(16);
    if (flag.includes(3)) arr.push(27);
    if (flag.includes(4)) arr.push(28);
    console.log('arr', arr)
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
        const length = await this.right_hand.push({ 
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),   
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
        console.log(this.right_hand, length);
      }
      if (i === 16) {
        await this.left_hand.push({ 
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),   
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
        console.log(this.left_hand);
      }
      if (i === 27) {
        await this.left_leg.push({ 
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),   
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
        console.log(this.left_leg);
      }
      if (i === 28) {
        await this.right_leg.push({ 
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),   
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
        console.log(this.right_leg);
      }
    }
    const my_array = {
      left_hand: this.left_hand,
      right_hand: this.right_hand,
      left_leg: this.left_leg,
      right_leg: this.right_leg
    }
    console.log(my_array)
    for(const index in my_array){
      const part = my_array[index];
      console.log(index, part)
      let end = part.length, start = end > 10 ? end - 10 : 0;

      part.splice(start,end).forEach((line => {
        this.ctx.lineWidth = 7; this.ctx.beginPath(); 
        this.ctx.moveTo(line.startX, line.startY); this.ctx.lineTo(line.endX, line.endY);
        this.ctx.strokeStyle = line.color; this.ctx.stroke();
      }))
    }

    console.log(this);
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
    if(this.activity.includes('left')){
      this.ctx.drawImage(img,  this.dxBird,  this.dyBird, distance , distance);
    }
    else if(this.activity.includes('right')){
    this.ctx.drawImage(img2,  this.dxBird2,  this.dyBird2, distance , distance);
    }
    else{
      this.ctx.drawImage(img,  this.dxBird,  this.dyBird, distance , distance);
      this.ctx.drawImage(img2,  this.dxBird2,  this.dyBird2, distance , distance);
    }
  }

  drawGlasses = () => {
    console.log(this.results.poseLandmarks, this.ctx, this.width, this.height);
    const {glasses} = require('./Array_AR/glasses');
    const {horseGIFPos, horseGIFNeg} = require('./Array_AR/horse');
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
 
    const index = this.index % horseGIFNeg.length;
    let imgZ = new Image()
    imgZ.src =  this.cahngeWalk ? horseGIFPos[index] : horseGIFNeg[index];
    const p27 = this.results.poseLandmarks[27].y * this.height;
    const p28 = this.results.poseLandmarks[28].y * this.height;
    let d = p27 - p28; 
    d = d > 0? d : d * -1;
    if(d === 10){

    }
    else if(p27 < p28){
      this.dxBird += 20;
      this.cahngeWalk = false;
    } else {
        this.dxBird -= 20;
        this.cahngeWalk = true;
      }
    imgZ.width = 200; imgZ.height = 200;
    console.log(this.dxBird,  imgZ.height, imgZ.width);
    this.ctx.drawImage(imgZ,  this.dxBird,  300, 100 , 100);
    this.ctx.drawImage(imgZ,  this.dxBird,  400, 100 , 100);
 
  }
  drawCrazy = () => {
    const {lips, zombieGIFPos, zombieGIFNeg, face} = require('./Array_AR/crazy');
    let x1 = this.results.poseLandmarks[7].x * this.width;
    let x2 = this.results.poseLandmarks[8].x * this.width;

    let y1 = this.results.poseLandmarks[2].y * this.height;
    let y2 = this.results.poseLandmarks[11].y * this.height;
    const distanceWidth = Math.abs(x1 - x2) * 3.2; 
    const distanceHeight = Math.abs(y1 - y2) * 2;

    let imgFace = new Image(); imgFace.src = face[0];
    imgFace.width = distanceWidth;imgFace.height = distanceHeight;
    this.ctx.drawImage(imgFace, (this.results.poseLandmarks[0].x * this.width) - (imgFace.width / 2) - 15,
                  (this.results.poseLandmarks[0].y * this.height) -  (imgFace.height/2) - 25, 
                  imgFace.width, imgFace.height);

    let index = this.index % lips.length;
    let imgLips = new Image(); imgLips.src = lips[index];
              
    const xM = (this.results.poseLandmarks[8].x * this.width) - 20;
    const yM = (this.results.poseLandmarks[10].y * this.height)
    imgLips.width = Math.sqrt(Math.pow(this.results.poseLandmarks[8].x * this.width - this.results.poseLandmarks[7].x * this.width,2));
    imgLips.height = yM;          
    this.ctx.drawImage(imgLips, xM,
    yM, imgLips.width, imgLips.height);
                  
    
    index = this.index % zombieGIFNeg.length;
    let imgZ = new Image()
    imgZ.src =  this.cahngeWalk ? zombieGIFPos[index] : zombieGIFNeg[index];

    if(this.cahngeWalk){
      this.dxBird += 20;
      if(this.dxBird >= this.width){
        this.cahngeWalk = false;
      }
    } else {
        this.dxBird -= 20;
        if(this.dxBird <= 0){
          this.cahngeWalk = true;
        }
      }
    imgZ.width = 200; imgZ.height = 200;
    console.log(this.dxBird,  imgZ.height, imgZ.width);
    this.ctx.drawImage(imgZ,  this.dxBird,  300, 100 , 100);
    this.ctx.drawImage(imgZ,  this.dxBird,  400, 100 , 100);
    
    // index = this.index % birdGIFPos.length;
    // let 
    this.index += 1;



    
  }
  drawRain = () => {
    let init = [];
    let maxParts = 1000;
    for (let i = 0; i < maxParts; i++){
      init.push({
        x: Math.random() * this.width, y: Math.random() * this.height,
        l: Math.random() * 1, xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10,
      })
    }

    let particles = [];
    for (let i = 0; i < maxParts; i++){
      particles[i] = init[i];
    }

    const drawR = () => {
      particles.forEach(p=>{
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        this.ctx.stroke();
      })
      
      particles.forEach(p=>{
        p.x +=p.xs;
        p.y +=p.ys;
        if(p.x > this.width || p.y > this.height){
          p.x = Math.random() * this.width;
          p.y = -20;
        }
      })
    } 

    drawR();
  }
  draw = () => {
    // console.log(this.left_hand, this.right_hand)
    for(const ar in activity_ar) {
      for(const activity in activity_ar[ar]) {
        if(activity_ar[ar][activity] === this.activity){
          switch(ar){
            case 'bird': this.drawBird(); break;
            case 'horse': this.drawGlasses(); break;
            case 'rainbow': this.drawLines(); break;
            case 'zombie' : this.drawCrazy(); break;
            case 'rain': this.drawRain(); break;
            default: console.log('ar not exist for this activity'); break;
          } 
          return;
        }
      }
    }
  }
}

export default Draw;