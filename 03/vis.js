const drag = d3
  .drag()
  .on('start', () => {
    d3.event.sourceEvent.stopPropagation();
  })
  .on('drag', function() {
    const x = d3.event.x;
    const y = d3.event.y;
    if (this.tagName == 'circle') {
      if (x <= w - 10 && x >= 10 && y <= h - 10 && y >= 10)
        d3.select(this).attr('cx', x).attr('cy', y);
    } else d3.select(this).attr('transform', `translate(${x},${y})`);
  });

/* prettier-ignore */
d3.select('body')
  .append('canvas')
  .attr('width', 960)
  .attr('height', 500);

const canvas = d3.select('canvas');
const context = canvas.node().getContext('2d');
const width = canvas.property('width');
const height = canvas.property('height');

const circles = [{ x: 50, y: 50, radius: 10 }, { x: 100, y: 70, radius: 10 }];

function render() {
  // draw the black rectangle
  context.clearRect(0, 0, width, height);
  context.fillRect(10, 10, 210, 210);

  // draw the red circles
  circles.forEach(circle => {
    context.beginPath();
    context.moveTo(circle.x + circle.radius, circle.y);
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
  });
}

render();

// const group = container.append('g');

// const rect = group
//   .append('rect')
//   .attr('width', w)
//   .attr('height', h)
//   .attr('x', 10)
//   .attr('yx', 10);

// const circle1 = group
//   .append('circle')
//   .attr('cx', 50)
//   .attr('cy', 50)
//   .attr('r', 10)
//   .style('fill', 'red');

// const circle2 = group
//   .append('circle')
//   .attr('cx', 100)
//   .attr('cy', 70)
//   .attr('r', 10)
//   .style('fill', 'red');

// circle1.call(drag);
// circle2.call(drag);
// group.call(drag);
