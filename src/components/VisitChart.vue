<template>
  <div>
    <canvas id="visit-chart" width="300" height="300"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: "ChartComponent",
  data() {
    return {
      type: "bar",
      data: {
        labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],

        datasets: [{
          label: 'تعداد بازدید از سایت',
          data: [0, 59, 80, 81, 56, 55, 200],
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
    const ctx = document.getElementById('visit-chart');
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