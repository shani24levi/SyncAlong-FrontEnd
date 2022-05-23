import { bottom_activities, upper_activities, activity_ar } from './points_parts';
import {
  drawHead, drawBody, drawLeftUpperArm, drawRightUpperArm, drawLeftForearm, drawRightForearm,
  drawLeftHand, drawRightHand, drawLeftThigh, drawRightThigh, drawLeftLowerLeg, drawRightLowerLeg,
  drawImage,
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
  constructor(ctx, canvas, results, user, activity = 'none') {
    this.height = canvas ? canvas.height : 0;
    this.width = canvas ? canvas.width : 0;
    this.ctx = ctx;
    this.activity = activity;
    this.results = results;
    this.user = user;
    this.Init();
  }

  Init = () => {
    this.syncScore = 0;
    this.dxBird = this.width; this.dyBird = 0; this.dxBird2 = 0; this.dyBird2 = 0;
    this.dxEl = this.width; this.dyEl = 0; this.dxEl2 = 0; this.dyEl2 = 0;
    this.index = 0; this.cahngeWalk = true;

    console.log('this.results', this.results);

    this.globalAlpha = [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1];
    this.gIndex = 0;

    this.my_array = {
      left_hand: new Array(), right_hand: new Array(), left_leg: new Array(), right_leg: new Array()
    }

    this.your_array = {
      left_hand: new Array(), right_hand: new Array(), left_leg: new Array(), right_leg: new Array()
    }
  }

  setActivity = (activity) => {
    if (this.activity === activity) return;
    this.activity = activity;
    this.Init();
  }
  setResults = (results) => {
    this.results = results;
  }

  drawHat = () => {
    const heart = require('../images/hat/0.png');
    const img = new Image(); img.src = heart;
    img.width /= 2; img.height /= 2;

    const pose = this.results.poseLandmarks;
    let x1 = pose[8].x * this.width;
    let x2 = pose[7].x * this.width;
    let y1 = pose[8].y * this.height;
    let y2 = pose[7].y * this.height;

    let xNose = pose[0].x * this.width;
    let yNose = pose[0].y * this.height;
    const distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)) * 10;

    let widthImage = distance;
    let heightImage = distance * 0.2;

    let shoulder11y = pose[11].y * this.height;

    let heightShoulderToNose = Math.abs(yNose - shoulder11y);


    // this.ctx.globalAlpha = 0.5;
    console.log('draw hat', img.src, xNose - widthImage / 2, yNose - heightImage / 2 - heightShoulderToNose, widthImage, heightImage);
    this.ctx.drawImage(img, xNose - widthImage / 2, yNose - heightImage / 2 - heightShoulderToNose, widthImage, heightImage);

  }

  drawLines = () => {
    let flag = [], in_upper = null, in_bottom = null;
    in_upper = upper_activities.find((activity) => activity === this.activity);
    in_bottom = bottom_activities.find((activity) => activity === this.activity);
    if (in_upper && this.activity.includes('left')) { flag = [1]; }
    else if (in_upper && this.activity.includes('right')) { flag = [2]; }
    else if (in_bottom && this.activity.includes('left')) { flag = [3]; }
    else if (in_bottom && this.activity.includes('right')) { flag = [4]; }
    else if (in_upper && in_bottom) { flag = [1, 2, 3, 4]; }
    else if (in_upper) { flag = [1, 2]; }
    else if (in_bottom) { flag = [3, 4]; }

    let arr = [];
    if (flag.includes(1)) arr.push(15);
    if (flag.includes(2)) arr.push(16);
    if (flag.includes(3)) arr.push(27);
    if (flag.includes(4)) arr.push(28);

    let right_hand = [];
    let left_hand = [];
    let right_leg = [];
    let left_leg = [];

    for (let i in arr) {
      i = arr[i];
      let x1 = this.results.poseLandmarks[i].x * this.width;
      let x2 = this.results.poseLandmarks[i - 2].x * this.width;
      let y1 = this.results.poseLandmarks[i].y * this.height;
      let y2 = this.results.poseLandmarks[i - 2].y * this.height;
      let dx = x1 - x2
      let dy = y1 - y2

      dx = dx > 0 && dy > 0 ? x1 + dx : x1 - dx;
      dy = dy > 0 ? y1 + dy : y1 - dy;

      if (i === 15) {
        right_hand.push({
          startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),
          color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        })
      }
      if (i === 16) {
        left_hand.push({
          startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),
          color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        })
      }
      if (i === 27) {
        left_leg.push({
          startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),
          color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        })
      }
      if (i === 28) {
        right_leg.push({
          startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),
          color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        })
      }
    }
    if (this.user === 'me') {
      left_hand.forEach(obj => {
        this.my_array.left_hand.push(obj);
      });
      right_hand.forEach(obj => {
        this.my_array.right_hand.push(obj);
      });
      left_leg.forEach(obj => {
        this.my_array.left_leg.push(obj);
      });
      right_leg.forEach(obj => {
        this.my_array.right_leg.push(obj);
      });
    }
    else {
      left_hand.forEach(obj => {
        this.your_array.left_hand.push(obj);
      });
      right_hand.forEach(obj => {
        this.your_array.right_hand.push(obj);
      });
      left_leg.forEach(obj => {
        this.your_array.left_leg.push(obj);
      });
      right_leg.forEach(obj => {
        this.your_array.right_leg.push(obj);
      });
    }
    console.log(this.my_array, this.your_array);
    const drawL = (array) => {
      for (const index in array) {
        const part = array[index];
        let end = part.length, start = end > 10 ? end - 10 : 0;
        for (let i = end - 1; i >= start; i--) {
          const line = part[i];
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(line.startX, line.startY);
          this.ctx.lineTo(line.endX, line.endY);
          this.ctx.strokeStyle = line.color;
          this.ctx.stroke();
        }
      }
    }
    this.user === 'me' ? drawL(this.my_array) : drawL(this.your_array)
  }

  drawPosPoint = (pose, number, distance) => {
    const heart = require('../images/heart/0.png');
    const img = new Image(); img.src = heart;
    // this.ctx.save();
    // this.ctx.translate(pose[number].x * this.width, pose[number].y * this.height);
    this.ctx.globalAlpha = this.globalAlpha[this.gIndex % this.globalAlpha.length];
    // console.log(`pose: x:${pose[number].x * this.width}, y:${pose[number].y * this.height}, globalAlpha: ${this.globalAlpha[this.gIndex % this.globalAlpha.length]}, distance: ${distance}`)
    this.ctx.drawImage(img, ((pose[number].x * this.width) / 2) - distance / 2, ((pose[number].y * this.height) / 2) - distance, img.width / distance, img.height / distance);
    // this.ctx.restore();
  }

  drawNegPoint = (pose, number, distance) => {
    const heart = require('../images/heart/0.png');
    const img = new Image(); img.src = heart;
    // this.ctx.save();
    // this.ctx.translate(pose[number].x * this.width, pose[number].y * this.height);
    this.ctx.globalAlpha = this.globalAlpha[this.gIndex % this.globalAlpha.length];
    console.log(`neg: img: ${img.src},x:${pose[number].x * this.width}, y:${pose[number].y * this.height}, globalAlpha: ${this.globalAlpha[this.gIndex % this.globalAlpha.length]}, distance: ${distance}`)
    this.ctx.drawImage(img, ((pose[number].x * this.width) / 2) - distance / 2, ((pose[number].y * this.height) / 2) - distance, img.width / distance, img.height / distance);
    // this.ctx.restore();
  }

  drawHeart = () => {
    const heart = require('../images/heart/0.png');
    const img = new Image(); img.src = heart;

    const pose = this.results.poseLandmarks;
    let x1 = pose[12].x * this.width;
    let x2 = pose[11].x * this.width;
    let y1 = pose[12].y * this.height;
    let y2 = pose[11].y * this.height;

    const distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2));
    // img.width = distance; img.width = distance;
    // this.ctx.drawImage(img, 0, 0, distance, distance);

    this.drawPosPoint(pose, 28, distance);
    this.drawNegPoint(pose, 27, distance);

    this.drawPosPoint(pose, 26, distance);
    this.drawNegPoint(pose, 25, distance);

    this.drawPosPoint(pose, 24, distance);
    this.drawNegPoint(pose, 23, distance);

    this.drawPosPoint(pose, 12, distance);
    this.drawNegPoint(pose, 11, distance);

    this.gIndex += 1;
  }

  drawBird = () => {
    const head = new Image(); head.src = EyesBird;
    drawHead(this.ctx, this.results.poseLandmarks, head);

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
    const index = this.index % birdGIFPos1.length;
    this.index += 1;
    x1 = this.results.poseLandmarks[8].x * this.width;
    y1 = this.results.poseLandmarks[8].y * this.height;
    x2 = this.results.poseLandmarks[7].x * this.width;
    y2 = this.results.poseLandmarks[7].y * this.height;
    const step = 40
    this.dxBird += this.dxBird <= x2 ? step : -1 * step;
    this.dyBird += this.dyBird <= y2 ? step : -1 * step;

    if (this.dxBird < 0) this.dxBird = 0;
    if (this.dxBird > this.width) this.dxBird = this.width;
    if (this.dyBird < 0) this.dyBird = 0;
    if (this.dyBird > this.height) this.dyBird = this.height;
    this.dxBird2 += this.dxBird2 <= x1 ? step : -1 * step;
    this.dyBird2 += this.dyBird2 <= y1 ? step : -1 * step;
    if (this.dxBird2 < 0) this.dxBird2 = 0;
    if (this.dxBird2 > this.width) this.dxBird2 = this.width;
    if (this.dyBird2 < 0) this.dyBird2 = 0;
    if (this.dyBird2 > this.height) this.dyBird2 = this.height;
    let img = new Image(), img2 = new Image();
    img.src = this.dxBird <= x2 ? birdGIFPos1[index] : birdGIFNeg1[index];
    img2.src = this.dxBird2 <= x1 ? birdGIFPos1[index] : birdGIFNeg1[index];

    console.log(`(x1: ${x1}, y1: ${y1}), (x2: ${x2}, y2: ${y2})`)
    console.log(`this.dxBird: ${this.dxBird}, this.dyBird: ${this.dyBird}, this.dxBird2: ${this.dxBird2}, this.dyBird2: ${this.dyBird2}`)
    if (this.activity.includes('left')) {
      this.ctx.globalAlpha = 0.5;
      this.ctx.drawImage(img, this.dxBird, this.dyBird, distance, distance);
    }
    else if (this.activity.includes('right')) {
      this.ctx.globalAlpha = 0.5;
      this.ctx.drawImage(img2, this.dxBird2, this.dyBird2, distance, distance);
    }
    else {
      this.ctx.globalAlpha = 0.5;
      this.ctx.drawImage(img, this.dxBird, this.dyBird, distance, distance);

      this.ctx.globalAlpha = 0.5;
      this.ctx.drawImage(img2, this.dxBird2, this.dyBird2, distance, distance);
    }
    let img3 = new Image(), img4 = new Image();
    img3.src = this.dxBird <= x2 ? birdGIFPos2[index] : birdGIFNeg2[index];
    img4.src = this.dxBird2 <= x1 ? birdGIFPos2[index] : birdGIFNeg2[index];
    if (this.activity.includes('left')) {
      this.ctx.globalAlpha = 0.5;
      this.ctx.drawImage(img3, this.dxBird - 40, this.dyBird - 40, distance / 2, distance / 2);
    }
    else if (this.activity.includes('right')) {
      this.ctx.globalAlpha = 0.5;
      this.ctx.drawImage(img4, this.dxBird2 - 40, this.dyBird2 - 40, distance / 2, distance / 2);
    }
    else {
      this.ctx.globalAlpha = 0.5;
      this.ctx.drawImage(img3, this.dxBird, this.dyBird, distance / 2, distance / 2);

      this.ctx.globalAlpha = 0.5;
      this.ctx.drawImage(img4, this.dxBird2, this.dyBird2, distance / 2, distance / 2);
    }
  }

  drowButterfly = () => {
    let x1 = this.results.poseLandmarks[12].x * this.width;
    let x2 = this.results.poseLandmarks[11].x * this.width;
    let y1 = this.results.poseLandmarks[12].y * this.height;
    let y2 = this.results.poseLandmarks[11].y * this.height;

    let distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)) * 10;
    const { yellow } = require('./Array_AR/butterfly');
    // const index = this.index % yellow.length;
    // this.index += 1;
    // x1 = this.results.poseLandmarks[15].x * this.width;
    // y1 = this.results.poseLandmarks[15].y * this.height;
    // x2 = this.results.poseLandmarks[16].x * this.width;
    // y2 = this.results.poseLandmarks[16].y * this.height;

    // let img = new Image(), img2 = new Image();
    // img.src = this.dxBird <= x2 ? yellow[index] : yellow[index];
    // img2.src = this.dxBird2 <= x1 ? yellow[index] : yellow[index];

    // this.ctx.globalAlpha = 0.7;
    // // console.log("img2.src", img2.src);
    // this.ctx.drawImage(img, x1, y1, distance, distance);
    // this.ctx.drawImage(img2, x2, y2, distance, distance);

    //////////////yellow//////////////////

    // let x1 = this.results.poseLandmarks[13].x * this.width;
    // let y1 = this.results.poseLandmarks[13].y * this.height;
    // let x2 = this.results.poseLandmarks[14].x * this.width;
    // let y2 = this.results.poseLandmarks[14].y * this.height;
    // const distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)) * 10;

    // this.dxEl += this.dxEl <= x2 ? step : -1 * step;
    // this.dyEl += this.dyEl <= y2 ? step : -1 * step;

    // if (this.dxEl < 0) this.dxEl = 0;
    // if (this.dxEl > this.width) this.dxEl = this.width;
    // if (this.dyEl < 0) this.dyEl = 0;
    // if (this.dyEl > this.height) this.dyEl = this.height;
    // this.dxEl2 += this.dxEl2 <= x1 ? step : -1 * step;
    // this.dyEl2 += this.dyEl2 <= y1 ? step : -1 * step;
    // if (this.dxEl2 < 0) this.dxEl2 = 0;
    // if (this.dxEl2 > this.width) this.dxEl2 = this.width;
    // if (this.dyEl2 < 0) this.dyEl2 = 0;
    // if (this.dyEl2 > this.height) this.dyEl2 = this.height;

    // let img3 = new Image(), img4 = new Image();
    // img3.src = this.dxEl <= x2 ? yellow[index] : yellow[index];
    // img4.src = this.dxEl2 <= x1 ? yellow[index] : yellow[index];
    // console.log('img', img3.src, this.dxEl, this.dyEl, distance, distance);
    // this.ctx.drawImage(img3, this.dxEl, this.dyEl, distance, distance);
    // this.ctx.drawImage(img4, this.dxEl2, this.dyEl2, distance, distance);
    // this.ctx.drawImage(img4, 0, 0, distance, distance);


    ////////////face//////////////////////

    const face = require('../images/baterflay/heart.png');
    const imgface = new Image(); imgface.src = face;
    imgface.width /= 2; imgface.height /= 2;

    const pose = this.results.poseLandmarks;
    let xNose = pose[0].x * this.width;
    let yNose = pose[0].y * this.height;

    let widthImage = distance;
    let heightImage = distance;

    console.log(imgface.src);
    this.ctx.drawImage(imgface, xNose, yNose, widthImage, heightImage);
  }

  drawflay = () => {
    const imgPiza = new Image(); imgPiza.src = require('../images/baterflay/heart.png');
    const imgFlay = new Image(); imgFlay.src = require('../images/baterflay/yelow/1.PNG');
    const imgFlay2 = new Image(); imgFlay2.src = require('../images/baterflay/yelow/5.PNG');
    const imgFlay3 = new Image(); imgFlay2.src = require('../images/baterflay/yelow/8.PNG');
    const imgFlay4 = new Image(); imgFlay2.src = require('../images/baterflay/blue/8.PNG');

    imgPiza.width /= 2; imgPiza.height /= 2;

    const pose = this.results.poseLandmarks;
    let x1 = pose[8].x * this.width;
    let x2 = pose[7].x * this.width;
    let y1 = pose[8].y * this.height;
    let y2 = pose[7].y * this.height;

    let distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)) * 10;
    let left__x, left_e_y = null;
    let l__x, l_y = null;
    let l__x2, l_y2 = null;
    let l__x3, l_y3 = null;
    let l__x12, l_y12 = null;

    if (pose[33]) {
      left__x = pose[33].x * this.width;
      left_e_y = pose[33].y * this.height;
    }

    if (pose[35]) {
      l__x = pose[35].x * this.width;
      l_y = pose[35].y * this.height;
    }

    if (pose[36]) {
      l__x2 = pose[36].x * this.width;
      l_y2 = pose[36].y * this.height;
    }
    if (pose[37]) {
      l__x3 = pose[37].x * this.width;
      l_y3 = pose[37].y * this.height;
    }

    if (pose[12]) {
      l__x12 = pose[12].x * this.width;
      l_y12 = pose[12].y * this.height;
    }

    let widthImage = distance;
    let heightImage = distance;
    this.ctx.globalAlpha = 0.8;
    pose[33] && left__x && left_e_y && this.ctx.drawImage(imgPiza, left__x - widthImage / 2 - 10, left_e_y - heightImage / 2 - 50, widthImage * 1.5, heightImage * 1.5);
    pose[35] && l_y && l__x && this.ctx.drawImage(imgFlay, l__x - widthImage / 2 + 50, l_y - heightImage / 2 - 10, widthImage * 0.5, heightImage * 0.5);
    pose[35] && l_y && l__x && this.ctx.drawImage(imgFlay3, l__x - widthImage / 2 + 70, l_y - heightImage / 2 + 50, widthImage * 0.5, heightImage * 0.5);
    pose[36] && l_y2 && l__x2 && this.ctx.drawImage(imgFlay3, l__x2 - widthImage / 2 - 50, l_y2 - heightImage / 2 - 50, widthImage * 0.5, heightImage * 0.5);
    pose[37] && l_y3 && l__x3 && this.ctx.drawImage(imgFlay2, l__x3 - widthImage / 2, l_y3 - heightImage / 2, widthImage * 0.5, heightImage * 0.5);
    pose[12] && l_y12 && l__x12 && this.ctx.drawImage(imgFlay3, l__x12 - widthImage / 2, l_y12 - heightImage / 2, widthImage * 0.5, heightImage * 0.5);

    // x1 = this.results.poseLandmarks[12].x * this.width;
    // x2 = this.results.poseLandmarks[11].x * this.width;
    // y1 = this.results.poseLandmarks[12].y * this.height;
    // y2 = this.results.poseLandmarks[11].y * this.height;

    // distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)) * 10;
    const { blue } = require('./Array_AR/butterfly');
    let index = this.index % blue.length;
    this.index += 1;
    x1 = this.results.poseLandmarks[15].x * this.width;
    y1 = this.results.poseLandmarks[15].y * this.height;
    x2 = this.results.poseLandmarks[16].x * this.width;
    y2 = this.results.poseLandmarks[16].y * this.height;

    let img = new Image(), img2 = new Image();
    img.src = blue[index];
    img2.src = blue[index];

    this.ctx.drawImage(imgFlay2, x1, y1, widthImage, heightImage);
    this.ctx.drawImage(imgFlay2, x2, y2, widthImage, heightImage);


    x1 = this.results.poseLandmarks[12].x * this.width;
    y1 = this.results.poseLandmarks[12].y * this.height;
    x2 = this.results.poseLandmarks[11].x * this.width;
    y2 = this.results.poseLandmarks[11].y * this.height;
    this.ctx.drawImage(imgFlay3, x1, y1, widthImage, heightImage);
    this.ctx.drawImage(imgFlay3, x2, y2, widthImage, heightImage);


    x1 = this.results.poseLandmarks[24].x * this.width;
    y1 = this.results.poseLandmarks[24].y * this.height;
    x2 = this.results.poseLandmarks[23].x * this.width;
    y2 = this.results.poseLandmarks[23].y * this.height;
    this.ctx.drawImage(imgFlay4, x1, y1, widthImage, heightImage);
    this.ctx.drawImage(imgFlay4, x2, y2, widthImage, heightImage);
  }

  drawBorger = () => {
    const imgPiza = new Image(); imgPiza.src = Piza;
    const imgCaek = new Image(); imgCaek.src = Cack;
    const imgPopkoen = new Image(); imgPopkoen.src = Popkoen;
    const imgHotdog = new Image(); imgHotdog.src = Hotdog;
    const imgPic2 = new Image(); imgPic2.src = Pic2;
    imgPiza.width /= 2; imgPiza.height /= 2;

    const pose = this.results.poseLandmarks;
    let x1 = pose[8].x * this.width;
    let x2 = pose[7].x * this.width;
    let y1 = pose[8].y * this.height;
    let y2 = pose[7].y * this.height;

    let left_ear_x = pose[7].x * this.width;
    let left_ear_y = pose[7].y * this.height;
    let distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)) * 10;
    let rigth_ear_x = pose[8].x * this.width;
    let rigth_ear_y = pose[8].y * this.height;

    let widthImage = distance;
    let heightImage = distance;

    let estimation_distanc = pose[0].x * this.width;
    let estimation_distanc_y = pose[9].y * this.width;

    let approximation_distance = Math.abs(left_ear_x - estimation_distanc);
    let approximation_distance_y = Math.abs(left_ear_y - estimation_distanc_y);
    let approximation_distance_rigth = Math.abs(rigth_ear_x - estimation_distanc);
    let approximation_distance_y_rigth = Math.abs(rigth_ear_y - estimation_distanc_y);

    this.ctx.globalAlpha = 0.8;
    this.ctx.drawImage(imgPiza, left_ear_x - widthImage / 2 + approximation_distance_y, left_ear_y - heightImage / 2 - approximation_distance, widthImage * 1.5, heightImage * 1.5);
    this.ctx.drawImage(imgCaek, left_ear_x - widthImage / 2 + approximation_distance_y * 0.5, left_ear_y - heightImage / 2 + approximation_distance * 0.5, widthImage, heightImage);
    // this.ctx.drawImage(imgPopkoen, left_ear_x - widthImage / 2 - approximation_distance_y * 1.5, left_ear_y - heightImage / 2 - approximation_distance * 1.3, widthImage * 0.9, heightImage * 0.9);
    // this.ctx.drawImage(imgHotdog, left_ear_x - widthImage / 2 - approximation_distance_y * 0.8, left_ear_y - heightImage / 2 - approximation_distance * 1.8, widthImage * 0.9, heightImage * 0.9);
    this.ctx.drawImage(imgPic2, rigth_ear_x - widthImage / 2 - approximation_distance_y_rigth * 1.2, rigth_ear_y - heightImage / 2 - approximation_distance_rigth * 2.5, widthImage * 1.5, heightImage * 1.5);


    x1 = this.results.poseLandmarks[12].x * this.width;
    x2 = this.results.poseLandmarks[11].x * this.width;
    y1 = this.results.poseLandmarks[12].y * this.height;
    y2 = this.results.poseLandmarks[11].y * this.height;

    distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)) * 10;
    const { dancBorger } = require('./Array_AR/borgers');
    const index = this.index % dancBorger.length;
    this.index += 1;
    x1 = this.results.poseLandmarks[15].x * this.width;
    y1 = this.results.poseLandmarks[15].y * this.height;
    x2 = this.results.poseLandmarks[16].x * this.width;
    y2 = this.results.poseLandmarks[16].y * this.height;

    let img = new Image(), img2 = new Image();
    img.src = this.dxBird <= x2 ? dancBorger[index] : dancBorger[index];
    img2.src = this.dxBird2 <= x1 ? dancBorger[index] : dancBorger[index];

    this.ctx.globalAlpha = 0.7;
    this.ctx.drawImage(img, x1, y1, distance, distance);
    this.ctx.drawImage(img2, x2, y2, distance, distance);
  }

  drawGlasses = () => {
    const leftEye = this.results.poseLandmarks[2];
    const rightEye = this.results.poseLandmarks[5];
    const angle = this.getAngle(leftEye, rightEye);

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
  getAngle = (a, b) => {
    return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
  }
  drawCrazy = () => {

    const leftEye = this.results.poseLandmarks[2];
    const rightEye = this.results.poseLandmarks[5];
    const angleC = this.getAngle(leftEye, rightEye);
    const { lips, zombieGIFPos, zombieGIFNeg, face } = require('./Array_AR/crazy');
    let x1 = this.results.poseLandmarks[7].x * this.width;
    let x2 = this.results.poseLandmarks[8].x * this.width;

    let y1 = this.results.poseLandmarks[2].y * this.height;
    let y2 = this.results.poseLandmarks[11].y * this.height;
    const distanceWidth = Math.abs(x1 - x2) * 3.2;
    const distanceHeight = Math.abs(y1 - y2) * 2;

    const head = new Image(); head.src = face[0];
    head.width = distanceWidth; head.height = distanceHeight;
    // drawHead(this.ctx, this.results.poseLandmarks, head);
    this.ctx.save();
    this.ctx.translate(0, 0);
    // this.ctx.rotate(((180 + angleC) * Math.PI) / 180);
    this.ctx.globalAlpha = 0.7;
    this.ctx.drawImage(head, (this.results.poseLandmarks[0].x * this.width) - (head.width / 2) - 15,
      (this.results.poseLandmarks[0].y * this.height) - (head.height / 2) - 25,
      head.width, head.height);


    let index = this.index % lips.length;
    let imgLips = new Image(); imgLips.src = lips[index];

    const xM = (this.results.poseLandmarks[8].x * this.width) - 20;
    const yM = (this.results.poseLandmarks[10].y * this.height)
    imgLips.width = Math.sqrt(Math.pow(this.results.poseLandmarks[8].x * this.width - this.results.poseLandmarks[7].x * this.width, 2));
    imgLips.height = yM;

    this.ctx.save();
    this.ctx.translate(0, 0);
    this.ctx.globalAlpha = 0.7;
    // this.ctx.rotate(((180 + angle) * Math.PI) / 180);
    this.ctx.drawImage(imgLips, xM, yM, imgLips.width, imgLips.height);
    this.ctx.restore();
    // drawImage({ctx: this.ctx, image: imgLips, x: xM, y: yM, height: imgLips.height, width: imgLips.width, rotation: 0, offsetX: 1, offsetY: 1, ar: 'none'});


    //LeftUpperArm
    const leftUpperArm = new Image(); leftUpperArm.src = LeftUpperArmC;
    drawLeftUpperArm(this.ctx, this.results.poseLandmarks, leftUpperArm);

    //RightUpperArm
    const rightUpperArm = new Image(); rightUpperArm.src = RightUpperArmC;
    drawRightUpperArm(this.ctx, this.results.poseLandmarks, rightUpperArm);

    //LeftForearm
    const leftForearm = new Image(); leftForearm.src = LeftForearmC;
    drawLeftForearm(this.ctx, this.results.poseLandmarks, leftForearm);

    //RightForearm
    const rightForearm = new Image(); rightForearm.src = RightForearmC;
    drawRightForearm(this.ctx, this.results.poseLandmarks, rightForearm);


    index = this.index % zombieGIFNeg.length;
    let imgZ = new Image()
    imgZ.src = this.cahngeWalk ? zombieGIFPos[index] : zombieGIFNeg[index];

    if (this.cahngeWalk) {
      this.dxBird += 50;
      if (this.dxBird >= this.width) {
        this.cahngeWalk = false;
      }
    } else {
      this.dxBird -= 50;
      if (this.dxBird <= 0) {
        this.cahngeWalk = true;
      }
    }
    imgZ.width = 200; imgZ.height = 200;
    this.ctx.globalAlpha = 0.5;
    this.ctx.drawImage(imgZ, this.dxBird, 300, 100, 100);
    this.ctx.globalAlpha = 0.5;
    this.ctx.drawImage(imgZ, this.dxBird, 400, 100, 100);
    this.index += 1;
  }

  drawRain = () => {
    let init = [];
    let maxParts = 1000;
    for (let i = 0; i < maxParts; i++) {
      init.push({
        x: Math.random() * this.width, y: Math.random() * this.height,
        l: Math.random() * 1, xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10,
      })
    }

    let particles = [];
    for (let i = 0; i < maxParts; i++) {
      particles[i] = init[i];
    }

    const drawR = () => {
      particles.forEach(p => {
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        this.ctx.stroke();
      })

      particles.forEach(p => {
        p.x += p.xs;
        p.y += p.ys;
        if (p.x > this.width || p.y > this.height) {
          p.x = Math.random() * this.width;
          p.y = -20;
        }
      })
    }

    drawR();
  }

  drawSkeleton = () => {

    //drawHead
    const head = new Image(); head.src = Head;
    drawHead(this.ctx, this.results.poseLandmarks, head);

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
    const leftHand = new Image(); leftHand.src = LeftHand;
    drawLeftHand(this.ctx, this.results.poseLandmarks, leftHand);

    // RightHand
    const rightHand = new Image(); rightHand.src = RightHand;
    drawRightHand(this.ctx, this.results.poseLandmarks, rightHand);

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
  draw = (ar) => {
    switch (ar) {
      case 'bird': this.drawBird(); break;
      case 'horse': this.drawGlasses(); break;
      case 'zombie': this.drawCrazy(); break;
      case 'rain': this.drawSkeleton(); break;
      default: console.log('ar not exist for this activity'); break;
    }
  }
  draw = () => {

    if (this.activity === 'none') return;

    for (const ar in activity_ar) {
      for (const activity in activity_ar[ar]) {
        if (activity_ar[ar][activity] === this.activity) {
          switch (ar) {
            case 'bird': this.drawBird(); break;
            case 'horse': this.drawHeart(); break;
            case 'rainbow': this.drawLines(); break;
            case 'zombie': this.drawCrazy(); break;
            case 'rain': this.drawSkeleton(); break;
            case 'hat': this.drawHat(); break;
            case 'borger': this.drawBorger(); break;
            case 'butterfly': this.drowButterfly(); break;
            case 'flay': this.drawflay(); break;
            default: console.log('ar not exist for this activity'); break;
          }
          return;
        }
      }
    }
  }
}

export default Draw;