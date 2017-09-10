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

const circles = [{ x: 50, y: 60, radius: 10 }, { x: 100, y: 80, radius: 10 }];
const rects = [{ x: 10, y: 10, x2: 210, y2: 210 }];

render();

canvas.call(
  d3
    .drag()
    .subject(dragSubject)
    .on('start', dragStarted)
    .on('drag', dragged)
    .on('end', dragEnded)
    .on('start.render drag.render end.render', render)
);

function render() {
  context.clearRect(0, 0, width, height);
  // draw the black rectangle
  rects.forEach(rect => {
    context.fillStyle = 'black';
    context.clearRect(0, 0, width, height);
    context.fillRect(rect.x, rect.y, rect.x2, rect.y2);

    // draw the red circles
    circles.forEach(circle => {
      context.beginPath();
      context.moveTo(circle.x + rect.x + circle.radius, circle.y + rect.y);
      context.arc(
        circle.x + rect.x,
        circle.y + rect.y,
        circle.radius,
        0,
        2 * Math.PI
      );
      context.fillStyle = 'red';
      context.fill();
    });
  });
}

function dragSubject() {
  let i;
  const n = circles.length;
  let dx;
  let dy;
  let d2;
  const radius = 10;
  let s2 = radius * radius * 4; // Double the radius
  let circle;
  let subject;

  for (i = 0; i < n; i += 1) {
    circle = circles[i];
    console.log('circle from dragSubject', circle);
    dx = d3.event.x - circle.x - rects[0].x;
    dy = d3.event.y - circle.y - rects[0].y;
    d2 = dx * dx + dy * dy;

    console.log('dx', dx);
    console.log('dy', dy);
    console.log('d2', d2);
    console.log('s2', s2);

    if (d2 < s2) {
      subject = circle;
      s2 = d2;
    } else if (typeof subject === 'undefined') {
      rect = rects[0];
      subject = rect;
    }
  }
  return subject;
}

function dragStarted() {
  // circles.splice(circles.indexOf(d3.event.subject), 1);
  // circles.push(d3.event.subject);
  d3.event.subject.active = true;
}

function dragged() {
  d3.event.subject.x = d3.event.x;
  d3.event.subject.y = d3.event.y;
}

function dragEnded() {
  d3.event.subject.active = false;
}

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
