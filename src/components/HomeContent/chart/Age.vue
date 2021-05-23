
<script>
// import Chart from 'chart.js'
import VueCharts from 'vue-chartjs'
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props:['age_d'],
  watch:{
    age_d:{
        handler: function (newVal, oldVal) {
           console.log('source Prop changed: ', newVal, ' | was: ', oldVal);
          this.renderChart({
            labels: ['0-17','18-24','25-34','35-44','45-54','55-64','65-'],
            datasets: [{
              data: this.age_d,
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
            
          },this.options)
        },
        deep: true

    }
  },
  data () {
    return {
      options: {
         
         responsive: true,
         maintainAspectRatio: false,
         legend: {
          display: false
        },
      }
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    console.log("ddddddddddddddddddddddddddddd",this.age_d);
    //  this.renderChart({
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //   datasets: [
    //     {
    //       label: '',
    //       backgroundColor: '#ffffffff',
    //       data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    //     }
    //   ]
    // })
    this.renderChart({
            labels: ['0-17','18-24','25-34','35-44','45-54','55-64','65-'],
            datasets: [{
              label: '',
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
            
          },this.options)
  }
}
</script>