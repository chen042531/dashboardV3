
<script>
// import Chart from 'chart.js'
import VueCharts from 'vue-chartjs'
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props:['source_s'],
  watch:{
    source_s:{
        handler: function (newVal, oldVal) {
           console.log('source Prop changed: ', newVal, ' | was: ', oldVal);
          this.renderChart({
            labels: ["公益趴趴GO App 首頁活動列表",
              "公益趴趴GO App 官方粉絲團 (FB, IG)",
              "合作公益單位官網", "合作公益單位廣告文宣",
              "搜尋引擎 (Google, Yahoo, Bing, ...)",
              "學校推廣", "親朋好友告知", "其他"],
            datasets: [{
              data: this.source_s,
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
            
          })
        },
        deep: true

    }
  },
  data () {
    return {
      options: {
         responsive: true,
         maintainAspectRatio: false
      }
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    console.log("ddddddddddddddddddddddddddddd",this.source_s);
    this.renderChart({
            labels: ["公益趴趴GO App 首頁活動列表",
              "公益趴趴GO App 官方粉絲團 (FB, IG)",
              "合作公益單位官網", "合作公益單位廣告文宣",
              "搜尋引擎 (Google, Yahoo, Bing, ...)",
              "學校推廣", "親朋好友告知", "其他"],
            datasets: [{
              data: this.source_s,
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
            
          })
  }
}
</script>