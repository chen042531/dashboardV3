<template>
  <div>
    <div id="event_info" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">{{eventName}}  <span style="color: #888888;
          font-size: large;">{{startTime}} {{endTime}}</span></h1>
        
      </div>
      <div>{{charityName}}</div>
      <div>{{contactNumber}}</div>
      <div>{{contactPerson}}</div>
      <div>{{location}}</div>
      <div>{{details}}</div>
      <div v-for="fre in eventFreq" :key="fre.weekday">{{fre.weekday}}</div>
      <div v-if="eventType=='1'">一次性</div>
      <div v-if="eventType=='3'">週期性</div>
      <div v-if="note != 'none'">{{note}}</div>

      <div class="row ">
        <div class="col-sm-12">
        <div class="card top-buffer">
            <div class="card-body">
            <h5 class="card-title">年齡分佈</h5>
            <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>
            </div>
        </div>
        </div>
      </div>
      <div class="row ">
        <div class="col-sm-6">
        <div class="card top-buffer">
            <div class="card-body">
            <h5 class="card-title" id="t1" data-placement="top"  data-toggle="tooltip"
                 title="akfnljnflnjandnaklfasdfasfasdfsjalnfjkasnlnfjanflnflaajnlfnal">性別比</h5>
              <GenderRate :gender_r="gender"></GenderRate>
              <!-- <canvas id="gender_rate" width="400" height="200"></canvas> -->
            </div>
        </div>
        </div>
        <div class="col-sm-6">
          <div class="card top-buffer">
            <div class="card-body">
            <h5 class="card-title " id="t2" data-placement="top"  data-toggle="tooltip" 
                  title="akfnljnflnjandnaklfasdfasfasdfsjalnfjkasnlnfjanflnflaajnlfnal">參加者得知活動的管道</h5>
              <Source :source_s="source"></Source>
              <!-- <canvas id="info_source" width="400" height="200"></canvas> -->
            </div>
          </div>
        </div>
      </div>
      <div class="row ">
          <div class="col-sm-12">
      
            <div class="card top-buffer" >
              <div class="card-body">
              <h5 class="card-title" id="t3" data-placement="top"  data-toggle="tooltip" title="akfnljnflnjandnaklfasdfasfasdfsjalnfjkasnlnfjanflnflaajnlfnal">參加者平均評分</h5>
           
                <div id="star_container"></div>
                <!-- <Star :star="avg_score"></Star> -->
                
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card top-buffer">
                <div class="card-body">
                <h5 class="card-title" id="t4" data-placement="top"  data-toggle="tooltip" title="akfnljnflnjandnaklfasdfasfasdfsjalnfjkasnlnfjanflnflaajnlfnal">實際報名人數</h5>
                <h1 style="font-weight:bold; font-size: xx-large;
                text-align: center;" id="count">{{registration_num}}</h1>
                </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card top-buffer">
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
        <div class="card top-buffer " id="applicants_info_time">
            <div class="card-body text-center" >
              
            <h5 class="card-title">參加者資訊及其各別服務時數</h5>
            <div class="btn-toolbar mb-2 mb-md-0" style="padding-top:10px;">
                    <div class="btn-group me-2" style="margin-left: 50%; transform: translateX(-50%);">
            
                    <button type="button" style="background-color: dodgerblue;color:white"  class="btn btn-sm btn-outline-secondary" v-on:click="download_doc()">匯出參加者資訊.doc</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="download_csv()">匯出參加者資訊.csv</button>
            
                    </div>
                </div>
            <!-- <p>編輯截止時間 {{endTime}}</p> -->
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
              <!-- <p>可編輯的剩餘時間 {{left_time_can_change}}</p> -->
              <button type="button" class="btn btn-primary "  v-if="sendTimeStatus==0">送出參加者服務時數</button>
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

export default {
  extends: Pie,
  props:['charity_id','event_id','event_type','subid','end_timestamp'],
  components: {
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
    }
  },
  
  mounted : function () {
    let t = this;
    $.post(
      "http://140.113.216.53:8000/getStatisticAndApplicantsTime/",
      // { eventType: t.event_type, eventId:t.event_id, sid:0 },
      { eventType: String(t.event_type), eventID: String(t.event_id), sid : String(t.subid) },
      function (getStatisticAndApplicantsTime_data) {
        console.log("zzz",getStatisticAndApplicantsTime_data);
        console.log(t.subid)
        t.age = getStatisticAndApplicantsTime_data.age;
        t.gender = getStatisticAndApplicantsTime_data.gender;
        t.source = getStatisticAndApplicantsTime_data.source;
        t.avg_score = getStatisticAndApplicantsTime_data.avg_score;
        t.registration_num = getStatisticAndApplicantsTime_data.registration_num;
        t.registration_rate = getStatisticAndApplicantsTime_data.registration_rate;
        t.applicants = getStatisticAndApplicantsTime_data.applicants;
        t.sendTimeStatus = getStatisticAndApplicantsTime_data.sendTimeStatus;


         console.log("pppppppppppppppppppp",t.avg_score);
          var n_star = Math.floor(t.avg_score);
          for (var star_n = 1; star_n <= n_star; star_n++) {
          // $("#star" + star_n).addClass("checked");
          console.log('start');
          // console.log("ssss",$("#star_container"));
            $("#star_container").append('<span class="star fa fa-star  fa-4x checked"  ></span>');
          }
          if (n_star != t.avg_score) {
            $("#star_container").append('<span class="star fa fa-star-half-o  fa-4x checked"  ></span>');
          }
          for (var j = 0; j <= (t.avg_score - n_star); j++) {
          // $("#star" + star_n).addClass("checked");
           $("#star_container").append('<span class="star fa fa-star-o  fa-4x checked" ></span>');
          }


        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['0-17','18-24','25-34','35-44','45-54','55-64','65-'],
            datasets: [{
              label: '銷售業績(百萬)',
              data: t.age
            }]
          }
        });
        
        
        
        var gender_rate = document.getElementById('gender_rate')
        var gender_rateChart = new Chart(gender_rate, {
          type: 'pie',
          data: {
            labels: ["男", "女", "其他"],
            datasets: [{
              data:  t.gender,
              backgroundColor: [
                'rgba(54, 162, 235)',
                'rgba(255, 99, 132)',
                'rgba(255, 206, 86)',
              ],
              borderWidth: 1
            }]
          },
          options: {}
        });
        t.renderChart()
        var info_source = document.getElementById('info_source')
// eslint-disable-next-line no-unused-vars
        var info_sourceChart = new Chart(info_source, {
          type: 'pie',
          data: {
            labels: ["公益趴趴GO App 首頁活動列表",
              "公益趴趴GO App 官方粉絲團 (FB, IG)",
              "合作公益單位官網", "合作公益單位廣告文宣",
              "搜尋引擎 (Google, Yahoo, Bing, ...)",
              "學校推廣", "親朋好友告知", "其他"],

            datasets: [{
              data: t.source,
              backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(255, 159, 64)'
              ],
              borderWidth: 1
            }]
          },
          labels: {
            boxWidth: 20,
          },
          options: {
            legend: {
              display: true,
              // position: 'bottom',
            },

          }
        });
        

      }
    );
       
  },
  watch: { 
    subid: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      
      // this._data._chart.destroy();
      // this.renderChart(this.chartData, this.options);
      var t = this;
      console.log('ddddddddddddd',t.end_timestamp);
      var d = new Date(t.end_timestamp);
    console.log(d.getUTCHours()); // Hours
    console.log(d.getUTCMinutes());
    console.log(d.getUTCSeconds());
      console.log(t.event_type, t.event_id,t.subid );
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
          t.$forceUpdate()
        }
      );
      $.post(
      "http://140.113.216.53:8000/getStatisticAndApplicantsTime/",
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


        
          console.log("pppppppppppppppppppp",t.avg_score);
          var n_star = Math.floor(t.avg_score);
          for (var star_n = 1; star_n <= n_star; star_n++) {
          // $("#star" + star_n).addClass("checked");
          console.log('start');
          // console.log("ssss",$("#star_container"));
            $("#star_container").append('<span class="star fa fa-star  fa-4x checked"  ></span>');
          }
          if (n_star != t.avg_score) {
            $("#star_container").append('<span class="star fa fa-star-half-o  fa-4x checked"  ></span>');
          }
          for (var j = 0; j <= (t.avg_score - n_star); j++) {
          // $("#star" + star_n).addClass("checked");
           $("#star_container").append('<span class="star fa fa-star-o  fa-4x checked" ></span>');
          }

          var ctx = document.getElementById('myChart');
          var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['0-17','18-24','25-34','35-44','45-54','55-64','65-'],
              datasets: [{
                label: '銷售業績(百萬)',
                data: t.age
              }]
            }
          });
          
          var gender_rate = document.getElementById('gender_rate')
          var gender_rateChart = new Chart(gender_rate, {
            type: 'pie',
            data: {
              labels: ["男", "女", "其他"],
              datasets: [{
                data:  t.gender,
                backgroundColor: [
                  'rgba(54, 162, 235)',
                  'rgba(255, 99, 132)',
                  'rgba(255, 206, 86)',
                ],
                borderWidth: 1
              }]
            },
            options: {}
          });

          var info_source = document.getElementById('info_source')
  // eslint-disable-next-line no-unused-vars
          var info_sourceChart = new Chart(info_source, {
            type: 'pie',
            data: {
              labels: ["公益趴趴GO App 首頁活動列表",
                "公益趴趴GO App 官方粉絲團 (FB, IG)",
                "合作公益單位官網", "合作公益單位廣告文宣",
                "搜尋引擎 (Google, Yahoo, Bing, ...)",
                "學校推廣", "親朋好友告知", "其他"],

              datasets: [{
                data: t.source,
                backgroundColor: [
                  'rgba(255, 99, 132)',
                  'rgba(54, 162, 235)',
                  'rgba(255, 206, 86)',
                  'rgba(75, 192, 192)',
                  'rgba(54, 162, 235)',
                  'rgba(255, 206, 86)',
                  'rgba(75, 192, 192)',
                  'rgba(255, 159, 64)'
                ],
                borderWidth: 1
              }]
            },
            labels: {
              boxWidth: 20,
            },
            options: {
              legend: {
                display: true,
                // position: 'bottom',
              },

            }
          });
          
          t.$forceUpdate()
        }
      );


      $.post(
      "http://140.113.216.53:8000/getStatisticAndApplicantsTime/",
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
      console.log(this.applicants[i].time);
    },
    timer() {
      let my = this
      this.time = setInterval(() => {
        console.log(this.charity_id);
      }, 1000)
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