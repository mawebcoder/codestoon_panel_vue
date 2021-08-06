<template>
  <div>
    <div class="timer row">
      <div class="days col-1"></div>
      <div class="hours col-1"></div>
      <div class="minutes col-1"></div>
      <div class="col-1 divider">:</div>
      <div class="seconds col-1"></div>
    </div>
  </div>
</template>

<script>
import timer from "../Plugins/timer";

export default {
  name: "CountDown",

  mounted() {
    timer.init({
      // element, date, callback = null
      element: '.timer',
      callback: () => {
        this.$store.state.show_resend_code_button = true
      },
      date: localStorage.getItem('code_expire_date')
    })

  }
}

</script>

<style scoped lang="scss">
.days, .hours {
  display: none;
}

.timer {
  direction: ltr;
}

.divider {
  text-align: center;
}

.seconds {
  text-align: left;
}
</style>