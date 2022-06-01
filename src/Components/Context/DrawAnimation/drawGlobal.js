import { bottom_activities, upper_activities, activity_ar } from './points_parts';
import {
  drawEye, drawEye2, drawEye3, drawlips, drawHead, drawHead2, drawBody, drawLeftUpperArm, drawRightUpperArm, drawLeftForearm, drawRightForearm,
  drawLeftHand, drawRightHand, drawLeftThigh, drawRightThigh, drawLeftLowerLeg, drawRightLowerLeg,
  drawforPoint
} from './drawParts';

//images
import Head from './../images/skeleton/Head.png';
import Body from './../images/skeleton/Body.png';
import LeftUpperArm from './../images/skeleton/LeftUpperArm.png';
import RightUpperArm from './../images/skeleton/RightUpperArm.png';
import RightForearm from './../images/skeleton/RightLowerArm.png';
import LeftForearm from './../images/skeleton/LeftLowerArm.png';
import LeftHand from './../images/skeleton/LeftHand.png';
import RightHand from './../images/skeleton/RightHand.png';
import LeftThigh from './../images/skeleton/LeftUpperLeg.png';
import RightThigh from './../images/skeleton/RightUpperLeg.png';
import LeftLowerLeg from './../images/skeleton/LeftLowerLeg.png';
import RightLowerLeg from './../images/skeleton/RightLowerLeg.png';

import EyesBird from './../images/birdGIF/0.png';
import RightForearmB from './../images/birdGIF/3/1.png';
import LeftForearmB from './../images/birdGIF/3/2.png';

import Piza from './../images/borger/piza.jpg';
import Cack from './../images/borger/cack.png';
import Popkoen from './../images/borger/pop.jpg';
import Hotdog from './../images/borger/hotdog.jpg';
import Pic2 from './../images/borger/2pic.jpg';

import LeftUpperArmC from './../images/crazy/face/LeftUpperArm.png';
import RightUpperArmC from './../images/crazy/face/RightUpperArm.png';
import RightForearmC from './../images/crazy/face/RightLowerArm.png';
import LeftForearmC from './../images/crazy/face/LeftLowerArm.png';

class Draw {
  constructor(ctx, canvas, results) {
    this.height = canvas ? canvas.height : 0;
    this.width = canvas ? canvas.width : 0;
    this.ctx = ctx;
    this.activity = 'none';
    this.results = [];
    this.Init();
  }
  Init = () => {
    this.syncScore = 0;
    this.index = 0;

    this.globalAlpha = [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1];
    this.gIndex = 0;

    this.my_array = {
      left_hand: new Array(), right_hand: new Array(), left_leg: new Array(), right_leg: new Array()
    }

    this.cahngeWalk = false;
    this.xWalk = 0;

  }
  setActivity = (activity) => {
    if (this.activity === activity) return;
    this.activity = activity;
    this.Init();
  }
  setResults = (results) => {
    this.results = results;
  }

  // start draw functions

  // FIX 100 %
  /**
   * drawLines for upper
   */
  drawLines = () => {
    // flag is array, will has numbers :
    //      1 [for draw in left hand], 2 [for draw in right hand],
    //      3 [for draw in left leg], 4 [for draw in right leg]
    let flag = [];
    // in_upper, in_upper will check if the activity for upper or bottom part or both part
    let in_upper = null; let in_bottom = null;

    in_upper = upper_activities.find((activity) => activity === this.activity);
    in_bottom = bottom_activities.find((activity) => activity === this.activity);

    //add to flag array when check
    if (in_upper && this.activity.includes('left')) { flag = [1]; }  
    else if (in_upper && this.activity.includes('right')) { flag = [2]; } 
    else if (in_bottom && this.activity.includes('left')) { flag = [3]; } 
    else if (in_bottom && this.activity.includes('right')) { flag = [4]; } 
    else if (in_upper && in_bottom) { flag = [1, 2, 3, 4]; } 
    else if (in_upper) { flag = [1, 2]; } 
    else if (in_bottom) { flag = [3, 4]; }

    // arr is array, will have the point (for the parts)
    let arr = [];
    if (flag.includes(1)) arr.push(15); if (flag.includes(2)) arr.push(16);
    if (flag.includes(3)) arr.push(27); if (flag.includes(4)) arr.push(28);

    let right_hand = []; let left_hand = [];
    let right_leg = [];  let left_leg = [];

    // loop on arr array
    for (let i in arr) {
      i = arr[i];
      // x1, x2, y1, y2 are coordinates of two points for on part
      let x1 = this.results.poseLandmarks[i].x * this.width;
      let x2 = this.results.poseLandmarks[i - 2].x * this.width;
      let y1 = this.results.poseLandmarks[i].y * this.height;
      let y2 = this.results.poseLandmarks[i - 2].y * this.height;

      // give me middle point
      x2 = (x1 + x2) / 2;  y2 = (y1 + y2) / 2;

      // CONST_obj is object has start and end points and color for draw
      const CONST_obj = {
        startX: parseInt(x1), startY: parseInt(y1),
        endX: parseInt(x2),   endY: parseInt(y2),
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      };

      if (i === 15) { right_hand.push(CONST_obj); }
      if (i === 16) { left_hand.push(CONST_obj); }
      if (i === 27) { left_leg.push(CONST_obj); }
      if (i === 28) { right_leg.push(CONST_obj); }
    }

    left_hand.forEach(obj => this.my_array.left_hand.push(obj));
    right_hand.forEach(obj => this.my_array.right_hand.push(obj));
    left_leg.forEach(obj => this.my_array.left_leg.push(obj));
    right_leg.forEach(obj => this.my_array.right_leg.push(obj));

    // loop for the object and draw about each arrays
    for (const index in this.my_array) {
      const count = 4; const part = this.my_array[index];
      let end = part.length, start = end > count ? end - count : 0;
      // loop for last 4 elements in array
      for (let i = end - 1; i >= start; i--) {
        const line = part[i];
        // width the line
        this.ctx.lineWidth = 7;
        // create a new path for draw
        this.ctx.beginPath();
        // start draw from start point => (line.startX, line.startY)
        this.ctx.moveTo(line.startX, line.startY);
        // end draw to end point => (line.endX, line.endY)
        this.ctx.lineTo(line.endX, line.endY);
        // change the color dor the line to line.color;
        this.ctx.strokeStyle = line.color;
        this.ctx.stroke();
      }
    }
  };

  //FIX 100%
  /**
   * drawHeart for bottom
   */
  drawHeart = () => {
    const heart = require('../images/heart/0.png');
    // const imgheart = new Image(); imgheart.src = require('../images/baterflay/heart.png');
    const img = new Image(); img.src = heart;
    //drawEye3(this.ctx, this.results.poseLandmarks, imgheart);
    const pose = this.results.poseLandmarks;
    let x1 = pose[12].x * this.width;
    let x2 = pose[11].x * this.width;
    let y1 = pose[12].y * this.height;
    let y2 = pose[11].y * this.height;

    const distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2));

    drawforPoint(this.ctx, pose, 24, distance, img, this.globalAlpha, this.gIndex);
    drawforPoint(this.ctx, pose, 23, distance, img, this.globalAlpha, this.gIndex);
    drawforPoint(this.ctx, pose, 25, distance, img, this.globalAlpha, this.gIndex);
    drawforPoint(this.ctx, pose, 26, distance, img, this.globalAlpha, this.gIndex);
    drawforPoint(this.ctx, pose, 27, distance, img, this.globalAlpha, this.gIndex);
    drawforPoint(this.ctx, pose, 28, distance, img, this.globalAlpha, this.gIndex);
    this.gIndex += 1;
  }
  //FIX
  drawBird = () => {
    const eyes = new Image();
    eyes.src = EyesBird;
    //drawEye(this.ctx, this.results.poseLandmarks, eyes);

    //LeftForearm
    const leftForearm = new Image();
    if (this.results.poseLandmarks[13].x >= this.results.poseLandmarks[15].x) {
      leftForearm.src = LeftForearmB;
    } else {
      leftForearm.src = RightForearmB;
    }

    drawLeftForearm(this.ctx, this.results.poseLandmarks, leftForearm);

    //RightForearm
    const rightForearm = new Image();
    if (this.results.poseLandmarks[14].x >= this.results.poseLandmarks[16].x) {
      rightForearm.src = LeftForearmB
    } else {
      rightForearm.src = RightForearmB
    }

    drawRightForearm(this.ctx, this.results.poseLandmarks, rightForearm);

    let x1 = this.results.poseLandmarks[12].x * this.width;
    let x2 = this.results.poseLandmarks[11].x * this.width;
    let y1 = this.results.poseLandmarks[12].y * this.height;
    let y2 = this.results.poseLandmarks[11].y * this.height;

    const distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)) * 10;
    const { birdGIFPos1, birdGIFNeg1, birdGIFPos2, birdGIFNeg2, } = require('./Array_AR/bird');
    const index = this.index % 3;
    this.index += 1;
    x1 = this.results.poseLandmarks[20].x * this.width;
    y1 = this.results.poseLandmarks[20].y * this.height;
    x2 = this.results.poseLandmarks[19].x * this.width;
    y2 = this.results.poseLandmarks[19].y * this.height;

    const img = new Image(), img2 = new Image();
    //right
    img.src = birdGIFPos1[index];
    //left
    img2.src = birdGIFNeg1[index];

    if (this.activity.includes('left')) {
      this.ctx.globalAlpha = 0.7;
      this.ctx.drawImage(img, x1 - (distance / 2) - 40, y1 - 100, distance, distance);
    } else if (this.activity.includes('right')) {
      this.ctx.globalAlpha = 0.7;
      this.ctx.drawImage(img2, x2 - (distance / 2) + 40, y2 - 100, distance, distance);
    } else {
      this.ctx.globalAlpha = 0.7;
      this.ctx.drawImage(img, x1 - (distance / 2) - 40, y1 - 100, distance, distance);
      this.ctx.drawImage(img2, x2 - (distance / 2) + 40, y2 - 100, distance, distance);
    }

    const img3 = new Image(), img4 = new Image();
    img3.src = birdGIFPos2[index];
    img4.src = birdGIFNeg2[index];
    if (this.activity.includes('left')) {
      this.ctx.globalAlpha = 0.7;
      this.ctx.drawImage(img3, x1 - 70, y1 - 150, distance / 2, distance / 2);
    } else if (this.activity.includes('right')) {
      this.ctx.globalAlpha = 0.7;
      this.ctx.drawImage(img4, x2 + 70, y2 - 150, distance / 2, distance / 2);
    } else {
      this.ctx.globalAlpha = 0.7;
      this.ctx.drawImage(img3, x1 - 70, y1 - 150, distance / 2, distance / 2);
      this.ctx.drawImage(img4, x2 + 70, y2 - 150, distance / 2, distance / 2);
    }
  }
  // FIX 100 %
  /**
   * drawButterfly for upper
   */
  drawButterfly = () => {
    let x1 = this.results.poseLandmarks[12].x * this.width;
    let x2 = this.results.poseLandmarks[11].x * this.width;
    let y1 = this.results.poseLandmarks[12].y * this.height;
    let y2 = this.results.poseLandmarks[11].y * this.height;

    // let distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)) * 10;
    const index = this.index % 3;
    const index2 = (this.index + 1) % 3;
    this.index += 1;
    x1 = this.results.poseLandmarks[20].x * this.width;
    y1 = this.results.poseLandmarks[20].y * this.height;
    x2 = this.results.poseLandmarks[19].x * this.width;
    y2 = this.results.poseLandmarks[19].y * this.height;

    const { yellow, blue } = require('./Array_AR/butterfly.js')
    const img = new Image(), img2 = new Image();
    //right
    img.src = yellow[0][index];
    //left
    img2.src = yellow[1][index];

    let distance = 100;
    if (this.activity.includes('left')) {
      this.ctx.globalAlpha = 0.7;
      this.ctx.drawImage(img, x1 - (distance / 2) - 40, y1 - 100, distance, distance);
    } else if (this.activity.includes('right')) {
      this.ctx.globalAlpha = 0.7;
      this.ctx.drawImage(img2, x2 - (distance / 2) + 40, y2 - 100, distance, distance);
    } else {
      this.ctx.globalAlpha = 0.7;
      this.ctx.drawImage(img, x1 - (distance / 2) - 40, y1 - 100, distance, distance);
      this.ctx.drawImage(img2, x2 - (distance / 2) + 40, y2 - 100, distance, distance);
    }

    const img3 = new Image(); img3.src = blue[index];
    distance = 250;
    if (this.activity.includes('left')) {
      this.ctx.globalAlpha = 0.7;
      this.ctx.drawImage(img3, x1 - (distance / 2), y1, distance, distance);
    } else if (this.activity.includes('right')) {
      this.ctx.globalAlpha = 0.7;
      this.ctx.drawImage(img3, x2 - (distance / 2), y2, distance, distance);
    } else {
      this.ctx.globalAlpha = 0.7;
      this.ctx.drawImage(img3, x1 - (distance / 2), y1, distance, distance);
      this.ctx.drawImage(img3, x2 - (distance / 2), y2, distance, distance);
    }

    // const img = new Image();
    // const { yellow, blue } = require('./Array_AR/butterfly.js')
    // img.src = yellow[index];
    // const img2 = new Image();
    // img2.src = blue[index];
    // const distance = 100;
    // this.ctx.drawImage(img, x1 - (distance * 1.5 / 2), y1 + 50, distance, distance);
    // this.ctx.drawImage(img, x2 - (distance * 1.5 / 2), y2 + 50, distance, distance);

    // let x11 = this.results.poseLandmarks[12].x * this.width;
    // let y11 = this.results.poseLandmarks[12].y * this.height;
    // this.ctx.drawImage(img, x11 - (distance), y11 - (distance), distance, distance);

    // this.ctx.drawImage(img2, x1 - (distance * 1.5 / 2), y1 - 50, distance * 1.5, distance * 1.5);
    // this.ctx.drawImage(img2, x2 - (distance * 1.5 / 2), y2 - 50, distance * 1.5, distance * 1.5);

    // const face = require('../images/baterflay/face.png');
    // const imgface = new Image();
    // imgface.src = face;
    // drawHead2(this.ctx, this.results.poseLandmarks, imgface);
  };
 
  //don't for view
  drawLips = () => {
    const imgLip = new Image(); imgLip.src = require('../images/lip/rainbow.png');
    const pose = this.results.poseLandmarks;
    //  drawlips(this.ctx, pose, imgLip);
    //return;

    const imglip2 = new Image(); imglip2.src = require('../images/lip/lips.png');

    let x1 = pose[12].x * this.width;
    let x2 = pose[11].x * this.width;
    let y1 = pose[12].y * this.height;
    let y2 = pose[11].y * this.height;
    distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2));

    this.ctx.drawImage(imglip2, (pose[13].x * this.width) - distance / 2, (pose[13].y * this.height) - distance / 2, distance * 2, distance * 2);
    this.ctx.drawImage(imglip2, (pose[14].x * this.width) - distance / 2, (pose[14].y * this.height) - distance / 2, distance * 2, distance * 2);
    this.ctx.drawImage(imglip2, (pose[14].x * this.width) - distance / 2 - 50, (pose[14].y * this.height) - distance / 2 - 50, distance * 4, distance * 4);
    this.ctx.drawImage(imglip2, (pose[15].x * this.width) - distance / 2, (pose[15].y * this.height) - distance / 2 - 50, distance * 4, distance * 4);
    this.ctx.drawImage(imglip2, (pose[16].x * this.width) - distance / 2, (pose[16].y * this.height) - distance / 2, distance * 4, distance * 4);
    this.ctx.drawImage(imglip2, (pose[22].x * this.width) - distance / 2, (pose[22].y * this.height) - distance / 2, distance * 2, distance * 2);
    this.ctx.drawImage(imglip2, (pose[19].x * this.width) - distance / 2, (pose[19].y * this.height) - distance / 2, distance * 2, distance * 2);
    this.ctx.drawImage(imglip2, (pose[12].x * this.width) - distance / 2, (pose[12].y * this.height) - distance / 2, distance, distance);
    this.ctx.drawImage(imglip2, (pose[23].x * this.width) - distance / 2, (pose[23].y * this.height) - distance / 2, distance * 5, distance * 5);
    this.ctx.drawImage(imglip2, (pose[23].x * this.width) - distance / 2 - 50, (pose[23].y * this.height) - distance / 2 - 50, distance * 3, distance * 3);
    this.ctx.drawImage(imglip2, (pose[23].x * this.width) - distance / 2 + 30, (pose[23].y * this.height) - distance / 2 - 50, distance * 0.5, distance * 0.5);
  }
  //FIX
  drawBorger = () => {
    let x1 = this.results.poseLandmarks[12].x * this.width;
    let x2 = this.results.poseLandmarks[11].x * this.width;
    let y1 = this.results.poseLandmarks[12].y * this.height;
    let y2 = this.results.poseLandmarks[11].y * this.height;

    const distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)) * 10;
    const { dancBorger } = require('./Array_AR/borgers');
    const index = this.index % 3;
    this.index += 1;
    let img = new Image(),
      img2 = new Image();
    img.src = dancBorger[index];
    const pose = this.results.poseLandmarks
    drawforPoint(this.ctx, pose, 13, distance, img);
    drawforPoint(this.ctx, pose, 14, distance, img);

    drawforPoint(this.ctx, pose, 26, distance, img);
    drawforPoint(this.ctx, pose, 25, distance, img);

    drawforPoint(this.ctx, pose, 24, distance, img);
    drawforPoint(this.ctx, pose, 23, distance, img);

    drawforPoint(this.ctx, pose, 12, distance, img);
    drawforPoint(this.ctx, pose, 11, distance, img);


    drawforPoint(this.ctx, pose, 15, distance, img);
    drawforPoint(this.ctx, pose, 16, distance, img);

  };

  drawGlasses = () => {
    const { glasses } = require('./Array_AR/glasses');
    const { horseGIFPos, horseGIFNeg } = require('./Array_AR/horse');
    let x1 = this.results.poseLandmarks[7].x * this.width;
    let x2 = this.results.poseLandmarks[8].x * this.width;

    let y1 = this.results.poseLandmarks[2].y * this.height;
    let y2 = this.results.poseLandmarks[11].y * this.height;
    const distanceWidth = Math.abs(x1 - x2) * 2;
    const distanceHeight = Math.abs(y1 - y2) * 2;
    const head = new Image(); head.src = glasses[0];
    head.width = distanceWidth; head.height = distanceHeight;
    drawHead(this.ctx, this.results.poseLandmarks, head);

    const index = this.index % horseGIFNeg.length;
    let imgZ = new Image()
    imgZ.src = this.cahngeWalk ? horseGIFPos[index] : horseGIFNeg[index];
    const p27 = this.results.poseLandmarks[27].y * this.height;
    const p28 = this.results.poseLandmarks[28].y * this.height;
    let d = p27 - p28;
    d = d > 0 ? d : d * -1;
    if (d === 10) { }
    else if (p27 < p28) {
      this.dxBird += 50;
      this.cahngeWalk = false;
    } else {
      this.dxBird -= 50;
      this.cahngeWalk = true;
    }
    imgZ.width = 200; imgZ.height = 200;
    this.ctx.globalAlpha = 0.5;
    this.ctx.drawImage(imgZ, this.dxBird, 300, 100, 100);

    this.ctx.globalAlpha = 0.5;
    this.ctx.drawImage(imgZ, this.dxBird, 400, 100, 100);
  }
  //FIX
  drawCrazy = () => {
    const { zombieGIFPos, zombieGIFNeg, face } = require('./Array_AR/crazy');

    const head = new Image();
    head.src = face[0];
    head.width /= 1.5; //head.height = distanceHeight;
    // drawEye2(this.ctx, this.results.poseLandmarks, head);

    //LeftUpperArm
    const leftUpperArm = new Image();
    leftUpperArm.src = LeftUpperArmC;
    leftUpperArm.width /= 1.5;
    drawLeftUpperArm(this.ctx, this.results.poseLandmarks, leftUpperArm);

    //RightUpperArm
    const rightUpperArm = new Image();
    rightUpperArm.src = RightUpperArmC;
    rightUpperArm.width /= 1.5;
    drawRightUpperArm(this.ctx, this.results.poseLandmarks, rightUpperArm);

    //LeftForearm
    const leftForearm = new Image();
    leftForearm.src = LeftForearmC;
    leftForearm.width /= 1.5;
    drawLeftForearm(this.ctx, this.results.poseLandmarks, leftForearm);

    //RightForearm
    const rightForearm = new Image();
    rightForearm.src = RightForearmC;
    rightForearm.width /= 1.5;
    drawRightForearm(this.ctx, this.results.poseLandmarks, rightForearm);

    const index = this.index % 3;
    let imgZ = new Image()
    imgZ.src = this.cahngeWalk ? zombieGIFPos[index] : zombieGIFNeg[index];

    console.log(this.xWalk, this.cahngeWalk);
    if (this.cahngeWalk) {
      this.xWalk += 50;
      if (this.xWalk >= this.width) {
        this.cahngeWalk = false;
      }
    } else {
      this.xWalk -= 50;
      if (this.xWalk <= 0) {
        this.cahngeWalk = true;
      }
    }
    imgZ.width = 200; imgZ.height = 200;
    this.ctx.globalAlpha = 0.5;
    this.ctx.drawImage(imgZ, this.xWalk, 300, 100, 100);
    this.ctx.globalAlpha = 0.5;
    this.ctx.drawImage(imgZ, this.xWalk, 400, 100, 100);
    this.index += 1;
  };
  //FIX
  drawSkeleton = () => {

    //drawHead
    // const head = new Image(); head.src = Head;
    // drawHead(this.ctx, this.results.poseLandmarks, head);

    //Body
    const body = new Image(); body.src = Body;
    drawBody(this.ctx, this.results.poseLandmarks, body);

    //LeftUpperArm
    const leftUpperArm = new Image(); leftUpperArm.src = LeftUpperArm;
    drawLeftUpperArm(this.ctx, this.results.poseLandmarks, leftUpperArm);

    //RightUpperArm
    const rightUpperArm = new Image(); rightUpperArm.src = RightUpperArm;
    drawRightUpperArm(this.ctx, this.results.poseLandmarks, rightUpperArm);

    //LeftForearm
    const leftForearm = new Image(); leftForearm.src = LeftForearm;
    drawLeftForearm(this.ctx, this.results.poseLandmarks, leftForearm);

    //RightForearm
    const rightForearm = new Image(); rightForearm.src = RightForearm;
    drawRightForearm(this.ctx, this.results.poseLandmarks, rightForearm);

    // LeftHand
    // const leftHand = new Image(); leftHand.src = LeftHand;
    // drawLeftHand(this.ctx, this.results.poseLandmarks, leftHand);

    // RightHand
    // const rightHand = new Image(); rightHand.src = RightHand;
    // drawRightHand(this.ctx, this.results.poseLandmarks, rightHand);

    //LeftThigh
    const leftThigh = new Image(); leftThigh.src = LeftThigh;
    drawLeftThigh(this.ctx, this.results.poseLandmarks, leftThigh);

    //RightThigh
    const rightThigh = new Image(); rightThigh.src = RightThigh;
    drawRightThigh(this.ctx, this.results.poseLandmarks, rightThigh);

    // LeftLowerLeg
    const leftLowerLeg = new Image(); leftLowerLeg.src = LeftLowerLeg;
    drawLeftLowerLeg(this.ctx, this.results.poseLandmarks, leftLowerLeg);

    // RightLowerLeg
    const rightLowerLeg = new Image(); rightLowerLeg.src = RightLowerLeg;
    drawRightLowerLeg(this.ctx, this.results.poseLandmarks, rightLowerLeg);

  }
  
  draw = () => {

    if (this.activity === 'none') return;

    for (const ar in activity_ar) {
      for (const activity in activity_ar[ar]) {
        if (activity_ar[ar][activity] === this.activity) {
          switch (ar) {
            case 'bird': this.drawBird(); break;
            case 'heart': this.drawHeart(); break;
            case 'rainbow': this.drawLines(); break;
            case 'zombie': this.drawCrazy(); break;
            case 'skeleton': this.drawSkeleton(); break;
            case 'borger': this.drawBorger(); break;
            case 'flay': this.drawButterfly(); break;
            case 'lips': this.drawLips(); break;
            default: console.log('ar not exist for this activity'); break;
          }
          return;
        }
      }
    }
  }
}

export default Draw;