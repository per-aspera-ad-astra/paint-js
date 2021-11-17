const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

// For prevent transparent background
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseMove(e) {
	let x = e.offsetX;
	let y = e.offsetY;
	
	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x,y);
	} else {
		ctx.lineTo(x,y);
		ctx.stroke();
	}
}

function onMouseDown(e) {
	painting = true;
}

function handleColorClick(e) {
	const color = e.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(e) {
	ctx.lineWidth = e.target.value;
}

function handleModeClick() {
	if (filling) {
		filling = false;
		mode.textContent = 'Fill';
	} else {
		filling = true;
		mode.textContent = 'Draw';
	}
}

function handleCanvasClick() {
	if (filling) {
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	}
}

function handleContextMenu(e) {
	e.preventDefault();
}

function handleSaveClick() {
	const image = canvas.toDataURL();
	const link = document.createElement('a');
	link.href = image;
	link.download = 'PaintJS';
	link.click();
}

if (canvas) {
	canvas.addEventListener('mousemove', onMouseMove);
	canvas.addEventListener('mousedown', onMouseDown);
	canvas.addEventListener('mouseup', stopPainting);
	canvas.addEventListener('mouseleave', stopPainting);
	canvas.addEventListener('click', handleCanvasClick);
	canvas.addEventListener('contextmenu', handleContextMenu);
}

colors.forEach(color => color.addEventListener('click', handleColorClick));

if (range) {
	range.addEventListener('input', handleRangeChange);
}

if (mode) {
	mode.addEventListener('click', handleModeClick);
}

if (save) {
	save.addEventListener('click', handleSaveClick);
}
