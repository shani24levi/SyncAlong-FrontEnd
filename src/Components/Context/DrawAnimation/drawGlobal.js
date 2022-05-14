import { bottom_activities, upper_activities, activity_ar } from './points_parts';
import { getAngle, getDistance, getMiddle, } from './vectors';

let my_array = {
  left_hand: new Array(), right_hand: new Array(), left_leg: new Array(), right_leg: new Array()
}

let your_array = {
  left_hand: new Array(), right_hand: new Array(), left_leg: new Array(), right_leg: new Array()
}

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
    this.index = 0; this.cahngeWalk = true;
  }

  setActivity = (activity) => {
    if (this.activity === activity) return;
    this.activity = activity;
    console.log('this.activity', this.activity);
    this.Init();
  }
  setResults = (results) => {
    this.results = results;
  }
  setSyncScore = (sync) => {
    this.syncScore = sync;
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
      let dx = this.different(x1, x2);
      let dy = this.different(y1, y2);

      dx = dx > 0 && dy > 0 ? x1 + dx : x1 - dx;
      dy = dy > 0 ? y1 + dy : y1 - dy;

      if (i === 15) {
        this.user === "me" ?
          my_array.right_hand.push({
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          })
          :
          your_array.right_hand.push({
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          })

        //  this.user === "me" ? my_array.right_hand.refresh() : your_array.right_hand.refresh()
      }
      if (i === 16) {
        this.user === "me" ?
          my_array.left_hand.push({
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          })
          :
          your_array.left_hand.push({
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          })

        // this.user === "me" ? my_array.left_hand.refresh() : your_array.left_hand.refresh()
      }
      if (i === 27) {
        this.user === "me" ?
          my_array.left_leg.push({
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          })
          :
          your_array.left_leg.push({
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          })

        // this.user === "me" ? my_array.left_leg.refresh() : your_array.left_leg.refresh()
      }
      if (i === 28) {
        this.user === "me" ?
          my_array.right_leg.push({
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          })
          :
          your_array.right_leg.push({
            startX: parseInt(x1), startY: parseInt(y1), endX: parseInt(dx), endY: parseInt(dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          })
        // console.log(this.right_leg);
        // this.user === "me" ? my_array.right_leg.refresh() : your_array.right_leg.refresh()

      }
    }
    // console.log("this.user: ", this.user, this.user == 'me', this.user == 'you');
    // if(this.user === 'me'){
    //   console.log({left_hand: left_hand[0], right_hand: right_hand[0],
    //     left_leg: left_leg[0],right_leg: right_leg[0]});
    //   my_array.left_hand.push(left_hand[0]);
    //   console.log(my_array.left_hand);
    //   my_array.right_hand.push(right_hand[0]);
    //   console.log(my_array.right_hand);
    //   my_array.left_leg.push(left_leg[0]);
    //   console.log(my_array.left_leg);
    //   my_array.right_leg.push(right_leg[0]);
    //   console.log(my_array.right_leg);
    //   console.log('my_array',my_array);
    // }
    // else{
    //   console.log({left_hand: left_hand[0], right_hand: right_hand[0],
    //     left_leg: left_leg[0],right_leg: right_leg[0]});
    //   your_array.left_hand.push(left_hand[0]);
    //   console.log(your_array.left_hand);
    //   your_array.right_hand.push(right_hand[0]);
    //   console.log(your_array.right_hand);
    //   your_array.left_leg.push(left_leg[0]);
    //   console.log(your_array.left_leg);
    //   your_array.right_leg.push(right_leg[0]);
    //   console.log(your_array.right_leg);
    //   console.log('your_array',your_array);
    // }

    console.log(my_array, your_array);
    const drawL = (array) => {
      for (const index in array) {
        const part = array[index];
        let end = part.length, start = end > 10 ? end - 10 : 0;
        part.splice(start, end).forEach((line => {
          if (line !== undefined && line.startX !== undefined && line.startY !== undefined &&
            line.endX !== undefined && line.endY !== undefined && line.color !== undefined) {
            this.ctx.lineWidth = 7;
            this.ctx.beginPath();
            this.ctx.moveTo(line.startX, line.startY); this.ctx.lineTo(line.endX, line.endY);
            this.ctx.strokeStyle = line.color;
            this.ctx.stroke();
          }
        }))
      }
    }
    this.user === 'me' ? drawL(my_array) : drawL(your_array)
  }

  drawBird = () => {

    const eyeWidth = 205;
    const eyesToMouth = 220;
    const shoulderWidth = 517;
    const hipToShoulderHeight = 745;
    const upperArmLength = 327;
    const forearmLength = 386;
    {
      const leftEye = this.results.poseLandmarks[2];
      const rightEye = this.results.poseLandmarks[5];
      const leftMouth = this.results.poseLandmarks[9];
      const rightMouth = this.results.poseLandmarks[10];
      const nose = this.results.poseLandmarks[0];

      if (leftEye && rightEye && leftMouth && rightMouth && nose) {
        const angle = getAngle(leftEye, rightEye);
        const distance = getDistance(leftEye, rightEye);
        const xScale = distance / eyeWidth;
        const middleEye = getMiddle(leftEye, rightEye);
        const middleMouth = getMiddle(leftMouth, rightMouth);
        const mouthToEyeDistance = getDistance(middleEye, middleMouth);
        const yScale = mouthToEyeDistance / eyesToMouth;
        const head = new Image(); head.src = EyesBird;
        console.log('head', head.src);
        console.log('nose')
        this.drawImage(head, nose.x, nose.y, head.height * yScale * 1.5, head.width * xScale * 1.5, angle, 0.55, 0.8);
      }
    }
    let x1 = this.results.poseLandmarks[12].x * this.width;
    let x2 = this.results.poseLandmarks[11].x * this.width;
    let y1 = this.results.poseLandmarks[12].y * this.height;
    let y2 = this.results.poseLandmarks[11].y * this.height;

    const distance = Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)) * 10;

    // console.log('distance', distance);
    const { birdGIFPos1, birdGIFNeg1, birdGIFPos2, birdGIFNeg2, } = require('./Array_AR/bird');
    const index = this.index % birdGIFPos1.length;
    this.index += 1;
    x1 = this.results.poseLandmarks[20].x * this.width;
    y1 = this.results.poseLandmarks[20].y * this.height;
    x2 = this.results.poseLandmarks[21].x * this.width;
    y2 = this.results.poseLandmarks[21].y * this.height;
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
    if (this.activity.includes('left')) {
      this.ctx.drawImage(img, this.dxBird, this.dyBird, distance, distance);
    }
    else if (this.activity.includes('right')) {
      this.ctx.drawImage(img2, this.dxBird2, this.dyBird2, distance, distance);
    }
    else {
      this.ctx.drawImage(img, this.dxBird, this.dyBird, distance, distance);
      this.ctx.drawImage(img2, this.dxBird2, this.dyBird2, distance, distance);
    }
    let img3 = new Image(), img4 = new Image();
    img3.src = this.dxBird <= x2 ? birdGIFPos2[index] : birdGIFNeg2[index];
    img4.src = this.dxBird2 <= x1 ? birdGIFPos2[index] : birdGIFNeg2[index];
    if (this.activity.includes('left')) {
      this.ctx.drawImage(img3, this.dxBird - 50, this.dyBird - 50, distance / 5, distance / 5);
    }
    else if (this.activity.includes('right')) {
      this.ctx.drawImage(img4, this.dxBird2 - 50, this.dyBird2 - 50, distance / 5, distance / 5);
    }
    else {
      this.ctx.drawImage(img3, this.dxBird, this.dyBird, distance / 5, distance / 5);
      this.ctx.drawImage(img4, this.dxBird2, this.dyBird2, distance / 5, distance / 5);
    }
  }

  drawGlasses = () => {
    // console.log('start droe', new Date().toLocaleString('en-GB'));
    // console.log(this.results.poseLandmarks, this.ctx, this.width, this.height);
    const { glasses } = require('./Array_AR/glasses');
    const { horseGIFPos, horseGIFNeg } = require('./Array_AR/horse');
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
    // console.log(img.src, x1, y1);
    // console.log('start ctx', new Date().toLocaleString('en-GB'));
    this.ctx.drawImage(img, (this.results.poseLandmarks[0].x * this.width) - img.width / 2, (this.results.poseLandmarks[0].y * this.height) - img.height / 2, img.width, img.height);
    // console.log('end ctx', new Date().toLocaleString('en-GB'));

    const index = this.index % horseGIFNeg.length;
    let imgZ = new Image()
    imgZ.src = this.cahngeWalk ? horseGIFPos[index] : horseGIFNeg[index];
    const p27 = this.results.poseLandmarks[27].y * this.height;
    const p28 = this.results.poseLandmarks[28].y * this.height;
    let d = p27 - p28;
    d = d > 0 ? d : d * -1;
    if (d === 10) {

    }
    else if (p27 < p28) {
      this.dxBird += 50;
      this.cahngeWalk = false;
    } else {
      this.dxBird -= 50;
      this.cahngeWalk = true;
    }
    imgZ.width = 200; imgZ.height = 200;
    // console.log(this.dxBird, imgZ.height, imgZ.width);
    this.ctx.drawImage(imgZ, this.dxBird, 300, 100, 100);
    this.ctx.drawImage(imgZ, this.dxBird, 400, 100, 100);

  }
  drawCrazy = () => {
    const { lips, zombieGIFPos, zombieGIFNeg, face } = require('./Array_AR/crazy');
    let x1 = this.results.poseLandmarks[7].x * this.width;
    let x2 = this.results.poseLandmarks[8].x * this.width;

    let y1 = this.results.poseLandmarks[2].y * this.height;
    let y2 = this.results.poseLandmarks[11].y * this.height;
    const distanceWidth = Math.abs(x1 - x2) * 3.2;
    const distanceHeight = Math.abs(y1 - y2) * 2;

    let imgFace = new Image(); imgFace.src = face[0];
    imgFace.width = distanceWidth; imgFace.height = distanceHeight;
    // this.ctx.drawImage(imgFace, (this.results.poseLandmarks[0].x * this.width) - (imgFace.width / 2) - 15,
    //   (this.results.poseLandmarks[0].y * this.height) - (imgFace.height / 2) - 25,
    //   imgFace.width, imgFace.height);
    const eyeWidth = 205;
    const eyesToMouth = 220;
    const shoulderWidth = 517;
    const hipToShoulderHeight = 745;
    const upperArmLength = 327;
    const forearmLength = 386;
    {
      const leftEye = this.results.poseLandmarks[2];
      const rightEye = this.results.poseLandmarks[5];
      const leftMouth = this.results.poseLandmarks[9];
      const rightMouth = this.results.poseLandmarks[10];
      const nose = this.results.poseLandmarks[0];

      if (leftEye && rightEye && leftMouth && rightMouth && nose) {
        const angle = getAngle(leftEye, rightEye);
        const distance = getDistance(leftEye, rightEye);
        const xScale = distance / eyeWidth;
        const middleEye = getMiddle(leftEye, rightEye);
        const middleMouth = getMiddle(leftMouth, rightMouth);
        const mouthToEyeDistance = getDistance(middleEye, middleMouth);
        const yScale = mouthToEyeDistance / eyesToMouth;
        const head = new Image(); head.src = face[0];
        console.log('head', head.src);
        console.log('nose')
        this.drawImage(head, nose.x, nose.y, head.height * yScale * 1.5, head.width * xScale * 1.5, angle, 0.55, 0.8);
      }
    }

    let index = this.index % lips.length;
    let imgLips = new Image(); imgLips.src = lips[index];

    const xM = (this.results.poseLandmarks[8].x * this.width) - 20;
    const yM = (this.results.poseLandmarks[10].y * this.height)
    imgLips.width = Math.sqrt(Math.pow(this.results.poseLandmarks[8].x * this.width - this.results.poseLandmarks[7].x * this.width, 2));
    imgLips.height = yM;
    this.ctx.drawImage(imgLips, xM,
      yM, imgLips.width, imgLips.height);


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
    // console.log(this.dxBird, imgZ.height, imgZ.width);
    this.ctx.drawImage(imgZ, this.dxBird, 300, 100, 100);
    this.ctx.drawImage(imgZ, this.dxBird, 400, 100, 100);

    // index = this.index % birdGIFPos.length;
    // let 
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
  drawImage = (image, x, y, height, width, rotation, offsetX, offsetY) => {
    x = x * this.width;
    y = y * this.height;
    height = height * this.height;
    width = width * this.width;
    console.log(`{image: ${image.src}, x: ${x}, y: ${y}, width: ${width}, height: ${height}, rotation: ${rotation}, offsetX: ${offsetX}, offsetY: ${offsetY}`);
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(((180 + rotation) * Math.PI) / 180);
    this.ctx.drawImage(image, 0 - (width * offsetX), 0 - (height * offsetY), width, height);
    this.ctx.restore();
  }
  drawSkeleton = () => {
    const eyeWidth = 205;
    const eyesToMouth = 220;
    const shoulderWidth = 517;
    const hipToShoulderHeight = 745;
    const upperArmLength = 327;
    const forearmLength = 386;
    //drawHead
    {
      const leftEye = this.results.poseLandmarks[2];
      const rightEye = this.results.poseLandmarks[5];
      const leftMouth = this.results.poseLandmarks[9];
      const rightMouth = this.results.poseLandmarks[10];
      const nose = this.results.poseLandmarks[0];

      if (leftEye && rightEye && leftMouth && rightMouth && nose) {
        const angle = getAngle(leftEye, rightEye);
        const distance = getDistance(leftEye, rightEye);
        const xScale = distance / eyeWidth;
        const middleEye = getMiddle(leftEye, rightEye);
        const middleMouth = getMiddle(leftMouth, rightMouth);
        const mouthToEyeDistance = getDistance(middleEye, middleMouth);
        const yScale = mouthToEyeDistance / eyesToMouth;
        const head = new Image(); head.src = Head;
        console.log('head', head.src);
        console.log('nose')
        this.drawImage(head, nose.x, nose.y, head.height * yScale, head.width * xScale, angle, 0.55, 0.8);
      }
    }
    //Body
    {
      const leftShoulder = this.results.poseLandmarks[11];
      const rightShoulder = this.results.poseLandmarks[12];
      const leftHip = this.results.poseLandmarks[23];
      const rightHip = this.results.poseLandmarks[24];
      if (leftShoulder && rightShoulder && leftHip && rightHip) {
        const angle = getAngle(leftShoulder, rightShoulder);
        const distance = getDistance(leftShoulder, rightShoulder);
        const xScale = distance / shoulderWidth;
        const middleShoulder = getMiddle(leftShoulder, rightShoulder);
        const middleHip = getMiddle(leftHip, rightHip);
        const shoulderToHipDistance = getDistance(middleShoulder, middleHip);
        const yScale = shoulderToHipDistance / hipToShoulderHeight;
        const body = new Image(); body.src = Body;
        this.drawImage(body, middleShoulder.x, middleShoulder.y, body.height * yScale, body.width * xScale, angle, 0.5, 0.1);
      }
    }
    //LeftUpperArm
    {
      const leftShoulder = this.results.poseLandmarks[11];
      const leftElbow = this.results.poseLandmarks[13];

      if (leftShoulder && leftElbow) {
        const angle = getAngle(leftElbow, leftShoulder);
        const distance = getDistance(leftShoulder, leftElbow);
        const xScale = distance / upperArmLength;
        const yScale = xScale;
        const leftUpperArm = new Image(); leftUpperArm.src = LeftUpperArm;
        this.drawImage(leftUpperArm, leftShoulder.x, leftShoulder.y, leftUpperArm.height * yScale, leftUpperArm.width * xScale, angle - 90, 0.5, 0);
      }
    }
    //RightUpperArm
    {
      const rightShoulder = this.results.poseLandmarks[12];
      const rightElbow = this.results.poseLandmarks[14];

      if (rightShoulder && rightElbow) {
        const angle = getAngle(rightElbow, rightShoulder);
        const distance = getDistance(rightShoulder, rightElbow);
        const xScale = distance / upperArmLength;
        const yScale = xScale;
        const rightUpperArm = new Image(); rightUpperArm.src = RightUpperArm;
        this.drawImage(rightUpperArm, rightShoulder.x, rightShoulder.y, rightUpperArm.height * yScale, rightUpperArm.width * xScale, angle - 90, 0.5, 0);
      }
    }

    //LeftForearm
    {
      const leftElbow = this.results.poseLandmarks[13];
      const leftWrist = this.results.poseLandmarks[15];

      if (leftElbow && leftWrist) {
        const angle = getAngle(leftWrist, leftElbow);
        const distance = getDistance(leftElbow, leftWrist);
        const xScale = distance / forearmLength;
        const yScale = xScale;
        const leftForearm = new Image(); leftForearm.src = LeftForearm;
        this.drawImage(leftForearm, leftElbow.x, leftElbow.y, leftForearm.height * yScale, leftForearm.width * xScale, angle - 90, 0.5, 0);
      }
    }

    //RightForearm
    {
      const rightElbow = this.results.poseLandmarks[14];
      const rightWrist = this.results.poseLandmarks[16];
      if (rightElbow && rightWrist) {
        const angle = getAngle(rightWrist, rightElbow);
        const distance = getDistance(rightElbow, rightWrist);
        const xScale = distance / forearmLength;
        const yScale = xScale;
        const rightForearm = new Image(); rightForearm.src = RightForearm;
        this.drawImage(rightForearm, rightElbow.x, rightElbow.y, rightForearm.height * yScale, rightForearm.width * xScale, angle - 90, 0.5, 0);
      }
    }


    // LeftHand
    {
      const leftWrist = this.results.poseLandmarks[15];
      const leftIndex = this.results.poseLandmarks[19];
      const leftPinky = this.results.poseLandmarks[17];

      const length = 125;

      if (leftWrist && leftIndex && leftPinky) {
        const middleFingers = getMiddle(leftIndex, leftPinky);
        const angle = getAngle(middleFingers, leftWrist);
        const distance = getDistance(leftWrist, middleFingers);
        const xScale = distance / length;
        const yScale = xScale;
        const leftHand = new Image(); leftHand.src = LeftHand;
        this.drawImage(leftHand, leftWrist.x, leftWrist.y, leftHand.height * yScale, leftHand.width * xScale, angle + 270, 0.5, 0);
      }
    }

    // RightHand
    {
      const rightWrist = this.results.poseLandmarks[16];
      const rightIndex = this.results.poseLandmarks[20];
      const rightPinky = this.results.poseLandmarks[18];

      const length = 125;

      if (rightWrist && rightIndex && rightPinky) {
        const middleFingers = getMiddle(rightIndex, rightPinky);
        const angle = getAngle(middleFingers, rightWrist);
        const distance = getDistance(rightWrist, middleFingers);
        const xScale = distance / length;
        const yScale = xScale;
        const leftHand = new Image(); leftHand.src = LeftHand;
        this.drawImage(leftHand, rightWrist.x, rightWrist.y, leftHand.height * yScale, leftHand.width * xScale, angle + 270, 0.5, 0);
      }
    }

    //LeftThigh
    {
      const leftHip = this.results.poseLandmarks[23];
      const leftKnee = this.results.poseLandmarks[25];

      const length = 482;

      if (leftHip && leftKnee) {
        const angle = getAngle(leftKnee, leftHip);
        const distance = getDistance(leftHip, leftKnee);
        const xScale = distance / length;
        const yScale = xScale;
        const leftThigh = new Image(); leftThigh.src = LeftThigh;
        this.drawImage(leftThigh, leftHip.x, leftHip.y, leftThigh.height * yScale, leftThigh.width * xScale, angle - 90, 0.5, 0.1);
      }
    }

    //RightThigh
    {
      const rightHip = this.results.poseLandmarks[24];
      const rightKnee = this.results.poseLandmarks[26];

      const length = 482;

      if (rightHip && rightKnee) {
        const angle = getAngle(rightKnee, rightHip);
        const distance = getDistance(rightHip, rightKnee);
        const xScale = distance / length;
        const yScale = xScale;
        const rightThigh = new Image(); rightThigh.src = RightThigh;
        this.drawImage(rightThigh, rightHip.x, rightHip.y, rightThigh.height * yScale, rightThigh.width * xScale, angle - 90, 0.5, 0.1);
      }
    }

    // LeftLowerLeg
    {
      const leftKnee = this.results.poseLandmarks[25];
      const leftAnkle = this.results.poseLandmarks[27];

      const length = 464;

      if (leftAnkle && leftKnee) {
        const angle = getAngle(leftKnee, leftAnkle);
        const distance = getDistance(leftAnkle, leftKnee);
        const xScale = distance / length;
        const yScale = xScale;
        const leftLowerLeg = new Image(); leftLowerLeg.src = LeftLowerLeg;
        this.drawImage(leftLowerLeg, leftKnee.x, leftKnee.y, leftLowerLeg.height * yScale, leftLowerLeg.width * xScale, angle - 270, 0.5, 0.1);
      }
    }

    // RightLowerLeg
    {
      const rightKnee = this.results.poseLandmarks[26];
      const rightAnkle = this.results.poseLandmarks[28];

      const length = 464;

      if (rightAnkle && rightKnee) {
        const angle = getAngle(rightKnee, rightAnkle);
        const distance = getDistance(rightAnkle, rightKnee);
        const xScale = distance / length;
        const yScale = xScale;
        const rightLowerLeg = new Image(); rightLowerLeg.src = RightLowerLeg;
        this.drawImage(rightLowerLeg, rightKnee.x, rightKnee.y, rightLowerLeg.height * yScale, rightLowerLeg.width * xScale, angle - 270, 0.5, 0.1);
      }
    }
  }
  draw = () => {
    // console.log('activity', this.activity)
    // this.activity = 'hands-x';
    if (this.activity === 'none') return;
    //this.drawBird(); return;
    //console.log('activity_ar', activity_ar);
    for (const ar in activity_ar) {
      // console.log('ar', ar);
      for (const activity in activity_ar[ar]) {
        //  console.log('activity', activity);
        if (activity_ar[ar][activity] === this.activity) {
          switch (ar) {
            case 'bird': this.drawBird(); break;
            case 'horse': this.drawGlasses(); break;
            //  case 'rainbow': this.drawLines(); break;
            case 'zombie': this.drawCrazy(); break;
            case 'rain': this.drawSkeleton(); break;
            default: console.log('ar not exist for this activity'); break;
          }
          return;
        }
      }
    }
  }
}

export default Draw;