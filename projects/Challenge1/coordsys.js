//
// Module coordsys
// Developed for VIST 270 by Donald House
// Converted from Python to JavaScript for p5.js
// 3/5/2021
//

let frame;

class Frame {
  constructor(xmin, ymin, xmax, ymax) {
    this.xmin = xmin;
    this.ymin = ymin;
    this.xmax = xmax;
    this.ymax = ymax;
    this.vpw = this.xmax - this.xmin;
    this.vph = this.ymax - this.ymin;
  }
}

export function coordinateFrame(xmin, ymin, xmax, ymax) {
  /**
   * coordinateFrame(xmin, ymin, xmax, ymax) sets up the drawing coordinate system so
   * that xmin is on the lefthand side of the window xmax on the righthand, ymin on the 
   * bottom, and ymax on the top. It also redefines the stroke weight to be one pixel, 
   * otherwise it would scale up or down due to the scale operation. The global frame is
   * used to communicate the width, in drawing coordinates, of the window.
   */
  frame = new Frame(xmin, ymin, xmax, ymax);
  
  scale(width / frame.vpw, -height / frame.vph);
  
  if (frame.vpw < 0) {
    translate(-frame.vpw, 0);
  }
  if (frame.vph > 0) {
    translate(0, -frame.vph);
  }
  translate(-frame.xmin, -frame.ymin);
  
  let posvpw = abs(frame.vpw);
  strokeWeight(posvpw / width);
}

export function borderWeight(w) {
  /**
   * borderWeight(w) Sets the stroke weight to be w pixels. This should never be called
   * before a call to coordinateFrame(), as it requires the setting of the frame global
   */
  try {
    strokeWeight(w * frame.vpw / width);
  } catch (error) {
    console.error("borderWeight() called before a corresponding call to coordinateFrame()");
  }
}

export function mouseConvert(x, y) {
  /**
   * Convert mouse coordinates to frame coordinates
   */
  y = height - y;
  
  try {
    x = x / width * frame.vpw + frame.xmin;
    y = y / height * frame.vph + frame.ymin;
    
    if (frame.vpw < 0) {
      x -= frame.vpw;
    }
    if (frame.vph < 0) {
      y -= frame.vph;
    }
  } catch (error) {
    console.error("mouseConvert() called before a corresponding call to coordinateFrame()");
  }
  
  return [x, y];
}

export function canvasToFrame(x, y) {
  /**
   * Convert canvas coordinates to frame coordinates
   */
  y = height - y;
  
  try {
    x = x / width * frame.vpw + frame.xmin;
    y = y / height * frame.vph + frame.ymin;
    
    if (frame.vpw < 0) {
      x -= frame.vpw;
    }
    if (frame.vph < 0) {
      y -= frame.vph;
    }
  } catch (error) {
    console.error("canvasToFrame() called before a corresponding call to coordinateFrame()");
  }
  
  return [x, y];
}
