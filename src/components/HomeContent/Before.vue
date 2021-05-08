<template>
  <div>
      <div id="event_info" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">{{eventName}}  <span style="color: #888888;
          font-size: large;">{{startTime}} {{endTime}}</span></h1>
        <!-- <span>{{event_description}}</span> -->
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="a()">刪除活動</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="b()">截止報名</button>
          </div>
        </div>
      </div>
      <div>無論是企業社會責任（CSR），或近幾年熱烈響應聯合國提出的全球永續發展目標（SDGs），追求永續發展已成企業經營的關鍵課題。本會努力追尋人與自然和諧共存的方式。若您也是有同樣理念的企業，歡迎透過捐款贊助、志工參與、環境講座、綠色消費等多種合作形式支持我們。</div>
      
      <div class="row ">
        <div class="col-sm-12">
            <div class="card top-buffer">
                <div class="card-body text-center">
                <h5 class="card-title">參加者資訊</h5>
                <br/>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group me-2" style="margin-left: 50%; transform: translateX(-50%);">
            
                    <button type="button" style="background-color: dodgerblue;color:white"  class="btn btn-sm btn-outline-secondary" onclick="download_word_doc()">匯出參加者資訊.doc</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" onclick="download_applicants_info_time()">匯出參加者資訊.csv</button>
            
                    </div>
                </div>
                <br/>
                <!-- <div class="table-responsive" id="applicants_info">
                    <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>姓名</th>
                        <th>性別</th>
                        <th>生日</th>
                        <th>電話</th>
                        <th>信箱</th>
                
                        <th>報名</th>
                        </tr>
                    </thead>
                    <tbody  >
                         <tr v-for="(applier,i) in appliers" :key="i">
                        <td>{{i+1}}</td>  
                        <td>{{ applier.userName }}</td> 
                        <td>{{ applier.userGender }}</td>  
                        <td>{{ applier.userBirthday }}</td> 
                        <td>{{ applier.userPhone }}</td> 
                        <td>{{ applier.userEmail }}</td> 
                    
                        <td>
                            <span :id="'state'+i">
                            <button :id="'button'+i" type="button" class="btn btn-danger" v-on:click="setReject(i)">取消報名</button>
                            </span>
                      
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
                <div class="table-responsive" id="applicants_info">
                    <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>姓名</th>
                        <th>性別</th>
                        <th>生日</th>
                        <th>電話</th>
                        <th>信箱</th>
                
                        <th>報名</th>
                        </tr>
                    </thead>
                    <tbody  >
                        <tr v-for="(applier,i) in appliers" :key="i">
                        <td>{{i+1}}</td>  
                        <td>{{ applier.userName }}</td> 
                        <td>{{ applier.userGender }}</td>  
                        <td>{{ applier.userBirthday }}</td> 
                        <td>{{ applier.userPhone }}</td> 
                        <td>{{ applier.userEmail }}</td> 
        
                        <td>
                            <span :id="'state'+i">
                            <button :id="'button'+i" type="button" class="btn btn-danger" v-on:click="setReject(i)">取消報名</button>
                            </span>
                        
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div> -->
           
                </div>
            </div>
        </div>
      </div>
  
  </div> 
</template>

<script>
export default {
  props:['charity_id','event_id','event_type'],
  data () {
    return {
      eventName:  "",
      startTime: "",
      endTime: "",
      appliers: [],
    }
  },
  created : function () {
    var t = this;
    $.post(
        "http://140.113.216.53:8000/getEventDetail/",
        { eventType: String(t.event_type), eventID: String(t.event_id) },
        function (getEventDetail_data) {
          console.log(t.eventID,t.eventType);
          console.log(getEventDetail_data);
          t.eventName = getEventDetail_data.eventName;
          t.startTime = getEventDetail_data.startTime;
          t.endTime = getEventDetail_data.endTime;
        }
      );

      //  $.post(
      //   "http://140.113.216.53:8000/getApplierList/",
      //   { charityID:t.charity_id, eventType: String(t.event_type), eventID: String(t.event_id), subID: "0" },
      //   // { charityID:String(5), eventType: String(1), eventID: String(32), subID: "0" },
      //   function (getApplierList_data) {
      //   //   console.log(t.eventID,t.eventType);
      //   console.log("ddddddddd");
      //     console.log("dddgg",getApplierList_data);
      //     t.appliers = getApplierList_data.appliers;
     
      //   }
      // );
       
  },
  watch: { 
    event_id: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      
      var t = this;
      $.post(
        "http://140.113.216.53:8000/getApplierList/",
        { charityID:t.charity_id, eventType: String(t.event_type), eventID: String(t.event_id), subID: "0" },
        // { charityID:String(5), eventType: String(1), eventID: String(32), subID: "0" },
        function (getApplierList_data) {
        //   console.log(t.eventID,t.eventType);
        console.log("ddddddddd");
          console.log("dddgg",getApplierList_data);
          t.appliers = getApplierList_data.appliers;
     
        }
      );
    }
  },
  methods: {
    login(){}
  }
}
</script>

<style>


</style>