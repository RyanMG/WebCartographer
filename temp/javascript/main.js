var reqAnimationFrame = (function () {
  return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

var el, START_X, START_Y;
var ticking = false;
var transform;

var map = document.getElementById('mapGrid');

var rotatorC = document.getElementById('rotate-c');
var rotatorCC = document.getElementById('rotate-cc');

var newTileBtn = document.getElementById('new');

function initiateTile() {
	el = document.querySelector("#mover");
	START_X = Math.round((map.offsetWidth - el.offsetWidth) / 2);
	START_Y = Math.round((map.offsetHeight - el.offsetHeight) / 2);

	var mc = new Hammer.Manager(el);

	mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
	mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));

	mc.on("panstart panmove", onPan);
	mc.on("panend", onPanEnd);
	mc.on("rotatestart rotatemove", onRotate);
}

rotatorC.addEventListener('click', onRotatorCClick);
rotatorCC.addEventListener('click', onRotatorCCClick);
newTileBtn.addEventListener('click', onNewTileClick);

function onNewTileClick() {
	var newImg = document.createElement('img');
	newImg.setAttribute('src', './images/stone_tiles_4x4_01.jpg');
	newImg.setAttribute('class', 'tile');
	map.appendChild(newImg);
	newImg.setAttribute('id', 'mover');
	el.removeAttribute('id', 'mover');
	initiateTile();
}

function resetElement() {
  el.className = 'animate';
  transform = {
    translate: { x: START_X, y: START_Y },
    angle: 0
	};

  requestElementUpdate();
}

function onRotatorCClick(evt) {
	el.className = 'animate';
	transform.angle -= 90;
  requestElementUpdate();
}


function onRotatorCCClick(evt) {
	el.className = 'animate';
	transform.angle += 90;
  requestElementUpdate();
}

function updateElementTransform() {
  var value = [
    'translate(' + transform.translate.x + 'px, ' + transform.translate.y + 'px)',
    'rotate(' + transform.angle + 'deg)'
  ];

  value = value.join(" ");
  el.style.webkitTransform = value;
  el.style.mozTransform = value;
  el.style.transform = value;
  ticking = false;
}

function requestElementUpdate() {
  if(!ticking) {
    reqAnimationFrame(updateElementTransform);
    ticking = true;
  }
}

function onPanEnd(ev) {
	transform.translate.x = Math.round(transform.translate.x / 32) * 32;
	transform.translate.y = Math.round(transform.translate.y / 32) * 32;
	START_X = transform.translate.x;
	START_Y = transform.translate.y;
	requestElementUpdate();
}

function onPan(ev) {
  el.className = '';
  transform.translate = {
    x: START_X + ev.deltaX,
    y: START_Y + ev.deltaY
  };
  if (transform.translate.x < 0) transform.translate.x = 0;
  if (transform.translate.y < 0) transform.translate.y = 0;
  if (transform.translate.x > map.offsetWidth - 128) transform.translate.x = map.offsetWidth - 128;
  if (transform.translate.y > map.offsetHeight - 128) transform.translate.y = map.offsetHeight- 128;
  requestElementUpdate();
}

function onRotate(ev) {
  if(ev.type == 'rotatestart') {
    initAngle = transform.angle || 0;
  }

  el.className = '';
  transform.angle = initAngle + ev.rotation;
  requestElementUpdate();
}
initiateTile();
resetElement();
