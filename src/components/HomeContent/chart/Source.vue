<template>
  <div>
    <canvas id="Source"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'


export default {
  name: 'Source',
  props:['Source'],
  data() {
    return {
      planetChartData: {
        type: 'pie',
        data: {
                labels: ["公益趴趴GO App 首頁活動列表", "公益趴趴GO App 官方粉絲團 (FB, IG)", "合作公益單位官網", 
                "合作公益單位廣告文宣", "搜尋引擎 (Google, Yahoo, Bing, ...)", "學校推廣", "親朋好友告知", "其他"],
                datasets: [{
                data: this.Source,
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
            },
            labels: {
                boxWidth: 20,
            },
            options: {
                legend: {
                display: true,
                // position: 'bottom',
                },

            }
        }
    }
  },
  mounted() {
    const ctx = document.getElementById('Source');
    new Chart(ctx, this.planetChartData);
    // console.log("dsf",this.Gender);
  },
  watch: { 
    Gender: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);

     
    }
  },
}
</script>