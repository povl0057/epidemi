

var canvas2 = document.getElementById("myOtherCanvas")
var width2 = canvas2.width
var height2 = canvas2.height
var talPlot = canvas2.getContext("2d")
talPlot.font = "15px Arial"


var canvas = document.getElementById("myCanvas")
var width = canvas.width
var height = canvas.height
var ctx = canvas.getContext("2d")
ctx.fillStyle = "red"

var width = canvas.width
var height = canvas.height;


var xVel = Math.random()*10 - 5;
var yVel = Math.random()*10 - 5;
var ballDimension = 5;
var numberOfRects = 400;

var syge = 0
var immune = 0
var raske = numberOfRects
var dead = 0

var point = [2,3]
var rects = []
rects.push([Math.random()*width,Math.random()*height,Math.random()*10 - 5,Math.random()*10 - 5, [255,0,0],0])

for(var i = 0; i < numberOfRects - 1; i++){
//lille sandsynlighed for at den spawner immun
  if(Math.random()>0.995){
    rects.push([Math.random()*width,Math.random()*height,Math.random()*10 - 5,Math.random()*10 - 5, [0,0,255],1])

  }else{
    rects.push([Math.random()*width,Math.random()*height,Math.random()*10 - 5,Math.random()*10 - 5, [0,0,255],0])
  }
}

function update(progress) {

  updateRects()

}

function updateRects(){
  syge = 0
  raske = 0
  immune = 0
  for (var i = 0; i < rects.length; i++) {

      rects[i][0] += rects[i][2]
      rects[i][1] += rects[i][3]
      if (rects[i][0]> width - ballDimension|| rects[i][0] < 0) {
        rects[i][2] = -rects[i][2]
      }
      if (rects[i][1] > height - ballDimension || rects[i][1] <0) {
        rects[i][3] = -rects[i][3]
      }

      if (rects[i][4][0] == 255){
        //dræb
        if(Math.random() > 0.999){
          rects.splice(i,1)
        }
        //gør rask og immun
        else if(Math.random() > 0.9999){
          rects[i][4][2] = 255
          rects[i][4][0] = 0
          rects[i][5] = 1



        }
      }
}
  for(var i = 0;i<rects.length;i++){
    if(rects[i][4][0]== 255){
      syge += 1
    }else{
      if(rects[i][5] == 1){
        immune += 1
      }
      raske += 1
    }



    var otherRects = []
    for(var k = 0;k<rects.length;k++){
      if (k != i){
        otherRects.push(rects[k])

      }
    }
    for (var j = 0; j< otherRects.length; j++){
      var d1x = rects[i][0]-(otherRects[j][0]+ballDimension)
      var d1y = rects[i][1]-(otherRects[j][1]+ballDimension)
      var d2x = otherRects[j][0]-(rects[i][0]+ballDimension)
      var d2y = otherRects[j][1]-(rects[i][1]+ballDimension)
      if(d1x<0 && d1y <0 && d2x<0 && d2y<0){ //hvis to rects rør hinanden
          rects[i][2] = rects[i][2]*Math.sign(otherRects[j][2])
          rects[i][3] = rects[i][3]*Math.sign(otherRects[j][3])
          if(rects[i][4][0] == 255 || otherRects[j][4][0] == 255){
            if(rects[i][5] == 0 && otherRects[j][5] == 0){
             if(Math.random()> 0.9){
               rects[i][4][0] = 255
               otherRects[j][4][0] = 255
               rects[i][4][2] = 0
               otherRects[j][4][2] = 0
             }
           }
          }
      }


  }


  }

  dead = numberOfRects - rects.length
}

function drawRects(){
  for (var i = 0; i < rects.length; i++) {
      ctx.fillStyle = 'rgb(' + rects[i][4][0] + ', ' + rects[i][4][1] + ', ' + rects[i][4][2] + ')'
     ctx.fillRect(rects[i][0], rects[i][1], ballDimension, ballDimension)
}
}
function draw() {
  // Draw the state of the world
  ctx.clearRect(0, 0, width, height)
  talPlot.clearRect(0, 0, width2, height2)
  drawRects()
  talPlot.fillText("Population: " + rects.length,10,15)
  talPlot.fillText("S: " + raske,10,35)
  talPlot.fillText("I: " + syge,10,55)
  talPlot.fillText("R: " + (dead + immune),10,75)

  talPlot.fillText("Døde: " + dead,10,95)
  talPlot.fillText("Immune: " + immune,10,115)

}
function checkCollision(){

}
function loop(timestamp) {
  var progress = timestamp - lastRender

  update(progress)
  draw()

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)

window.onload = function () {

  var dps = []; // dataPoints
  var dpsSyge = [];
  var dpsRaske = [];
  var dpsImmune = [];
  
  var chart = new CanvasJS.Chart("chartContainer", {
    title :{
      text: "Epidemimodel"
    },
    axisX: {
       title: "Tid [deci-sekunder]"
    },
    axisY: {
          gridThickness: 0,
      title: "Antal",
    },
    data: [{
      type: "line",
      showInLegend: true,
      name: "Antal levende",
      dataPoints: dps
    },
    {
      type: "line",
      showInLegend: true,
      name: "I(t)",
      dataPoints: dpsSyge
    },
    {
      type: "line",
      showInLegend: true,
      name: "S(t)",
      dataPoints: dpsRaske
    },
    {
      type: "line",
      showInLegend: true,
      name: "R(t)",
      dataPoints: dpsImmune
    },
  ]
  });
  
  var xVal = 0;
  var yVal = numberOfRects
  
  var yValI = 0;
  var yValS= yVal;
  var yValR = immune + dead;
  
  
  var updateInterval = 100;
  var dataLength = 20; // number of dataPoints visible at any point
  
  var stop = false
var updateChart = function (count) {

	count = count || 1;

	for (var j = 0; j < count; j++) {
		yVal = rects.length
		dps.push({
			x: xVal,
			y: yVal
		});

    yValI= syge
		dpsSyge.push({
			x: xVal,
			y: yValI
		});

    yValS = raske
		dpsRaske.push({
			x: xVal,
			y: yValS
		});
    yValR = immune + dead
		dpsImmune.push({
			x: xVal,
			y: yValR
		});
		xVal++;
	}
  if(immune > syge && xVal >= 300){
    stop = true
  }
  if(stop == false){
    chart.render();

  }
};

updateChart(dataLength);
setInterval(function(){updateChart()}, updateInterval);

}
