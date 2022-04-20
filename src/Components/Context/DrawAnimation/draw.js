import Draw from './drawGlobal';

let my_Draw = null, your_Draw = null;
const draw = (ctx, canvas, results, activity_now = 'none', user = 'me') => {

  if(user === 'me' && !my_Draw){
    my_Draw = new Draw(ctx, canvas, activity_now);
  }
  if(user === 'you' && !your_Draw){
    your_Draw = new Draw(ctx, canvas, activity_now);
  }
  user === 'me' ? my_Draw.setActivity(activity_now) : your_Draw.setActivity(activity_now);
  user === 'me' ? my_Draw.setResults(results) : your_Draw.setResults(results);

  user === 'me' ? my_Draw.draw() : your_Draw.draw();

};

export default draw;
