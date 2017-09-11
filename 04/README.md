a [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) example that shows how to drag multiple shapes inside of another shape.  notice that the red network-node circles can be dragged independently. notice that the black rectangle can also be dragged, keeping it's red-circle children in the same relative positions.  

you could also think about this problem as "how to create a hierarchy of draggable shapes?". the short answer is: do it in the `dragSubject()` function
[d3-drag docs on drag subjects](https://github.com/d3/d3-drag#drag_subject)

a fork of [Multiple Shape Drag Canvas](http://bl.ocks.org/micahstubbs/5135994b936e7294911fa28520f015c1)

inspiration from blocks [graph neighbors on mouseover](http://bl.ocks.org/micahstubbs/e5d0c64e487a8920e6b775f1244f8486) and [Force-Directed Graph](https://bl.ocks.org/mbostock/f584aa36df54c451c94a9d0798caed35/0efb1fa7cfef4f4d6955c6283656a850b8a3aa7b)

an iteration on this very helpful [stackoverflow answer](https://stackoverflow.com/questions/33018246/drag-multiple-items-inside-another-item-in-d3)

this collection of d3-drag experiments also exist in github repo form at [micahstubbs/d3-drag-experiments](https://github.com/micahstubbs/d3-drag-experiments)  