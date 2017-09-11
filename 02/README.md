a [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) example that shows how to drag multiple shapes inside of another shape.  notice that the red circles can be dragged independently. notice that the black rectangle can also be dragged, keeping it's red-circle children in the same relative positions.  

you could also think about this problem as "how to create a hierarchy of draggable shapes?". the short answer is: do it in the `dragSubject()` function
[d3-drag docs on drag subjects](https://github.com/d3/d3-drag#drag_subject)

an iteration on this very helpful [stackoverflow answer](https://stackoverflow.com/questions/33018246/drag-multiple-items-inside-another-item-in-d3), porting it to [d3v4](https://github.com/d3/d3/blob/master/CHANGES.md) and converts it to [es2015](https://babeljs.io/learn-es2015/) with [lebab](https://github.com/lebab/lebab)

this collection of d3-drag experiments also exist in github repo form at [micahstubbs/d3-drag-experiments](https://github.com/micahstubbs/d3-drag-experiments)  