<template>
  <div>
    <canvas id="visit-chart" width="300" height="300"></canvas>
  </div>
</template>

<script>
import HelperClass from "../services/HelperClass";

export default {
  name: "ChartComponent",
  data() {
    return {
      type: "bar",
      data: {
        labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],

        datasets: [{
          label: 'بازدید از سایت',
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

  created() {
    this.getInitData();
  },
  methods: {
    getInitData() {

    },

    loadChart() {
      let options = {
        type: 'line',
        data: this.data,
        options: this.options,
      }
      HelperClass.loadChart('visit-chart', options)
    },

    async updateData() {
      //serve api here for update this.data and options
    },

    async updateChart() {

      await this.updateData()
      this.loadChart();


    }
  },
  mounted() {
    this.loadChart();
  }
}
</script>

<style scoped>

</style>