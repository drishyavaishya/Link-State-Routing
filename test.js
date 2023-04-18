
//This function generated graph with n number of nodes

function generateWeightedGraph(n) {
    // create an empty adjacency matrix
    const matrix = [];
    for (let i = 0; i < n; i++) {
      matrix.push([]);
      for (let j = 0; j < n; j++) {
        matrix[i].push(1e9);
      }
    }
  
    // fill the adjacency matrix with random weights
    for (let i = 0; i < n; i++) {
        matrix[i][i] = 0;
      for (let j = i + 1; j < n; j++) {
        if (Math.random() < 0.5) {
          // connect vertices i and j with a random weight
          const weight = Math.floor(Math.random() * 10) + 1; // random weight between 1 and 10
          matrix[i][j] = weight;
          matrix[j][i] = weight;
        }
      }
    }
  
    // ensure the graph is connected
    const visited = new Array(n).fill(false);
    const queue = [0];
    visited[0] = true;
    while (queue.length > 0) {
      const node = queue.shift();
      for (let i = 0; i < n; i++) {
        if (matrix[node][i] > 0 && !visited[i]) {
          visited[i] = true;
          queue.push(i);
        }
      }
    }
    if (visited.indexOf(false) !== -1) {
      // not all vertices are reachable, so add edges until the graph is connected
      while (visited.indexOf(false) !== -1) {
        const i = visited.indexOf(false);
        const j = Math.floor(Math.random() * (visited.length - 1)) + 1;
        const weight = Math.floor(Math.random() * 10) + 1; // random weight between 1 and 10
        matrix[i][j] = weight;
        matrix[j][i] = weight;
        visited[j] = true;
      }
    }
  
    return matrix;
  }
  

  //This function is an implementation of dijksta's algorithm to calculate shortest distance and shortest path of each node from a given node.

  function dijkstra(graph, start) {
    const n = graph.length;
    const visited = new Array(n).fill(false);
    const dist = new Array(n).fill(Infinity);
    const path = new Array(n).fill(null);
    dist[start] = 0;
  
    for (let i = 0; i < n - 1; i++) {
      // find the vertex with the minimum distance
      let minDist = Infinity;
      let u = -1;
      for (let j = 0; j < n; j++) {
        if (!visited[j] && dist[j] < minDist) {
          minDist = dist[j];
          u = j;
        }
      }
      // mark the vertex as visited
      visited[u] = true;
  
      // update the distance and path of adjacent vertices
      for (let v = 0; v < n; v++) {
        if (!visited[v] && graph[u][v] > 0 && dist[u] + graph[u][v] < dist[v]) {
          dist[v] = dist[u] + graph[u][v];
          path[v] = u;
        }
      }
    }
  
    // construct the path for each vertex
    const paths = new Array(n);
    for (let i = 0; i < n; i++) {
      if (i === start) {
        paths[i] = [i];
      } else if (path[i] === null) {
        paths[i] = null;
      } else {
        paths[i] = [i];
        let j = i;
        while (j !== start) {
          paths[i].unshift(path[j]);
          j = path[j];
        }
      }
    }
  
    return { dist, paths };
  }
  

  //This function calls dijkstra for every node in the graph
  function shortestPath(graph) {
    const n = graph.length;
    const shortestPaths = new Array(n);
    for (let i = 0; i < n; i++) {
      shortestPaths[i] = dijkstra(graph, i);
    }
    return shortestPaths;
  }
  
var cols=window.localStorage.getItem("noOfNodes");
cols++;
var rows = cols-1;
const graph=generateWeightedGraph(cols-1);//generating a random graph.

//This function creates a table which provides info about the chosen node.
function createTable(rows,cols,id,tag) 
{
  var table = document.getElementById(id);
  var tbody = table.getElementsByTagName(tag)[0];
  
  // Clear any existing rows
  tbody.innerHTML = "";
  
  // Create new rows and columns
  for (var i = 0; i < rows; i++) {
    var row = tbody.insertRow(i);
    for (var j = 0; j < cols; j++) 
    {
      var cell = row.insertCell(j);
      // cell.innerHTML = "Row " + (i + 1) + ", Column " + (j + 1);
      if(i==0 && j==0)
      {
        cell.innerHTML="Node";
      }
      else if (i==0) 
      { 
        let x = 65 + j-1;
        var str =String.fromCharCode(x);
        console.log(str);
        cell.innerHTML=str;
      } 
      else if(j==0)
      {
        cell.innerHTML='A';
      }
      else 
      {
        if(graph[0][j-1]==1e9)
        {
          cell.innerHTML="inf";
        }
        else
        {
          cell.innerHTML=graph[0][j-1];
        }
      }
    }
  }
}
createTable(2,cols,"a-info","tbody");


//This funtion displays all packets recieved when send/recieve button is clicked by the user.
function displayinfo()
{
  document.getElementById("message").innerHTML = "Packets Recieved!";
  var table = document.getElementById("myTable");
  var tbody = table.getElementsByTagName("tbody")[0];
  
  // Clear any existing rows
  tbody.innerHTML = "";
  
  // Create new rows and columns
  for (var i = 0; i < rows; i++) {
    var row = tbody.insertRow(i);
    for (var j = 0; j < cols; j++) 
    {
      var cell = row.insertCell(j);
      if(i==0 && j==0)
      {
        cell.innerHTML="Node";
      }
      else if(i==0)
      { 
        let x = 65 + j - 1;
        var str =String.fromCharCode(x);
        console.log(str);
        cell.innerHTML=str;
      }
      else if(j==0)
      {
        let x = 65 + i;
        var str =String.fromCharCode(x);
        console.log(str);
        cell.innerHTML=str;
      }
      else
      {
        if(graph[i][j-1]==1e9)
        {
          cell.innerHTML="inf";
        }
        else
        {
          cell.innerHTML=graph[i][j-1];
        }
      }
    }
  }
  document.getElementById("calculatepath").innerHTML = "Calculate Shortest Distance and Path";
  inputTable();
  document.getElementById("verifyButton").innerHTML ="Verify";
  document.getElementById("verifyButton").className += " btn-dark ";
}

//This function verifies the input given by user onclick of verify button

function verifyTable(){
  var n = document.getElementsByClassName('shortest-distance').length;
  console.log(n);
  var distance = Array(n);
  var path = Array(n);
  for (var i = 0; i < document.getElementsByClassName('shortest-distance').length; i++)
  {
      distance[i] = document.getElementsByClassName('shortest-distance')[i].value;
      console.log(distance[i]);
  };
  for (var i = 0; i < document.getElementsByClassName('shortest-path').length; i++)
  {
      path[i] = document.getElementsByClassName('shortest-path')[i].value;
      console.log(path[i]);
  };


    const shortestPaths = shortestPath(graph);
    console.log(shortestPaths);
  
    for(let i=0;i<shortestPaths.length;i++)
    {
        console.log(shortestPaths[i]);
    }

    // console.log(shortestPaths[0][0]);
    console.log(shortestPaths[0]['dist']);
    console.log(shortestPaths[0].dist);
    var x = shortestPaths[0].dist.length;
    let a = 0;

    for(let i=0;i<shortestPaths[0].dist.length;i++){
      if(shortestPaths[0].dist[i] == distance[i]){
        console.log("success");
      }else{
        console.log("fail");
        a=1;
      }
    }
    
    for(let i=0;i<shortestPaths[0].paths.length;i++){
      var str = "";
      for(let j=0;j<shortestPaths[0].paths[i].length;j++){
        let z = shortestPaths[0].paths[i][j];
        let x = 65 + z;
        var t =String.fromCharCode(x);
        str += t;
      }
      if(str == path[i]){
        console.log("success");
      }else{
        console.log("fail");
        a=1;
      }
    }


    if(a){
      // tryagain
      document.getElementById("verifyButton").innerHTML ="Try Again!";
    }else{
      // welldone
      
      for (let i = 1; i < n; i++) {
        graph[i][i] = 0;
      for (let j = i + 1; j < n; j++) {
        if (Math.random() < 0.5) {
          // connect vertices i and j with a random weight
          const weight = Math.floor(Math.random() * 10) + 1; // random weight between 1 and 10
          graph[i][j] = weight;
          graph[j][i] = weight;
        }
      }
    }
    displayinfo();
    document.getElementById("message").innerHTML = "Link State Updated!";
    }

}

//This function creates an input table for user to enter shortest path and distance.
function inputTable()
{
  var table = document.getElementById("myPath");
  var tbody = table.getElementsByTagName("tbody")[0];
  
  // Clear any existing rows
  tbody.innerHTML = "";
  for(var i=0;i<cols;i++)
  {
    var row=table.insertRow(i);
    for(var j=0;j<3;j++)
    {
      var cell=row.insertCell(j);
      if(i==0 && j==0)
      {
        cell.innerHTML="Node";
      }
      else if(j==0)
      { 
        let x = 65 + i - 1;
        var str =String.fromCharCode(x);
        console.log(str);
        cell.innerHTML="A->"+str;
      }
      else if(i==0)
      {
        if(j==1)
        {
          cell.innerHTML="Distance";
        }
        else
        {
          cell.innerHTML="Path";
        }
      }
      else
      {
        if(j==1)
        {
          cell.innerHTML = '<input type="number" min=0 class="shortest-distance" placeholder="Enter Shortest Distance">';
        }
        else
        {
          cell.innerHTML = '<input type="text" class="shortest-path" placeholder="Enter Shortest Path">';
        }
      }
    }
  }
}

//This function redirects the user to home page
function redirecttopage()
{
  window.location.href = "index.html";
}
  
