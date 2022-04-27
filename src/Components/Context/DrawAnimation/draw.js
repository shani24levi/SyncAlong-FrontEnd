import Draw from './drawGlobal';

let my_Draw = null, your_Draw = null;
let my_array = [], your_array = [];
const draw = (ctx, canvas, results, activity_now = 'none', user = 'me') => {
  console.log(user, my_Draw, your_Draw);
  if(user === 'me' && !my_Draw){
    my_Draw = new Draw(ctx, canvas, activity_now);
  }
  if(user === 'you' && !your_Draw){
    your_Draw = new Draw(ctx, canvas, activity_now);
  }
  // user === 'me' ? my_Draw.setArray(my_array) : your_Draw.setArray(your_array);
  
  user === 'me' ? my_Draw.setActivity(activity_now) : your_Draw.setActivity(activity_now);
  user === 'me' ? my_Draw.setResults(results) : your_Draw.setResults(results);

  user === 'me' ? my_Draw.draw() : your_Draw.draw();

  // user === 'me' ? my_array = my_Draw.getArray() : your_array = your_Draw.getArray(); //

  // console.log(my_array, your_array);
};

export default draw;
