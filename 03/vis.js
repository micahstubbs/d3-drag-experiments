const w = 200;
const h = 200;

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

const container = d3
  .select('body')
  .append('svg')
  .attr('width', 1200)
  .attr('height', 600);

const group = container.append('g');

const rect = group
  .append('rect')
  .attr('width', w)
  .attr('height', h)
  .attr('x', 10)
  .attr('yx', 10);

const circle1 = group
  .append('circle')
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', 10)
  .style('fill', 'red');

const circle2 = group
  .append('circle')
  .attr('cx', 100)
  .attr('cy', 70)
  .attr('r', 10)
  .style('fill', 'red');

circle1.call(drag);
circle2.call(drag);
group.call(drag);
