
<script>
// import Chart from 'chart.js'
import VueCharts from 'vue-chartjs'
import { Bar, Line, Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props:['gender_r'],
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