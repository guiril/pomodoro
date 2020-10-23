<template>
  <div>
    <component
      :is="currentViews"
      :class="{
        'animated fadeIn': currentViews === 'breakInit',
        'animated bounceIn': currentViews === 'breakStop'
      }"
      @stop-break="currentViews = 'breakStop'"
    />
  </div>
</template>

<script>
import breakInit from '@/components/timer/timer-break/breakInit'
import breakStop from '@/components/timer/timer-break/breakStop'

export default {
  components: {
    breakInit,
    breakStop
  },
  data () {
    return {
      currentViews: 'breakInit'
    }
  }
}
</script>
