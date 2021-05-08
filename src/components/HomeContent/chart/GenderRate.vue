<template>
  <div>
    <canvas id="gender_rate"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'


export default {
  name: 'GenderRate',
  props:['Gender'],
  data() {
    return {
      planetChartData: {
        type: 'pie',
        data:{
          labels: ["男", "女", "其他"],
          datasets: [{
            data: this.Gender,
            backgroundColor: [
              'rgba(54, 162, 235)',
              'rgba(255, 99, 132)',
              'rgba(255, 206, 86)',
            ],
            borderWidth: 1
          }]
        },
        options: {},
        }
    }
  },
  mounted() {
    const ctx = document.getElementById('gender_rate');
    new Chart(ctx, this.planetChartData);
    console.log("dsf",this.Gender);
  },
  watch: { 
    Gender: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);

     
    }
  },
}
</script>