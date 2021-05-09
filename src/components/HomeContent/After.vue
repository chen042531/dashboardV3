<template>
  <div>
    <div id="event_info" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <!-- <h1 class="h2">{{eventName}}  <span style="color: #888888;
          font-size: large;">{{startTime}} {{endTime}}</span></h1> -->
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
        <div class="col-sm-6">
        <div class="card top-buffer">
            <div class="card-body">
            <h5 class="card-title" id="t1" data-placement="top"  data-toggle="tooltip"
                 title="akfnljnflnjandnaklfasdfasfasdfsjalnfjkasnlnfjanflnflaajnlfnal">性別比</h5>
              <GenderRate :Gender="gender"></GenderRate>
            </div>
        </div>
        </div>
        <div class="col-sm-6">
          <div class="card top-buffer">
            <div class="card-body">
            <h5 class="card-title " id="t2" data-placement="top"  data-toggle="tooltip" 
                  title="akfnljnflnjandnaklfasdfasfasdfsjalnfjkasnlnfjanflnflaajnlfnal">參加者得知活動的管道</h5>
              <Source :Source="source"></Source>
            </div>
          </div>
        </div>
      </div>
      <div class="row ">
          <div class="col-sm-12">
      
            <div class="card top-buffer" >
              <div class="card-body">
              <h5 class="card-title" id="t3" data-placement="top"  data-toggle="tooltip" title="akfnljnflnjandnaklfasdfasfasdfsjalnfjkasnlnfjanflnflaajnlfnal">參加者平均評分</h5>
           
                <!-- <div id="star_container"></div> -->
                <Star :star="avg_score"></Star>
                
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
            <!-- <p>可編輯的剩餘時間 {{left_time_can_change}}</p> -->
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
                        <div class="input-group">
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
              <button type="button" class="btn btn-primary ">送出參加者服務時數</button>
            </div>
        </div>
        </div>
      </div>
  </div> 
</template>

<script>
import GenderRate from './chart/GenderRate'
import Source from './chart/Source'
import Star from './chart/Star'

export default {
  props:['charity_id','event_id','event_type'],
  components: {
    GenderRate,
    Source,
    Star
  },
  data () {
    return {
      age: [],
      gender: [],
      source: [],
      avg_score: 0,
      registration_num: 0,
      registration_rate: 0,
      applicants: [],
      sendTimeStatus: 0,
    }
  },
  
  mounted : function () {
    let t = this;
    $.post(
      "http://140.113.216.53:8000/getStatisticAndApplicantsTime/",
      // { eventType: t.event_type, eventId:t.event_id, sid:0 },
      { eventType: String(t.event_type), eventID: String(t.event_id), sid: String(0) },
      function (getStatisticAndApplicantsTime_data) {
        console.log("zzz",getStatisticAndApplicantsTime_data);
        t.age = getStatisticAndApplicantsTime_data.age;
        t.gender = getStatisticAndApplicantsTime_data.gender;
        t.source = getStatisticAndApplicantsTime_data.source;
        t.avg_score = getStatisticAndApplicantsTime_data.avg_score;
        t.registration_num = getStatisticAndApplicantsTime_data.registration_num;
        t.registration_rate = getStatisticAndApplicantsTime_data.registration_rate;
        t.applicants = getStatisticAndApplicantsTime_data.applicants;
        t.sendTimeStatus = getStatisticAndApplicantsTime_data.sendTimeStatus;
      }
    );
       
  },
  watch: { 
    event_id: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      
      var t = this;
      $.post(
      "http://140.113.216.53:8000/getStatisticAndApplicantsTime/",
      // { eventType: t.event_type, eventId:t.event_id, sid:0 },
      { eventType: String(t.event_type), eventID: String(t.event_id), sid: String(0) },
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
      }
    );
      $.post(
        "http://140.113.216.53:8000/getStatisticAndApplicantsTime/",
        { eventType: String(t.event_type), eventID: String(t.event_id), sid: String(0) },
        function (getStatisticAndApplicantsTime_data) {
          console.log(getStatisticAndApplicantsTime_data);
          t.data = getStatisticAndApplicantsTime_data
          
         
        }
      );
      
     
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
    }
  }
}
</script>

<style>


</style>