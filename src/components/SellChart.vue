<template>
  <div id="sell-section-chart">

        <canvas id="vip-sell-chart" width="300" height="300"></canvas>

        <canvas id="vip-sell-count-chart" width="300" height="300"></canvas>

  </div>
</template>

<script>
import HelperClass from "../services/HelperClass";

export default {
  name: "ChartComponent",

  props: ["chartData"],
  data() {
    return {
  
      sellData: {},
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
      let sellOptions = {
        type: "line",
        data: this.sellData,
        options: this.options,
      };

      let sellCountOption = {
        type: "line",
        data: this.countData,
        options: this.options,
      };

      HelperClass.loadChart("vip-sell-chart", sellOptions);

      HelperClass.loadChart("vip-sell-count-chart", sellCountOption);
    },
  },
  watch: {
    chartData() {
      let updatedData = this.chartData;

      this.sellData = {
        labels: updatedData.labels,
        datasets: [
          {
            label: "فروش دوره",
            data: updatedData.data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };

      this.countData = {
        labels: updatedData.labels,
        datasets: [
          {
            label: "دوره تعداد فروش",
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
