//Create variables here
var Dog, happyDog, database, foodS, foodStock
var dogImg, dogImg2;
var foodObj

function preload()
{
	//load images here
 dogImg = loadImage('./images/dogimg.png');
dogImg2 = loadImage('./images/dogimg1.png');
happyDog = loadImage('./images/happydog.png');
//console.log("dogImg");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
dog = createSprite(250,300,25,25);
dog.addImage(dogImg);
dog.scale = 0.25;
foodStock = database.ref('food');
foodStock.on("value", readstock);

}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(happyDog);
  }
  
  foodObj = new Food();

  drawSprites();

  foodObj.display();

  //add styles here
  stroke(24);
  fill("red");
  textSize(24);
  text("NOTE : Press UP_ARROW Key to feed Drago milk!",5,200); 
  text("Food remaining:" + foodS, 100,100);
}

//Function to read values from database
function readstock(data){
  foodS = data.val();
}

//Function to write values in database
function writeStock(x){
  console.log(x);
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
}