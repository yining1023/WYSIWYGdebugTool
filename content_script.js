// The code in this file will load:
//   * after the document is ready
//   * after any previous content scripts (e.g., jquery.js)
//
// So you can safely use jQuery (the `$`) in the code below
var enabled = false;

var getMouse = function(e){
  document.getElementById('mousePosition')
  .innerHTML = 'X:' + e.x + ' Y:' + e.y;
  //change div #mousePosition position
  $('#mousePosition').css('left', e.x+'px');
  $('#mousePosition').css('top', e.y+'px');
};

var toggle = function(){
  if(enabled){
    document.removeEventListener('mouse', getMouse);
    document.body.removeChild(document.getElementById('mousePosition'));
  } else {
    var el = document.createElement('div');
    el.setAttribute('id', 'mousePosition');
    el.innerHTML = 'X:0 Y:0';
    document.body.appendChild(el);
    document.addEventListener('mousemove', getMouse);
  }
  enabled = !enabled;
};

chrome.extension.onMessage.addListener(function(msg){
  if(msg.action === 'toggle'){
    toggle();
  }
});