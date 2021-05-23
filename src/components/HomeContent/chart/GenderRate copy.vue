<template>
  <div>
    <canvas id="gender_rate"></canvas>
  </div>
</template>

<script>
// import Chart from 'chart.js'
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'

export default {
  name: 'GenderRate',
  props:['gender_r'],
  data() {
    return {
      // planetChartData: {
      //   type: 'pie',
      //   data:{
      //     labels: ["男", "女", "其他"],
      //     datasets: [{
      //       data: this.grate,
      //       backgroundColor: [
      //         'rgba(54, 162, 235)',
      //         'rgba(255, 99, 132)',
      //         'rgba(255, 206, 86)',
      //       ],
      //       borderWidth: 1
      //     }]
      //   },
      //   options: {},
      // },
      // canv:Object

    }
  },
  mounted() {
    const ctx = document.getElementById('gender_rate');
    this.canv = new Chart(ctx, this.planetChartData);
    console.log("dsf",this.grate);
    this.canv.update();
  },
  watch: { 
    Gender: function(newVal, oldVal) { // watch it
      console.log('gender Prop changed: ', newVal, ' | was: ', oldVal);

      this.canv.update();
    }
  },
}
</script>