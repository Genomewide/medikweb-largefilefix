// router.js
import Vue from 'vue'
import Router from 'vue-router'

import home from './components/geneToDrug.vue';
import apiexplorer from './components/apiexplorer.vue';
import arsexplorer from './components/arsexplorer.vue';
import conceptExplore from './components/conceptExplore.vue';
import geneToDrug from './components/geneToDrug.vue';
import geneToDrugnext from './components/geneToDrugnext.vue';
import TwoHop from './components/geneToGeneToDrug.vue';
import starburst from './components/starburst.vue';
import svgtest from './components/svgtest.vue';
import conceptExplorePlus from './components/conceptExplorePlus.vue';
import geneAllSynToDrugs from './components/geneAllSynToDrugs.vue';

// client/src/components/conceptExplorePlus.vue geneAllSynToDrugs

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
        path: '/arsexplorer', 
        name: 'arsexplorer', 
        component: arsexplorer 
      },      
      { 
        path: '/apiexplorer', 
        name: 'apiexplorer', 
        component: apiexplorer 
      },
      { 
        path: '/conceptexplore', 
        name: 'conceptExplore', 
        component: conceptExplore 
      },
      { 
        path: '/geneToDrug', 
        name: 'geneToDrug', 
        component: geneToDrug 
      },
      { 
        path: '/geneToDrugnext', 
        name: 'geneToDrugnext', 
        component: geneToDrugnext 
      },
      { 
        path: '/twohop', 
        name: 'TwoHop', 
        component: TwoHop 
      },
      { 
        path: '/starburst', 
        name: 'starburst', 
        component: starburst 
      },
      { 
        path: '/svgtest', 
        name: 'svgtest', 
        component: svgtest 
      },
      { 
        path: '/conceptExplorePlus', 
        name: 'conceptExplorePlus', 
        component: conceptExplorePlus 
      },
      { 
        path: '/geneAllSynToDrugs', 
        name: 'geneAllSynToDrugs', 
        component: geneAllSynToDrugs 
      }
    ]
  })
   // conceptExplore conceptExplorePlus geneAllSynToDrugs
   // drugtogene_complete starburst
 