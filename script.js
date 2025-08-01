const body = document.querySelector('body');
const linesRow = document.createElement('div');
const linesColumn = document.createElement('div');

linesRow.setAttribute('id', 'row');
linesColumn.setAttribute('id', 'column');
body.appendChild(linesRow);
body.appendChild(linesColumn);


column = document.querySelector('#column');


function generateRGBValue() {
	const randomNumber = Math.floor(Math.random() * 256);
	return randomNumber;
}


function checkDuplicateGridBox(top, left) {
	const exists = gridsUsed.some((grid) => grid.top === top && grid.left === left);
	if(exists) {
		return true;
		
	} else {
		return false;
	}
}


// Create grids
let valX;
let valY;

initializeGrid(valX, valY);

function initializeGrid() {
	if(!valX || !valY) {
		valY = 16;
		valX = 16;

		for(let i = 0; i < 16; i++) {
			const linesColumnGrid = document.createElement('div');
			linesColumn.appendChild(linesColumnGrid);
			linesColumnGrid.classList.add('column_grid');

			const linesRowGrid = document.createElement('div');
			linesRow.appendChild(linesRowGrid);
			linesRowGrid.classList.add('row_grid');
		}
	}

}


function addGrid(newVal, gridType) {
	if(gridType === 'y') {
		if (newVal > valY) {
			let lengthToAdd = newVal-valY;

			for (let i = 0; i < lengthToAdd; i++) {
				const linesColumnGrid = document.createElement('div');
				linesColumn.appendChild(linesColumnGrid);
				linesColumnGrid.classList.add('column_grid');
				}

			valY = newVal;
		}
	} else if(gridType === 'x') {
		let lengthToAdd = newVal-valX;

		for (let i = 0; i < lengthToAdd; i++) {
			const linesRowGrid = document.createElement('div');
			linesRow.appendChild(linesRowGrid);
			linesRowGrid.classList.add('row_grid');
		}

		valX = newVal;
	}
}


function removeGrid(newVal, gridType) {
	if(gridType === 'y') {
		if (newVal < valY) {
			let lengthToRemove = valY-newVal;
			for(let i = 0; i < lengthToRemove; i++ ) {
				let lastchild = linesColumn.lastElementChild;
				linesColumn.removeChild(lastchild);
			}
			valY = newVal;
		}
	} else if (gridType === 'x') {
		if (newVal < valX) {
			let lengthToRemove = valX-newVal;
			for(let i = 0; i < lengthToRemove; i++ ) {
				let lastchild = linesRow.lastElementChild;
				linesRow.removeChild(lastchild);
			}
			valX = newVal;
		}
	}
}


function findAllXGridPositions() {
	let xGrids = document.querySelectorAll('.row_grid');
	let xGridsNum = xGrids.length;
	let xBottomArray = [];

	for(let i = 0; i<xGridsNum; i++) {
		const x = xGrids[i].getBoundingClientRect();
		// const x = xGrids[i].offsetTop;
		const xBottom = x.bottom;

		xBottomArray.push(xBottom);
	}

	return xBottomArray;
}


function findAllYGridPositions() {
	let yGrids = document.querySelectorAll('.column_grid');
	let yGridsNum = yGrids.length;

	let yRightArray = [];

	for(let i = 0; i<yGridsNum; i++) {
		const y = yGrids[i].getBoundingClientRect();
		// const y = yGrids[i].offsetLeft;
		const yRight = y.right;

		yRightArray.push(yRight);
	}

	return yRightArray;
}

let gridsUsed = [];
function fillGridBox(e) {
	let yGrids = findAllXGridPositions();
	let xGrids = findAllYGridPositions();
	const x = e.clientX;
	const y = e.clientY;
	const xGridsLength = xGrids.length;
	const yGridsLength = yGrids.length;
	let x1;
	let x2;
	let y1;
	let y2;
	let pixel = document.createElement('div');

	// ---------------------- TEST ZONE -----------------------------
	// console.log("X GRIDS: " + xGrids);
	// console.log("Y GRIDS: " + yGrids);
	// ---------------------- END TEST ZONE -----------------------------

	for(let i = 0; i <= xGridsLength; i++) {
		let j;

		if(i !== xGridsLength) { j = i+1; } else { j = i; }

		if(x >= xGrids[i] && x < xGrids[j]) {
			x1 = xGrids[i];
			x2 = xGrids[j];

			// ---------------------- TEST ZONE -----------------------------
			// console.log("X1: " + x1);
			// console.log("X2: " + x2);
			// console.log("XGRIDS[i]: " + xGrids[i]);
			// console.log("XGRIDS[j]" + xGrids[j]);
			// ---------------------- END TEST ZONE -----------------------------
		}
	}

	for(let i = 0; i <= yGridsLength; i++) {
		let j;

		if(i !== yGridsLength) { j = i+1; } else { j = i; }

		if(y >= yGrids[i] && y < yGrids[j]) {
			y1 = yGrids[i];
			y2 = yGrids[j];
			
			// ---------------------- TEST ZONE -----------------------------
			// console.log("Y1: " + y1);
			// console.log("Y2: " + y2);
			// console.log("YGRIDS[i]: " + yGrids[i]);
			// console.log("YGRIDS[j]" + yGrids[j]);
			// ---------------------- END TEST ZONE -----------------------------
		}
	}
	
	let rColor;
	let gColor;
	let bColor;
	let width = x2-x1-1;
	let height = y2-y1-1;
	let isColored = colored;

	if(isColored) {
		rColor = generateRGBValue();
		gColor = generateRGBValue();
		bColor = generateRGBValue();
	} else {
		rColor = 80;
		gColor = 80;
		bColor = 80;
	}


	pixel.setAttribute('style', 
		`
		width: ${width}px; 
		height: ${height}px; 
		position: absolute; 
		top: ${y1}px; 
		left: ${x1}px; 
		background-color: rgb(${rColor}, ${gColor}, ${bColor})
		`
	);

	pixel.classList.add('grid-fill');

	// pixel.setAttribute('style', 
	// 	`
	// 	width: ${width}px; 
	// 	height: ${height}px; 
	// 	position: absolute; 
	// 	top: ${y1}px; 
	// 	left: ${x1}px; 
	// 	background-color: rgb(${rColor}, ${gColor}, ${bColor})
	// 	`
	// );


	let isDuplicate = checkDuplicateGridBox(y1, x1);

	if (!isDuplicate) {
		gridsUsed.push({top: y1, left: x1}); 
		// body.appendChild(pixel);
		column.insertAdjacentElement('afterend', pixel);
	} 
	

	// ---------------------- TEST ZONE -----------------------------
	// console.log("---------------------------------------------");
	// console.log("x: " + x);
	// console.log("y: " + y);
	// console.log("x1: " + x1);
	// console.log("x2: " + x2);
	// console.log("y1: " + y1);
	// console.log("y2: " + y2);
	// console.log("---------------------------------------------");
	// ---------------------- END TEST ZONE -----------------------------
}


function changeXGridButton() {
	const buttonX = document.createElement('button');
	buttonX.textContent = 'Change Grid X';
	buttonX.id = 'buttonX';
	body.appendChild(buttonX);

	buttonX.addEventListener('click', (e) => {
		let newVal = parseInt(prompt('X Grid #: '));
		if(newVal > 100) {
			console.log("TRIGGERED");
			return alert('Must be less than 100!');
		}

		if(newVal < valX) { removeGrid(newVal, 'x');  } 
		else if (newVal > valX) { addGrid(newVal, 'x'); } 
		else { return; }
		clearGrid();
	});
}


function createYGridButton() {
	const buttonY = document.createElement('button');
	buttonY.textContent = 'Change Grid Y';
	buttonY.id = 'buttonY';
	body.appendChild(buttonY);

	buttonY.addEventListener('click', (e) => {
		e.stopPropagation();
		let newVal = parseInt(prompt('Y Grid #`: '));
		if(newVal > 100) {
			return alert('Must be less than 100!');
		}

		if(newVal < valY) { removeGrid(newVal, 'y');  } 
		else if (newVal > valY) { addGrid(newVal, 'y');  } 
		else { return; }

		clearGrid();
	});
}


function clearButton() {
	const clearButton = document.createElement('button');
	clearButton.textContent = 'Clear';
	clearButton.id = 'clear';
	body.appendChild(clearButton);

	clearButton.addEventListener('click', (e) => {
		clearGrid();
		e.stopPropagation;
	});

}


let colored = false;

function createRandomColorsButton() {
	const buttonColor = document.createElement('button');
	const colorMode = colored === false ? 'off' : 'on';
	buttonColor.textContent = `Random color: ` + colorMode;
	buttonColor.id = 'buttonColor';
	body.appendChild(buttonColor);
}

function toggleRandomColors() {
	const buttonColor = document.querySelector('#buttonColor');	

	buttonColor.addEventListener('click', (e) => {
		e.stopPropagation();

		if(colored === false) {
			colored = true;
			buttonColor.textContent = `Random color: ` + 'on';
		} else {
			colored = false;
			buttonColor.textContent = `Random color: ` + 'off';
		}
	});
}


function clearGrid() {
	let gridFill = document.querySelectorAll('.grid-fill');
	gridFill.forEach(element => {
		element.remove();
	});
}


const colors = ["black","silver","gray","white","maroon","red","purple","fuchsia","green","lime","olive","yellow","navy","blue","teal","aqua","aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];


const colorParent = document.querySelector('#colorParent');
function specificColor() {
	colors.map((color) => {
		let colorCon = document.createElement('div');
		colorCon.classList.add('colorCon');
		colorParent.appendChild(colorCon);
		colorCon.setAttribute('style', `background-color: ${color}`);
	});
}


function colorPaletteButton() {
	const colorPalette = document.createElement('button');
	colorPalette.textContent = 'Color Palette';
	colorPalette.id = 'colorPaletteButton';
	body.appendChild(colorPalette);

	colorPalette.addEventListener('click', (e) => {
		if(colorParent.classList.contains('d_none')) {
			colorParent.classList.remove('d_none');
		} else {
			colorParent.classList.add('d_none');
		}

		e.stopPropagation();
	});
}


let isDrawing = false;
body.addEventListener('mousedown', (e) => {
	isDrawing = true;
	e.preventDefault();
});

body.addEventListener('mouseup', (e) => {
	isDrawing = false;
	e.preventDefault();
});

body.addEventListener('mouseleave', (e) => {
	isDrawing = false;
	e.preventDefault();
});

body.addEventListener('mousemove', (e) => {
	if(isDrawing) { fillGridBox(e); }
	e.preventDefault();
});

body.addEventListener('click', (e) => {
	fillGridBox(e); 
	e.preventDefault();
});

createRandomColorsButton();
toggleRandomColors();
changeXGridButton();
createYGridButton();
clearButton();
specificColor();
colorPaletteButton();


// draw on mousemove
// function draw() {
// 	let isDrawing = false;

// 	linesRow.addEventListener('mousedown', () => {
// 		isDrawing = true;
// 	})

// 	linesRow.addEventListener('mouseup', () => {
// 		isDrawing = false;
// 	});

// 	linesRow.addEventListener('mousemove', (e) => {
// 		// console.log("X: " + e.clientX);
// 		// console.log("Y: " + e.clientY);
// 		if(!isDrawing) {return}

// 		let pixel = document.createElement('div');
// 		pixel.classList.add('pixel');
// 		linesRow.appendChild(pixel);
// 		pixel.setAttribute('style', `left: ${e.clientX}px; top: ${e.clientY}px`);

// 	});
// }