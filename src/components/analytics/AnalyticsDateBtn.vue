<template>
  <div class="analytics-date">
    <button
      class="analytics-date__btn prev"
      @click.prevent="changeNumber(-1)"
    />
    <span class="analytics-date__title">{{ date }}</span>
    <button
      class="analytics-date__btn next"
      @click.prevent="changeNumber(1)"
    />
  </div>
</template>

<script>
export default {
  props: {
    date: {
      default: '',
      type: String
    }
  },
  methods: {
    changeNumber (btn) {
      this.$emit('changeNumber', btn)
    }
  }
}
</script>

<style lang="scss" scoped>
.analytics-date {
  width: 325px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 30px;
  border-bottom: 4px solid $secondary-color;
  &__btn {
    display: block;
    width: 15px;
    height: 15px;
    padding-right: 2px;
    padding-left: 2px;
    background-repeat: no-repeat;
    background-position: center center;
    &.prev {
      background-image: url('../../assets/images/analy_arrow_left.svg');
    }
    &.next {
      background-image: url('../../assets/images/analy_arrow_right.svg');
    }
  }
  &__title {
    margin-right: 15px;
    margin-left: 15px;
    font-size: 20px;
    font-weight: 700;
    color: $secondary-color;
  }
}
</style>
