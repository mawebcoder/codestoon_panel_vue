<template>
  <div>
    <canvas id="register-user-chart" width="300" height="300"></canvas>
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
          label: 'چارت ثبت نام کاربران',
          data: [0, 32, 11, 101, 43, 21, 40],
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
    const ctx = document.getElementById('register-user-chart');
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