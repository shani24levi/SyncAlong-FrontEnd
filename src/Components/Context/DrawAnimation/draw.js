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




const drawLines = (ctx, canvas, results, array_for, flag) => {
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
    if (i == 15) {
      array_for.right_hand.push({
        startX: parseInt(x1),
        startY: parseInt(y1),
        endX: parseInt(dx > 0 && dy > 0 ? x1 + dx : x1 - dx),
        endY: parseInt(dy > 0 ? y1 + dy : y1 - dy),
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      });
    }
    if (i == 16) {
      array_for.left_hand.push({
        startX: parseInt(x1),
        startY: parseInt(y1),
        endX: parseInt(dx > 0 && dy > 0 ? x1 + dx : x1 - dx),
        endY: parseInt(dy > 0 ? y1 + dy : y1 - dy),
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      });
    }
    if (i == 28) {
      array_for.right_leg.push({
        startX: parseInt(x1),
        startY: parseInt(y1),
        endX: parseInt(dx > 0 && dy > 0 ? x1 + dx : x1 - dx),
        endY: parseInt(dy > 0 ? y1 + dy : y1 - dy),
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      });
    }
    if (i == 27) {
      array_for.left_leg.push({
        startX: parseInt(x1),
        startY: parseInt(y1),
        endX: parseInt(dx > 0 && dy > 0 ? x1 + dx : x1 - dx),
        endY: parseInt(dy > 0 ? y1 + dy : y1 - dy),
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      });
    }
  }
  ctx.lineWidth = 5;
  for (const index in array_for) {
    // console.log("index: ", index, array_for[index]);
    const part = array_for[index];
    let end = part.length;
    let start = 0;
    if (end > 15) {
      start = end - 15;
    }
    part.splice(start, end).map((object => {
      const line = object;
      ctx.beginPath();
      ctx.moveTo(line.startX, line.startY);
      ctx.lineTo(line.endX, line.endY);
      ctx.strokeStyle = line.color;
      ctx.stroke();
    }))
  }
}



const different = (a, b) => {
  // return Math.abs(a - b);
  return a - b;
};

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
  let flag = [];
  let counter = 15;
  let in_upper = null, in_bottom = null;
  in_upper = upper_activities.find((activity) => activity === activity_now);
  in_bottom = bottom_activities.find((activity) => activity === activity_now);

  // console.log("in_upper", in_upper, in_bottom);
  if (in_upper && activity_now.includes('left')) {
    flag = [3];
  }
  else if (in_upper && activity_now.includes('right')) {
    flag = [4];
  }
  else if (in_bottom && activity_now.includes('left')) {
    flag = [5];
  }
  else if (in_bottom && activity_now.includes('right')) {
    flag = [6];
  }
  else if (in_upper && in_bottom) {
    flag = [3, 4, 5, 6];
  }
  else if (in_upper) {
    flag = [3, 4];
  }
  else if (in_bottom) {
    flag = [5, 6];
  }


  if (flag.includes(0)) {
    img.src = card;
  }
  else if (flag.includes(1)) {
    img.src = monkey;
  }
  else if (flag.includes(2)) {
    img.src = cat;
  }
  else if (flag.includes(3) || flag.includes(4) || flag.includes(5) || flag.includes(6)) {
    // if(!flag.includes(3)){
    //   my_array.right_hand = [];
    //   your_array.right_hand = [];
    // }
    // if(!flag.includes(4)){
    //   my_array.left_hand = [];
    //   your_array.left_hand = [];
    // }
    // if(!flag.includes(5)){
    //   my_array.left_leg = [];
    //   your_array.left_leg = [];
    // }
    // if(!flag.includes(6)){
    //   my_array.right_leg = [];
    //   your_array.right_leg = [];
    // }
    //[1,2,3,4,5]
    //
    drawLines(ctx, canvas, results, user == "me" ? my_array : your_array, flag);
  }
};

export default draw;
