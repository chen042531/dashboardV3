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
        type: 'bar',
        data: {
            labels: ['一月', '二月', '三月'],
            datasets: [{
            label: '銷售業績(百萬)',
            data: [60, 49, 72]
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