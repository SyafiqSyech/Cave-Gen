function setup() {
  createCanvas(mapHeight, mapWidth, document.querySelector('#cave_gen'));
  noStroke()
  noLoop()
  var color = 0; 
  frameRate(0)
}

function draw() {
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      color = grid[col][row] ? 0 : 255; 
      fill(color)
      rect(row*cellSize, col*cellSize, cellSize, cellSize) 
    }
  }
  console.log('drawn')
}
