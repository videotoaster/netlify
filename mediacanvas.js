// USAGE: mediacanvas_fullscreen(document.getElementById("myCanvas"));
function mediacanvas_fullscreen(c) {
  // Resize canvas to window size
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  
  // Remove HTML/BODY margin
  document.body.style.margin = 0;
  document.body.parentElement.style.margin = 0;
}
// USAGE: mediacanvas_setcursor(document.getElementById("myCanvas"),"pointer");
function mediacanvas_setcursor(c,cursor) {
  c.style.cursor = cursor;
}
