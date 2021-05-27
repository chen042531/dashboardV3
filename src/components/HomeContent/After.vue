<template>
  <div>
    <div id="event_info" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">{{eventName}}  </h1>
        
      </div>
     <div class="row ">
        
        <div class="col-sm-6" style="font-size: large;">活動時間 : 
          <span style="color:#888888">   {{startTime}} ~ {{endTime}}</span>
          <span style="color:#888888">   {{substime}} ~ {{subetime}}</span>
          <span style="color:#888888" v-if="eventType=='1'">(一次性)</span>
          <span style="color:#888888" v-if="eventType=='3'">(週期性)</span>
          <span style="color:#888888" v-for="fre in eventFreq" :key="fre.weekday">({{fre.weekday}})</span>
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
      <div v-if="note != 'none'">{{note}}</div>

      <div class="row ">
        <div class="col-sm-12">
        <div class="card mt-2">
            <div class="card-body">
            <h5 class="card-title">年齡分佈</h5>
            <!-- <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas> -->
            <Age :age_d="age" :width="900" :height="380"></Age>
            </div>
        </div>
        </div>
      </div>
      <div class="row ">
        <div class="col-sm-6">
        <div class="card mt-2">
            <div class="card-body">
            <h5 class="card-title" id="t1" data-placement="top"  data-toggle="tooltip"
                 title="akfnljnflnjandnaklfasdfasfasdfsjalnfjkasnlnfjanflnflaajnlfnal">性別比</h5>
                  <div>
                    <GenderRate :gender_r="gender" :width="400" :height="200" ></GenderRate>
                  </div>
                   
                 
              
              <!-- <canvas id="gender_rate" width="400" height="200"></canvas> -->
            </div>
        </div>
        </div>
        <div class="col-sm-6">
          <div class="card mt-2">
            <div class="card-body">
            <h5 class="card-title " id="t2" data-placement="top"  data-toggle="tooltip" 
                  title="akfnljnflnjandnaklfasdfasfasdfsjalnfjkasnlnfjanflnflaajnlfnal">參加者得知活動的管道</h5>
              <Source :source_s="source" :width="400" :height="200"/>
              <!-- <canvas id="info_source" width="400" height="200"></canvas> -->
            </div>
          </div>
        </div>
      </div>
      <div class="row ">
          <div class="col-sm-12">
      
            <div class="card mt-2" >
              <div class="card-body">
              <h5 class="card-title" id="t3" data-placement="top"  data-toggle="tooltip" title="akfnljnflnjandnaklfasdfasfasdfsjalnfjkasnlnfjanflnflaajnlfnal">參加者平均評分</h5>
           
                <!-- <div id="star_container"></div> -->
                <Star :star="avg_score" style="text-align:center"></Star>
                
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card mt-2">
                <div class="card-body">
                <h5 class="card-title" id="t4" data-placement="top"  data-toggle="tooltip" title="akfnljnflnjandnaklfasdfasfasdfsjalnfjkasnlnfjanflnflaajnlfnal">實際報名人數</h5>
                <h1 style="font-weight:bold; font-size: xx-large;
                text-align: center;" id="count">{{registration_num}}</h1>
                </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card mt-2">
              <div class="card-body">
              <h5 class="card-title" id="t5" data-placement="top"  data-toggle="tooltip" title="akfnljnflnjandnaklfasdfasfasdfsjalnfjkasnlnfjanflnflaajnlfnal">實際報到率</h5>
              <h1 style="font-weight:bold; font-size: xx-large;
              text-align: center;" id="participate">{{registration_rate}}%</h1>
              </div>
            </div>
          </div>
      </div> 
       <div class="row ">
        <div class="col-sm-12">
        <div class="card mt-2 " id="applicants_info_time">
            <div class="card-body text-center" >
              
            <h5 class="card-title">參加者資訊及其各別服務時數</h5>
            <div class="btn-toolbar mb-2 mb-md-0" style="padding-top:10px;">
                    <div class="btn-group me-2" style="margin-left: 50%; transform: translateX(-50%);">
            
                    <button type="button" style="background-color: dodgerblue;color:white"  class="btn btn-sm btn-outline-secondary" v-on:click="download_doc()">匯出參加者資訊.doc</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="download_csv()">匯出參加者資訊.csv</button>
            
                    </div>
                </div>
            <br/>                 
            <p v-if="sendTimeStatus==0">編輯截止時間 {{edit_end_time}}</p>
            <br/> 
              <div class="table-responsive">
                <table class="table table-striped table-sm">
                  <thead>
                    <tr>
                      
                      <th>姓名</th>
                      <th>性別</th>
                      <th>生日</th>
                      <th>電話</th>
                      <th>信箱</th>
                      <th>時數</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(applicant,i) in applicants" :key="i">
                      <!--<td>{{i+1}}</td> --> 
                      <td>{{ applicant.name }}</td> 
                      <td>{{ applicant.gender }}</td>  
                      <td>{{ applicant.birth }}</td> 
                      <td>{{ applicant.phone }}</td> 
                      <td>{{ applicant.email }}</td> 
            
                      <td>
                        <div  v-if="sendTimeStatus==1">
                          {{applicant.time}}
                        </div>
                        <div class="input-group" v-if="sendTimeStatus==0">
                          <span class="input-group-btn">
                              <button type="button" class="btn btn-danger btn-number"  v-on:click="setMinus(i)" data-type="minus" data-field="quant[2]">
                                <span class="glyphicon glyphicon-minus">-</span>
                              </button>
                          </span>
                          <input type="text" name="q" class="form-control input-number"  v-model="applicants[i].time" style="width: 10px; text-align: center;" value="10" min="1" max="100">
                          <span class="input-group-btn">
                              <button type="button" class="btn btn-success btn-number" v-on:click="setPlus(i)" data-type="plus" data-field="quant[2]">
                                  <span class="glyphicon glyphicon-plus">+</span>
                              </button>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
              <p v-if="sendTimeStatus==0">編輯截止時間 {{edit_end_time}}</p>
              <p v-if="sendTimeStatus==0" style="color:red">在編輯截止時間前您都可以再次編輯參加者服務時數</p>
              <button type="button" class="btn btn-primary "  v-if="sendTimeStatus==0" v-on:click="sendAppliersTime()">編輯參加者服務時數</button>
            </div>
        </div>
        </div>
      </div>
        <!-- Modal -->
      <div class="modal fade" id="confirm_send_time" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="send_success==0" class="modal-title" id="exampleModalLabel">已送出時數</h5>
              <h5 v-if="send_success==1" class="modal-title" id="exampleModalLabel">送出時數失敗</h5>
            </div>
          
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="cancel()">取消</button>
              <button type="button" class="btn btn-primary" v-on:click="confirm()">確認</button>
            </div>
          </div>
        </div>
      </div>
  </div> 
</template>

<script>
import Age from './chart/Age'
import GenderRate from './chart/GenderRate'
import Source from './chart/Source'
import Star from './chart/Star'

import { Bar, Pie } from 'vue-chartjs'
import G_ from "../Global"

export default {
  extends: Pie,
  props:['charity_id','event_id','event_type','subid','end_timestamp', 'substime','subetime'],
  components: {
    Age,
    GenderRate,
    Source,
    Star
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
      age: [],
      gender: [],
      source: [],
      avg_score: 0,
      registration_num: 0,
      registration_rate: 0,
      applicants: [],
      sendTimeStatus: 0,
      time: null,

      edit_end_time:"",
      send_success:0,
      
    }
  },
  
  mounted : function () {
    let t = this;
    // $.post(
    //   G_.webURL+"getStatisticAndApplicantsTime/",
    //   // { eventType: t.event_type, eventId:t.event_id, sid:0 },
    //   { eventType: String(t.event_type), eventID: String(t.event_id), sid : String(t.subid) },
    //   function (getStatisticAndApplicantsTime_data) {
    //     console.log("zzz",getStatisticAndApplicantsTime_data);
    //     console.log(t.subid)
    //     t.age = getStatisticAndApplicantsTime_data.age;
    //     t.gender = getStatisticAndApplicantsTime_data.gender;
    //     t.source = getStatisticAndApplicantsTime_data.source;
    //     t.avg_score = getStatisticAndApplicantsTime_data.avg_score;
    //     t.registration_num = getStatisticAndApplicantsTime_data.registration_num;
    //     t.registration_rate = getStatisticAndApplicantsTime_data.registration_rate;
    //     t.applicants = getStatisticAndApplicantsTime_data.applicants;
    //     t.sendTimeStatus = getStatisticAndApplicantsTime_data.sendTimeStatus;

    //     t.edit_end_time = t.endTime
        

    //   }
    // );
     $.post(
        G_.webURL+"getEventDetail/",
        { eventType: String(t.event_type), eventID: String(t.event_id) },
        function (getEventDetail_data) {
          console.log(t.eventID,t.eventType);
          console.log("iiiiiiiiiii",getEventDetail_data);
          t.bef_event = getEventDetail_data;
          t.eventName = getEventDetail_data.eventName;
          t.startTime = getEventDetail_data.startTime;
          t.endTime = getEventDetail_data.endTime;
           var d = new Date(t.end_timestamp);
            d.setDate(d.getDate() + 3);
            let month = '' + (d.getMonth() + 1);
            let day = '' + d.getDate();
            let year = d.getFullYear();
            let hour = '' + d.getHours();
            let minute = '' + d.getMinutes();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            if (hour.length < 2) 
                hour = '0' + hour;
            if (minute.length < 2) 
                minute = '0' + minute;  
            t.edit_end_time = [year, month, day].join('-')+" "+ [hour, minute].join(':')   


          t.charityName = getEventDetail_data.charityName;
          t.contactNumber = getEventDetail_data.contactNumber;
          t.contactPerson = getEventDetail_data.contactPerson;
          t.details = getEventDetail_data.details;
          t.eventFreq = getEventDetail_data.eventFreq;
          t.eventType = getEventDetail_data.eventType;
          t.location = getEventDetail_data.location;
          t.note = getEventDetail_data.note;
          t.status = getEventDetail_data.status;

          t.$forceUpdate()
        }
      );
      $.post(
      G_.webURL+"getStatisticAndApplicantsTime/",
      // { eventType: t.event_type, eventId:t.event_id, sid:0 },
      { eventType: String(t.event_type), eventID: String(t.event_id), sid : String(t.subid) },
        function (getStatisticAndApplicantsTime_data) {
          console.log("zzzwatch",getStatisticAndApplicantsTime_data);
          console.log(t.subid)
          t.age = getStatisticAndApplicantsTime_data.age;
          t.gender = getStatisticAndApplicantsTime_data.gender;
          t.source = getStatisticAndApplicantsTime_data.source;
          t.avg_score = getStatisticAndApplicantsTime_data.avg_score;
          t.registration_num = getStatisticAndApplicantsTime_data.registration_num;
          t.registration_rate = getStatisticAndApplicantsTime_data.registration_rate;
          t.applicants = getStatisticAndApplicantsTime_data.applicants;
          t.sendTimeStatus = getStatisticAndApplicantsTime_data.sendTimeStatus;


        
          
          t.$forceUpdate()
        }
      );


      $.post(
      G_.webURL+"getStatisticAndApplicantsTime/",
      { eventType: String(t.event_type), eventID: String(t.event_id), sid : String(t.subid) },
      function (getStatisticAndApplicantsTime_data) {
          console.log("hhhhhhhhh",getStatisticAndApplicantsTime_data);
          t.age = getStatisticAndApplicantsTime_data.age;
          t.gender = getStatisticAndApplicantsTime_data.gender;
          t.source = getStatisticAndApplicantsTime_data.source;
          t.avg_score = getStatisticAndApplicantsTime_data.avg_score;
          t.registration_num = getStatisticAndApplicantsTime_data.registration_num;
          t.registration_rate = getStatisticAndApplicantsTime_data.registration_rate;
          t.applicants = getStatisticAndApplicantsTime_data.applicants;
          t.sendTimeStatus = getStatisticAndApplicantsTime_data.sendTimeStatus;
          t.$forceUpdate()
        }
      );
       
  },
  watch: { 
    event_id: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      
      // this._data._chart.destroy();
      // this.renderChart(this.chartData, this.options);
      var t = this;
      // console.log('ddddddddddddd',t.end_timestamp);
      var d = new Date(t.end_timestamp);
      d.setDate(d.getDate() + 3);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();
      let hour = '' + d.getHours();
      let minute = '' + d.getMinutes();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
      if (hour.length < 2) 
          hour = '0' + hour;
      if (minute.length < 2) 
          minute = '0' + minute;  
      t.edit_end_time = [year, month, day].join('-')+" "+ [hour, minute].join(':')    
    // console.log(d.getUTCHours()); // Hours
    // console.log(d.getUTCMinutes());
    // console.log(d.getUTCSeconds());
      
    // console
    // console.log(d.getYear()); // Hours
    // console.log(d.getMonth());
    // console.log(d.getHours());
    // console.log(d.getMinutes());
    console.log("getUTCSeconds getUTCSeconds getUTCSeconds", [year, month, day].join('-')+" "+ [hour, minute].join(':'));
      console.log( t.event_type, t.event_id,t.subid );
      $.post(
        G_.webURL+"getEventDetail/",
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

          t.edit_end_time = t.endTime
          t.$forceUpdate()
        }
      );
      $.post(
      G_.webURL+"getStatisticAndApplicantsTime/",
      // { eventType: t.event_type, eventId:t.event_id, sid:0 },
      { eventType: String(t.event_type), eventID: String(t.event_id), sid : String(t.subid) },
        function (getStatisticAndApplicantsTime_data) {
          console.log("zzzwatch",getStatisticAndApplicantsTime_data);
          console.log(t.subid)
          t.age = getStatisticAndApplicantsTime_data.age;
          t.gender = getStatisticAndApplicantsTime_data.gender;
          t.source = getStatisticAndApplicantsTime_data.source;
          t.avg_score = getStatisticAndApplicantsTime_data.avg_score;
          t.registration_num = getStatisticAndApplicantsTime_data.registration_num;
          t.registration_rate = getStatisticAndApplicantsTime_data.registration_rate;
          t.applicants = getStatisticAndApplicantsTime_data.applicants;
          t.sendTimeStatus = getStatisticAndApplicantsTime_data.sendTimeStatus;


        
          
          t.$forceUpdate()
        }
      );


      $.post(
      G_.webURL+"getStatisticAndApplicantsTime/",
      { eventType: String(t.event_type), eventID: String(t.event_id), sid : String(t.subid) },
      function (getStatisticAndApplicantsTime_data) {
          console.log("hhhhhhhhh",getStatisticAndApplicantsTime_data);
          t.age = getStatisticAndApplicantsTime_data.age;
          t.gender = getStatisticAndApplicantsTime_data.gender;
          t.source = getStatisticAndApplicantsTime_data.source;
          t.avg_score = getStatisticAndApplicantsTime_data.avg_score;
          t.registration_num = getStatisticAndApplicantsTime_data.registration_num;
          t.registration_rate = getStatisticAndApplicantsTime_data.registration_rate;
          t.applicants = getStatisticAndApplicantsTime_data.applicants;
          t.sendTimeStatus = getStatisticAndApplicantsTime_data.sendTimeStatus;
          t.$forceUpdate()
        }
      );
      t.$forceUpdate()
      // t.setTime();
     
    },
    subid: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      
      // this._data._chart.destroy();
      // this.renderChart(this.chartData, this.options);
      var t = this;
      // console.log('ddddddddddddd',t.end_timestamp);
      var d = new Date(t.end_timestamp);
      d.setDate(d.getDate() + 3);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();
      let hour = '' + d.getHours();
      let minute = '' + d.getMinutes();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
      if (hour.length < 2) 
          hour = '0' + hour;
      if (minute.length < 2) 
          minute = '0' + minute;  
      t.edit_end_time = [year, month, day].join('-')+" "+ [hour, minute].join(':')    
    // console.log(d.getUTCHours()); // Hours
    // console.log(d.getUTCMinutes());
    // console.log(d.getUTCSeconds());
      
    // console
    // console.log(d.getYear()); // Hours
    // console.log(d.getMonth());
    // console.log(d.getHours());
    // console.log(d.getMinutes());
    console.log("getUTCSeconds getUTCSeconds getUTCSeconds", [year, month, day].join('-')+" "+ [hour, minute].join(':'));
      console.log( t.event_type, t.event_id,t.subid );
      $.post(
        G_.webURL+"getEventDetail/",
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

          t.edit_end_time = t.endTime
          t.$forceUpdate()
        }
      );
      $.post(
      G_.webURL+"getStatisticAndApplicantsTime/",
      // { eventType: t.event_type, eventId:t.event_id, sid:0 },
      { eventType: String(t.event_type), eventID: String(t.event_id), sid : String(t.subid) },
        function (getStatisticAndApplicantsTime_data) {
          console.log("zzzwatch",getStatisticAndApplicantsTime_data);
          console.log(t.subid)
          t.age = getStatisticAndApplicantsTime_data.age;
          t.gender = getStatisticAndApplicantsTime_data.gender;
          t.source = getStatisticAndApplicantsTime_data.source;
          t.avg_score = getStatisticAndApplicantsTime_data.avg_score;
          t.registration_num = getStatisticAndApplicantsTime_data.registration_num;
          t.registration_rate = getStatisticAndApplicantsTime_data.registration_rate;
          t.applicants = getStatisticAndApplicantsTime_data.applicants;
          t.sendTimeStatus = getStatisticAndApplicantsTime_data.sendTimeStatus;


        
          
          t.$forceUpdate()
        }
      );


      $.post(
      G_.webURL+"getStatisticAndApplicantsTime/",
      { eventType: String(t.event_type), eventID: String(t.event_id), sid : String(t.subid) },
      function (getStatisticAndApplicantsTime_data) {
          console.log("hhhhhhhhh",getStatisticAndApplicantsTime_data);
          t.age = getStatisticAndApplicantsTime_data.age;
          t.gender = getStatisticAndApplicantsTime_data.gender;
          t.source = getStatisticAndApplicantsTime_data.source;
          t.avg_score = getStatisticAndApplicantsTime_data.avg_score;
          t.registration_num = getStatisticAndApplicantsTime_data.registration_num;
          t.registration_rate = getStatisticAndApplicantsTime_data.registration_rate;
          t.applicants = getStatisticAndApplicantsTime_data.applicants;
          t.sendTimeStatus = getStatisticAndApplicantsTime_data.sendTimeStatus;
          t.$forceUpdate()
        }
      );
      t.$forceUpdate()
      // t.setTime();
     
    },
    options: function() {
        this._data._chart.destroy();
        this.renderChart(this.chartData, this.options);
    }
  },
  methods: {
    setPlus: function (i) {
      // console.log(applicants_data.applicants[0].state);
      this.applicants[i].time = parseFloat(parseFloat(this.applicants[i].time) + 1).toFixed(1);
      console.log(this.applicants[i].time);
      console.log(this.applicants);
    },
    setMinus: function (i) {
      if (this.applicants[i].time > 0) {
      this.applicants[i].time = parseFloat(parseFloat(this.applicants[i].time) - 1).toFixed(1);
      }
      if(parseFloat(this.applicants[i].time) < 0) {
        console.log("small then 0")
        this.applicants[i].time = "0.0";
      }
      console.log(this.applicants[i].time);
    },
    sendAppliersTime: function(){
      var t =this;
      for (var i in this.applicants){
        console.log("ddddd",this.applicants[i]);
        this.applicants[i].uid;
        this.applicants[i].time;
      }
      var tmp_changedTimeList = {};
      this.applicants.forEach(applier=>{
              tmp_changedTimeList[applier.uid] = parseFloat(applier.time);
          }
      );
      var tmp_changedTimeList_string = JSON.stringify(tmp_changedTimeList);
      console.log(tmp_changedTimeList_string);
      
       $.post(
        G_.webURL+"sendApplicantsTime/",
        { eventType: String(t.event_type), eventID: String(t.event_id),
        changedTimeList: tmp_changedTimeList_string, sid:String(t.subid) },
        function (sendApplicantsTime_data) {
          console.log(sendApplicantsTime_data);
          console.log("eventType: ",String(t.event_type), "eventID: ", String(t.event_id)
          ,"changedTimeList: ", tmp_changedTimeList_string, "sid", String(t.subid))
          if (sendApplicantsTime_data.status==0){
            t.send_success = 0;
          }else{
            t.send_success = 1;
          }
          $('#confirm_send_time').modal('show');
        }
      );
    },
    confirm: function(){
      $('#confirm_send_time').modal('hide');
    },
    timer() {
      let my = this
      this.time = setInterval(() => {
        console.log(this.charity_id);
      }, 1000)
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
      var itemsNotFormatted = this.applicants;

      var itemsFormatted = [];

      // format the data
      itemsNotFormatted.forEach((applicants) => {
        itemsFormatted.push({
          name: applicants.name.replace(/,/g, ''), // remove commas to avoid errors,
          gender: applicants.gender,
          birth: applicants.birth,
          phone: applicants.phone,
          email: applicants.email,
          time: applicants.time,
        });
      });

      var fileTitle = '參加者資訊及其各別服務時數'; // or 'my-unique-title'
      console.log(itemsFormatted)
      this.exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
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

      var str = "活動: "+this.eventName+''+ '\r\n';
      
      for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
        }

        str += line + '\r\n';
      }

      return str;
    },
    download_doc: function(){
      console.log("download_doc");
      console.log( this.applicants);
      // this.g_test();
      var table = [];
      //add title of each column
      var header_row = [];
      header_row.push(new docx.TableCell({
        width: { size: 100 / 7, type: docx.WidthType.PERCENTAGE },
        children: [new docx.Paragraph({
          text: "編號",
          heading: docx.HeadingLevel.HEADING_6,
          alignment: docx.AlignmentType.CENTER,
        })],
      }));
      for (var prop in this.applicants[0]) {
        console.log("cc",prop);
        if(prop=="uid"){
          continue
        }

        
          if(prop=="name"){
            prop="姓名";
          }
          if(prop=="gender"){
            prop="性別";
          }
       
          if(prop=="birth"){
            prop="生日";
          }
      
          if(prop=="phone"){
            prop="電話";
          }
        
          if(prop=="email"){
            prop="信箱";
          }
          if(prop=="time"){
            prop="服務時數";
          }
        header_row.push(new docx.TableCell({
          width: { size: 100 / 7, type: docx.WidthType.PERCENTAGE },
          children: [new docx.Paragraph({
            text: prop,
            heading: docx.HeadingLevel.HEADING_6,
            alignment: docx.AlignmentType.CENTER,
          })],
        }));
      }

      // header_row.push(new docx.TableCell({
      //   children: [new docx.Paragraph({
      //     text: "點名",
      //     heading: docx.HeadingLevel.HEADING_6,
      //     alignment: docx.AlignmentType.CENTER,
      //   })],
      // }));
      table.push(new docx.TableRow({ children: header_row }));
      // console.log(table);
      for (var row_n = 0; row_n < this.applicants.length; row_n++) {
        // console.log("ff", applicants_data.applicants[row_n]);
        var n_row = this.applicants[row_n];
        var row = [];

        //編號
        row.push(new docx.TableCell({
          width: { size: 100 / 7, type: docx.WidthType.PERCENTAGE },
          children: [new docx.Paragraph({
            text: (row_n + 1) + "",
            alignment: docx.AlignmentType.CENTER,
          })],
        }));
        
        for (var prop in n_row) {
          console.log("cc",prop);
          // row[prop] = 'xxx';

          if(prop=="uid"){
            continue
          }

          //要特別處理變成string才寫得進去   這library的text 只吃string
          if(prop=="time"){
            console.log("time time",n_row[prop]);
            row.push(new docx.TableCell({
              width: { size: 100 / 7, type: docx.WidthType.PERCENTAGE },
              children: [new docx.Paragraph({
                text: (n_row[prop]+""),
                alignment: docx.AlignmentType.CENTER,
              })],
            }));
            continue
          }
          row.push(new docx.TableCell({
            width: { size: 100 / 7, type: docx.WidthType.PERCENTAGE },
            children: [new docx.Paragraph({
              text: n_row[prop],
              alignment: docx.AlignmentType.CENTER,
            })],
          }));
          console.log(n_row[prop]);
        }
        // row.push(new docx.TableCell({
        //   children: [new docx.Paragraph({
        //     text: "        ",
        //   })],
        // }));
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
      this.generate(this.eventName, this.details, t_table);
      
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

                          new docx.Paragraph({
                              text: " ",
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
    setTime() {
      this.timer()
    },
    stopTime() {
      if (this.time) {
        clearInterval(this.time)
      }
    }
  }
}
</script>

<style>


</style>