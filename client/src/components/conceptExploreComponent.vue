<template>
  <b-container fluid style="background:#2E72BD; border-radius: 25px;">
    <b-row class="text-center" align-v="center">
      <!-- {{conceptData}} -->
      <b-col cols="1">
        <div
          style="
            transform: rotate(-90deg);
            position: absolute;
            text-transform: uppercase;
            font-size: 26px;
            font-weight: bold;
            left: -40px;
          "
        >
          {{ conceptData.name }}
        </div>
      </b-col>
      <b-col>
        <b-row
          class="text-center predicate"
          align-v="center"
          v-for="(result, index) of conceptData.children"
          :key="index"
          style="border: #FFFFF0; background: #4192E1; border-radius: 25px; padding: 10px"
        >
          <b-col cols="1">
            <div
              style="
                transform: rotate(-90deg);
                position: absolute;
                text-transform: uppercase;
                font-size: 26px;
                font-weight: bold;
                left: -40px;
              "
            >
              {{ result.name }}
            </div>
          </b-col>
          <b-col>
            <b-row v-for="(res, index) of result.children" :key="index">
              <!-- <div class="names" >
                  {{ res.name }}
                 </div>  -->
              <div class="text-left" style="width: 100%">
                <b-card
               
                  style="margin: 5px; background: #5AB0F8; color: #fff;"
                >
                  <b-card-text >
                    <h4>
                      {{ res.name }} (
                      {{ res.children.length.toString() }}
                    )
                    </h4>
                    
                  </b-card-text>
                  <!-- <div v-if="false"> -->
                  <div >
                    <b-card-text>

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
             

              <b-pagination
                style="padding-bottom: 20px"
                v-model="currentPage"
                :total-rows="res.children.length"
                :per-page="10"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>

                <b-table
                  bordered
                  striped
                  hover
                  
                  ref="selectableTable"
                  responsive="true"
                  table-layout:
                  fixed
                  :current-page="currentPage"
                  :per-page="10"
                  :fields="resultFields"
                  :items="res.children"
                  :filter="filter"
                  :filter-include-fields="[]"
                  @filtered="onFiltered"
                >
                  <template #cell(object)="data">
                    <!-- <div class="fade" style="background: linear-gradient(to right, white, transparent 90%);"> -->
                    <span v-b-tooltip.hover :title=data.item.objectName>{{data.item.objectName}}</span>
                   
                  </template>
                    <template v-slot:cell()="data">
        <span v-b-tooltip.hover :title=data.value>{{ data.value}}</span>
      </template>
                </b-table>


                    </b-card-text>

                  </div>
                </b-card>
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
    
  

<script>

// #2E72BD #4192E1 #5AB0F8 #93CEFA #C3E5FC

export default {
  // components: {
  //   tree,
  // },
  props: ["conceptData"],
  mounted: function () {
  console.log("this.conceptData")
  console.log(this.conceptData)
  },
  data() {
    return {
      name: "",
      children: [],
      filter: null,
      currentPage: 1,
      resultFields:[
                {
          key: "object",
          label: "object",
          thStyle: { "max-width": "50px" },
        },
        {
          key: "predicate",
          label: "predicate",
          thStyle: { "max-width": "50px" },
        },
        {
          key: "subject",
          label: "subject",
           thStyle: { "max-width": "50px" },

        },
      ]
    };
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  }
};
</script>



<style scoped>
.fade {
  font-size: 72px;
  background: -webkit-linear-gradient(#eee, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.predicate {
  margin: 10px;
  border: 1px solid black;
}
.datagroup {
  font: bold 12px Sans-Serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: #369;
  color: #fff;
  padding: 5px 10px;
  margin: 0 0 10px 0;
  line-height: 24px;
  transform: rotate(-90deg);
  transform-origin: 0 0;
  position: absolute;
}
.names {
  margin: 10em color blue;
}

aside {
  display: block;
  position: relative;
  margin: 40px 0;
}

aside h3 {
  font: bold 12px Sans-Serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: #369;
  color: #fff;
  padding: 5px 10px;
  margin: 0 0 10px 0;
  line-height: 24px;
}
/* Class name via Modernizr */
.csstransforms aside {
  border-left: 34px solid #369;
  padding-left: 10px;
}
.csstransforms aside h3 {
  /* Abs positioning makes it not take up vert space */
  position: absolute;
  top: 0;
  left: 0;

  /* Border is the new background */
  background: none;

  /* Rotate from top left corner (not default) */
  transform-origin: 0 0;
  transform: rotate(90deg);
}
</style>