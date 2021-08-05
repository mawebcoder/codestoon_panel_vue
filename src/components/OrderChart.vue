<template>
  <div>
    <canvas id="order-chart" width="300" height="300"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
  name: "ChartComponent",
  data(){
    return {
      type: "bar",
      data: {
        labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],

        datasets: [{
          label: 'تعداد بازدید از سایت',
          data: [0, 20, 11, 45, 32, 55, 98],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 25
              }
            }
          ]
        }
      }
    }
  },
  mounted() {
    const ctx = document.getElementById('order-chart');
    new Chart(ctx, {
      type: 'line',
      data: this.data,
      options: this.options,
    });
  }
}
</script>

<style scoped>

</style>