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

let my_Draw = null;
let your_Draw = null
const draw = (ctx, canvas, results, activity_now = 'none', user = 'me') => {

  activity_now = 'open-close';
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

  // console.log(`activity_now is ${activity_now}`);
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
};

export default draw;
