import card from './../images/card.png';
import monkey from './../images/monkey.png';
import cat from './../images/cat.gif';
import { convertValueToMeridiem } from '@mui/lab/internal/pickers/time-utils';
// import  * as GIF from 'gif.js.optimized/dist/gif';
// const GIF = require('gif.js.optimized/dist/gif');

/**
 * flag = 0 => draw card,
 * flag = 1 => draw monkey,
 * flag = 2 => draw cat,
 */
// let gif = new  GIF();
let img = new Image();
let b = false;
let array = [];

const different = (a, b) => {
    // return Math.abs(a - b);
    return a-b;
}
const draw = (ctx, canvas, results, flag = 0, x = 0, y = 0) => {
  // ctx.drawImage(image, x, y);
  console.log(results);
  console.log('flag', flag);
  if (flag == 0) {
    img.src = card;
  } else if (flag == 1) {
    img.src = monkey;
  } else if (flag == 2) {
    img.src = cat;
  } else if (flag == 3) {
    for(let i in [15,16]){
        console.log([15,16][i]);
        i = [15,16][i];
        let x1 = (results.poseLandmarks[i].x) * canvas.width;
        let x2 = (results.poseLandmarks[i - 2].x) * canvas.width;
        let y1 = (results.poseLandmarks[i].y) * canvas.height;
        let y2 = (results.poseLandmarks[i - 2].y) * canvas.height;
        let dx = different(x1, x2);
        let dy = different(y1, y2);
        array.push({
        startX:   parseInt(x1),
        startY:   parseInt(y1),
        endX:     parseInt((dx > 0 && dy > 0) ? x1 + dx : x1 - dx),
        endY:     parseInt(dy > 0 ? y1 + dy : y1 - dy),
        color: '#'+Math.floor(Math.random()*16777215).toString(16)
        });
    }
    ctx.lineWidth = 5;
    for (var i = array.length - 1; i >= array.length - 50; i--) {
      if (i < 0) return;
      const line = array[i];
      ctx.beginPath();
      ctx.moveTo(line.startX, line.startY);
      ctx.lineTo(line.endX, line.endY);
      ctx.strokeStyle = line.color;
      ctx.stroke();
    }
  } else if (flag == 4) {
    ctx.bezierCurveTo()
    ctx.stroke();
  }
};

export default draw;
