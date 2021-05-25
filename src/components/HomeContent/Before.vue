<template>
  <div>
      <div id="event_info" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        
        <h2>{{eventName}}  
          <button  type="button" class="btn btn-sm btn-outline-secondary" 
                v-on:click="edit_event()">
                編輯活動
          </button>

        </h2>
        
        <h2 v-if=" status == 1" style="color:red;">截止報名</h2>
        <!-- <span style="color: #888888;
          font-size: large;">{{startTime}} {{endTime}}</span> -->
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2" v-if="note == 'none'">
            <button v-if="status!=2" type="button" class="btn btn-sm btn-outline-secondary" 
                v-on:click="delete_event()">刪除活動</button>
            <button v-if="status!=2" type="button" class="btn btn-sm btn-outline-secondary" 
                v-on:click="stop_signing()">
                <div v-if="status == 0">截止報名</div>
                <div v-if="status == 1">開放報名</div>
            </button>
            
          </div>
        </div>
      </div>
      <div class="row ">
        
        <div class="col-sm-6" style="font-size: large;">活動時間 : 
          <span style="color:#888888">   {{startTime}} ~ {{endTime}}</span>
          <span style="color:#888888" v-if="eventType=='1'">(一次性)</span>
          <span style="color:#888888" v-if="eventType=='3'">(週期性)</span>
          <span style="color:#888888" v-if="eventType=='3'">(</span>
          <span style="color:#888888" v-for="fre in eventFreq" :key="fre.weekday">{{fre.weekday}}</span>
          <span style="color:#888888" v-if="eventType=='3'">)</span>
        </div>
        <div class="col-sm-6" style="font-size: large;">地點 : 
          <span style="color:#888888">   {{location}}</span>
        </div>
      </div>
      <div class="row ">
        <div class="col-sm-2"  style="font-size: large;">機構 : 
          <span style="color:#888888">  {{charityName}}</span>
        </div>
        <div class="col-sm-2"  style="font-size: large;">聯絡人:
          <span style="color:#888888"> {{contactPerson}}</span>
        </div>
        <div class="col-sm-6"  style="font-size: large;">聯絡電話:
          <span style="color:#888888"> {{contactNumber}}</span>
        </div>
      </div>
      <div class="row ">
        <div class="col-sm-6"  style="font-size: large;">活動資訊:
          <span style="color:#888888"> {{details}}</span>
        </div>
      </div>
      <br/>
      <div class="row " v-if=" status==2">
         <div class="col-sm-12">
          <div  style="font-size: x-large;">取消活動的原因:</div>
        </div>  
        <div class="col-sm-12">
          <div  style="font-size: large;">{{note}}</div>
        </div> 
      </div>
      <div class="row " v-if=" status!=2">
        
        <div  class="col-sm-12">
            <!-- <div v-if="event_canceled_state == 0" class="card top-buffer"> -->
            <div  class="card top-buffer">
                <div class="card-body text-center">
                <h5 class="card-title">參加者資訊</h5>
                <br/>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group me-2" style="margin-left: 50%; transform: translateX(-50%);">
            
                    <button type="button" style="background-color: dodgerblue;color:white"  class="btn btn-sm btn-outline-secondary" v-on:click="download_doc()">匯出參加者資訊.doc</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="download_csv()">匯出參加者資訊.csv</button>
            
                    </div>
                </div>
                <br/>
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
                        <tr v-for="(applier,i) in canceled_appliers" :key="i">
                        <td>{{i+1}}</td>  
                        <td>{{ applier.userName }}</td> 
                        <td>{{ applier.userGender }}</td>  
                        <td>{{ applier.userBirthday }}</td> 
                        <td>{{ applier.userPhone }}</td> 
                        <td>{{ applier.userEmail }}</td> 
        
                        <td>
                            <span :id="'state'+i">
                          已取消報名
                            </span>
                        
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div> 
           
                </div>
            </div>

            <!-- <div v-if="event_canceled_state == 1" class="card top-buffer">
              <p>{{why}}</p>
            </div> -->
        </div>
      </div>
  

      <!-- Modal -->
    <div class="modal fade" id="confirm_delete_applicant" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">取消參加者的報名</h5>
            <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              <i class="bi bi-x"></i>
            </button> -->
          </div>
          <div class="modal-body" >
            <!-- {{applicants}} -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="cancel()">取消</button>
            <button type="button" class="btn btn-primary" v-on:click="confirm()">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除活動 -->
    <div class="modal fade" id="confirm_delete_event" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="event_canceled_state==0" class="modal-title" id="exampleModalLabel">
              確定要刪除活動 {{eventName}} 嗎？
            </h5>
            <h5 v-if="event_canceled_state==11">
              刪除活動 {{eventName}} 失敗，請再試一次
            </h5>
          </div>
          <div  v-if="event_canceled_state==0" class="modal-body" >
            <h5>刪除活動公告內容:</h5>
            <textarea class="form-control" id="confirm_delete_event_reason" rows="5" v-model="bulletinboard"></textarea>
          
            <h5>刪除活動的理由是:</h5>
            <textarea class="form-control" id="confirm_delete_event_reason" rows="5" v-model="why"></textarea>
          </div>
          <div class="modal-footer">
            <button v-if="event_canceled_state==0" type="button" class="btn btn-secondary" 
              data-dismiss="modal" v-on:click="cancel_delete()">取消</button>
            <button type="button" class="btn btn-primary" v-on:click="confirm_delete()">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 確認截止報名 -->
    <div class="modal fade" id="confirm_stop_signing" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header" style="text-align: center;">
            <h5 class="modal-title" id="confirm_stop_modal" style="text-align: center;"
            v-if="status == 0">
              確定要截止 {{eventName}} 報名嗎?
            </h5>
            <h5 class="modal-title" id="confirm_stop_modal" style="text-align: center;"
            v-if="status == 1">
              確定要開放 {{eventName}} 報名嗎?
            </h5>
            <!-- <h5 class="modal-title" id="confirm_stop_modal" style="text-align: center;"
            v-if="stop_signing_flag == 10">
              截止 {{eventName}} 報名失敗，請再試一次
            </h5>
            <h5 class="modal-title" id="confirm_stop_modal" style="text-align: center;"
            v-if="stop_signing_flag == 11">
              開放 {{eventName}} 報名失敗，請再試一次
            </h5> -->
          </div>
  
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="cancel_stop()">取消</button>
            <button type="button" class="btn btn-primary" v-on:click="confirm_stop()">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 編輯活動 -->
    <div class="modal fade" id="confirm_edit_event" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header" style="text-align: center;">
            <h5 class="modal-title" id="confirm_stop_modal" style="text-align: center;">
              編輯活動
            </h5>
          </div>
          <div  class="modal-body" >
            <div class="form-group" style="margin-top:2rem;">
                <label for="exampleInputEmail1">活動名稱</label>
                <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
             
                v-model="tmp_eventName"
                />
            </div>
            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">聯絡人</label>
                <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              
                v-model="tmp_contactPerson"
                />
            </div>
            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">聯絡電話</label>
                <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
               
                v-model="tmp_contactNumber"
                />
                
            </div>
            <div class="form-group" style="margin-top:1rem;">
                <label  for="exampleInputEmail1"
                >詳細活動資訊</label
                >
                <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="6"
                v-model="tmp_details"
                ></textarea>
            </div>
            <div class="form-group" style="margin-top:2rem;">
                <label for="exampleInputEmail1">上傳圖片</label>
                <div class="col-md-12">
                    <UploadImages   @change="handleImages" uploadMsg="請上傳活動圖片" :max="1"/>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="cancel_edit()">取消</button>
            <button type="button" class="btn btn-primary" v-on:click="confirm_edit()">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import UploadImages from "./uploadImage/uploadImage"
export default {
  props:['charity_id','event_id','event_type','subid', 'Subevent'],
  components: {
      UploadImages,
  },
  data () {
    return {
      charityName:"",
      contactNumber:"",
      contactPerson:"",
      details:"",
      eventFreq:[],
      eventType:"",
      location:"",
      note:"",
      status:0,

      eventName:  "",
      startTime: "",
      endTime: "",
      appliers: [],
      canceled_appliers: [],
      appliers_delete_index:"",
      stop_signing_flag:0,

      event_canceled_state: 0,
      bulletinboard:"",
      why:"",

      tmp_cancel_applier:{},

      tmp_eventName:"",
      tmp_contactPerson:"",
      tmp_contactNumber:"",
      tmp_details:"",
      tmp_image:"",

    }
  },
  mounted : function () {
    var t = this;
    
     $.post(
        "http://140.113.216.53:8000/getEventDetail/",
        { eventType: String(t.event_type), eventID: String(t.event_id) },
        function (getEventDetail_data) {
          console.log(t.eventID,t.eventType);
          console.log("iiiiiiiiiii",getEventDetail_data);
          t.bef_event = getEventDetail_data;
          t.eventName = getEventDetail_data.eventName;
          t.startTime = getEventDetail_data.startTime;
          t.endTime = getEventDetail_data.endTime;

          t.charityName = getEventDetail_data.charityName;
          t.contactNumber = getEventDetail_data.contactNumber;
          t.contactPerson = getEventDetail_data.contactPerson;
          t.details = getEventDetail_data.details;
          t.eventFreq = getEventDetail_data.eventFreq;
          t.eventType = getEventDetail_data.eventType;
          t.location = getEventDetail_data.location;
          t.note = getEventDetail_data.note;
          t.status = getEventDetail_data.status;


          t.tmp_eventName=t.eventName ;
          t.tmp_contactPerson=t.contactPerson ;
          t.tmp_contactNumber=t.contactNumber;
          t.tmp_details=t.details;
          
        }
      );
      console.log("irrrrr",t.contactPerson);
      $.post(
        "http://140.113.216.53:8000/getApplierList/",
        { charityID:t.charity_id, eventType: String(t.event_type), eventID: String(t.event_id), subID: String(t.subid) },
        // { charityID:String(5), eventType: String(1), eventID: String(32), subID: "0" },
        function (getApplierList_data) {
        //   console.log(t.eventID,t.eventType);
          var applier_list_tmp = [];
          var canceled_appliers_list_tmp = [];
        
          console.log("111",getApplierList_data);
          t.appliers = getApplierList_data.appliers;
          for (var i in getApplierList_data.appliers){
            console.log("ddddd",getApplierList_data.appliers[i])
            if (getApplierList_data.appliers[i].status == 0){
              applier_list_tmp.push(getApplierList_data.appliers[i]);
            }
            else{
              canceled_appliers_list_tmp.push(getApplierList_data.appliers[i])
            }
          }
          t.appliers = applier_list_tmp;
          t.canceled_appliers = canceled_appliers_list_tmp;

        }
      );
  },
  watch: { 
    event_id: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      
      var t = this;
      console.log("ffffff", t.Subevent);
       $.post(
        "http://140.113.216.53:8000/getEventDetail/",
        { eventType: String(t.event_type), eventID: String(t.event_id) },
        function (getEventDetail_data) {
          console.log(t.eventID,t.eventType);
          console.log(getEventDetail_data);
          t.eventName = getEventDetail_data.eventName;
          t.startTime = getEventDetail_data.startTime;
          t.endTime = getEventDetail_data.endTime;

          t.charityName = getEventDetail_data.charityName;
          t.contactNumber = getEventDetail_data.contactNumber;
          t.contactPerson = getEventDetail_data.contactPerson;
          t.details = getEventDetail_data.details;
          t.eventFreq = getEventDetail_data.eventFreq;
          t.eventType = getEventDetail_data.eventType;
          t.location = getEventDetail_data.location;
          t.note = getEventDetail_data.note;
          t.status = getEventDetail_data.status;

          t.tmp_eventName=t.eventName ;
          t.tmp_contactPerson=t.contactPerson ;
          t.tmp_contactNumber=t.contactNumber;
          t.tmp_details=t.details;
          // console.log(t.details,t.charityName);
        }
      );

console.log("dddgsdsg",t.charity_id,t.event_type,t.event_id, t.subid,t.details);
      $.post(
        "http://140.113.216.53:8000/getApplierList/",
        { charityID:t.charity_id, eventType: String(t.event_type), eventID: String(t.event_id), subID: String(t.subid)},
        // { charityID:String(5), eventType: String(1), eventID: String(32), subID: "0" },
        function (getApplierList_data) {
        //   console.log(t.eventID,t.eventType);
          var applier_list_tmp = [];
          var canceled_appliers_list_tmp = [];
        
          console.log("wwwwww",getApplierList_data,t.charity_id,t.event_type,t.event_id, t.subid);
          t.appliers = getApplierList_data.appliers;
          for (var i in getApplierList_data.appliers){
            console.log("ddddd",getApplierList_data.appliers[i])
            if (getApplierList_data.appliers[i].status == 0){
              applier_list_tmp.push(getApplierList_data.appliers[i]);
            }
            else{
              canceled_appliers_list_tmp.push(getApplierList_data.appliers[i])
            }
          }
          t.appliers = applier_list_tmp;
          t.canceled_appliers = canceled_appliers_list_tmp;
        }
      );
    },
    subid: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      
      var t = this;
      console.log("ffffff", t.Subevent);
       $.post(
        "http://140.113.216.53:8000/getEventDetail/",
        { eventType: String(t.event_type), eventID: String(t.event_id) },
        function (getEventDetail_data) {
          console.log(t.eventID,t.eventType);
          console.log(getEventDetail_data);
          t.eventName = getEventDetail_data.eventName;
          t.startTime = getEventDetail_data.startTime;
          t.endTime = getEventDetail_data.endTime;

          t.charityName = getEventDetail_data.charityName;
          t.contactNumber = getEventDetail_data.contactNumber;
          t.contactPerson = getEventDetail_data.contactPerson;
          t.details = getEventDetail_data.details;
          t.eventFreq = getEventDetail_data.eventFreq;
          t.eventType = getEventDetail_data.eventType;
          t.location = getEventDetail_data.location;
          t.note = getEventDetail_data.note;
          t.status = getEventDetail_data.status;


          t.tmp_eventName=t.eventName ;
          t.tmp_contactPerson=t.contactPerson ;
          t.tmp_contactNumber=t.contactNumber;
          t.tmp_details=t.details;
          // console.log(t.details,t.charityName);
        }
      );

console.log("dddgsdsg",t.charity_id,t.event_type,t.event_id, t.subid,t.details);
      $.post(
        "http://140.113.216.53:8000/getApplierList/",
        { charityID:t.charity_id, eventType: String(t.event_type), eventID: String(t.event_id), subID: String(t.subid)},
        // { charityID:String(5), eventType: String(1), eventID: String(32), subID: "0" },
        function (getApplierList_data) {
        //   console.log(t.eventID,t.eventType);
          var applier_list_tmp = [];
          var canceled_appliers_list_tmp = [];
        
          console.log("wwwwww",getApplierList_data,t.charity_id,t.event_type,t.event_id, t.subid);
          t.appliers = getApplierList_data.appliers;
          for (var i in getApplierList_data.appliers){
            console.log("ddddd",getApplierList_data.appliers[i])
            if (getApplierList_data.appliers[i].status == 0){
              applier_list_tmp.push(getApplierList_data.appliers[i]);
            }
            else{
              canceled_appliers_list_tmp.push(getApplierList_data.appliers[i])
            }
          }
          t.appliers = applier_list_tmp;
          t.canceled_appliers = canceled_appliers_list_tmp;
        }
      );
    }
  },
  methods: {
    edit_event:function () {
    
      $('#confirm_edit_event').modal('show');
    },
    handleImages(files){
        console.log(files)
        const reader = new FileReader();
        reader.onloadend = () => {
            // use a regex to remove data url part
            const base64String = reader.result
                .replace("data:", "")
                .replace(/^.+,/, "");


            // log to console
            // logs wL2dvYWwgbW9yZ...
            this.image = base64String;
            console.log(base64String);
        };
        reader.readAsDataURL(files[0]);
        
    },
    confirm_edit:function () {
       var t = this;

       if(t.image == undefined){
         t.image = "";
       }
       $.post(
        "http://140.113.216.53:8000/editEvent/",
       
        {charityID: String(t.charity_id),eventType: String(t.event_type), eventID: String(t.event_id),
         eventName: String(t.tmp_eventName), contactPerson: String(t.tmp_contactPerson), 
         contactNumber: String(t.tmp_contactNumber),
         details: String(t.tmp_details) ,image: String(t.image),},
          function (editEvent_data) {
            
            console.log(editEvent_data);
            if (editEvent_data.status == 0){
              t.eventName = t.tmp_eventName;
              t.contactPerson = t.tmp_contactPerson;
              t.contactNumber = t.tmp_contactNumber;
              t.details = t.tmp_details;
              $('#confirm_edit_event').modal('hide');
            }      
          }
        );
    },
    stop_signing: function () {
    // $('#stop_sign').text('開放報名');
      $('#confirm_stop_signing').modal('show');
    },
    confirm_stop: function () {

      var t = this;
      console.log("_____________+++++++++++++++",t.status);
      // 確認伺服器成功或失敗
      if (t.status == 0) {
        $.post(
        "http://140.113.216.53:8000/closeRegistration/",
        { eventType: String(t.event_type), eventID: String(t.event_id), charityID: String(t.charity_id)},
          function (closeRegistration_data) {
            
            console.log(closeRegistration_data);
            if (closeRegistration_data.status == 0){
              $('#confirm_stop_signing').modal('hide');
              t.status = 1;
              // t.status
            }
            // else{
            //   t.stop_signing_flag = 10;
            // }
          }
        );
        
      }
      else if (t.status == 1) {
        $.post(
        "http://140.113.216.53:8000/openRegistration/",
        { eventType: String(t.event_type), eventID: String(t.event_id), charityID: String(t.charity_id)},
          function (openRegistration_data) {
            
            console.log(openRegistration_data);
            if (openRegistration_data.status == 0){
              $('#confirm_stop_signing').modal('hide');
              t.status = 0;
            }
            // else{
            //   t.stop_signing_flag = 11;
            // }
          }
        );
       
      }

    },
    cancel_stop: function (i) {
      $('#confirm_stop_signing').modal('hide');
    },
    delete_event: function (i) {
      $('#confirm_delete_event').modal('show');
    },
    confirm_delete: function () {

      var delete_reason = this.why;
      console.log(delete_reason);
      // 確認伺服器成功或失敗
      console.log("刪除活動")
      var t = this;
      // t.event_canceled_state = 11;
      if(t.status!=2){
          $.post(
        "http://140.113.216.53:8000/deleteEvent/",
        { charityID: String(t.charity_id),eventType: String(t.event_type), eventID: String(t.event_id), 
          content: t.bulletinboard, eventNote: t.why},
          function (deleteEvent_data) {
            
            console.log(deleteEvent_data);
            if (deleteEvent_data.status == 0){
              $('#confirm_delete_event').modal('hide');
              t.status = 2;
              t.note = t.why;
            }
            // else{
            //   t.event_canceled_state = 11;
            // }
          }
        );

      }else{
        $('#confirm_delete_event').modal('hide');
      }
    
    },
    cancel_delete: function (i) {
      $('#confirm_stop_signing').modal('hide');
    },
     confirm: function () {
      var t = this;
      console.log(String(t.event_type), String(t.event_id), String(t.subid),
      String(t.tmp_cancel_applier.uid) , String(t.charity_id))
      $.post(
        "http://140.113.216.53:8000/cancelAppliedEvent/",
        { eventType: String(t.event_type), eventID: String(t.event_id), sid: String(t.subid),
         userID:String(t.tmp_cancel_applier.uid),charityID:String(t.charity_id),},
        function (cancelAppliedEvent_data) {
          console.log(cancelAppliedEvent_data);
          if(cancelAppliedEvent_data.status==0){
            $.post(
              "http://140.113.216.53:8000/getApplierList/",
              { charityID:t.charity_id, eventType: String(t.event_type), eventID: String(t.event_id), subID: String(t.subid)},
              // { charityID:String(5), eventType: String(1), eventID: String(32), subID: "0" },
              function (getApplierList_data) {
              //   console.log(t.eventID,t.eventType);
                var applier_list_tmp = [];
                var canceled_appliers_list_tmp = [];
              
                console.log("wwwwww",getApplierList_data,t.charity_id,t.event_type,t.event_id, t.subid);
                t.appliers = getApplierList_data.appliers;
                for (var i in getApplierList_data.appliers){
                  console.log("ddddd",getApplierList_data.appliers[i])
                  if (getApplierList_data.appliers[i].status == 0){
                    applier_list_tmp.push(getApplierList_data.appliers[i]);
                  }
                  else{
                    canceled_appliers_list_tmp.push(getApplierList_data.appliers[i])
                  }
                }
                t.appliers = applier_list_tmp;
                t.canceled_appliers = canceled_appliers_list_tmp;
              }
            );
          }
        }
      );
      
      // 確認伺服器成功或失敗

      $('#confirm_delete_applicant').modal('hide');
    },
    cancel: function (i) {
      $('#confirm_delete_applicant').modal('hide');
    },
    setReject: function (i) {

      // bus.$emit(,this.applicants,i);
      // console.log(this.applicants[i]);
      var appliers_delete_index = i;
      console.log("this.appliers[i]   ", this.appliers[i]);
      $('#confirm_delete_applicant').modal('show');
      $('.modal-body').html("<span>確定要刪除" +
        this.appliers[i].userName + " " +
        this.appliers[i].userGender + " " +
        this.appliers[i].userBirthday + "\n " +
        this.appliers[i].userPhone + " " +
        this.appliers[i].userEmail + " "
        + "嗎？</span>");
      this.tmp_cancel_applier = this.appliers[i];
      // console.log(this.applicants);
    },
    download_doc: function(){
      console.log("download_doc");
      console.log( this.appliers);
      // this.g_test();
      var table = [];
      //add title of each column
      var header_row = [];
      header_row.push(new docx.TableCell({
        children: [new docx.Paragraph({
          text: "編號",
          heading: docx.HeadingLevel.HEADING_6,
          alignment: docx.AlignmentType.CENTER,
        })],
      }));
      var all_applier = this.appliers.concat(this.canceled_appliers);
      for (var prop in all_applier[0]) {
         if(prop=="defaultServiceTime"){
            continue
          }
          if(prop=="status"){
            continue
          }
          if(prop=="uid"){
            continue
          }
          if(prop=="userOther"){
            continue
          }
          if(prop=="userServiceTime"){
            continue
          }
        header_row.push(new docx.TableCell({
          children: [new docx.Paragraph({
            text: prop,
            heading: docx.HeadingLevel.HEADING_6,
            alignment: docx.AlignmentType.CENTER,
          })],
        }));
      }

      header_row.push(new docx.TableCell({
        children: [new docx.Paragraph({
          text: "點名",
          heading: docx.HeadingLevel.HEADING_6,
          alignment: docx.AlignmentType.CENTER,
        })],
      }));
      table.push(new docx.TableRow({ children: header_row }));
      // console.log(table);
      for (var row_n = 0; row_n < all_applier.length; row_n++) {
        // console.log("ff", applicants_data.applicants[row_n]);
        var n_row = all_applier[row_n];
        var row = [];


        row.push(new docx.TableCell({
          children: [new docx.Paragraph({
            text: (row_n + 1) + "",
            alignment: docx.AlignmentType.CENTER,
          })],
        }));
        for (var prop in n_row) {
          // console.log(row[prop]);
          // row[prop] = 'xxx';
          if(prop=="defaultServiceTime"){
            continue
          }
          if(prop=="status"){
            continue
          }
          if(prop=="uid"){
            continue
          }
          if(prop=="userOther"){
            continue
          }
          if(prop=="userServiceTime"){
            continue
          }
          row.push(new docx.TableCell({
            children: [new docx.Paragraph({
              text: n_row[prop],
              alignment: docx.AlignmentType.CENTER,
            })],
          }));
          console.log(n_row[prop]);
        }
        row.push(new docx.TableCell({
          children: [new docx.Paragraph({
            text: "        ",
          })],
        }));
        table.push(new docx.TableRow({ children: row }));
        // console.log(table);
      }

      // t_row = new docx.TableRow({ children: [t_cell] });
      var t_table = new docx.Table({
        rows: table,
        alignment: docx.AlignmentType.CENTER,
      });

      // tables = t_table;
      console.log(t_table);
      this.generate(this.eventName, this.details,t_table);
      
    },
    download_csv: function(){
      console.log("download_csv");
      console.log("hit");
      var headers = {
        name: '姓名'.replace(/,/g, ''), // remove commas to avoid errors
        gender: "性別",
        birth: "生日",
        phones: "電話",
        email: "信箱",
        time: "時數"
      };
      var itemsNotFormatted = this.appliers.concat(this.canceled_appliers);

      var itemsFormatted = [];

      // format the data
      itemsNotFormatted.forEach((applier) => {
        itemsFormatted.push({
          name: applier.userName.replace(/,/g, ''), // remove commas to avoid errors,
          gender: applier.userGender,
          birth: applier.userBirthday,
          phone: applier.userPhone,
          email: applier.userEmail,
          time: applier.userServicetime,
        });
      });

      var fileTitle = '參加者資訊及其各別服務時數'; // or 'my-unique-title'
      console.log(itemsFormatted)
      this.exportCSVFile(this.eventName, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
    },
    g_test: function(){
       console.log("gt");
    },
    generate: function (title, description, tables) {
          const doc = new docx.Document({

              sections: [
                  {

                      children: [

                          new docx.Paragraph({
                              text: title,
                              heading: docx.HeadingLevel.HEADING_1,
                              alignment: docx.AlignmentType.CENTER,
                          }),

                          new docx.Paragraph({
                              text: description,
                              alignment: docx.AlignmentType.CENTER,
                          }),
                          tables,
                      ],
                      footers: {
                          default: new docx.Footer({
                              children: [
                                  new docx.Paragraph({
                                      alignment: docx.AlignmentType.CENTER,
                                      children: [
                                          new docx.TextRun({
                                              children: ["Page ", docx.PageNumber.CURRENT],
                                          }),
                                          new docx.TextRun({
                                              children: [" to ", docx.PageNumber.TOTAL_PAGES],
                                          }),
                                      ],
                                  }),
                              ],
                          }),
                      },
                  }
              ]
          });

          docx.Packer.toBlob(doc).then((blob) => {
              console.log(blob);
              saveAs(blob, this.eventName+".docx");
              console.log("Document created successfully");
          });
    },
    exportCSVFile(headers, items, fileTitle) {
        if (headers) {
          items.unshift(headers);
        }

        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);

        var csv = this.convertToCSV(jsonObject);

        var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
          var link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
    },
    convertToCSV: function(objArray) {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';

      for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
        }

        str += line + '\r\n';
      }

      return str;
    }
    
  }
}
</script>

<style>


</style>