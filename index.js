import { findPath } from "./findPath.js"  

const buttonVert = document.querySelector("#curcle")
const buttonAdd = document.querySelector("#line")
const find = document.querySelector('#create')
const firstVert = document.querySelector('#from-vert')
const lastVert = document.querySelector('#to-vert')
const weightVert = document.querySelector('#weight')
const firstPath = document.querySelector('#from-vert-path')
const lastPath = document.querySelector('#to-vert-path')

const graph = new findPath();
let array_count = 0

let cy = cytoscape({
    container:
    document.getElementById('cy'),
    elements: [],
    style: cytoscape.stylesheet()
  .selector('edge')
      .css({
        'width': 4,
        'line-color': '#fff',
        'target-arrow-color': '#fff',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'font-size': '15px',
        'color': 'black'
      })
    .selector('node')
      .css({
        'label': 'data(id)',
        'text-valign': 'center',
        'color': 'white',
        'text-outline-width': 2,
        'text-outline-color': '#888',
        'background-color': '#fff'
      })
    .selector(':selected')
      .css({
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black',
        'text-outline-color': 'black'
      }),

  layout: {
    name: 'grid',
    rows: 1
  }
});

cy.add([
    { group: 'nodes',data: { id: 'n' + ++array_count}, position: { x: 50, y: 200 } },
]);
graph.addVert(array_count)

buttonVert.addEventListener("click", () => {
 cy.add([
    {group:'nodes', data: {id: 'n' + ++array_count}, position: {x: 100, y: 100}}
  ])
  graph.addVert(array_count)
})

buttonAdd.addEventListener("click", () => {
  const from = Number(document.getElementById('from-vert').value)
  const to = Number(document.getElementById('to-vert').value)
  const wei = Number(document.getElementById('weight').value)
  if(graph.to_check(from, to)){
    cy.add([
      {group: 'edges', data: {id: `e${from}-${to}`, source: 'n' + from, target: 'n' + to, label: wei}},
    ])
    graph.addEdge(from, to, wei)
  }
});

find.addEventListener("click", () => {
  const startPath = Number(document.getElementById('from-vert-path').value)
  const endPath = Number(document.getElementById('to-vert-path').value)

  if(graph.to_check(startPath, endPath)) {
    console.log(graph.verts)
    const answer = graph.findShortPath(startPath, endPath)
    console.log(answer)
    alert(`Кратчайший путь из ${startPath} в ${endPath} = ${answer.dist} \n ${answer.path}`)
  }
})
