import card from './../images/card.png';
import monkey from './../images/monkey.png';
import cat from './../images/cat.gif';
const {
  bottom_part,
  upper_part,
  bottom_activities,
  upper_activities
} = require('./points_parts');
// import  * as GIF from 'gif.js.optimized/dist/gif';
// const GIF = require('gif.js.optimized/dist/gif');

/**
 * flag = 0 => draw card,
 * flag = 1 => draw monkey,
 * flag = 2 => draw cat,
 */
// let gif = new  GIF();
let img = new Image();
let past_activity = 'none';
let my_array = {
  left_hand: [],
  right_hand: [],
  left_leg: [],
  right_leg: []
};
let your_array = {
  left_hand: [],
  right_hand: [],
  left_leg: [],
  right_leg: []
};

const different = (a, b) => {
  // return Math.abs(a - b);
  return a - b;
};
/**
 *
 * @param {*} ctx for drawImage
 * @param {*} canvas for te canvas
 * @param {*} results for results from mediapipe
 * @param {*} flag is array [0,1,2,3,4] =>
 *                  0-2 is just images
 *                  3 is draw lines in left hand
 *                  4 is draw lines in right hand
 *                  5 is draw lines in left leg
 *                  6 is draw lines in right leg
 * @param {*} user  to know if draw in my canvas or your canvas
 * @returns nothing
 */
const draw = (ctx, canvas, results, activity_now = 'none', user = 'me') => {
  if (past_activity != activity_now) {
    past_activity = activity_now;
    my_array = {
      left_hand: [],
      right_hand: [],
      left_leg: [],
      right_leg: []
    };
    your_array = {
      left_hand: [],
      right_hand: [],
      left_leg: [],
      right_leg: []
    };
  }
  // console.log("start draw", new Date().now);
  let flag = [];
  let counter = 15;
  let in_upper,
    in_bottom = null;
  in_upper = upper_activities.find((activity) => activity === activity_now);
  in_bottom = bottom_activities.find((activity) => activity === activity_now);

  if (in_upper && in_bottom) {
    flag = [3, 4, 5, 6];
  } else if (in_upper && activity_now.includes('left')) {
    flag = [3];
  } else if (in_upper && activity_now.includes('right')) {
    flag = [4];
  } else if (in_bottom && activity_now.includes('left')) {
    flag = [5];
  } else if (in_bottom && activity_now.includes('right')) {
    flag = [6];
  } else if (
    in_upper &&
    !activity_now.includes('right') &&
    !activity_now.includes('left')
  ) {
    flag = [3, 4];
  } else if (
    in_bottom &&
    !activity_now.includes('right') &&
    !activity_now.includes('left')
  ) {
    flag = [5, 6];
  }

  if (flag.includes(0)) {
    img.src = card;
  } else if (flag.includes(1)) {
    img.src = monkey;
  } else if (flag.includes(2)) {
    img.src = cat;
  } else if (
    flag.includes(3) ||
    flag.includes(4) ||
    flag.includes(5) ||
    flag.includes(6)
  ) {
    let arr = [];
    if (flag.includes(3)) arr.push(15);
    if (flag.includes(4)) arr.push(16);
    if (flag.includes(5)) arr.push(27);
    if (flag.includes(6)) arr.push(28);
    for (let i in arr) {
      i = arr[i];
      let x1 = results.poseLandmarks[i].x * canvas.width;
      let x2 = results.poseLandmarks[i - 2].x * canvas.width;
      let y1 = results.poseLandmarks[i].y * canvas.height;
      let y2 = results.poseLandmarks[i - 2].y * canvas.height;
      let dx = different(x1, x2);
      let dy = different(y1, y2);
      if ((user = 'me')) {
        if (i == 15) {
          my_array.right_hand.push({
            startX: parseInt(x1),
            startY: parseInt(y1),
            endX: parseInt(dx > 0 && dy > 0 ? x1 + dx : x1 - dx),
            endY: parseInt(dy > 0 ? y1 + dy : y1 - dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          });
        }
        if (i == 16) {
          my_array.left_hand.push({
            startX: parseInt(x1),
            startY: parseInt(y1),
            endX: parseInt(dx > 0 && dy > 0 ? x1 + dx : x1 - dx),
            endY: parseInt(dy > 0 ? y1 + dy : y1 - dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          });
        }
        if (i == 28) {
          my_array.right_leg.push({
            startX: parseInt(x1),
            startY: parseInt(y1),
            endX: parseInt(dx > 0 && dy > 0 ? x1 + dx : x1 - dx),
            endY: parseInt(dy > 0 ? y1 + dy : y1 - dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          });
        }
        if (i == 27) {
          my_array.left_leg.push({
            startX: parseInt(x1),
            startY: parseInt(y1),
            endX: parseInt(dx > 0 && dy > 0 ? x1 + dx : x1 - dx),
            endY: parseInt(dy > 0 ? y1 + dy : y1 - dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          });
        }
      } else {
        if (i == 15) {
          your_array.right_hand.push({
            startX: parseInt(x1),
            startY: parseInt(y1),
            endX: parseInt(dx > 0 && dy > 0 ? x1 + dx : x1 - dx),
            endY: parseInt(dy > 0 ? y1 + dy : y1 - dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          });
        }
        if (i == 16) {
          your_array.left_hand.push({
            startX: parseInt(x1),
            startY: parseInt(y1),
            endX: parseInt(dx > 0 && dy > 0 ? x1 + dx : x1 - dx),
            endY: parseInt(dy > 0 ? y1 + dy : y1 - dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          });
        }
        if (i == 28) {
          your_array.right_leg.push({
            startX: parseInt(x1),
            startY: parseInt(y1),
            endX: parseInt(dx > 0 && dy > 0 ? x1 + dx : x1 - dx),
            endY: parseInt(dy > 0 ? y1 + dy : y1 - dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          });
        }
        if (i == 27) {
          your_array.left_leg.push({
            startX: parseInt(x1),
            startY: parseInt(y1),
            endX: parseInt(dx > 0 && dy > 0 ? x1 + dx : x1 - dx),
            endY: parseInt(dy > 0 ? y1 + dy : y1 - dy),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
          });
        }
      }
    }
    ctx.lineWidth = 5;
    const array_temp = user == 'me' ? my_array : your_array;
    // array_temp.right_hand => flag = 3
    if (flag.includes(3)) {
      for (
        let i = array_temp.right_hand.length - 1;
        i > array_temp.right_hand.length - counter;
        i--
      ) {
        if (i < 0) return;
        const line = array_temp.right_hand[i];
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.strokeStyle = line.color;
        ctx.stroke();
      }
    } else {
      if ((user = 'me')) my_array.right_hand = [];
      else your_array.right_hand = [];
    }
    // array_temp.left_hand => flag = 4
    if (flag.includes(4)) {
      for (
        let i = array_temp.left_hand.length - 1;
        i > array_temp.left_hand.length - counter;
        i--
      ) {
        if (i < 0) return;
        const line = array_temp.left_hand[i];
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.strokeStyle = line.color;
        ctx.stroke();
      }
    } else {
      if ((user = 'me')) my_array.left_hand = [];
      else your_array.left_hand = [];
    }
    // array_temp.right_leg => flag = 5
    if (flag.includes(5)) {
      for (
        let i = array_temp.right_leg.length - 1;
        i > array_temp.right_leg.length - counter;
        i--
      ) {
        if (i < 0) return;
        const line = array_temp.right_leg[i];
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.strokeStyle = line.color;
        ctx.stroke();
      }
    } else {
      if ((user = 'me')) my_array.right_leg = [];
      else your_array.right_leg = [];
    }
    // array_temp.left_leg => flag = 6
    if (flag.includes(6)) {
      for (
        let i = array_temp.left_leg.length - 1;
        i > array_temp.left_leg.length - counter;
        i--
      ) {
        if (i < 0) return;
        const line = array_temp.left_leg[i];
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.strokeStyle = line.color;
        ctx.stroke();
      }
    } else {
      if ((user = 'me')) my_array.left_leg = [];
      else your_array.left_leg = [];
    }
  }
  // console.log("end draw", new Date().now);
};

export default draw;
