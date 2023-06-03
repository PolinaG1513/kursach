export class findPath {
    constructor() {
        this.verts = {} //список смежности графа
    }

    //добавление новой вершины
    addVert(value) {
        if (!this.verts[value]) {
            this.verts[value] = {}; 
        }
    }

    //добавление нового ребра
    addEdge(n1, n2, weight) {
        if (!(n2 in this.verts[n1])) {
            this.verts[n1][n2] = weight
        }
    }

    to_check(n1, n2){
        if(n1 == n2 || !(n1 in this.verts) || !(n2 in this.verts)) {
          alert('Incorrect nodes')
          return false
        }
        return true
      }

    //поиск ближайшей вершины из известных
    findNearest(distance, visit) {
        let minDistance = Infinity
        let nearestVert = null

        Object.keys(distance).forEach(vertex => {
            if (!visit[vertex] && distance[vertex] < minDistance) {
                minDistance = distance[vertex]
                nearestVert = vertex
            }
        });
        return nearestVert
    }

    findShortPath(startPath, endPath) {
        let answer = this.dijkstra(startPath)
        let path = []
        let currentVerts = endPath
        while(currentVerts != startPath) {
            path.unshift(Number(currentVerts))
            currentVerts = answer.prev[currentVerts]
        }
        path.unshift(startPath)
        const dist = answer.distance[endPath]
        path = path.join('->')
        return {dist, path}
    }

    dijkstra(startPath) {
        let graph = this.verts
        let visit = {}
        let distance = {} //кратчайшие пути до вершины
        let prev = {} //предыдущие вершины

        let verts = Object.keys(graph)//список вершин графа
        // по умолчанию все расстояния неизвестны (бесконечны)
        verts.forEach(vertex => {
            distance[vertex] = Infinity;
            prev[vertex] = null;
        });

        distance[startPath] = 0;

        function handleVertex(vertex) {
        // расстояние до вершины
            let activeVertexDistance = distance[vertex]; 
        
            // смежные вершины (с расстоянием до них)
            let neighbours = graph[activeVertex];
        
            // для всех смежных вершин пересчитать расстояния
            Object.keys(neighbours).forEach(neighbourVertex => {
            // известное на данный момент расстояние
                let currentNeighbourDistance = distance[neighbourVertex];
            // вычисленное расстояние
                let newNeighbourDistance = activeVertexDistance + neighbours[neighbourVertex];
        
                if (newNeighbourDistance < currentNeighbourDistance) {
                    distance[neighbourVertex] = newNeighbourDistance;
                    prev[neighbourVertex] = vertex;
                }
            });
        
            // пометить вершину как посещенную
            visit[vertex] = 1;
        }
  
        // ищем самую близкую вершину из необработанных
        let activeVertex = this.findNearest(distance, visit);

        // продолжаем цикл, пока остаются необработанные вершины 
        while(activeVertex) {
            handleVertex(activeVertex);
            activeVertex = this.findNearest(distance, visit);
        }
        return {distance, prev};
    }

}