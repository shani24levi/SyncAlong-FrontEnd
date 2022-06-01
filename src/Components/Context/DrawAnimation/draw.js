import Draw from './drawGlobal';

let my_Draw = null;
let your_Draw = null
const draw = (ctx, canvas, results, activity_now = 'none', user = 'me') => {
  // activity_now = 'gamp';
  if (activity_now === 'none') return;

  if (user === 'me' && !my_Draw) {
    my_Draw = new Draw(ctx, canvas);
  }
  if (user === 'you' && !your_Draw) {
    your_Draw = new Draw(ctx, canvas);
  }

  user === 'me' ? my_Draw.setActivity(activity_now) : your_Draw.setActivity(activity_now);
  user === 'me' ? my_Draw.setResults(results) : your_Draw.setResults(results);

  user === 'me' ? my_Draw.draw() : your_Draw.draw(); return;
};

export default draw;
