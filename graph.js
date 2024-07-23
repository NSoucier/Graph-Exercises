class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    while (vertexArray[0] !== undefined) {
      this.nodes.add(vertexArray.pop());
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let neighbor of vertex.adjacent) {
      this.removeEdge(neighbor, vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = [start.value];
    const toVisit = [start];
    const stack = [];

    while (toVisit.length) {
      // console.log('here', toVisit.length, toVisit[0].adjacent)
      for (let neighbor of toVisit[0].adjacent) {
        // console.log(`${toVisit[0]} has neighbors of ${neighbor.value}`)
        if (visited.indexOf(neighbor.value) === -1 && toVisit.length === 2) {
          stack.push(neighbor.value)
        } else if (visited.indexOf(neighbor.value) === -1) {
          // console.log('inside if')
          visited.push(neighbor.value);
          toVisit.push(neighbor);
          // break // find first new vertex and break for loop
        }
      }
      toVisit.shift();
    }
    console.log(visited, stack)

    while (stack.length) {
      visited.indexOf(stack[0]) === -1 ? visited.push(stack.shift()) : stack.shift();
    }

    return visited;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = [start.value];
    const toVisit = [start];

    while (toVisit.length) {
      for (let neighbor of toVisit[0].adjacent) {
        if (visited.indexOf(neighbor.value) === -1) {
          visited.push(neighbor.value);
          toVisit.push(neighbor);
        }
      }
      toVisit.shift();
    }
    return visited;
  }
}

module.exports = { Graph, Node };
