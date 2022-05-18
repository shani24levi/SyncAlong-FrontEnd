import Draw from './drawGlobal';
import { bottom_activities, upper_activities, activity_ar } from './points_parts';

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




const drawLines = (ctx, canvas, results, array_for) => {
  let flag = [];
  let counter = 10;
  let in_upper = null, in_bottom = null;
  in_upper = upper_activities.find((activity) => activity === past_activity);
  in_bottom = bottom_activities.find((activity) => activity === past_activity);

  // console.log("in_upper", in_upper, in_bottom);
  if (in_upper && past_activity.includes('left')) {
    flag = [3];
  }
  else if (in_upper && past_activity.includes('right')) {
    flag = [4];
  }
  else if (in_bottom && past_activity.includes('left')) {
    flag = [5];
  }
  else if (in_bottom && past_activity.includes('right')) {
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
    let dx = x1 - x2;
    let dy = y1 - y2;
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
  console.log(array_for);
  for (const index in array_for) {
    const part = array_for[index];
    let end = part.length;
    let start = 0;
    if (end > counter) {
      start = end - counter;
    }
    console.log(part, start, end);
    for(let i = start; i < end; i ++){
      const line = part[i];
      ctx.beginPath();
      ctx.moveTo(line.startX, line.startY);
      ctx.lineTo(line.endX, line.endY);
      ctx.strokeStyle = line.color;
      ctx.stroke();
    }
    // part.splice(start, end).map((object => {
    //   const line = object;
    //   ctx.beginPath();
    //   ctx.moveTo(line.startX, line.startY);
    //   ctx.lineTo(line.endX, line.endY);
    //   ctx.strokeStyle = line.color;
    //   ctx.stroke();
    // }))
  }
}

let my_Draw = null;
let your_Draw = null
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

  console.log(`activity_now is ${activity_now}`);
  if (activity_now === 'none') return;

  if (user === 'me' && !my_Draw) {
    my_Draw = new Draw(ctx, canvas, results, 'me', activity_now);
  }
  if (user === 'you' && !your_Draw) {
    your_Draw = new Draw(ctx, canvas, results, 'you', activity_now);
  }

  user === 'me' ? my_Draw.setActivity(activity_now) : your_Draw.setActivity(activity_now);
  user === 'me' ? my_Draw.setResults(results) : your_Draw.setResults(results);

  user === 'me' ? my_Draw.draw() : your_Draw.draw(); return;
  console.log(`checking`);
  for (const ar in activity_ar) {
    for (const activity in activity_ar[ar]) {
      if (activity_ar[ar][activity] === activity_now) {
        switch (ar) {
          case 'rainbow': user === 'me'? drawLines(ctx, canvas, results, my_array): drawLines(ctx, canvas, results, your_array); break;
          default: user === 'me' ? my_Draw.draw(ar) : your_Draw.draw(ar); break;
        }
        return;
      }
    }
  }
};

export default draw;
