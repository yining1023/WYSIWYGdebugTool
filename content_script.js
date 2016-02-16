// The code in this file will load:
//   * after the document is ready
//   * after any previous content scripts (e.g., jquery.js)
//
// So you can safely use jQuery (the `$`) in the code below
var enabled = false;

var getMouse = function(e){
  //change div #mousePosition position
  $('#mousePosition').css('left', e.x+'px');
  $('#mousePosition').css('top', e.y+'px');
  // if($('svg') !== null && $('svg') !== 'undefined'){
  //   var svg = document.getElementsByTagName('svg')[0]; //Get svg element
  //   var line = $('line');
    // var x1 = line.getAttribute('x1');
    // var y1 = line.getAttribute('y1');
    // var x1 = line.attr('x1');
    // var y1 = line.attr('y1');
    // console.log("x1: " + x1 + "  y1: " + y1);
    // console.log("e.x: " + e.x + "  e.y: " + e.y);
    //if mouse is near any watch point, highlight/draw again that watch point
  //   if(e.x > (x1 - 1) && e.x < (x1 + 1) && e.y > (y1 - 1) && e.y < (y1 + 1)){ 
  //     // watchPoint.setAttribute("r", 10); //Set circle's data
  //     //show watch point position
  //       document.getElementById('mousePosition')
  //       .innerHTML = 'X:' + x1 + ' Y:' + y1;
  //   }
  //   else{
  //     // watchPoint.setAttribute("r", 5); //Set circle's data
  //     //show actual mouse position
  //       document.getElementById('mousePosition')
  //       .innerHTML = 'X:' + e.x + ' Y:' + e.y;
  //   }
  // }
  // else{
    document.getElementById('mousePosition')
    .innerHTML = 'X:' + e.x + ' Y:' + e.y;
  // }
};

var getWatchPoints = function(){
  //if there is a svg element
  if($('svg') !== null && $('svg') !== 'undefined'){
    var svg = document.getElementsByTagName('svg')[0]; //Get svg element
    var line = $('line');
    // var x1 = line.getAttribute('x1');
    // var y1 = line.getAttribute('y1');
    var x1 = line.attr('x1');
    var y1 = line.attr('y1');
    var x2 = line.attr('x2');
    var y2 = line.attr('y2');

    var watchPoint = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a circle in SVG's namespace
      watchPoint.setAttribute('id', 'watchPoint');
      watchPoint.setAttribute("cx", x1); //Set circle's data
      watchPoint.setAttribute("cy", y1); //Set circle's data
      watchPoint.setAttribute("r", 5); //Set circle's data
      watchPoint.setAttribute("fill", "Magenta"); //Set circle's data
      watchPoint.setAttribute("onmouseover", "evt.target.setAttribute('r', '10');");
      watchPoint.setAttribute("onmouseout", "evt.target.setAttribute('r', '5');");
      svg.appendChild(watchPoint);

    var watchPoint2 = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a circle in SVG's namespace
      watchPoint2.setAttribute('id', 'watchPoint2');
      watchPoint2.setAttribute("cx", x2); //Set circle's data
      watchPoint2.setAttribute("cy", y2); //Set circle's data
      watchPoint2.setAttribute("r", 5); //Set circle's data
      watchPoint2.setAttribute("fill", "blue"); //Set circle's data
      watchPoint2.setAttribute("onmouseover", "evt.target.setAttribute('r', '10');");
      watchPoint2.setAttribute("onmouseout", "evt.target.setAttribute('r', '5');");
      svg.appendChild(watchPoint2);
  }
}

var toggle = function(){
  if(enabled){
    document.removeEventListener('mousemove', getMouse);
    document.body.removeChild(document.getElementById('mousePosition'));
    if($('svg') !== null && $('svg') !== 'undefined'){
      var svg = document.getElementsByTagName('svg')[0];
      svg.removeChild(document.getElementById('watchPoint'));
      svg.removeChild(document.getElementById('watchPoint2'));
    }
  } else {
    var el = document.createElement('div');
    el.setAttribute('id', 'mousePosition');
    el.innerHTML = 'X:0 Y:0';
    document.body.appendChild(el);
    getWatchPoints();
    document.addEventListener('mousemove', getMouse);
  }
  enabled = !enabled;
};

chrome.extension.onMessage.addListener(function(msg){
  if(msg.action === 'toggle'){
    toggle();
  }
});