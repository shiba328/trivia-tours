<template lang="pug">
  v-dialog(
    v-if="obj.label"
    v-model="dialog"
    persistent
  )
    v-card(flat style="overflow:hidden")
      v-img(
        :src="obj.src"
        aspect-ratio="2"
        contain
      )
        v-row.fill-height(
          align="end"
          justify="center"
        )
          div
            div.countdown(
              class="text-center"
            )
              span.pre 残り
              span {{ AnserCountdown }}
              span.sif 秒
            div.label(
              class="text-center"
              v-html="formatTitle(obj.label)"
            )
            div.anser(
              class="text-center"
            )
              span(v-if="anser == 1") 正解
              span(v-if="anser == 0") 不正解
            v-row
              v-col(
                v-for="item, i in obj.items"
                class="text-center"
              )
                v-btn(
                  @click="onClick(i)"
                  :disabled="disabled"
                )
                  span {{ item }}
                  span(v-if="myChoice === i") ○
</template>

<script>
import MarkdownIt from 'markdown-it'
export default {
  data () {
    return {
      dialog: false,
      obj: {},
      anser: null,
      myChoice: null,
      myRestTime: null,
      myProgTime: null,
      AnserCountdown: 0,
      CloseCountdown: 3,
      anserTimer: null,
      closeTimer: null,
      disabled: false
    }
  },
  watch: {
    AnserCountdown (v) {
      //
      if (v <= 0) {
        this.AnserCountStop()
        this.close()
      }
    },
    CloseCountdown (v) {
      //
      if (v <= 0) {
        this.CloseCountStop()
        this.close()
      }
    }
  },
  methods: {
    close () {
      this.dialog = false
    },
    open (obj) {
      // 初期化
      this.AnserCountdown = obj.countdown
      this.CloseCountdown = 3
      this.myRestTime = null
      this.myProgTime = null
      this.disabled = false
      this.anser = null
      this.myChoice = null
      this.obj = obj
      this.dialog = true
      // 回答時間カウントダウン開始
      this.AnserCountStart()
    },
    // 問題のフォーマット
    formatTitle (str) {
      const md = new MarkdownIt({
        breaks: true
      })
      return md.render(str)
    },
    // 選択時
    onClick (i) {
      // 解答
      this.AnserCountStop() // カウントを止める
      this.myRestTime = this.AnserCountdown // 回答残り時間を追加
      this.myProgTime = this.obj.countdown - this.AnserCountdown // 経過時間
      this.disabled = true // 選択肢の非活性
      this.myChoice = i // 選択
      this.CloseCountStart() // Dialogを閉じる
      if (this.obj.correct === i) {
        // 正解
        this.correct()
      } else {
        // 不正解
        this.incorrect()
      }
    },
    // 解答時間のカウント
    AnserCountStart () {
      this.anserTimer = setInterval(() => {
        this.AnserCountdown--
      }, 1000)
    },
    AnserCountStop () {
      clearInterval(this.anserTimer)
    },
    // DialogCloseのカウント
    CloseCountStart () {
      this.closeTimer = setInterval(() => {
        this.CloseCountdown--
      }, 1000)
    },
    CloseCountStop () {
      clearInterval(this.closeTimer)
    },
    // 正解不正解
    correct () {
      this.anser = true
      this.emitMyStatus()
    },
    incorrect () {
      this.anser = false
      this.emitMyStatus()
    },
    // 親に送るデータ
    emitMyStatus () {
      this.$emit('emitMyStatus', {
        id: this.obj.id, // 設問ID
        myChoice: this.myChoice, // 選択
        anser: this.anser, // 正解不正解
        restTime: this.myRestTime, // 回答時間
        progTime: this.myProgTime // 経過時間
      })
    }
  }
}
</script>
