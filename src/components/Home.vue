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
                <button type="button" class="btn btn-info btn-lg btn-block" style="position:relative;margin-top:20px;" v-on:click="goAdd()">
                  新增活動
                </button>
                <h5  style="padding-top: 1rem; padding-bottom: 0.5rem; margin-left: 0; color: #727272;;">
                活動名稱
                </h5>
                <ul class="list-unstyled">
                  <li id="active_list">
                    
                    <h6>正在進行的活動</h6>
                    
                    
      

                    <ul  class="sidebar-submenu list-unstyled collapsed" aria-expanded="false">
                        <li class="nav-item" v-for="(event,index) in active_list" :key="index">  
                          <a class="btn btn-primary" data-toggle="collapse" :href="'#submenu'+index" 
                              role="button" aria-expanded="false"  :aria-controls ="'submenu'+index">
                            {{event.eventName}}
                          </a>
          
                        
                          <ul  class="smenu sidebar-submenu list-unstyled collapse " :id="'submenu'+index">
                        
                            <li v-for="subevent in event.time" :key="subevent.sid"  v-on:click="activeGoTO(subevent)">
                              <a href="#" class="" >
                                <p class="" style="margin: 0; padding-left: 2em;" > {{subevent.startTime}}</p>
                              </a>
                            </li>
                          </ul>
                  
                        </li>
                    </ul>
                  </li> 
                  <li  id="expired_list">
                    <h6>已經結束的活動</h6>
                    
                    <ul  class="sidebar-submenu list-unstyled collapsed" aria-expanded="false">
                        <li class="nav-item" v-for="(event,index) in expired_list" :key="index">  
                          <a class="btn btn-primary" data-toggle="collapse" :href="'#submenu_exp'+index" 
                              role="button" aria-expanded="false"  :aria-controls ="'submenu_exp'+index">
                            {{event.eventName}}
                          </a>
          
                        
                          <ul  class="smenu sidebar-submenu list-unstyled collapse " :id="'submenu_exp'+index">
                        
                            <li v-for="subevent in event.time" :key="subevent.sid"  v-on:click="expiredGoTO(subevent)">
                              <a href="#" class="" >
                                <p class="" style="margin: 0; padding-left: 2em;" > {{subevent.startTime}}</p>
                              </a>
                            </li>
                          </ul>
                  
                        </li>
                    </ul>
                    <!-- <ul  class="sidebar-submenu list-unstyled ">

                        <li class="nav-item" v-for="(event,index) in expired_list" :key="index">  
                        <a href="#" class="list-group-item list-group-item-action" v-on:click="expiredGoTO(index)">
                            <span class=""> {{event.eventName}}</span>
                        </a>
                        <ul :id="'submenu'+index" class="sidebar-submenu list-unstyled ">
                        
                        </ul>
                        </li>
                    </ul> -->
                  </li>
                </ul>

            </div>
        </nav>
        <actnew v-if="home_content_flag==0"></actnew>
        <app-before v-if="home_content_flag==1" :charity_id="charityId" :event_id="event_Id" 
          :event_type="event_Type" :subid="subevent_Id" :substime="subevent_stime" :subetime="subevent_etime"
          class="col-md-9 ms-sm-auto col-lg-10 px-md-4"></app-before>

        <app-after v-if="home_content_flag==2" :charity_id="charityId" :event_id="event_Id" 
          :event_type="event_Type" class="col-md-9 ms-sm-auto col-lg-10 px-md-4"></app-after>
      </div>
    </div>
  </div> 
</template>

<script>
import Before from './HomeContent/Before';
import After from './HomeContent/After';
import Actnew from './HomeContent/Actnew'
export default {
  props:['charityId','username'],
  data () {
    return {
      home_content_flag: 0,
      active_list:  [],
      expired_list: [],
      event_Id: "",
      event_Type: "",
      subevent_Id: "",
      subevent_stime:"",
      subevent_etime:"",
  
    }
  },
  mounted : function () {
    let t = this;
    // $.post(
    //   "http://140.113.216.53:8000/getCharityActivities/",
    //   { charityID: t.charityId },
    //   function (getCharityActivities_data) {
    //     console.log(getCharityActivities_data);
    //      t.active_list = getCharityActivities_data.active_list;
    //      t.expired_list = getCharityActivities_data.expired_list;
    //   }
    // );
    // $('.smenu').collapse('hide');
    $.post(
      "http://140.113.216.53:8000/getWebCharityActivities/",
      { charityID: t.charityId },
      function (getCharityActivities_data) {
        console.log(getCharityActivities_data);
         t.active_list = getCharityActivities_data.active_list;
         t.expired_list = getCharityActivities_data.expired_list;
         console.log("qqqqqqqqqq",t.active_list);
      }
    );
       
  },
  methods: {
    activeGoTO: function (subevent){
      let t = this;
      console.log(subevent);
      console.log("ssss",subevent.sid);
      t.event_Id = subevent.eventID;
      t.event_Type = subevent.eventType;
      t.subevent_Id = subevent.sid;
      t.subevent_stime = subevent.startTime;
      t.subevent_etime = subevent.endTime;
      console.log(t.event_Id,t.event_Type,t.subevent_Id);
      t.home_content_flag = 1;
    },
    expiredGoTO: function (subevent){
      let t = this;
      console.log("ssss",subevent);
      console.log("ssss",subevent.eventID);
      t.event_Id = subevent.eventID
      t.event_Type = subevent.eventType
      t.subevent_Id = subevent.sid;
      t.subevent_stime = subevent.startTime;
      t.subevent_etime = subevent.endTime;
      console.log(t.event_Id,t.event_Type,t.subevent_Id);
      t.home_content_flag = 2;
    },
    goAdd: function(){
       let t = this;
      t.home_content_flag = 0;
      console.log( t.home_content_flag);
    }
    
  },
  components:{
    'app-before':Before,
    'app-after':After,
    'actnew':Actnew,
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