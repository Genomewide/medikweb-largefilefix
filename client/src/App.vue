<template>
  <div id="app">
<!-- <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <router-link class="navbar-brand" to="/home">PMI</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

</nav> -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="#">PMI</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
      </li>
      <li class="nav-item">
        <!-- <a class="nav-link" href="#">Link</a> -->
      </li>
      <!-- <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li> -->
      <li class="nav-item">
        <!-- <a class="nav-link disabled" href="#">Disabled</a> -->
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0"> acrouse@uab.edu
      <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
    </form>
  </div>
</nav>
<div>
  <b-container  fluid>
  <b-row >
    <b-col cols="2" class="border-right border-primary sidenav" style="height:100%">
        <b-nav vertical style="padding-top:20px">
    <!-- <b-nav-item active><router-link to="/home">Home</router-link></b-nav-item> -->
    <!-- <b-nav-item active><router-link to="/geneToDrug">Gene to Drug</router-link></b-nav-item>
    <b-nav-item ><router-link to="/twohop">Two Hop G2G2D</router-link></b-nav-item>
    <b-nav-item ><router-link to="/conceptExplore">Concepts Explorer</router-link></b-nav-item>
    <b-nav-item ><router-link to="/apiexplorer">Api Format Tester</router-link></b-nav-item>
    <b-nav-item ><router-link to="/arsexplorer">ARS Format Tester</router-link></b-nav-item>
    <b-nav-item ><router-link to="/geneToDrugnext">geneToDrugnext</router-link></b-nav-item>
    <b-nav-item ><router-link to="/starburst">starburst</router-link></b-nav-item>
    <b-nav-item ><router-link to="/svgtest">svgtest</router-link></b-nav-item>
    <b-nav-item ><router-link to="/conceptExplorePlus">conceptExplorePlus</router-link></b-nav-item>
    <b-nav-item ><router-link to="/geneAllSynToDrugs">geneAllSynToDrugs</router-link></b-nav-item> -->
    <!-- <b-nav-item ><router-link to="/conceptExplorePlus">conceptExplorePlus</router-link></b-nav-item> -->
    <b-nav-item active><router-link to="/geneAllSynToDrugsARS">geneAllSynToDrugsARS</router-link></b-nav-item>
    <b-nav-item ><router-link to="/retrieveARSResults">retrieveARSResults</router-link></b-nav-item>
    <b-nav-item ><router-link to="/geneAllSynToDrugsARS2">geneAllSynToDrugsARS2</router-link></b-nav-item>
    <b-nav-item ><router-link to="/cytoscapeTest1">cytoscapeTest1</router-link></b-nav-item>
    <!-- <b-nav-item ><router-link to="/conceptExploreTextMatch">conceptExploreTextMatch</router-link></b-nav-item> 
    <b-nav-item ><router-link to="/conceptConnect">conceptConnect</router-link></b-nav-item>
    <b-nav-item ><router-link to="/xml">xml</router-link></b-nav-item> -->
    <!-- <div>svgtest conceptExplorePlus geneAllSynToDrugs geneAllSynToDrugsARS conceptConnect geneAllSynToDrugsARS2
      <svg width = "100" height = "100">
        <circle cx = "50" cy = "50" r= "40" stroke = "deeppink" stroke-width="2" fill = "#ffe6ee" />
        </svg>
    </div> -->
    <!-- <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item ><b-button variant="outline-primary">twohopButton</b-button></b-nav-item> -->
  </b-nav>
    </b-col>
    <b-col class="container-grid"><router-view/></b-col>
    
  </b-row>


</b-container>

</div>


    
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.sidenav {
  height: 100%;
  width: 20%;
  margin-top:50px;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  box-sizing: border-box;
}
.container-grid {
  max-width: 85%;
  margin-left: 15%;
  height: 100%;
  overflow-x: hidden;
    position: fixed;

}
</style>
