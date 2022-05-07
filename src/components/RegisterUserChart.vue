<template>
  <div id="sell-section-chart">
    <canvas id="vip-sell-count-chart"></canvas>
  </div>
</template>

<script>
import HelperClass from "../services/HelperClass";

export default {
  name: "ChartComponent",

  props: ["chartData"],
  data() {
    return {
      countData: {},
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 25,
              },
            },
          ],
        },
      },
    };
  },

  methods: {
    loadChart() {
      let sellCountOption = {
        type: "line",
        data: this.countData,
        options: this.options,
      };

      HelperClass.loadChart("vip-sell-count-chart", sellCountOption);
    },
  },
  watch: {
    chartData() {
      let updatedData = this.chartData;

      this.countData = {
        labels: updatedData.labels,
        datasets: [
          {
            label: "کاربران ثبت نامی",
            data: updatedData.countData,
            fill: false,
            borderColor: "red",
            tension: 0.1,
          },
        ],
      };

      this.loadChart();
    },
  },
  mounted() {
    this.loadChart();
  },
};
</script>

<style scoped></style>
