function generator(matLen, gr, grEat, pre, msh) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pre; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < msh; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    return matrix;
}

let cell_count = 40;
let side = Math.trunc((Math.min(window.innerWidth, window.innerHeight) / cell_count) * 0.9);
let matrix = generator(cell_count, 100, 100, 50, 50, 1);

matrix[cell_count / 2][cell_count / 2] = 5;
matrix[cell_count / 2][cell_count / 2 - 1] = 5;
matrix[cell_count / 2 - 1][cell_count / 2] = 5;
matrix[cell_count / 2 - 1][cell_count / 2 - 1] = 5;

var grassArr = [], grassEaterArr = [], predatorArr = [], mushroomArr = [], vahe = new Vahe();

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(5)
    // noStroke()
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y);
                predatorArr.push(gr)
            } else if (matrix[y][x] == 4) {
                let gr = new Mushroom(x, y);
                mushroomArr.push(gr)
            } else if (matrix[y][x] == 5) {
                vahe = new Vahe(x, y);
            }
        }
    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("black")
            } else if (matrix[y][x] == 4) {
                fill("skin")
            } else if (matrix[y][x] == 5) {
                fill("cyan")
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (let j in grassEaterArr) {
        grassEaterArr[j].mul()
        grassEaterArr[j].eat()
    }
    for (let q in predatorArr) {
        predatorArr[q].mul()
        predatorArr[q].eat()
    }
    for (let q in mushroomArr) {
        mushroomArr[q].update()
    }
    vahe.update();
}

function windowResized() {
    side = (Math.min(window.innerWidth, window.innerHeight) / cell_count) * 0.9;
    resizeCanvas(matrix[0].length * side, matrix.length * side);
}