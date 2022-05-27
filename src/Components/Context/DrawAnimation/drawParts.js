import { getAngle, getDistance, getMiddle, } from './vectors';

export const drawPosPoint = (ctx,pose, number, distance,img, globalAlpha = null, gIndex = 0) => {
    if(globalAlpha)
            ctx.globalAlpha = globalAlpha[gIndex % globalAlpha.length];
    else    ctx.globalAlpha = 0.6;
    if(globalAlpha)
            ctx.drawImage(img, (pose[number].x * _width) - (distance * 2), (pose[number].y * _height) - (distance * 2), distance * 4, distance * 4);
    else    ctx.drawImage(img, (pose[number].x * _width) - (distance / 4), (pose[number].y * _height) - (distance / 4), distance / 1.5, distance / 1.5);
}
export const drawNegPoint = (ctx, pose, number, distance, img, globalAlpha = null, gIndex = 0) => {
    if(globalAlpha)
    ctx.globalAlpha = globalAlpha[gIndex % globalAlpha.length];
    else    ctx.globalAlpha = 0.6;
    if(globalAlpha)
            ctx.drawImage(img, (pose[number].x * _width) - (distance * 2), (pose[number].y * _height) - (distance * 2), distance * 4, distance * 4);
    else    ctx.drawImage(img, (pose[number].x * _width) - (distance / 4), (pose[number].y * _height) - (distance / 4), distance / 1.5, distance / 1.5);
}
const _width = 640;
const _height = 480;
export const drawImage = ({ctx, image, x, y, height, width, rotation, offsetX, offsetY}) => {
    x = x * _width;
    y = y * _height;
    height = height * _height;
    width = width * _width;
    console.log(`{image: ${image.src}, x: ${x}, y: ${y}, width: ${width}, height: ${height}, rotation: ${rotation}, offsetX: ${offsetX}, offsetY: ${offsetY}`);
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = 0.7;
    ctx.rotate(((180 + rotation) * Math.PI) / 180);
    ctx.drawImage(image, 0 - (width * offsetX), 0 - (height * offsetY), width, height);
    ctx.restore();
}
export const drawEye = (ctx, pose, image) => {
    console.log(pose);
    if(!pose) return;

    const leftEye  =    pose[35] || null;
    const rightEye =    pose[36] || null;
    const forehead =    pose[39] || null;
    const nose     =    pose[40] || null;

    if(!leftEye || !rightEye || !forehead || !nose){
        console.log(`you don't have all poses`);
        return;
    }

    const angle = getAngle(leftEye, rightEye);
    const xScale = getDistance(leftEye, rightEye);
    const yScale = getDistance(forehead, nose);

    drawImage({ctx: ctx, image: image, x: nose.x, y: nose.y, height: yScale * 10, width: xScale * 2, rotation: angle, offsetX: 0.5, offsetY: 0.7});


}
export const drawEye2 = (ctx, pose, image) => {
    if(!pose) return;
    
    const leftEye  =    pose[35] || null;
    const rightEye =    pose[36] || null;
    const forehead =    pose[39] || null;
    const nose     =    pose[40] || null;

    if(!leftEye || !rightEye || !forehead || !nose){
        console.log(`you don't have all poses`);
        return;
    }
    
    const angle = getAngle(leftEye, rightEye);
    const xScale = getDistance(leftEye, rightEye);
    const yScale = getDistance(forehead, nose);

    drawImage({ctx: ctx, image: image, x: nose.x, y: nose.y + 0.05, height: yScale * 12, width: xScale * 1.2, rotation: angle, offsetX: 0.5, offsetY: 0.7});
}
export const drawEye3 = (ctx, pose, image) => {
    if(!pose) return;
    
    const leftEye  =    pose[35] || null;
    const rightEye =    pose[36] || null;
    const forehead =    pose[39] || null;
    const nose     =    pose[40] || null;

    if(!leftEye || !rightEye || !forehead || !nose){
        console.log(`you don't have all poses`);
        return;
    }
    
    const angle = getAngle(leftEye, rightEye);
    const xScale = getDistance(leftEye, rightEye);
    const yScale = getDistance(forehead, nose);

    drawImage({ctx: ctx, image: image, x: forehead.x, y: forehead.y, height: yScale * 12, width: xScale * 1.2, rotation: angle, offsetX: 0.5, offsetY: 0.7});
}
export const drawlips = (ctx, pose, image) => {
    if(!pose) return;    
    
    const topLips       =   pose[41] || null;
    const bottomLips    =   pose[42] || null;
    const leftLips      =   pose[43] || null;
    const rightLips     =   pose[44] || null;

    if(!leftLips || !rightLips || !bottomLips || !topLips){
        console.log(`you don't have all poses`);
        return;
    }
    
    const angle = getAngle(rightLips, leftLips);
    const xScale = getDistance(leftLips, rightLips) * _width;
    const yScale = getDistance(topLips, bottomLips) * _height;

    
    console.log(topLips, bottomLips);
    console.log(leftLips, rightLips);
    console.log(xScale, yScale);

    ctx.drawImage(image, topLips.x * _width - (xScale/2), topLips.y * _height, xScale, yScale);
    //drawImage({ctx: ctx, image: image, x: topLips.x, y: topLips.y, height: 1, width: 1, rotation: angle, offsetX: 0.5, offsetY: 0.7});
}
export const drawHead = (ctx, pose, image) => {
    if(!pose) return;
    const eyeWidth = 205;
    const eyesToMouth = 220;
    
    const leftEye = pose[2];
    const rightEye = pose[5];
    const leftMouth = pose[9];
    const rightMouth = pose[10];
    const nose = pose[0];
    
    if (leftEye && rightEye && leftMouth && rightMouth && nose) {
        const angle = getAngle(leftEye, rightEye);
        const distance = getDistance(leftEye, rightEye);
        const xScale = distance / eyeWidth;
        const middleEye = getMiddle(leftEye, rightEye);
        const middleMouth = getMiddle(leftMouth, rightMouth);
        const mouthToEyeDistance = getDistance(middleEye, middleMouth);
        const yScale = mouthToEyeDistance / eyesToMouth;
        drawImage({ctx: ctx, image: image, x: nose.x, y: nose.y, height: image.height * yScale, width: image.width * xScale, rotation: angle, offsetX: 0.55, offsetY: 0.8});
    }
}
export const drawHead2 = (ctx, pose, image) => {
    if(!pose) return;

    const leftEye       =    pose[35] || null;
    const rightEye      =    pose[36] || null;
    const head          =    pose[33] || null;
    const bottomface    =    pose[34] || null;
    const nose          =    pose[40] || null;
    if(!leftEye || !rightEye || !head || !bottomface || !nose) {
        console.log(`you don't have all poses`);
        return;
    }

    const widthImage = getDistance(rightEye, leftEye);
    const heightImage = getDistance(head, bottomface);
    const angle = getAngle(leftEye, rightEye);
    drawImage({ctx: ctx, image: image, x: nose.x, y: nose.y, height: heightImage, width: widthImage, rotation: angle, offsetX: 0.5, offsetY: 0.4});
}
   
export const drawBody = (ctx, pose, image) =>{
    const shoulderWidth = 517;
    const hipToShoulderHeight = 745;

    const leftShoulder = pose[11];
    const rightShoulder = pose[12];
    const leftHip = pose[23];
    const rightHip = pose[24];
    if (leftShoulder && rightShoulder && leftHip && rightHip) {
        const angle = getAngle(leftShoulder, rightShoulder);
        const distance = getDistance(leftShoulder, rightShoulder);
        const xScale = distance / shoulderWidth;
        const middleShoulder = getMiddle(leftShoulder, rightShoulder);
        const middleHip = getMiddle(leftHip, rightHip);
        const shoulderToHipDistance = getDistance(middleShoulder, middleHip);
        const yScale = shoulderToHipDistance / hipToShoulderHeight;
        drawImage({ctx: ctx, image: image, x: middleShoulder.x, y: middleShoulder.y, height: image.height * yScale, width: image.width * xScale, rotation: angle, offsetX: 0.5, offsetY: 0.1});
    }
}
export const drawLeftUpperArm = (ctx, pose, image) => {
    const upperArmLength = 327;

    const leftShoulder = pose[11];
    const leftElbow = pose[13];
    if (leftShoulder && leftElbow) {
        const angle = getAngle(leftElbow, leftShoulder);
        const distance = getDistance(leftShoulder, leftElbow);
        const xScale = distance / upperArmLength;
        const yScale = xScale;
        drawImage({ctx: ctx, image: image, x: leftShoulder.x, y: leftShoulder.y, height: image.height * yScale, width: image.width * xScale, rotation: angle - 90, offsetX: 0.5, offsetY: 0});
    }
}
export const drawRightUpperArm = (ctx, pose, image) => {

    const upperArmLength = 327;
    const rightShoulder = pose[12];
    const rightElbow = pose[14];
    if (rightShoulder && rightElbow) {
        const angle = getAngle(rightElbow, rightShoulder);
        const distance = getDistance(rightShoulder, rightElbow);
        const xScale = distance / upperArmLength;
        const yScale = xScale;
        drawImage({ctx: ctx, image: image, x: rightShoulder.x, y: rightShoulder.y, height: image.height * yScale, width: image.width * xScale, rotation: angle - 90, offsetX: 0.5, offsetY: 0});
    }
}
export const drawLeftForearm = (ctx, pose, image) => {
    const forearmLength = 386;
    const leftElbow = pose[13];
    const leftWrist = pose[15];

    if (leftElbow && leftWrist) {
        const angle = getAngle(leftWrist, leftElbow);
        const distance = getDistance(leftElbow, leftWrist);
        const xScale = distance / forearmLength;
        const yScale = xScale;
        drawImage({ctx: ctx, image: image, x: leftElbow.x, y: leftElbow.y, height: image.height * yScale, width: image.width * xScale, rotation: angle - 90, offsetX: 0.5, offsetY: 0});
    }
}
export const drawRightForearm = (ctx, pose, image) => {
    const forearmLength = 386;
    const rightElbow = pose[14];
    const rightWrist = pose[16];
    if (rightElbow && rightWrist) {
        const angle = getAngle(rightWrist, rightElbow);
        const distance = getDistance(rightElbow, rightWrist);
        const xScale = distance / forearmLength;
        const yScale = xScale;
        drawImage({ctx: ctx, image: image, x: rightElbow.x, y: rightElbow.y, height: image.height * yScale, width: image.width * xScale, rotation: angle - 90, offsetX: 0.5, offsetY: 0});
    }
}
export const drawLeftHand = (ctx, pose, image) => {
    
    const leftWrist = pose[15];
    const leftIndex = pose[19];
    const leftPinky = pose[17];

    const length = 125;

    if (leftWrist && leftIndex && leftPinky) {
        const middleFingers = getMiddle(leftIndex, leftPinky);
        const angle = getAngle(middleFingers, leftWrist);
        const distance = getDistance(leftWrist, middleFingers);
        const xScale = distance / length;
        const yScale = xScale;
        drawImage({ctx: ctx, image: image, x: leftWrist.x, y: leftWrist.y, height: image.height * yScale, width: image.width * xScale, rotation: angle + 270, offsetX: 0.5, offsetY: 0});
    }
}
export const drawRightHand = (ctx, pose, image) => {
    const rightWrist = pose[16];
    const rightIndex = pose[20];
    const rightPinky = pose[18];

    const length = 125;

    if (rightWrist && rightIndex && rightPinky) {
        const middleFingers = getMiddle(rightIndex, rightPinky);
        const angle = getAngle(middleFingers, rightWrist);
        const distance = getDistance(rightWrist, middleFingers);
        const xScale = distance / length;
        const yScale = xScale;
        drawImage({ctx: ctx, image: image, x: rightWrist.x, y: rightWrist.y, height: image.height * yScale, width: image.width * xScale, rotation: angle + 270, offsetX: 0.5, offsetY: 0});
    }
}
export const drawLeftThigh = (ctx, pose, image) => {
    const leftHip = pose[23];
    const leftKnee = pose[25];

    const length = 482;

    if (leftHip && leftKnee) {
      const angle = getAngle(leftKnee, leftHip);
      const distance = getDistance(leftHip, leftKnee);
      const xScale = distance / length;
      const yScale = xScale;
      drawImage({ctx: ctx, image: image, x: leftHip.x, y: leftHip.y, height: image.height * yScale, width: image.width * xScale, rotation: angle - 90, offsetX: 0.5, offsetY: 0.1});
    }
}
export const drawRightThigh = (ctx, pose, image) => {
    const rightHip = pose[24];
    const rightKnee = pose[26];

    const length = 482;

    if (rightHip && rightKnee) {
      const angle = getAngle(rightKnee, rightHip);
      const distance = getDistance(rightHip, rightKnee);
      const xScale = distance / length;
      const yScale = xScale;
      drawImage({ctx: ctx, image: image, x: rightHip.x, y: rightHip.y, height: image.height * yScale, width: image.width * xScale, rotation: angle - 90, offsetX: 0.5, offsetY: 0.1});
    }
}
export const drawLeftLowerLeg = (ctx, pose, image) => {
    const leftKnee = pose[25];
    const leftAnkle = pose[27];

    const length = 464;

    if (leftAnkle && leftKnee) {
        const angle = getAngle(leftKnee, leftAnkle);
        const distance = getDistance(leftAnkle, leftKnee);
        const xScale = distance / length;
        const yScale = xScale;
        drawImage({ctx: ctx, image: image, x: leftKnee.x, y: leftKnee.y, height: image.height * yScale, width: image.width * xScale, rotation: angle - 270, offsetX: 0.5, offsetY: 0.1});
    }
}
export const drawRightLowerLeg = (ctx, pose, image) => {
    const rightKnee = pose[26];
    const rightAnkle = pose[28];

    const length = 464;

    if (rightAnkle && rightKnee) {
    const angle = getAngle(rightKnee, rightAnkle);
    const distance = getDistance(rightAnkle, rightKnee);
    const xScale = distance / length;
    const yScale = xScale;
    drawImage({ctx: ctx, image: image, x: rightKnee.x, y: rightKnee.y, height: image.height * yScale, width: image.width * xScale, rotation: angle - 270, offsetX: 0.5, offsetY: 0.1});
    }
}