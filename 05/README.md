a [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) example that shows how to drag multiple shapes inside of another shape.  notice that the red network-node circles can be dragged. notice that the white background of the plot can also be dragged, while keeping the red-circle children of the invisible background in the same relative positions.  

you could also think about this problem as "how to create a hierarchy of draggable shapes?". the short answer is: do it in the `dragSubject()` function
[d3-drag docs on drag subjects](https://github.com/d3/d3-drag#drag_subject)

a fork of [Multiple Shape Drag Canvas with Force Simulation](http://bl.ocks.org/micahstubbs/f4dcb0f587e54ea80a67b3efa773b995)

an iteration on this very helpful [stackoverflow answer](https://stackoverflow.com/questions/33018246/drag-multiple-items-inside-another-item-in-d3)

this collection of d3-drag experiments also exist in github repo form at [micahstubbs/d3-drag-experiments](https://github.com/micahstubbs/d3-drag-experiments)  