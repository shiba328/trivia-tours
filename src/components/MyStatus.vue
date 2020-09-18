<template lang="pug">
  g#status(v-if="status.length")
    text(x="0" y="35" font-family="Verdana" font-size="20")
      tspan 現在
      tspan {{ format.countPlay }}
      tspan 問目
    text(x="0" y="70" font-family="Verdana" font-size="20")
      tspan {{ format.countAns }}
      tspan 問正解
    text(x="0" y="105" font-family="Verdana" font-size="20")
      tspan {{ format.totalProg }}
      tspan 秒
      tspan 癒やされた
</template>

<script>
export default {
  props: {
    status: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      format: null
    }
  },
  watch: {
    status (arr) {
      if (arr.length) {
        this.format = {
          countPlay: this.getPlay(arr), // 回答数
          countAns: this.getAns(arr), // 正解数
          totalProg: this.getProg(arr) // 総合経過時間
        }
      }
    }
  },
  methods: {
    // 回答数
    getPlay (arr) {
      return arr.length
    },
    // 正解数
    getAns (arr) {
      const resAns = arr.map(v => v.anser)
      const res = resAns.filter(v => v === true).length
      return res
    },
    // 総合経過時間
    getProg (arr) {
      const resProg = arr.map(v => v.progTime)
      const res = resProg.reduce((prev, current) => prev + current)
      return res
    }
  }
}
</script>
