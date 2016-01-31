
var DirectedGraph = function(){
	this.vertexGroup = {};
	this.countOfVertex  = 0;
	this.range = 0;
};
DirectedGraph.prototype = {
		addVertex:function(vertex){
			this.vertexGroup[vertex] = [];
			this.countOfVertex++;
			return this.vertexGroup;
		},
		addEdge:function(tail,head){
			this.range++;
			return this.vertexGroup[tail].push(head);
		},

		hasEdgeBetween:function(tail,head) {
			return this.vertexGroup[tail].indexOf(head)!=-1;
		},

		order:function() {
			return this.countOfVertex;
		},
		size:function() {
			return this.range;
		},
		pathBetween:function(from,to,visting){
			visting = visting || [];
			if (from == to) return visting.concat(from);
			for (var index in this.vertexGroup[from]) {
				var vertex = this.vertexGroup[from][index];
				if (visting.indexOf(vertex) == -1) {
					var path = this.pathBetween(vertex, to, visting.concat(from));
					if (path[path.length - 1] == to) return path;
				}
			}
			return [];
		},
		farthestVertex:function(start){
			return this.vertexGroup[start].length==0 ? start:this.farthestVertex(this.vertexGroup[start][0]);
		},
		allPaths:function(from,to,visited,paths){
			visited = visited || [];
			paths = paths || [];
			if (from == to){
				paths.push(visited.concat(from))
				return  paths;
			}
			for (var index in this.vertexGroup[from]) {
				var vertex = this.vertexGroup[from][index];
				if (visited.indexOf(vertex) == -1&&visited.indexOf(from) == -1){
					this.allPaths(vertex, to, visited.concat(from), paths);
				}
			}
			return paths;
		}
};
var UndirectedGraph = function(){
	this.vertexGroup = {};
	this.countOfVertex  = 0;
	this.range = 0;
};
UndirectedGraph.prototype = {
		addVertex:function(vertex){
			this.vertexGroup[vertex] = [];
			this.countOfVertex++;
			return this.vertexGroup;
		},
		addEdge:function(tail,head){
			this.range++;
			return this.vertexGroup[tail].push(head)&&this.vertexGroup[head].push(tail);
		},

		hasEdgeBetween:function(tail,head) {
			return this.vertexGroup[tail].indexOf(head)!=-1;
		},

		order:function() {
			return this.countOfVertex;
		},
		size:function() {
			return this.range;
		},
		pathBetween:function(from,to,visting){
			visting = visting || [];
			if (from == to) return visting.concat(from);
			for (var index in this.vertexGroup[from]) {
				var vertex = this.vertexGroup[from][index];
				if (visting.indexOf(vertex) == -1) {
					var path = this.pathBetween(vertex, to, visting.concat(from));
					if (path[path.length - 1] == to) return path;
				}
			}
			return [];
		},
		farthestVertex:function(start,visting){
			visting = visting || [];
			visting.push(start);
			var count = 0;
			var point = this.vertexGroup[start][count];
			var result = visting.every(function(ele){
				return ele != point;
			});
			if (result) {
				return this.farthestVertex(point,visting);
			}
			else {
				if(this.vertexGroup[start][count+1]!=undefined)
			return this.farthestVertex(this.vertexGroup[start][count+1],visting);
			}
			return start;
		},
		allPaths:function(from,to,visited,paths){
			visited = visited || [];
			paths = paths || [];
			if (from == to){
				paths.push(visited.concat(from))
				return  paths;
			}
			for (var index in this.vertexGroup[from]) {
				var vertex = this.vertexGroup[from][index];
				if (visited.indexOf(vertex) == -1&&visited.indexOf(from) == -1)
					this.allPaths(vertex, to, visited.concat(from), paths);
			}
			return paths;
		}
};

exports.UndirectedGraph = UndirectedGraph;
exports.DirectedGraph = DirectedGraph;
