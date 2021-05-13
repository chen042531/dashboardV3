<template>
  <div>
      <div id="event_info" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">{{eventName}}  <span style="color: #888888;
          font-size: large;">{{startTime}} {{endTime}}</span></h1>
        <!-- <span>{{event_description}}</span> -->
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="delete_event()">刪除活動</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="stop_signing()">截止報名</button>
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
            
                    <button type="button" style="background-color: dodgerblue;color:white"  class="btn btn-sm btn-outline-secondary" v-on:click="download_doc()">匯出參加者資訊.doc</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="download_csv()">匯出參加者資訊.csv</button>
            
                    </div>
                </div>
                <br/>
               = <div class="table-responsive" id="applicants_info">
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
                            <button :id="'button'+i" type="button" class="btn btn-danger" v-on:click="setReject(i)">取消報名</button>
                            </span>
                        
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div> 
           
                </div>
            </div>
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
            <h5 class="modal-title" id="exampleModalLabel">
              確定要刪除活動 “淨灘活動” 嗎？
              
            </h5>
  
          </div>
          <div class="modal-body" >
            <h5>刪除活動的理由是:</h5>
            <textarea class="form-control" id="confirm_delete_event_reason" rows="5"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="cancel_delete()">取消</button>
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
            <h5 class="modal-title" id="confirm_stop_modal" style="text-align: center;">
              
            </h5>
  
          </div>
  
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="cancel_stop()">取消</button>
            <button type="button" class="btn btn-primary" v-on:click="confirm_stop()">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  props:['charity_id','event_id','event_type','subid'],
  data () {
    return {
      eventName:  "",
      startTime: "",
      endTime: "",
      appliers: [],
      canceled_appliers: [],
    }
  },
  mounted : function () {
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

      $.post(
        "http://140.113.216.53:8000/getApplierList/",
        { charityID:t.charity_id, eventType: String(t.event_type), eventID: String(t.event_id), subID: "0" },
        // { charityID:String(5), eventType: String(1), eventID: String(32), subID: "0" },
        function (getApplierList_data) {
        //   console.log(t.eventID,t.eventType);
          var applier_list_tmp = [];
          var canceled_appliers_list_tmp = [];
        
          console.log("dddgsdsg",getApplierList_data);
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
          this.appliers = applier_list_tmp;
          this.canceled_appliers = canceled_appliers_list_tmp;
        }
      );
  },
  watch: { 
    subid: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      
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

      $.post(
        "http://140.113.216.53:8000/getApplierList/",
        { charityID:t.charity_id, eventType: String(t.event_type), eventID: String(t.event_id), subID: String(t.subid)},
        // { charityID:String(5), eventType: String(1), eventID: String(32), subID: "0" },
        function (getApplierList_data) {
        //   console.log(t.eventID,t.eventType);
          var applier_list_tmp = [];
          var canceled_appliers_list_tmp = [];
        
          console.log("dddgsdsg",getApplierList_data);
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
          this.appliers = applier_list_tmp;
          this.canceled_appliers = canceled_appliers_list_tmp;
        }
      );
    }
  },
  methods: {
    stop_signing: function () {
    // $('#stop_sign').text('開放報名');
      $('#confirm_stop_signing').modal('show');
    },
    confirm_stop: function () {

      // 確認伺服器成功或失敗
      if (stop_signing_flag == 0) {
        $('#confirm_stop_signing').modal('hide');
        $('#stop_sign').text('開放報名');
        $('#open_for_signing').text('截止報名');
        $('#confirm_stop_modal').html('確定要截止報名 “淨灘活動” 嗎？');
        $('#confirm_stop_modal').html('開放報名');
        $('#open_for_signing').css("color", "red");
        stop_signing_flag = 1;
      }
      else if (stop_signing_flag == 1) {

        $('#confirm_stop_signing').modal('hide');
        $('#stop_sign').text('截止報名');
        $('#open_for_signing').text('開放報名');

        $('#open_for_signing').css("color", "white");
        stop_signing_flag = 0;
      }

    },
    cancel_stop: function (i) {
      $('#confirm_stop_signing').modal('hide');
    },
    delete_event: function (i) {
      $('#confirm_delete_event').modal('show');
    },
    confirm_delete: function () {

      // 確認伺服器成功或失敗
      console.log("刪除活動")
      $('#confirm_delete_event').modal('hide');
      delete_reason = $('#confirm_delete_event_reason').val();
      console.log(delete_reason);
      main_flag = 1;
      // console.log(main_flag);
      $("#info_delete_reason").text(delete_reason);
    },
    cancel_delete: function (i) {
      $('#confirm_stop_signing').modal('hide');
    },

    setReject: function (i) {

      // bus.$emit(,this.applicants,i);
      // console.log(this.applicants[i]);
      appliers_delete_index = i;

      $('#confirm_delete_applicant').modal('show');
      $('.modal-body').html("<span>確定要刪除" +
        this.appliers[i].name + " " +
        this.appliers[i].gender + " " +
        this.appliers[i].birth + "\n " +
        this.appliers[i].phone + " " +
        this.appliers[i].email + " "
        + "嗎？</span>");
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
      for (var prop in this.appliers[0]) {
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
      for (var row_n = 0; row_n < this.appliers.length; row_n++) {
        // console.log("ff", applicants_data.applicants[row_n]);
        var n_row = this.appliers[row_n];
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
      this.generate("dd", "sdsd", t_table);
      
    },
    download_csv: function(){
      console.log("download_csv");
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
              saveAs(blob, "example.docx");
              console.log("Document created successfully");
          });
      }
    
  }
}
</script>

<style>


</style>