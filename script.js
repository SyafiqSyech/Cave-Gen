const cellSize = 7.5
const mapWidth = 60 * cellSize
const mapHeight = mapWidth*2

const cols = Math.floor(mapWidth/cellSize) 
const rows = Math.floor(mapHeight/cellSize)
let density = 0.53

//input connections
const densInp = document.querySelector('#dens')
densInp.value = density;
const genBtn = document.querySelector('#gen')
const itrBtn = document.querySelector('#itr')

//make noise grid
let grid = [];
function generateGrid(){
    for (let col = 0; col < cols; col++) {
        grid[col] = [];
        for (let row = 0; row < rows; row++) {
            grid[col][row] = Math.random() < density ? 0 : 1
        }
    }
    console.log('done arr')
}

//cellular automata rule ?
function iterate() {
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            wallCount = getWalls(col, row)
            grid[col][row] = wallCount > 4 ? 1 : 0
        }
    }
}

//getWalls
function getWalls(col, row) {
    let wallCount = 0
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            if(i != col || j != row){
                if(col+i == -1 || row+j == -1 || col+i == cols || row+j == rows){
                    wallCount++
                } 
                else{
                    wallCount = grid[col+i][row+j] ? wallCount+1 : wallCount;
                }
            }
        }
    }
    return wallCount
}


//density input listener
densInp.addEventListener('input', () => {
    density = densInp.value
    console.log(density)
})

//iterate button listener
var timer
itrBtn.addEventListener('click', () => {
    let i = 0
    function loop() {
        if(i < 10){
            iterate()
            redraw()
            // console.log(i%2)
            i++
            timer = setTimeout(loop, 500);
        }
    }
    loop()
    // for (let i = 0; i < 5; i++) {
        // console.log('done itr')
    // }
})

//generate button listener
genBtn.addEventListener('click', () => {
    clearTimeout(timer)
    generateGrid()
    redraw()
})


generateGrid()