var ld = require('lodash');

var WeightedGraph = function(){
	this.vertexGroup = {};
	this.unvisited_node = [];
};
var Edge = function(name,from,to,weight){
	this.name = name;
	this.from = from;
	this.to = to;
	this.weight = weight;
} 

WeightedGraph.prototype = {
		addVertex:function(vertex){
			this.vertexGroup[vertex] = [];
			return this.vertexGroup;
		},
		addEdge:function(edge){
			this.unvisited_node.push(edge);
			return this.vertexGroup[edge.from].push(edge)&&this.vertexGroup[edge.to].push(edge) ;
		},
		shortestPath:function(from,to){
			var self = this;
			var vertices = Object.keys(this.vertexGroup);
			var depth = {}
			,parent = {}
			,Infinity = 1/0;
			parent[from] = from;
			for (var vertex in this.vertexGroup) {
				depth[vertex] = vertex==from ? 0 :Infinity;
			};
			while(vertices.length!=0){
				var v = vertices[0];
				for (var i in vertices)
					if (depth[v]>depth[vertices[i]]) v = vertices[i];
					vertices.splice(vertices.indexOf(v),1);
					for (var index in this.vertexGroup[v]) {
						var new_vertex = this.vertexGroup[v][index].to;
						var engaged_with_vertices = ld.find(this.vertexGroup[v],function(argu) {
							return argu.from == v && argu.to == new_vertex;
						});
						if (depth[new_vertex] > depth[v] + this.vertexGroup[v][index].weight) {
							depth[new_vertex] = depth[v] + this.vertexGroup[v][index].weight;
							parent[new_vertex] = v;
						};
					};
			}
			var result = [];
			while(from != to) {
				var firstOfTo = parent[to];
				var vertex_group = [];
				for (var i in this.unvisited_node)
					if(this.unvisited_node[i].to == to && this.unvisited_node[i].from == firstOfTo) vertex_group.push(this.unvisited_node[i]);
					var path = vertex_group.reduce(function(x,y){
						return x.weight > y.weight?y:x;
					})
					result.push(path);
					to = firstOfTo;
				}
				return result.reverse();
		}
};
exports.WeightedGraph = WeightedGraph;
exports.Edge = Edge;