
<script>
// import Chart from 'chart.js'
import VueCharts from 'vue-chartjs'
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props:['gender_r'],
  watch:{
    gender_r:{
        handler: function (newVal, oldVal) {
           console.log('gender Prop changed: ', newVal, ' | was: ', oldVal);
          this.renderChart({
            labels: ["男", "女", "其他"],
            datasets: [{
                    data:  this.gender_r,
                    backgroundColor: [
                      'rgba(54, 162, 235)',
                      'rgba(255, 99, 132)',
                      'rgba(255, 206, 86)',
                    ],
                    borderWidth: 1
                  }]
          })
          // },this.options)
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
    console.log("ddddddddddddddddddddddddddddd",this.gender_r);
    this.renderChart({
      labels: ["男", "女", "其他"],
      datasets: [{
              data:  this.gender_r,
              backgroundColor: [
                'rgba(54, 162, 235)',
                'rgba(255, 99, 132)',
                'rgba(255, 206, 86)',
              ],
              borderWidth: 1
            }]
      
    })
  }
}
</script>