var type = parseInt(window.prompt("Виберіть тип задання масиву:\n 1. Вручну\n 2. Random\n 3. По варіанту\n"));
var rows, cols;
var mainMatrix;

var handInput = function () {
    var matrix = [];
    for (var row = 0; row < rows; row++) {
        matrix[row] = [];
        for (var col = 0; col < cols; col++) {
            matrix[row][col] = parseFloat(window.prompt("Введіть елемент A[" + row + "][" + col + "]:"));
        }
    }
    return matrix;
};

var randomInput = function () {
    var matrix = [];
    for (var row = 0; row < rows; row++) {
        matrix[row] = [];
        for (var col = 0; col < cols; col++) {
            matrix[row][col] = Math.floor(Math.random() * 200 - 100);
        }
    }
    return matrix;
};

var formulaInput = function () {
    var matrix = [];
    for (var i = 0; i < rows; i++) {
        matrix[i] = [];
        for (var j = 0; j < cols; j++) {
			var elem = j*Math.abs(2-3.1*i)*Math.sqrt(Math.abs((i*i+j*j)*(i-1.5)*(j-4.2)));
            matrix[i][j] = Math.round(elem * 100) / 100;
        }
    }
    return matrix;
};

var printMatrix = function (matrix) {
    document.write("<table border=\"1\">");
    for (var row = 0; row < rows; row++) {
        document.write("<tr>");
        for (var col = 0; col < cols; col++) {
            document.write("<td>" + matrix[row][col] + "</td>");
        }
        document.write("</tr>");
    }
    document.write("</table>");
}

var printVectorX = function (vector) {
    document.write("<table border=\"1\"><tr>");
    for (var i = 0; i < vector.length; i++)
        document.write("<td>" + vector[i] + "</td>");
    document.write("</tr></table>");
}

var countColSum = function (j) {
    var result = 0;
    for (var i = 0; i < rows; i++)
        result += mainMatrix[i][j];
    return Math.round(result*100)/100;
}

var normalCol = function (j) {
	var negatives = 0;
	for (var i = 0; i < rows; i++)
		if (mainMatrix[i][j] < 0)
			negatives++;
	if (negatives >= 2)
		return true;
	else
		return false;
}

var main = function () {
	var vectorX = [];
	var vecIndexes = [];
	for (var j = 0; j < cols; j++)
		if (normalCol(j)) {
			vectorX.push(countColSum(j));
			vecIndexes.push(j);
		}
	if (vectorX.length >= 1) {
		document.write("Виконується перша умова<br>");
		document.write("Вектор Х - суми ");
		for (var i = 0; i < vecIndexes.length; i++)
			document.write(vecIndexes[i] + ", ");
		document.write("стовпців матриці:");
	} else {
		document.write("Виконується друга умова<br>");
		document.write("Вектор Х - суми всіх стовпів матриці");
		vectorX = [];
		for (var j = 0; j < cols; j++)
			vectorX.push(countColSum(j));
	}
	printVectorX(vectorX);
	var U = -99999;
	for (var i = 0; i < vectorX.length; i++) {
		var elem = Math.abs(vectorX[i])*Math.log(Math.abs(Math.sin(Math.pow(vectorX[i],i))))/Math.log(2);
		if (elem > U)
			U = elem;
	}
	document.write("U = " + Math.round(U * 1000) / 1000);
}

switch (type) {
    case 1:
        rows = parseInt(window.prompt("Кількість рядків:"));
        cols = parseInt(window.prompt("Кількість стовпчиків:"));
        mainMatrix = handInput();
        printMatrix(mainMatrix);
        main();
        break;
    case 2:
        rows = parseInt(window.prompt("Кількість рядків:"));
        cols = parseInt(window.prompt("Кількість стовпчиків:"));
        mainMatrix = randomInput();
        printMatrix(mainMatrix);
        main();
        break;
    case 3:
        rows = parseInt(window.prompt("Кількість рядків:"));
        cols = parseInt(window.prompt("Кількість стовпчиків:"));
        mainMatrix = formulaInput();
        printMatrix(mainMatrix);
        main();
        break;
    default:
        document.write("Incorrect input!<br>");
}
