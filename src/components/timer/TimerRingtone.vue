<template>
  <div
    class="ringtone"
    @click="controlAudioSwitch"
  >
    <audio
      src="audios/Splashing_Around.mp3"
      type="audio/mpeg"
      :autoplay="isPlayAudio"
    />
    <div v-if="isAudioOn">
      <img
        class="ringtone__img"
        src="@/assets/images/ringtone_bell_on.svg"
        alt=""
      >
      <span
        class="ringtone__txt"
      >On</span>
    </div>
    <div v-if="!isAudioOn">
      <img
        class="ringtone__img"
        src="@/assets/images/ringtone_bell_off.svg"
        alt=""
      >
      <span
        class="ringtone__txt--off"
      >Off</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemRingtone',
  // props: {
  //   isPlayAudio: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data () {
    return {
    }
  },
  computed: {
    isAudioOn () {
      return this.$store.state.isAudioOn
    },
    isPlayAudio () {
      return this.$store.state.isPlayAudio
    }
  },
  methods: {
    controlAudioSwitch () {
      this.$store.dispatch('controlAudioSwitch')
    }
  }
}
</script>

<style scoped lang="scss">
// @import '@/assets/scss/helpers/_variables.scss';

.ringtone {
  float: left;
  margin-top: 55px;
  cursor: pointer;
  transition: all .3s;
  &:hover {
    opacity: .6;
  }
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
    &--off {
      font-size: 20px;
      color: $mute-color;
    }
  }
}
</style>
