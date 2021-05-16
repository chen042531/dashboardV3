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
                />
            </div>
            <div class="col-md-12">
                <UploadImages   @change="handleImages" uploadMsg="請上傳活動圖片" :max="1"/>
            </div>
            <!-- <p>{{uploadImg}}</p> -->
            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">活動類別</label>
                <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="option1"
                />
                <label class="form-check-label" for="inlineCheckbox1">1</label>
                </div>
                <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    value="option2"
                />
                <label class="form-check-label" for="inlineCheckbox2">2</label>
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
                />
                <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
                >
            </div>
            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">活動型態</label>
                <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="once"
                    v-model="picked"
                />
                <label class="form-check-label" for="inlineRadio1">單次活動</label>
                </div>
                <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="period"
                    v-model="picked"
                />
                <label class="form-check-label" for="inlineRadio2">週期活動</label>
                </div>
                <span>Picked: {{ picked }}</span>
            </div>
            <div v-if="picked=='once'">
                <div class="form-inline row">
                    <label for="exampleInputEmail1">日期</label>
                    <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="2021/12/21"
                    />
                </div>
                <div class="form-inline row">
                    <label for="exampleInputEmail1">開始時間</label>
                    <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="2021/12/21"
                    />
                    <label for="exampleInputEmail1">結束時間</label>
                    <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="2021/12/21"
                    />
                </div>
                <div class="form-inline row">
                    <label for="exampleInputEmail1">時數</label>
                    <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="2021/12/21"
                    />
                </div>
            </div>
            <div v-if="picked=='period'">
                <div class="form-inline row">
                    <label for="exampleInputEmail1">開始日期</label>
                    <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="2021/12/21"
                    />
                    <label for="exampleInputEmail1">結束日期</label>
                    <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="2021/12/21"
                    />
                </div>
                <div class="form-inline row">
                    <label for="exampleInputEmail1">星期</label>
                    <select class="custom-select">
                        <option selected value="mon">星期一</option>
                        <option value="tue">星期二</option>
                        <option value="wed">星期三</option>
                        <option value="thu">星期四</option>
                        <option value="fri">星期五</option>
                        <option value="sat">星期六</option>
                        <option value="sun">星期日</option>
                    </select>
                    <label for="exampleInputEmail1">開始時間</label>
                    <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="2021/12/21"
                    />
                    <label for="exampleInputEmail1">結束時間</label>
                    <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="2021/12/21"
                    />
                </div>
                <div class="form-inline row">
                    <label for="exampleInputEmail1">時數</label>
                    <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="2021/12/21"
                    />
                </div>
                <div class="form-inline row">
                    <label for="exampleInputEmail1">格多少週</label>
                    <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="2021/12/21"
                    />
                </div>
            </div>

            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">活動時間</label>
                <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="2021/12/21"
                />
                <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
                >
            </div>
            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">承辦人員</label>
                <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="鮭魚泡飯"
                />
                <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
                >
            </div>
            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">聯絡電話</label>
                <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="0912123123"
                />
                <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
                >
            </div>
            
            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">服務時數(小時)</label>
                <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="10"
                />
                <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
                >
            </div>
            <div class="form-group" style="margin-top:1rem;">
                <label for="exampleInputEmail1">是否提供服務證明？</label>
                <select class="custom-select">
                    <option selected value="yes">是</option>
                    <option value="no">否</option>
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
                ></textarea>
            </div>
            <button type="submit" class="btn btn-primary" 
    style="margin-top:1rem;margin-left: 50%;transform: translateX(-50%);
    padding-left: 3rem;padding-right: 3rem;" v-on:click="sendform()">提交活動</button>
        </form>
        
    </div>
</template>
<script>
import UploadImages from "./uploadImage/uploadImage"

export default {
  components: {
      UploadImages,
  },
  data () {
    return {
      picked: "once",
      charityID:"",
      eventName:"",
      eventType:"",

      uploadImg:"",
    }
  },
  
  methods: {
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
            this.uploadImg = base64String;
            console.log(base64String);
        };
        reader.readAsDataURL(files[0]);
        
    }
  }
}
</script>>