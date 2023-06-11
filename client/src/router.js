// router.js
import Vue from 'vue'
import Router from 'vue-router'

import home from './components/geneToDrug.vue';
// import apiexplorer from './components/apiexplorer.vue';
// import arsexplorer from './components/arsexplorer.vue';
// import conceptExplore from './components/conceptExplore.vue';
// import geneToDrug from './components/geneToDrug.vue';
// import geneToDrugnext from './components/geneToDrugnext.vue';
// import TwoHop from './components/geneToGeneToDrug.vue';
// import starburst from './components/starburst.vue';
// import svgtest from './components/svgtest.vue';
import conceptExplorePlus from './components/conceptExplorePlus.vue';
// import geneAllSynToDrugs from './components/geneAllSynToDrugs.vue';
// import geneAllSynToDrugsv2 from './components/geneAllSynToDrugsv2.vue'; 
import geneAllSynToDrugsARS from './components/geneAllSynToDrugsARS.vue';
import retrieveARSResults from './components/retrieveARSResults.vue';
import geneAllSynToDrugsARS2 from './components/geneAllSynToDrugsARS2.vue';
import cytoscapeTest1 from './components/cytoscapeTest1.vue';
// import conceptExploreTextMatch from './components/cytoscapTest1.vue'; 
import geneAllSynToDrugsARSBatch from './components/geneAllSynToDrugsARSBatch.vue'; 
// import conceptConnect from './components/conceptConnect.vue';
// import xml from './components/XDM-220618-012821/IHE_XDM/CE001/DOC00001.XML';
// /Users/andycrouse/Documents/GitHub/medikweb_dev/client/src/components/XDM-220618-012821/IHE_XDM/CE001/DOC00001.XML
// client/src/components/conceptExplorePlus.vue geneAllSynToDrugs geneAllSynToDrugsv2 conceptExploreTextMatch conceptConnect

Vue.use(Router)
// arsexplorer 
// export function createRouter () {
//   return new Router({
  export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/', 
        redirect: 
          { name: 'home'}
      },
      { 
        path: '/home', 
        name: 'home', 
        component: home 
      },

      { 
        path: '/retrieveARSResults', 
        name: 'retrieveARSResults', 
        component: retrieveARSResults 
      },   
      { 
        path: '/geneAllSynToDrugsARS2', 
        name: 'geneAllSynToDrugsARS2', 
        component: geneAllSynToDrugsARS2 
      },
      { 
        path: '/cytoscapeTest1', 
        name: 'cytoscapeTest1', 
        component: cytoscapeTest1 
      },
      { 
        path: '/geneAllSynToDrugsARSBatch', 
        name: 'geneAllSynToDrugsARSBatch', 
        component: geneAllSynToDrugsARSBatch 
      },
      // { 
      //   path: '/apiexplorer', 
      //   name: 'apiexplorer', 
      //   component: apiexplorer 
      // },
      // { 
      //   path: '/conceptexplore', 
      //   name: 'conceptExplore', 
      //   component: conceptExplore 
      // },
      // { 
      //   path: '/geneToDrug', 
      //   name: 'geneToDrug', 
      //   component: geneToDrug 
      // },
      // { 
      //   path: '/geneToDrugnext', 
      //   name: 'geneToDrugnext', 
      //   component: geneToDrugnext 
      // },
      // { 
      //   path: '/twohop', 
      //   name: 'TwoHop', 
      //   component: TwoHop 
      // },
      // { 
      //   path: '/starburst', 
      //   name: 'starburst', 
      //   component: starburst 
      // },
      // { 
      //   path: '/svgtest', 
      //   name: 'svgtest', 
      //   component: svgtest 
      // },
      { 
        path: '/conceptExplorePlus', 
        name: 'conceptExplorePlus', 
        component: conceptExplorePlus 
      },
      // { 
      //   path: '/geneAllSynToDrugs', 
      //   name: 'geneAllSynToDrugs', 
      //   component: geneAllSynToDrugs 
      // },
      { 
        path: '/geneAllSynToDrugsARS', 
        name: 'geneAllSynToDrugsARS', 
        component: geneAllSynToDrugsARS 
      },
      // { 
      //   path: '/geneAllSynToDrugsv2', 
      //   name: 'geneAllSynToDrugsv2', 
      //   component: geneAllSynToDrugsv2 
      // },
      // { 
      //   path: '/conceptExploreTextMatch', 
      //   name: 'conceptExploreTextMatch', 
      //   component: conceptExploreTextMatch 
      // },
      // { 
      //   path: '/conceptConnect', 
      //   name: 'conceptConnect', 
      //   component: conceptConnect 
      // }
    ]
  })
   // conceptExplore conceptExplorePlus geneAllSynToDrugs
   // drugtogene_complete starburst geneAllSynToDrugsv2
 