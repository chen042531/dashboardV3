<template>
     <div >
       
        <form action="" id="form2">
            <div class="form-group" style="margin-top:2rem;">
                
            </div>
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
                <div >
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
    </div>
</template>
<script>
export default {
    props:['charity_id','a_list','a_list_once', 'e_list', 'e_list_once'],
    data () {
        return{
            eventId:"",
            subEventId:"",
            event_item:{},
            see:"",
            detail:"",
            
        }
    },
    methods: {
        sendNews(){
            console.log(this.mainEvent, this.mainEvent.eventType);
        },
        onChange(event) {
            console.log(event.target.value);
        }
    }
}
</script>
<style>

</style>