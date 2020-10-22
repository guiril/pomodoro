<template>
  <div>
    <div class="ringtone">
      <img
        class="ringtone__img"
        src="../assets/images/ringtone_bell_on.svg"
        alt=""
      >
      <span class="ringtone__txt">On</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemRingtone'
}
</script>

<style scoped lang="scss">
// @import '../assets/scss/helpers/vairables';

.ringtone {
  float: left;
  margin-top: 55px;
  &__img {
    display: inline-block;
    vertical-align: bottom;
    margin-right: 10px;
  }
  &__txt {
    display: inline-block;
    vertical-align: bottom;
    font-size: 20px;
    color: $secondary-color;
  }
}
</style>
