// Fullscreen canvas. Useful for games.
// USAGE: mediacanvas_fullscreen(document.getElementById("myCanvas"));
function mediacanvas_fullscreen(c) {
  // Resize canvas to window size
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  
  // Remove HTML/BODY margin
  document.body.style.margin = 0;
  document.body.parentElement.style.margin = 0;
  
  return true;
}

// Set canvas cursor. Useful for UI elements.
// USAGE: mediacanvas_setcursor(document.getElementById("myCanvas"),"pointer");
function mediacanvas_setcursor(c,cursor) {
  c.style.cursor = cursor;
  return true;
}

// Resize. Useful for resizing windows, perhaps.
// USAGE: mediacanvas_resize(document.getElementById("myCanvas"),640,480);
function mediacanvas_setcursor(c,w,h) {
  c.width = w;
  c.height = h;
  return true;
}
