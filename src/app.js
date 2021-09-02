import {CanvasSpace,Num, Rectangle, Triangle} from "pts";


// Initiate Space and Form
var space = new CanvasSpace("#pts").setup({bgcolor: "black", resize: true, retina: true});
var form = space.getForm();


space.add( (time, ftime) => {

  //rectangle
  var rect = Rectangle.fromCenter(space.center, space.size.$divide(3));
  var poly = Rectangle.corners(rect);
  poly.shear2D(Num.cycle((time % 5000) / 5000) - 0.5, space.center);
  
  // form.strokeOnly("#fff", 3).rect(rect);
  

  //triangle
  let tri = poly.segments(2,1,true);
  tri.map((t) => t.push(space.pointer));

  //circles
  let circles = tri.map((t) => Triangle.incircle(t));
  var circums = tri.map((t) => Triangle.circumcircle(t));
  

  //drawing
  form.fillOnly("rgba(255,255,255,.2)", 1).circles(circums);
  form.fillOnly("#123").polygon(poly);
	form.fill("#f03").circles(circles);
	form.strokeOnly("#fff ", 3).polygons(tri);
	form.fill("#123").point(space.pointer, 5);
})

space.bindMouse().bindTouch().play();
