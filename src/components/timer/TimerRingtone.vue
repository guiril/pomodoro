<template>
  <button
    class="ringtone"
    @click="controlAudioSwitch"
  >
    <div v-if="isAudioOn">
      <img
        class="ringtone__img"
        src="@/assets/images/ringtone_bell_on.svg"
        alt=""
      >
      <span class="ringtone__txt">
        On
      </span>
    </div>
    <div v-if="!isAudioOn">
      <img
        class="ringtone__img"
        src="@/assets/images/ringtone_bell_off.svg"
        alt=""
      >
      <span class="ringtone__txt ringtone__txt--off">
        Off
      </span>
    </div>
  </button>
</template>

<script>
export default {
  data () {
    return {
      audio: null,
      isAudioOn: true
    }
  },
  created () {
    const vm = this

    this.audio = new Audio()
    this.$bus.$on('timesUp', () => {
      vm.timesUp()
    })
  },
  methods: {
    timesUp () {
      if (this.isAudioOn) {
        this.audio.src = 'audios/Splashing_Around.mp3'
        this.audio.load()
        this.audio.play()
      }
    },
    controlAudioSwitch () {
      this.isAudioOn = !this.isAudioOn
      if (!this.isAudioOn) {
        this.audio.pause()
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
    margin-right: 10px;
  }
  &__txt {
    width: 32px;
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
