<template>
  <div>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <p class="navbar-brand ">公益趴趴 Go</p>
        <p class="  f" id="user">{{username}}</p>
        <p class="  f" id="logout">登出</p>
    </header>
    <div class="container-fluid">
      <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky ">
                
                <h5  style="padding: 1rem; margin-bottom: 0; color: #727272;;">
                活動名稱
                </h5>
                <ul class="list-unstyled">
                  <li class="nav-item" id="active_list">
                    <h6>正在進行的活動</h6>
                    <ul  class="sidebar-submenu list-unstyled ">
                        <li class="nav-item" v-for="(event,index) in active_list" :key="index">  
                        <a href="#" class="list-group-item list-group-item-action" v-on:click="activeGoTO(index)">
                            <span class=""> {{event.eventName}}</span>
                        </a>
                        </li>
                    </ul>
                  </li> 
                  <li class="nav-item" id="expired_list">
                    <h6>已經結束的活動</h6>
                    <ul  class="sidebar-submenu list-unstyled ">
                        <li class="nav-item" v-for="(event,index) in expired_list" :key="index">  
                        <a href="#" class="list-group-item list-group-item-action" v-on:click="expiredGoTO(index)">
                            <span class=""> {{event.eventName}}</span>
                        </a>
                        </li>
                    </ul>
                  </li>
                </ul>

            </div>
        </nav>
      
        <app-before v-if="home_content_flag==1" :charity_id="charityId" :event_id="event_Id" :event_type="event_Type" class="col-md-9 ms-sm-auto col-lg-10 px-md-4"></app-before>

        <app-after v-if="home_content_flag==2" :charity_id="charityId" :event_id="event_Id" :event_type="event_Type" class="col-md-9 ms-sm-auto col-lg-10 px-md-4"></app-after>
      </div>
    </div>
  </div> 
</template>

<script>
import Before from './HomeContent/Before';
import After from './HomeContent/After';

export default {
  props:['charityId','username'],
  data () {
    return {
      home_content_flag: 0,
      active_list:  [],
      expired_list: [],
      event_Id: "",
      event_Type: "",
    }
  },
  created : function () {
    let t = this;
    $.post(
      "http://140.113.216.53:8000/getCharityActivities/",
      { charityID: t.charityId },
      function (getCharityActivities_data) {
        console.log(getCharityActivities_data);
         t.active_list = getCharityActivities_data.active_list;
         t.expired_list = getCharityActivities_data.expired_list;
      }
    );
       
  },
  methods: {
    activeGoTO: function (i){
      let t = this;
      t.event_Id = t.active_list[i].eventID
      t.event_Type = t.active_list[i].eventType
      console.log(t.event_Id,t.event_Type)
      t.home_content_flag = 1;
    },
    expiredGoTO: function (i){
      let t = this;
      t.event_Id = t.expired_list[i].eventID
      t.event_Type = t.expired_list[i].eventType
      console.log("asdsa",t.event_Id,t.event_Type,i)
      t.home_content_flag = 2;
    },
    
  },
  components:{
    'app-before':Before,
    'app-after':After,
  }
}
</script>

<style>
/*
 * Navbar
 */

.navbar-brand {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    text-align: center;
    margin: 0 auto;
    /* position: absolute; */
    font-size: 1rem;
}

.f{
    color: aliceblue;
}
#user{
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    margin-bottom: 0px;
   
    float: right;
}
#logout{
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-bottom: 0px;
   
    float: right;
}

/*
 * Sidebar
 */
#sidebar{
  
}
</style>