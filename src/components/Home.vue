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
                    <a href="#" class="list-group-item list-group-item-action">
                        <span class=""> {{event.eventName}}</span>
                    </a>
                    </li>
                </ul>
              </li> 
              <li class="nav-item" id="expired_list">
                <h6>已經結束的活動</h6>
              </li>
            </ul>
          
        </div>
    </nav>
  </div> 
</template>

<script>
export default {
  props:['charityId','username'],
  data () {
    return {
      active_list:  [],
      expired_list: [],
    }
  },
  created: function () {
    $.post(
      "http://140.113.216.53:8000/getCharityActivities/",
      { charityID: this.charityId },
      function (getCharityActivities_data) {
        console.log(getCharityActivities_data);
        this.active_list = getCharityActivities_data.active_list;
        this.expired_list = getCharityActivities_data.expired_list;
      }
    );
       
  },
  methods: {
    login(){}
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

</style>