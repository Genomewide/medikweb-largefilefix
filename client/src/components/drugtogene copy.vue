<template>
  <div class="container">
    <h1>TRAPI MEDIK GENE QUERY drug to gene</h1>
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Concept 2 drugs" active>
            <b-card-text>
              <div class="create-post">
                <div>
                  <div class="container">
                    <b-row>
                      <div
                        v-for="(concept, index) in select_concepts"
                        v-bind:index="index"
                        v-bind:key="concept._id"
                      >
                        <b-col
                          ><b-button size="sm">{{
                            concept.name
                          }}</b-button></b-col
                        >
                      </div>
                    </b-row>
                  </div>

                  <b-form inline>
                    <label class="sr-only" for="Object">Object</label>
                    <b-form-input
                      v-model="concept_search"
                      id="concept_search"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      placeholder="Object"
                    ></b-form-input>

                    <b-button
                      variant="primary"
                      v-on:click="getSynonyms_service"
                    >
                      Get drugs
                    </b-button>
                    <b-spinner small type="grow"></b-spinner> 
                    <div v-if="synonym_drugs.length">Number of results
                    {{ drug_data.length }}</div> 
                  </b-form>
                </div>
              </div>
              <hr />

              <div>
              <b-table
                  bordered
                  striped
                  hover
                  :fields="drug_fields"
                  :items="synonym_drugs"
                >
                </b-table>
 
              </div>
              <div>
             
              </div>
            </b-card-text>
          </b-tab>
    
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
var parser = require("fast-xml-parser");
import axios from "axios";
// import got from 'got';
// const EventEmitter = require("events");

// class MyEmitter extends EventEmitter {}
// const eventEmitter = new MyEmitter();

export default {
  name: "PostComponent",
  data() {
    return {
      error: "",
      text: "",
      mediget: {},
      nodes: [],
      edges: [],
      subject: "chemical",
      predicate: "HGNC:2625",
      concept_search: "HGNC:2625",
      noreesults: false,
      // HGNC:6884"
      // "HGNC:2625"
      object: "HGNC:5006",
      concept_data: {},
      //concept table
      concepts_table: [],
      selected: [],
      selectTest: [
        {
          index: 0,
          db: "rtx2_2020_09_16",
          id: "MGI:1353598",
          category: "biolink:Gene",
          name: "Mapk8ip3 (mouse)"
        },
        {
          index: 1,
          db: "rtx2_2020_09_16",
          id: "MGI:1353598",
          category: "biolink:Gene",
          name: "Mapk8ip3 (mouse)"
        },
        {
          index: 2,
          db: "rtx2_2020_09_16",
          id: "NCBIGene:51499",
          category: "biolink:Gene",
          name: "Mapk8ip3 (mouse)"
        },
        {
          index: 2,
          db: "rtx2_2020_09_16",
          id: "UMLS:C1417024",
          category: "biolink:NamedThing",
          name: "Mapk8ip3 protein, mouse"
        }
      ],
      shownItems: [],
      select_concepts: [],
      conceptFields: [
        "Selected",

        {
          key: "db",
          label: "Database",
          sortable: true
        },
        {
          key: "id",
          label: "ID",
          sortable: true
        },
        {
          key: "category",
          label: "Category",
          sortable: true
        },
        {
          key: "name",
          label: "Name",
          sortable: true
        }
      ],

      queryResults: [],
      drug_fields2: [
        {
          key: "subject_name",
          label: "Subject",
          sortable: true
        },
        {
          key: "relation",
          label: "Relation",
          sortable: true
        },
        {
          key: "object_name",
          label: "Index",
          sortable: true
        },
        // {
        //   key: "rxnorm",
        //   label: "RxN",
        //   sortable: true,
        //   tdClass: "db_colwidth"
        // },
        // {
        //   key: "drugbank",
        //   label: "DB",
        //   sortable: true,
        //   tdClass: "db_colwidth"
        // },
        {
          key: "chembl",
          label: "CHEMBL",
          sortable: true,
          tdClass: "db_colwidth"
        },
        {
          key: "publications",
          label: "publications",
          sortable: true
        }
      ],
      drug_data: [],
      drugStartTime: "",
      drugEndTime: "",
      synonym_data: [],
  // reverting and moved the below from older copyright
  synonym_drugs: [],
        drug_fields: [
        {
          key: "subject_name",
          label: "Subject",
          sortable: true,
          tdClass: "colwidth"
        },
        {
          key: "relation",
          label: "Relation",
          sortable: true
        },
        {
          key: "object_name",
          label: "Index",
          sortable: true
        },
         {
          key: "rxnorm",
          label: "RxN",
          sortable: true,
          tdClass: "db_colwidth"
        },
         {
          key: "drugbank",
          label: "DB",
          sortable: true,
          tdClass: "db_colwidth"
        },
        {
          key: "chembl",
          label: "CHEMBL",
          sortable: true,
          tdClass: "db_colwidth"
        },   
        {
          key: "publications",
          label: "publications",
          sortable: true
        }          
      ],
    };
  },
  methods: {
    async getSynonyms_service() {
      this.drugStartTime = new Date()
      try {
        this.synonym_drugs = []
        this.concept_data = await PostService.getSynonyms(this.concept_search);
        console.log("await PostService.getSynonyms(this.concept_search);")
        console.log(await PostService.getSynonyms(this.concept_search))
        // this.synonyms_returned = this.concept_data["synonyms"]
        let syn_ids = Object.keys(this.concept_data["synonyms"]);
        console.log("syn_ids")
        console.log(syn_ids)


          let id_obj = []
          for (let index = 0; index < syn_ids.length; index++) { 
            // ONLY KEEP THE CURIESS THAT WILL INCLUDE LINK TO DRUGS BC WE HAVE TO WAIT TIME PER CURIE TO RETURN INFO
            if (syn_ids[index].includes('NCBI') | syn_ids[index].includes('UniProtKB') | syn_ids[index].includes('UMLS')){
              id_obj.push({"id" :syn_ids[index] }) 
              console.log('found one = ' + syn_ids[index])
            }
            
            // const element = syn_ids[index];
            console.log("index")
            console.log(index)

            if (index == syn_ids.length - 1){
              console.log("getting drugs")
              this.synonym_drugs = await PostService.queryPost(id_obj)
              
                console.log(this.synonym_drugs )
              this.drugEndTime = new Date()

              // console.log(await PostService.queryPost(id_obj))
              // console.log(this.synonyms_info)
            }
            
          }
  
      } catch (err) {
        console.log(err)
      }
    },
    // async getSynonyms_service() {
    //   this.drugStartTime = new Date();
    //   try {
    //     this.synonym_drugs = [];
    //     this.concept_data = await PostService.getSynonyms(this.concept_search);
    //     console.log("await PostService.getSynonyms(this.concept_search);");
    //     console.log(await PostService.getSynonyms(this.concept_search));
    //     // this.synonyms_returned = this.concept_data["synonyms"]
    //     let syn_ids = Object.keys(this.concept_data["synonyms"]);
    //     console.log("syn_ids");
    //     console.log(syn_ids);

    //     for (let i = 0; i < syn_ids.length; i++) {
    //       const synonym = syn_ids[i];
    //       let syn_data = await PostService.getSynonyms(synonym);
    //       this.drug_data.push(syn_data);

    //     }

    //     let id_obj = [];
    //     for (let index = 0; index < syn_ids.length; index++) {
    //       id_obj.push({ id: syn_ids[index] });
    //       const element = syn_ids[index];
    //       console.log("index");
    //       console.log(index);
    //       console.log("syn_ids.length");
    //       console.log(syn_ids.length);
    //       console.log(element);

    //       if (index == syn_ids.length - 1) {
    //         console.log("getting drugs");
    //         this.synonym_drugs = await PostService.queryPost(id_obj);

    //         console.log(this.synonym_drugs);
    //         this.drugEndTime = new Date();

    //         // console.log(await PostService.queryPost(id_obj))
    //         // console.log(this.synonyms_info)
    //       }
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async getPubmed() {
      try {
        // terms.array.forEach(element => {
        // let puubmedurl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=" + pmid + "&rettype=json"
        let puubmedurl =
          "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30945334,30612693&rettype=json";

        const res = await axios.get(puubmedurl);
        const xmlData = res.data;
        var pmjson = parser.parse(xmlData);
        console.log(pmjson);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/* div.container { max-width: 800px; margin: 0 auto; } */
.colwidth {
  max-width: 100px;
}
.db_colwidth {
  max-width: 5px;
}
/* 
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
} */
</style>
