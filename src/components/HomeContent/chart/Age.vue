
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
                'rgba(255,99,132,0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 80, 235,0.2)',
                'rgba(120, 255, 86,0.2)',
                'rgba(255, 80, 90,0.2)',
                'rgba(44, 159, 64,0.2)',
                'rgba(75,88, 192, 0.2)',
                'rgba(54,255, 235, 0.2)',

            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 80, 235,1)',
                'rgba(120, 255, 86,1)',
                'rgba(255, 80, 90,1)',
                'rgba(44, 159, 64,1)',
                'rgba(75,88, 192, 1)',
                'rgba(54,255, 235, 1)',

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
        scales: {
            yAxes: [{
            ticks: {
              min: 0,
            //   max: parseInt(this.$props.age_d),
              stepSize: 1,
              reverse: false,
              beginAtZero: true
            }
          }]
        }
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
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',

            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',

            ],
              borderWidth: 1
            }]
            
          },this.options)
  }
}
</script>