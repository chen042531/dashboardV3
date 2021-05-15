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
                        <li class="nav-item" v-for="act_event_once in active_list_once" :key="act_event_once.eventID" 
                         v-on:click="activeGoTO(act_event_once)">  
                          <a class="btn btn-primary"  role="button" >
                            {{act_event_once.eventName}}
                          </a>
                        </li>
                        <li class="nav-item" v-for="act_event in active_list" :key="act_event.eventID">  
                          <a class="btn btn-primary" data-toggle="collapse" :href="'#submenu'+act_event.eventID" 
                              role="button" aria-expanded="false"  :aria-controls ="'submenu'+act_event.eventID">
                            {{act_event.eventName}}
                          </a>
          
                        
                          <ul  class="smenu sidebar-submenu list-unstyled collapse " :id="'submenu'+act_event.eventID">
                        
                            <li v-for="act_subevent in act_event.time" :key="act_subevent.sid" 
                             v-on:click="activeGoTO(act_subevent)">
                              <a href="#" class="" >
                                <p class="" style="margin: 0; padding-left: 2em;" > {{act_subevent.startTime}}</p>
                              </a>
                            </li>
                          </ul>
                  
                        </li>
                    </ul>
                  </li> 
                  <li  id="expired_list">
                    <h6>已經結束的活動</h6>
                    
                    <ul  class="sidebar-submenu list-unstyled collapsed" aria-expanded="false">
                        <li class="nav-item" v-for="exp_event_once in expired_list_once" :key="exp_event_once.eventID"
                          v-on:click="expiredGoTO(exp_event_once)">  
                          <a class="btn btn-primary"  role="button" >
                            {{exp_event_once.eventName}}
                          </a>
                        </li>
                        <li class="nav-item" v-for="exp_event in expired_list" :key="exp_event.eventID">  
                          <a class="btn btn-primary" data-toggle="collapse" :href="'#submenu_exp'+exp_event.eventID" 
                              role="button" aria-expanded="false"  :aria-controls ="'submenu_exp'+exp_event.eventID">
                            {{exp_event.eventName}}
                          </a>
          
                        
                          <ul  class="smenu sidebar-submenu list-unstyled collapse " :id="'submenu_exp'+exp_event.eventID">
                        
                            <li v-for="exp_subevent in exp_event.time" :key="exp_subevent.sid"  v-on:click="expiredGoTO(exp_subevent)">
                              <a href="#" class="" >
                                <p class="" style="margin: 0; padding-left: 2em;" > {{exp_subevent.startTime}}</p>
                              </a>
                            </li>
                          </ul>
                  
                        </li>
                    </ul>
                  </li>
                </ul>

            </div>
        </nav>
        <actnew v-if="home_content_flag==0"></actnew>
        <app-before v-if="home_content_flag==1" :charity_id="charityId" :event_id="event_Id" 
          :event_type="event_Type" :subid="subevent_Id" :substime="subevent_stime" :subetime="subevent_etime"
          class="col-md-9 ms-sm-auto col-lg-10 px-md-4"></app-before>

        <app-after v-if="home_content_flag==2" :charity_id="charityId" :event_id="exp_event_Id" 
          :event_type="exp_event_Type" :subid="exp_subevent_Id" :substime="exp_subevent_stime" :subetime="exp_subevent_etime"
          :end_timestamp="exp_endTimestamp" class="col-md-9 ms-sm-auto col-lg-10 px-md-4"></app-after>
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
      active_list_once:  [],

      expired_list: [],
      expired_list_once: [],

      event_Id: "",
      event_Type: "",
      subevent_Id: "",
      subevent_stime:"",
      subevent_etime:"",

      exp_event_Id: "",
      exp_event_Type: "",
      exp_subevent_Id: "",
      exp_subevent_stime:"",
      exp_subevent_etime:"",
      exp_endTimestamp:""
  
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
        for(var i in getCharityActivities_data.active_list){
          if(getCharityActivities_data.active_list[i].eventType == 3){
            t.active_list.push(getCharityActivities_data.active_list[i])
          }else{
            t.active_list_once.push(getCharityActivities_data.active_list[i])
          }
        }
        
        for(var i in getCharityActivities_data.expired_list){
          if(getCharityActivities_data.expired_list[i].eventType == 3){
            t.expired_list.push(getCharityActivities_data.expired_list[i])
          }else{
            t.expired_list_once.push(getCharityActivities_data.expired_list[i])
          }
        };
         console.log("qqqqqqqqqq",t.active_list);
          console.log("qqqqqqqqqq",t.active_list_once);
           console.log("qqqqqqqqqq",t.expired_list);
           console.log("qqqqqqqqqq",t.expired_list);
           
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
      if (subevent.sid === undefined){
        t.subevent_Id = 0;
      }else{
        t.subevent_Id = subevent.sid;
      }
      t.subevent_stime = subevent.startTime;
      t.subevent_etime = subevent.endTime;
      console.log(t.event_Id,t.event_Type,t.subevent_Id);
      t.home_content_flag = 1;
    },
    expiredGoTO: function (ex_subevent){
      let t = this;
      console.log("ssss",ex_subevent);
      console.log("ssss",ex_subevent.eventID);
      console.log("ex_subevent",ex_subevent.sid);
      t.exp_event_Id = ex_subevent.eventID
      t.exp_event_Type = ex_subevent.eventType
      // is always 0 ?
      if (ex_subevent.sid === undefined){
        t.exp_subevent_Id = 0;
      }else{
        t.exp_subevent_Id = ex_subevent.sid;
      }
      // t.exp_subevent_Id = ex_subevent.sid;
      t.exp_subevent_stime = ex_subevent.startTime;
      t.exp_subevent_etime = ex_subevent.endTime;
      t.exp_endTimestamp = ex_subevent.endTimestamp;
      console.log("uuuu",t.exp_event_Type,t.exp_event_Id,t.exp_subevent_Id,t.exp_endTimestamp);
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
/* #sidebar{
  
} */
</style>