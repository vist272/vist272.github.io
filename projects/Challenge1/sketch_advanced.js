//////////////////////////////////////////////////////////////////////////
//
// Create Blobby Shapes Using Implicits - Advanced Interactive Version
// VIST 270, p5.js conversion of Challenge 1 Advanced Solution
// Users can click and drag to create circles, then watch them merge
//
// Converted from Python p5py to p5.js
//
//////////////////////////////////////////////////////////////////////////

import { coordinateFrame } from './coordsys.js';

let img;
let maxthreshold;
let threshold;
let maxPts = 6;
let haveAllClicks = false;
let circles = [];
let c0 = [0.0, 0.5, 1.0, 1.0];    // color near boundary of implicit surface
let c1 = [1.0, 0.5, 0.0, 0.0];    // color near center of implicit surface
let dragStartPos = null;

function dist(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

// Linear interpolation between RGBA colors using parameter 0 <= t <= 1
// Returns interpolated color as a p5.Color
function colorinterp(t, c0, c1) {
  if (t < 0) t = 0;
  else if (t > 1) t = 1;

  let r0 = c0[0], r1 = c1[0];
  let g0 = c0[1], g1 = c1[1];
  let b0 = c0[2], b1 = c1[2];
  let a0 = c0[3], a1 = c1[3];

  let r = (1 - t) * r0 + t * r1;
  let g = (1 - t) * g0 + t * g1;
  let b = (1 - t) * b0 + t * b1;
  let a = (1 - t) * a0 + t * a1;

  return color(r, g, b, a);
}

// Implicit function for a circle: exp((r - sqrt((x - xc)^2) / r))^2
// returns exp(1)^2 in center of circle, 1.0 on the perimeter of the circle, 
// exponentially diminishing values beyond perimeter of circle
function fcircle(x, y, xc, yc, r) {
  let d = (r - sqrt((x - xc) * (x - xc) + (y - yc) * (y - yc))) / r;
  let f = Math.exp(d) * Math.exp(d);
  return f;
}

// Initialize by opening window, and allocating pixels for image
function setup() {
  createCanvas(600, 600);

  colorMode(RGB, 1.0, 1.0, 1.0, 1.0);

  img = createImage(600, 600);
  img.loadPixels();

  // max threshold value when at perimeter of a circle
  maxthreshold = fcircle(0.0, 0.0, 0.0, 0.0, 1.0);
  threshold = maxthreshold;
}

// Each time through the drawing loop, color all pixels based on the 
// implicit function value induced by all circles
function draw() {
  coordinateFrame(0, 0, width, height);

  if (!haveAllClicks) {
    background(0);
    if (circles.length == maxPts && !dragStartPos) {
      haveAllClicks = true;
    } else {
      // Draw the circles being created
      fill(1, 1, 1, 1);
      stroke(1, 1, 1, 1);
      for (let circleData of circles) {
        let xc = circleData[0];
        let yc = circleData[1];
        let r = circleData[2];
        circle(xc, yc, r * 2);
      }
    }
  } else {
    // iterate over all pixels, coloring each pixel based on the implicit function at that location
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        // accumulate the implicit values for all circles at the pixel's location
        let f = 0;
        for (let circle of circles) {
          let xc = circle[0];
          let yc = circle[1];
          let r = circle[2];
          f += fcircle(x, y, xc, yc, r);
        }

        // color the pixel black if below threshold,
        // or interpolated between c0 & c1 if above threshold
        let c;
        if (f < threshold) {
          c = color(0, 0, 0, 1);
        } else {
          c = colorinterp((f - threshold) / maxthreshold, c0, c1);
        }

        // Set pixel color in the image
        let i = y * img.width + x;
        img.pixels[i] = c;
      }
    }

    // update the pixmap in the image and draw it to the screen
    img.updatePixels();
    image(img, 0, 0);

    // reduce threshold by 1/20 of maximum on each drawing loop
    // stopping at 1/10 of the maximum
    if (threshold > maxthreshold / 10.0) {
      threshold -= maxthreshold / 20.0;
    } else {
      noLoop();
    }
  }
}

function mousePressed() {
  if (!haveAllClicks) {
    dragStartPos = [mouseX, height - mouseY];
    circles.push([dragStartPos[0], dragStartPos[1], 0]);
  }
}

function mouseDragged() {
  if (dragStartPos) {
    let radius = dist(dragStartPos[0], dragStartPos[1], mouseX, height - mouseY);
    circles[circles.length - 1] = [dragStartPos[0], dragStartPos[1], radius];
  }
}

function mouseReleased() {
  dragStartPos = null;
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseDragged = mouseDragged;
window.mouseReleased = mouseReleased;
