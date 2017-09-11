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
        d3
          .select(this)
          .attr('cx', x)
          .attr('cy', y);
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
const radius = 10;

//
// setup force simulation
//

const graph = {
  nodes: [
    { id: 0, size: 10 },
    { id: 1, size: 5 },
    { id: 2, size: 2 },
    { id: 3, size: 3 },
    { id: 4, size: 30 },
    { id: 5, size: 40 }
  ],
  links: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 1, target: 0 },
    { source: 3, target: 0 },
    { source: 4, target: 1 }
  ]
};

const simulation = d3
  .forceSimulation()
  .force('link', d3.forceLink().id(d => d.id))
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(width / 2, height / 2));

simulation.nodes(graph.nodes).on('tick', ticked);

function ticked() {
  render();
}

//
//
//

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
    
    context.clearRect(0, 0, width, height);
    
    // context.fillStyle = 'black';
    // context.fillRect(rect.x, rect.y, rect.x2, rect.y2);

    // draw a line for each link
    context.strokeStyle = '#aaa';
    context.lineWidth = 1;
    context.beginPath();
    graph.links.forEach(link => {
      context.moveTo(
        graph.nodes[link.source].x + rect.x,
        graph.nodes[link.source].y + rect.y
      );
      context.lineTo(
        graph.nodes[link.target].x + rect.x,
        graph.nodes[link.target].y + rect.y
      );
    });
    context.stroke();

    // draw a circle for each node
    context.beginPath();
    graph.nodes.forEach(node => {
      context.moveTo(node.x + rect.x + radius, node.y + rect.y);
      context.arc(node.x + rect.x, node.y + rect.y, radius, 0, 2 * Math.PI);
    });
    context.fillStyle = 'red';
    context.fill();
  });
}

function dragSubject() {
  let i;
  const n = graph.nodes.length;
  let dx;
  let dy;
  let d2;
  let s2 = radius * radius * 4;
  let node;
  let subject;

  for (i = 0; i < n; i += 1) {
    node = graph.nodes[i];
    console.log('node from dragSubject', node);
    dx = d3.event.x - node.x - rects[0].x;
    dy = d3.event.y - node.y - rects[0].y;
    d2 = dx * dx + dy * dy;

    console.log('dx', dx);
    console.log('dy', dy);
    console.log('d2', d2);
    console.log('s2', s2);

    if (d2 < s2) {
      subject = node;
      s2 = d2;
    } else if (typeof subject === 'undefined') {
      rect = rects[0];
      subject = rect;
    }
  }
  return subject;
}

function dragStarted() {
  // if (!d3.event.active) simulation.alphaTarget(0.3).restart();
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
