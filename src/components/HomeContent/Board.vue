<template>
     <div >
       
        <form action="">
            <!-- <div class="form-group" style="margin-top:2rem;">
                
            </div> -->
            <div class="form-group" style="margin-top:1rem;">
                <label for="selectevent">請選擇活動名稱</label>
                <select class="custom-select" v-model="event_item"  @change="onChange($event)">
                    <option  v-for="a in a_list" :value="a" :key="a.eventID">{{a.eventName}}</option>
                    <option  v-for="a_once in a_list_once" :value="a_once" :key="a_once.eventID" >{{a_once.eventName}}</option>
                    <option  v-for="e in e_list" :value="e" :key="e.eventID" >{{e.eventName}}</option>
                    <option  v-for="e_once in e_list_once" :value="e_once" :key="e_once.eventID" >{{e_once.eventName}}</option>
                    
                </select>
                <div>
                    {{eventId}}
                </div>
                <div  >
                    <label for="selectEventDate">請選擇子活動日期</label>
                    <select class="custom-select" v-model="subEventId">
                        <option  v-for="sub in event_item.time" :value="sub.sid" :key="sub.sid">{{sub.endTime}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group" style="margin-top:1rem;">
                <label for="selectSee">誰可見？</label>
                <select class="custom-select" v-model="see">
                    <option selected value="0">公開</option>
                    <option value="1">只有 follower 看的到</option>
                    <option value="2">只有活動參與者看的到</option>
                </select>
            </div>
            <div class="form-group" style="margin-top:1rem;">
                <label  for="bulletinboard"
                >公告內文</label
                >
                <textarea
                required
                class="form-control"
                id="txtcontext"
                rows="6"
                v-model="detail"
                
                ></textarea>
            </div>
           
        </form>
    <button class="btn btn-primary" 
    style="margin-top:1rem;margin-left: 50%;transform: translateX(-50%);
    padding-left: 3rem;padding-right: 3rem;" v-on:click="sendNews()">送出公告</button>


    <!-- 已成功發布公告 -->
    <div class="modal fade" id="addNews_success" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="sendNewsSuccess==0" class="modal-title" id="exampleModalLabel">
              已成功發布 {{event_item.eventName}} 的公告
            </h5>
            <h5 v-if="detail_empty_flag==1 " class="modal-title" id="exampleModalLabel">
              請填寫公告內文
            </h5>
            <h5 v-if="sendNewsSuccess==1" class="modal-title" id="exampleModalLabel">
              發布失敗
            </h5>
            <!-- <h5 v-if="wait_server==3" class="modal-title" id="exampleModalLabel">
              請選擇一個活動
            </h5> -->
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="cancel_delete()">取消</button> -->
            <button type="button" class="btn btn-primary text-center" v-on:click="confirm_delete()">確認</button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import G_ from "../Global"

export default {
    props:['charity_id','a_list','a_list_once', 'e_list', 'e_list_once'],
    data () {
        return{
            eventId:"",
            subEventId:"0",
            event_item:{},
            see:"",
            detail:"",
            sendNewsSuccess: 0,

            detail_empty_flag:0,
            detail_before_sent:"",
        }
    },
    methods: {
        sendNews(){
            let t = this;
            // console.log(this.mainEvent, this.mainEvent.eventType);
            console.log(t.charity_id, t.event_item.eventType, t.event_item.eventID, 
                    t.subEventId,t.see, t.detail);
            // if(t.event_item.eventType==null){
            //    t.wait_server =  3;
            // }
            // t.wait_server = 1; //wait
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",t.subEventId);
            // if(t.subEventId = ""){
            //     t.subEventId = 0;
            //     console.log(t.subEventId);
            // }
            t.detail_before_sent = t.detail;
             $('#addNews_success').modal('show');
             if(t.detail_before_sent==""){
                 console.log("@@@@@@@@@@@@@gggg");
                 t.detail_empty_flag = 1;
                 t.sendNewsSuccess = 9;
             }else{
                 t.detail_empty_flag = 0;
                 $.post(
                    G_.webURL+"addNews/",
                    { charityID: t.charity_id, eventType:t.event_item.eventType, 
                    eventID:t.event_item.eventID, sid:t.subEventId,visibility:t.see, content:t.detail},
                    function (addNews_data) {
                        console.log("dddd",addNews_data);
                        if(addNews_data.status == 0){
                            t.sendNewsSuccess = 0; //success
                            t.see = "";
                            t.detail = "";
                            
                        }else{
                            t.sendNewsSuccess = 1; //fail
                        }
                        
                        
                    }
                );
             }
             
             
        },
        onChange(event) {
            console.log(event.target.value);
        },
        cancel_delete(){
            $('#addNews_success').modal('hide');
        },
        confirm_delete(){
            $('#addNews_success').modal('hide');
        }
    }
}
</script>
<style>

</style>