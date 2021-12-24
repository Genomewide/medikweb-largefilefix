<template>
  <div class="container" style="padding-bottom: 20px">
    <h1>TRAPI MEDIK CONCEPT EXPLORER</h1>
    <div>
      <b-card no-body style="padding-bottom: 20px">
        <b-tabs card>
          <b-tab title="Find Objects related to genes" active>
            <b-card-text>
              <div class="create-post">
                <div>
                  <b-form @submit="onSubmit" inline>
                    <label class="sr-only" for="Object">Object</label>
                    <b-form-input
                      v-model="concept_search"
                      id="concept_search"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      placeholder="Object"
                    ></b-form-input>

                    <b-button variant="primary" v-on:click="getConcept_service"
                      >Get Related Concepts</b-button
                    >
                    <!-- <b-button variant="primary" v-on:click="increment"
                      >increment</b-button
                    > -->
                    <div
                      style="padding-left: 10px"
                      v-if="concepts_table.length > 0"
                    >
                      Results: &nbsp;{{ totalRows }} of
                      {{ concepts_table.length }}
                    </div>
                    <b-button
                      v-if="concepts_table.length > 0"
                      style="margin-left: 10px"
                      variant="success"
                      v-on:click="selectAllRows"
                      >Select All</b-button
                    >
                    <div
                      style="padding-left: 10px"
                      v-if="selectedRows.length > 0"
                    >
                      Selected: &nbsp;{{ selectedRows.length }}
                    </div>
                    <!-- <div>{{ getuserdata }}</div> -->
                    <b-button
                      style="margin-left: 10px"
                      v-if="selectedRows.length > 0"
                      variant="danger"
                      v-on:click="clearSelected"
                      >Clear Selection</b-button
                    >
                  </b-form>
                  <hr />
                  <!-- <b-row style="margin-top: 20px"> -->
                  <!-- <b-col> -->
                  <b-form style="margin-top: 20px; margin-bottom: 20px">
                    <b-form-group
                      label="Filter"
                      label-for="filter-input"
                      label-cols-sm="1"
                      label-align-sm="left"
                      label-size="sm"
                      class="mb-0"
                    >
                      <b-input-group size="sm">
                        <b-form-input
                          id="filter-input"
                          v-model="filter"
                          type="search"
                          placeholder="Type to Search"
                        ></b-form-input>

                        <b-input-group-append>
                          <b-button :disabled="!filter" @click="filter = ''"
                            >Clear</b-button
                          >
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-form>
                  <!-- </b-col> -->
                  <!-- </b-row> -->
                </div>
              </div>

              <b-pagination
                style="padding-bottom: 20px"
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
              <div>
                <b-table
                  bordered
                  striped
                  hover
                  selectable
                  ref="selectableTable"
                  responsive="true"
                  table-layout:
                  fixed
                  :select-mode="selectMode"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :fields="conceptFields"
                  :items="concepts_table"
                  @row-clicked="myRowClickHandler"
                  :filter="filter"
                  :filter-include-fields="[]"
                  @filtered="onFiltered"
                >
                  <template #cell(selected)="data">
                    <template v-if="data.value">
                      <span aria-hidden="true">&check;</span>
                      <span class="sr-only">Selected</span>
                    </template>
                    <template v-else>
                      <span aria-hidden="true">&nbsp;</span>
                      <span class="sr-only">Not selected</span>
                    </template>
                  </template>
                </b-table>
              </div>
              <hr />
              <!-- <div>
                <b-button v-b-toggle.collapse-1 variant="primary"
                  >Review Selected</b-button
                >
                <b-collapse id="collapse-1" class="mt-2">
                  <b-card v-if="selectedRows.length > 0">
               
                    <b-table
                      bordered
                      striped
                      hover
                      ref="selectedTable"
                      :sticky-header="true"
                      :fields="selectedFields"
                      :items="selectedRows"
                    >
                    </b-table>
                  </b-card>
                </b-collapse>
              </div> -->
            </b-card-text>
          </b-tab>
          <b-tab title="Selected Terms">
            <b-card-text>
              <hr />
              <div>
                <!-- <b-button v-b-toggle.collapse-1 variant="primary"
                  >Review Selected</b-button
                > -->
                <!-- <b-collapse id="collapse-1" class="mt-2"> -->
                <b-card v-if="selectedRows.length > 0">
                  <!-- {{ concepts_table }} -->
                  <!-- selectable table =  {{$refs.selectableTable}} -->
                  <b-table
                    bordered
                    striped
                    hover
                    ref="selectedTable"
                    table-layout:
                    fixed
                    :sticky-header="true"
                    :fields="selectedFields"
                    :items="selectedRows"
                  >
                  </b-table>
                </b-card>
                <!-- </b-collapse> -->
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title="Breakdown">
            <div>
              <b-card-group deck>
                <b-card title="Count of CURIEs">
                  <b-card-text>
                    <b-table :items="curieCount"> </b-table>
                  </b-card-text>
                </b-card>

                <b-card title="Title" header-tag="header" footer-tag="footer">
                  <template #header>
                    <h6 class="mb-0">Count of KGs</h6>
                  </template>
                  <b-card-text>
                    <b-table :items="dbCount"> </b-table>
                  </b-card-text>
                </b-card>
              </b-card-group>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
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
      predicate: "UMLS:C0004096",
      concept_search: "HGNC:6884",
      // HGNC:6884"
      // "HGNC:2625"
      object: "HGNC:6884",
      concept_data: {},
      //concept table
      selectMode: "multi",
      currentPage: 1,
      perPage: 10,
      totalRows: 1,
      concepts_table: [],

      selected: [],
      shownItems: [],
      select_concepts: [],
      conceptFields: [
        {
          key: "selected",
          label: "Select",
          thStyle: { "max-width": "50px" },
        },
        {
          key: "name",
          label: "Name",
          sortable: true,
          thStyle: { "max-width": "100px" },
        },
        {
          key: "category",
          label: "Category test",
          sortable: true,
          thClass: "id_colwidth",
        },
        {
          key: "id",
          label: "ID",
          sortable: true,
          thClass: "id_colwidth",
        },
        {
          key: "db",
          label: "Database",
          sortable: true,
        },
      ],
      selectedFields: [
        {
          key: "name",
          label: "Name",
          sortable: true,
        },
        {
          key: "category",
          label: "Category",
          sortable: true,
        },
        {
          key: "id",
          label: "ID",
          sortable: true,
        },
        {
          key: "db",
          label: "Database",
          sortable: true,
        },
      ],
      predicates: [
        "activator",
        "affects",
        "agonist",
        "allosteric_antagonist",
        "allosteric_modulator",
        "antagonist",
        "blocker",
        "channel_blocker",
        "chemical_or_drug_affects_abnormal_cell",
        "chemical_or_drug_affects_cell_type_or_tissue",
        "chemical_or_drug_affects_gene_product",
        "chemical_or_drug_has_mechanism_of_action",
        "chemical_or_drug_has_physiologic_effect",
        "chemical_or_drug_initiates_biological_process",
        "directly_negatively_regulates",
        "directly_positively_regulates",
        "disrupting_agent",
        "drug_interaction",
        "enzyme_metabolizes_chemical_or_drug",
        "gene_product_has_biochemical_function",
        "gene_product_has_chemical_classification",
        "has_gene_product",
        "ingredient_of",
        "inverse_agonist",
        "INVERTED:biological_process_involves_chemical_or_drug",
        "INVERTED:negatively_regulated_by",
        "INVERTED:process_has_causal_agent",
        "modulator",
        "negative_allosteric_modulator",
        "negative_modulator",
        "positive_allosteric_modulator",
        "positive_modulator",
        "positively_regulates",
        "regulates",
        "regulates_activity_of",
        "regulates_expression_of",
        "regulates_levels_of",
        "target",
        "targets",
        "biolink:positively_regulates",
        "biolink:negatively_regulates",
      ],
      queryResults: [],
      drug_fields: [
        {
          key: "subject_name",
          label: "Subject",
          sortable: true,
          tdClass: "colwidth",
        },
        {
          key: "relation",
          label: "Relation",
          sortable: true,
        },
        {
          key: "object_name",
          label: "Index",
          sortable: true,
        },
        {
          key: "rxnorm",
          label: "RxN",
          sortable: true,
          tdClass: "db_colwidth",
        },
        {
          key: "drugbank",
          label: "DB",
          sortable: true,
          tdClass: "db_colwidth",
        },
        {
          key: "chembl",
          label: "CHEMBL",
          sortable: true,
          tdClass: "db_colwidth",
        },
        {
          key: "publications",
          label: "publications",
          sortable: true,
        },
      ],
      query_fields: [
        {
          key: "subject_name",
          label: "Subject",
          sortable: true,
          tdClass: "colwidth",
        },
        {
          key: "relation",
          label: "Relation",
          sortable: true,
        },
        {
          key: "object_name",
          label: "Index",
          sortable: true,
        },
        {
          key: "rxnorm",
          label: "RxN",
          sortable: true,
          tdClass: "db_colwidth",
        },
        {
          key: "drugbank",
          label: "DB",
          sortable: true,
          tdClass: "db_colwidth",
        },
        {
          key: "chembl",
          label: "CHEMBL",
          sortable: true,
          tdClass: "db_colwidth",
        },
      ],
      drugs_selected: [],

      synonyms_returned: [],
      synonyms_info: [],
      synonym_drugs: [],
      drugStartTime: "",
      drugEndTime: "",
      synonym_tabledata: [],
      filter: null,
      filterOn: [],
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form))
    },
    async getConcept_service() {
      console.log("********* getconcept");
      this.concepts_table = [];
      this.select_concepts = [];
      this.queryResults = [];
      this.selected = [];
      this.shownItems = [];
      this.drugs_selected = [];
      this.totalRows = 1;
      this.filter = null;

      let i = 0;
      try {
        this.concept_data = await PostService.getConcept(this.concept_search);
        console.log("this.concept_search");
        console.log(this.concept_search);
        console.log(this.concept_data);
        let set = await PostService.getConcept(this.concept_search);
        let results = set["concepts"];
        let dbkeys = Object.keys(results);

        // GO THROUGH EACH DATABASE
        dbkeys.forEach((dbkey) => {
          let db = results[dbkey];
          let conceptkeys = Object.keys(db);

          conceptkeys.forEach((conceptkey) => {
            let concept_data = db[conceptkey];
            // console.log("concept_data");
            // console.log(concept_data);
            // let categoriesKept = [
            //   "biolink:Gene",
            //   "biolink:MolecularEntity",
            //   "biolink:NamedThing"
            // ];
            try {
              // if (categoriesKept.indexOf(concept_data["category"]) !== -1) {
              let concept = {};
              concept.index = i;
              concept.db = dbkey;
              concept.id = conceptkey;
              concept.category = concept_data["category"];
              concept.name = concept_data["name"];
              concept.selected = false;
              // if ()
              this.concepts_table.push(concept);
              i++;
              this.totalRows = this.concepts_table.length;
              // console.log("this.totalRows = ", this.totalRows)
              // }
            } catch (err) {
              console.log("error at concept - ", err);
            }
          });
        });

        console.log("finshed concept services");
        console.log(this.concepts_table);
      } catch (err) {
        this.error = err;
      }
    },
    myRowClickHandler(item) {
      // this.select_concepts = this.concepts_table.filter(row => row.selected == true)
      console.log("myRowClickHandler");
      for (var i = 0; i < this.concepts_table.length; i++) {
        if (this.concepts_table[i].index === item.index) {
          // console.log(item);
          // this.select_concepts.push(item);
          this.concepts_table[i].selected = !this.concepts_table[i].selected;
        }
      }
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      // console.log(item); // This will be the item data for the row
    },

    selectAllRows() {
      for (var i = 0; i < this.concepts_table.length; i++) {
        this.concepts_table[i].selected = true;
        // }
      }
    },
    clearSelected() {
      for (var i = 0; i < this.concepts_table.length; i++) {
        this.concepts_table[i].selected = false;
        // }
      }
    },
    drugClickHandler(item) {
      console.log("item");
      console.log(item);
      for (var i = 0; i < this.queryResults.length; i++) {
        console.log("this.queryResults[i]");

        console.log(this.queryResults[i].index);
        console.log(this.queryResults[i]);
        if (this.queryResults[i].index === item.index) {
          this.drugs_selected.push(this.queryResults[i]);
          this.queryResults.splice(i, 1);
          console.log("this.queryResults[i]");
          console.log(this.queryResults[i]);
        }
      }
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      // console.log(item); // This will be the item data for the row
    },
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
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    increment() {
      this.$store.commit("increment");
      console.log(this.$store.state.count);
    },
    // ...mapActions(["fetchUserData"]),
  },
  computed: {
    // ...mapGetters(["getuserdata"]),
    selectedRows: function () {
      // const rebels = pilots.filter(pilot => pilot.faction === "Rebels");

      let selectedRows = this.concepts_table.filter(
        (row) => row.selected == true
      );
      // console.log("selectedRows");
      // console.log(selectedRows);
      // return this.concepts_table.filter(row => row.selected == true)
      // for (let index = 0; index < this.concepts_table.length; index++) {
      //   if (this.concepts_table[index].selected) {
      //     selectedRows.Push()
      //   }
      //   const element = this.concepts_table[index];
      //   console.log(element)

      // }

      return selectedRows;
    },
    curieCount: function () {
      console.log("start curieCount");
      let ids = [];
      let idTable = [];

      let countTable = this.concepts_table;

      for (let index = 0; index < countTable.length; index++) {
        const el = countTable[index];

        let id = el.id.split(":")[0];
        // COUNT EACH TYPE OF CURIE
        if (ids.indexOf(id) == -1) {
          ids.push(id);
          idTable.push({ idName: id, idcount: 1 });
        } else {
          for (let index = 0; index < idTable.length; index++) {
            const element = idTable[index];
            if (element.idName == id) {
              idTable[index].idcount++;
            }
          }
        }
      }
      return idTable;
    },
    dbCount: function () {
      console.log("start dbCount");
      let dbs = [];
      let dbTable = [];

      let countTable = this.concepts_table;

      for (let index = 0; index < countTable.length; index++) {
        const el = countTable[index];

        let db = el.db;

        // COUNT EACH DATABASE OCCURANCE
        if (dbs.indexOf(db) == -1) {
          dbs.push(db);
          dbTable.push({ dbName: db, dbcount: 1 });
        } else {
          for (let index = 0; index < dbTable.length; index++) {
            const element = dbTable[index];
            if (element.dbName == db) {
              dbTable[index].dbcount++;
            }
          }
        }
      }
      return dbTable;
    },
  },
  created() {
    this.fetchUserData;
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.concepts_table.length;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/* div.container { max-width: 800px; margin: 0 auto; } */
.sel_colwidth {
  max-width: 10%;
}
.db_colwidth {
  max-width: 25%;
}
.name_colwidth {
  max-width: 25%;
}
.cat_colwidth {
  max-width: 25%;
}
.id_colwidth {
  max-width: 15%;
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
