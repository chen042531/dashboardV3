<template>
    <div >
       
        <form action="">
            <div class="form-group" style="margin-top:2rem;">
                <label for="exampleInputEmail1">活動名稱</label>
                <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="淨灘活動"
                v-model="eventName"
                />
            </div>
            <div class="form-group" style="margin-top:2rem;">
                <label for="exampleInputEmail1">上傳圖片</label>
                <div class="col-md-12">
                    <UploadImages   @change="handleImages" uploadMsg="請上傳活動圖片" :max="1"/>
                </div>
            </div>
            
            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">活動地點</label>
                <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="台北"
                v-model="location"
                />
            </div>
            <div class="form-group" style="margin-top:1rem;">
                <div>
                    <label for="exampleInputEmail1">活動類型 </label>
                </div>
                
                <div class="form-check form-check-inline">
                    <input class="form-check-input typeCheck" type="checkbox" id="inlineCheckbox1" value="1" v-model="eventLabel">
                    <label class="form-check-label" for="inlineCheckbox1">婦幼關懷</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input typeCheck" type="checkbox" id="inlineCheckbox2" value="2" v-model="eventLabel" >
                    <label class="form-check-label" for="inlineCheckbox2">身心障礙</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input typeCheck" type="checkbox" id="inlineCheckbox3" value="3" v-model="eventLabel">
                    <label class="form-check-label" for="inlineCheckbox3">老人服務</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input typeCheck" type="checkbox" id="inlineCheckbox4" value="4" v-model="eventLabel">
                    <label class="form-check-label" for="inlineCheckbox4">社會服務</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input typeCheck" type="checkbox" id="inlineCheckbox5" value="5" v-model="eventLabel">
                    <label class="form-check-label" for="inlineCheckbox5">動物保護</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input typeCheck" type="checkbox" id="inlineCheckbox6" value="6" v-model="eventLabel">
                    <label class="form-check-label" for="inlineCheckbox6">國際救援</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input typeCheck" type="checkbox" id="inlineCheckbox7" value="7" v-model="eventLabel">
                    <label class="form-check-label" for="inlineCheckbox7">環境保護</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input typeCheck" type="checkbox" id="inlineCheckbox8" value="8" v-model="eventLabel">
                    <label class="form-check-label" for="inlineCheckbox8">文教藝術</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input typeCheck" type="checkbox" id="inlineCheckbox9" value="9" v-model="eventLabel">
                    <label class="form-check-label" for="inlineCheckbox9">醫療服務</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input typeCheck" type="checkbox" id="inlineCheckbox10" value="10"  v-model="eventLabel">
                    <label class="form-check-label" for="inlineCheckbox10">宗教信仰</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input typeCheck" type="checkbox" id="inlineCheckbox11" value="11" v-model="eventLabel">
                    <label class="form-check-label" for="inlineCheckbox11">其他</label>
                </div>
            </div>

            <div class="form-group" style="margin-top:1rem; ">
                <label for="exampleInputEmail1">活動型態</label>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="1"
                        v-model="eventType"
                    />
                    <label class="form-check-label" for="inlineRadio1">單次活動</label>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="3"
                        v-model="eventType"
                    />
                    <label class="form-check-label" for="inlineRadio2">週期活動</label>
                </div>
               
                <div v-if="eventType=='1'"  >
                
                    <div class="form-inline ">
                        <div class="form-group mb-2">
                            <label for="exampleInputEmail1" >開始日期</label>
                            <input 
                                type="email"
                                class="form-control ml-xl-2"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="2021-12-21"
                                v-model="startDate"
                            />
                        </div>
                        <div class="form-group mb-2">
                            <label for="exampleInputEmail1" class="ml-xl-2" >結束日期</label>
                            <input 
                                type="email"
                                class="form-control ml-xl-2"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="2021-12-21"
                                v-model="endDate"
                            />
                        </div>
                    </div>
                      <div class="form-inline ">
                        <div class="form-group mb-2">
                            <label for="exampleInputEmail1" >開始時間</label>
                            <input 
                                type="email"
                                class="form-control ml-xl-2"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="8:00"
                                v-model="startTime"
                            />
                        </div>
                        <div class="form-group mb-2">
                            <label for="exampleInputEmail1" class="ml-xl-2" >結束時間</label>
                            <input 
                                type="email"
                                class="form-control ml-xl-2"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="13:00"
                                v-model="endTime"
                            />
                        </div>
                    </div>
                    <div class="form-group ">
                            <label for="exampleInputEmail1">服務時數(小時)</label>
                            <input
                            type="email"
                            class="form-control "
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="20"
                            v-model="serviceHours"
                            />
                    </div>
                </div>
                <div v-if="eventType=='3'"  >
                    <div class="form-inline ">
                        <div class="form-group mb-2">
                            <label for="exampleInputEmail1" >開始日期</label>
                            <input 
                                type="email"
                                class="form-control ml-xl-2"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="2021-12-21"
                                v-model="startDate"
                            />
                        </div>
                        <div class="form-group mb-2">
                            <label for="exampleInputEmail1" class="ml-xl-2" >結束日期</label>
                            <input 
                                type="email"
                                class="form-control ml-xl-2"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="2021-12-21"
                                v-model="endDate"
                            />
                        </div>
                    </div>
                    <div class="form-group ">
                        <label for="exampleInputEmail1">星期</label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="Mon" value="Mon" 
                                v-model="weekday">
                            <label class="form-check-label" for="Mon">星期一</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="Tue" value="Tue" 
                                v-model="weekday">
                            <label class="form-check-label" for="Tue">星期二</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="Wed" value="Wed" 
                                v-model="weekday">
                            <label class="form-check-label" for="Wed">星期三</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="Thu" value="Thu" 
                                v-model="weekday">
                            <label class="form-check-label" for="Thu">星期四</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="Fri" value="Fri" 
                                v-model="weekday">
                            <label class="form-check-label" for="Fri">星期五</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="Sat" value="Sat" 
                                v-model="weekday">
                            <label class="form-check-label" for="Sat">星期六</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="Sun" value="Sun" 
                                v-model="weekday">
                            <label class="form-check-label" for="Sun">星期日</label>
                        </div>
                    </div>
                
                    <div class="form-group" style="margin-top:1rem;">
                        <label for="exampleInputEmail1">活動頻率(重複間隔：___週)</label>
                        <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="1"
                        v-model="freqency"
                        />
                    </div>
                    <div class="form-inline ">
                        <div class="form-group mb-2">
                            <label for="exampleInputEmail1" >開始時間</label>
                            <input 
                                type="email"
                                class="form-control ml-xl-2"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="9:00"
                                v-model="startTime"
                            />
                        </div>
                        <div class="form-group mb-2">
                            <label for="exampleInputEmail1" class="ml-xl-2" >結束時間</label>
                            <input 
                                type="email"
                                class="form-control ml-xl-2"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="12:00"
                                v-model="endTime"
                            />
                        </div>
                    </div>
                    <div class="form-group  ">
                            <label for="exampleInputEmail1">服務時數(小時)</label>
                            <input
                            type="email"
                            class="form-control "
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="20"
                            v-model="serviceHours"
                            />
                    </div>
                 
                </div>
            </div>
    
            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">聯絡人</label>
                <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="王小明"
                v-model="contactPerson"
                />
            </div>
            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">聯絡電話</label>
                <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="0912123123"
                v-model="contactNumber"
                />
            </div>
            
            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">是否提供服務證明？</label>
                <select class="custom-select" v-model="certification">
                    <option selected value="True">是</option>
                    <option value="False">否</option>
                </select>
            </div>
            <div class="form-group" style="margin-top:1rem;">
                <label  for="exampleInputEmail1"
                >詳細活動資訊</label
                >
                <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="6"
                v-model="details"
                ></textarea>
            </div>
           
        </form>
         <button type="submit" class="btn btn-primary" 
            style="margin-top:1rem;margin-left: 50%;transform: translateX(-50%);
            padding-left: 3rem;padding-right: 3rem;" v-on:click="sendform()">提交活動</button>
          <!-- Modal -->
      <div class="modal fade" id="confirm_add_event" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="add_success==0" class="modal-title" id="exampleModalLabel">已提交新活動</h5>
              <h5 v-if="add_success==1" class="modal-title" id="exampleModalLabel">提交新活動失敗</h5>
            </div>
          
            <div class="modal-footer">
              <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="cancel()">取消</button> -->
              <button type="button" class="btn btn-primary" v-on:click="confirm()">確認</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import UploadImages from "./uploadImage/uploadImage"

export default {
  components: {
      UploadImages,
  },
  props:['charity_id'],
  data () {
    return {

      eventName:"",
      eventType:"1",

      startDate:"",
      endDate:"",
      startTime:"",
      endTime:"",
      weekday:[],

      serviceHours:"",
      time:"",
      eventLabel:[],
      contactPerson:"",
      contactNumber:"",
      location:"", 
      details: "",        
      image:"",
      certification:"True",
      freqency: "0",

      add_success:0,
    }
  },
 mounted : function () {
      var limit = 3;
        $('.typeCheck').on('change', function(evt) {
        if($(this).siblings(':checked').length >= limit) {
            this.checked = false;
        }
        });
  },
  methods: {
    sendform(){
        var t = this;
        console.log("send send send send send send");
        if(t.eventType==="1"){
            var sendStartTime = t.startDate+" "+t.startTime;
            var sendEndTime = t.endDate+" "+t.endTime;
            var sendLabel = t.eventLabel.join()+",";
            t.time = "[]";
            t.freqency = "0";
            
            console.log(t.charity_id,t.eventName,t.eventType,
                    sendStartTime, sendEndTime, t.serviceHours, t.time, sendLabel,
                    t.contactPerson,t.contactNumber, t.location, t.details, t.certification);
            if(t.image == undefined){
                t.image = "";
            }        
            $.post(
                "http://140.113.216.53:8000/addEvent/",
                { charityID: String(t.charity_id), eventName: String(t.eventName) , eventType: String(t.eventType),
                    startTime: String(sendStartTime), endTime: String(sendEndTime) , serviceHours: String(t.serviceHours),
                    time: String(t.time), eventLabel: String(sendLabel) , contactPerson: String(t.contactPerson),
                    contactNumber: String(t.contactNumber), location: String(t.location), details: String(t.details) ,
                     image: String(t.image),  certification: String(t.certification), freqency: String(t.freqency) },
                function (addEvent_data) {
                //   console.log(t.eventID,t.eventType);
                     console.log("iiiiiiiiiii",addEvent_data);
                     console.log("iiiiiiiiiii",addEvent_data);
                    if (addEvent_data.status==0){
                        t.add_success = 0;
                        t.eventType = false;
                        t.eventName = "";
                        sendStartTime = ""; 
                        t.startDate = "";
                        t.startTime = "";
                        t.endTime = "";
                        t.startTime = "";
                        t.serviceHours = "";
                        t.time = "";
                        t.eventLabel = "";
                        t.contactPerson = "";
                        t.contactNumber = "";
                        t.location = "";
                        t.details = "";
                        t.image = "";
                        t.certification = "";
                        t.freqency = "";
                    }else{
                        t.add_success = 1;
                    }
                    $('#confirm_add_event').modal('show');
                     t.$emit("updateSidebar");
                
                }
            );
        }
        if(t.eventType==="3"){
            var sendStartTime = t.startDate+" "+t.startTime;
            var sendEndTime = t.endDate+" "+t.endTime;
            var tmp_time = [];
            t.weekday.forEach(wday=>{
                    var time_Obj = {};
                    time_Obj["weekday"] = wday;
                    time_Obj["startTime"] = t.startTime;
                    time_Obj["endTime"] = t.endTime;
                    time_Obj["serviceHours"] = t.serviceHours;
                    tmp_time.push(time_Obj) ;
                }
            );
            t.time = JSON.stringify(tmp_time);
            var sendLabel = t.eventLabel.join()+",";

            console.log(t.charity_id,t.eventName,t.eventType,
                    sendStartTime, sendEndTime, t.serviceHours, t.time, sendLabel,
                    t.contactPerson,t.contactNumber, t.location, t.details, t.image, t.certification, t.freqency);

            if(t.image == undefined){
                t.image = "";
            }
            $.post(
                "http://140.113.216.53:8000/addEvent/",
                { charityID: String(t.charity_id), eventName: String(t.eventName) , eventType: String(t.eventType),
                    startTime: String(sendStartTime), endTime: String(sendEndTime) , serviceHours: String(t.serviceHours),
                    time: String(t.time), eventLabel: String(sendLabel) , contactPerson: String(t.contactPerson),
                    contactNumber: String(t.contactNumber), location: String(t.location), details: String(t.details) ,
                     image: String(t.image),  certification: String(t.certification), freqency: String(t.freqency) },
                function (addEvent_data) {
                    //   console.log(t.eventID,t.eventType);
                    console.log("iiiiiiiiiii",addEvent_data);
                    if (addEvent_data.status==0){
                        t.add_success = 0;
                        t.eventType = false;
                        t.eventName = "";
                        sendStartTime = ""; 
                        t.startDate = "";
                        t.startTime = "";
                        t.endTime = "";
                        t.startTime = "";
                        t.serviceHours = "";
                        t.time = "";
                        t.eventLabel = "";
                        t.contactPerson = "";
                        t.contactNumber = "";
                        t.location = "";
                        t.details = "";
                        t.image = "";
                        t.certification = "";
                        t.freqency = "";
                    }else{
                        t.add_success = 1;
                    }
                    $('#confirm_add_event').modal('show');
                    t.$emit("updateSidebar");
                }
            );
        }
        console.log("send send send send send send");
        
        
    },
    confirm: function(){
      $('#confirm_add_event').modal('hide');
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
        
    }
  }
}
</script>
<style>
.form-control::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #aaaaaa;
            opacity: 0.9; /* Firefox */
}

.form-control:-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #aaaaaa;
            opacity: 0.9; /* Firefox */
}

.form-control::-ms-input-placeholder { /* Microsoft Edge */
            color: #aaaaaa;
            opacity: 0.9; /* Firefox */
 }
</style>
