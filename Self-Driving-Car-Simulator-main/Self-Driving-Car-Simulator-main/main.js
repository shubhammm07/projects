const canvas = document.getElementById('myCanvas');

canvas.width = 200;

const ctx = canvas.getContext('2d');
const road = new Road(canvas.width/2,canvas.width*0.9);
const N=300;
const cars = generateCars(N);
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")){
  for(let i=0;i<cars.length;i++){
    cars[i].brain=JSON.parse(localStorage.getItem("bestBrain"));
    if(i!=0){
      NeuralNetwork.mutate(cars[i].brain,0.1);
    }
  }
}
const traffic = [
  new Car(road.getLaneCentre(1),-100,30,50,"DUMMY",2,"red"),
  new Car(road.getLaneCentre(2),-250,30,50,"DUMMY",2,"red"),
  new Car(road.getLaneCentre(0),-250,30,50,"DUMMY",2,"red"),
  new Car(road.getLaneCentre(1),-400,30,50,"DUMMY",2,"red"),
  new Car(road.getLaneCentre(2),-400,30,50,"DUMMY",2,"red"),
  new Car(road.getLaneCentre(1),-550,30,50,"DUMMY",2,"red"),
  new Car(road.getLaneCentre(0),-550,30,50,"DUMMY",2,"red"),
  new Car(road.getLaneCentre(0),-700,30,50,"DUMMY",2,"red"),
  new Car(road.getLaneCentre(2),-700,30,50,"DUMMY",2,"red"),
  new Car(road.getLaneCentre(1),-850,30,50,"DUMMY",2,"red"),
  new Car(road.getLaneCentre(0),-850,30,50,"DUMMY",2,"red"),
  new Car(road.getLaneCentre(1),-1000,30,50,"DUMMY",2,"red"),
  new Car(road.getLaneCentre(2),-1000,30,50,"DUMMY",2,"red"),

];



function generateCars(N){
  const cars=[];
  for(let i=1;i<=N;i++){
    cars.push(new Car(road.getLaneCentre(1),100,30,50,"AI",3,"blue"));
  }
  return cars;
}
animate();

function save(){
  localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain));
}
function discard(){
  localStorage.removeItem("bestBrain");
}

function animate(){
  for(let i=0;i<traffic.length;i++){
    traffic[i].update(road.borders,[]);
  }
  for(let i=0;i<cars.length;i++){
    cars[i].update(road.borders,traffic);
  }

  bestCar=cars.find(
    c=>c.y==Math.min(...cars.map(c=>c.y))
  );
  canvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0,-bestCar.y+canvas.height*0.7);
  road.draw(ctx);
  for(let i=0;i<traffic.length;i++){
    traffic[i].draw(ctx);
  }
  ctx.globalAlpha=0.2;
  for(let i=0;i<cars.length;i++){
    cars[i].draw(ctx);
  }
  ctx.globalAlpha=1;
  bestCar.draw(ctx,true);



  ctx.restore();
  requestAnimationFrame(animate);
}
