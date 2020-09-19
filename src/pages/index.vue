<template lang="pug">
  v-app(
    v-if="mapWidth && mapHeight"
    :style="{width: `${mapWidth}px`, height: `${mapHeight}px`}"
  )
    svg(
      :viewBox="`0 0 ${mapWidth} ${mapHeight}`"
    )
      JapanMapRect(
        :style="centerMiddle({cw: mapWidth, ch: mapHeight, tw: 450, th: 340})"
      )
      SetPoint(
        :points="points"
        @emitPoint="openWindow"
        :style="centerMiddle({cw: mapWidth, ch: mapHeight, tw: 450, th: 340})"
      )
      MyStatus(
        :status="myStatus"
        :style="centerMiddle({cw: mapWidth, ch: mapHeight, tw: 450, th: 340})"
      )
    FrontPanel()
    OpenDialog(
      ref="dialog"
      @emitMyStatus="setMyStatus"
    )
    v-btn(
      small
      style="position: absolute;"
      @click="removeMyStatus"
    ) データの削除
</template>

<script>
import JapanMapRect from '~/components/JapanMapRect.vue'
import SetPoint from '~/components/SetPoint.vue'
import OpenDialog from '~/components/OpenDialog.vue'
import MyStatus from '~/components/MyStatus.vue'
import FrontPanel from '~/components/FrontPanel.vue'

const posts = [
  {
    id: 1,
    label: '# ここはどこ?\n私はだれ？',
    src: 'https://dummyimage.com/1000x600',
    items: ['香川', '沖縄', '北海道'],
    correct: 1,
    ex: '#ここは沖縄\nきっとうみ\n[購入](https://example.com)[応募](https://example.com)',
    point: 10,
    countdown: 100
  },
  {
    id: 2,
    label: '# ここはどこ?\n私はだれ？',
    src: 'https://dummyimage.com/1000x600',
    items: ['香川', '沖縄', '北海道'],
    correct: 0,
    ex: '#ここは香川\nきっとうみ\n[購入](https://example.com)[応募](https://example.com)',
    point: 10,
    countdown: 100
  },
  {
    id: 3,
    label: '# ここはどこ?\n私はだれ？',
    src: 'https://dummyimage.com/1000x600',
    items: ['香川', '沖縄', '鳥取'],
    correct: 2,
    ex: '#ここは鳥取\nきっとうみ\n[購入](https://example.com)[応募](https://example.com)',
    point: 10,
    countdown: 100
  },
  {
    id: 4,
    label: '# ここはどこ?\n私はだれ？',
    src: 'https://dummyimage.com/1000x600',
    items: ['香川', '秋田', '鳥取'],
    correct: 1,
    ex: '#ここは秋田\nきっとうみ\n[購入](https://example.com)[応募](https://example.com)',
    point: 10,
    countdown: 100
  }
]

const points = [
  {
    x: 0,
    y: 300
  },
  {
    x: 140,
    y: 300
  },
  {
    x: 150,
    y: 230
  },
  {
    x: 310,
    y: 120
  }
]

export default {
  components: {
    JapanMapRect,
    SetPoint,
    OpenDialog,
    MyStatus,
    FrontPanel
  },
  data () {
    return {
      points,
      posts,
      mapWidth: '',
      mapHeight: '',
      myStatus: []
    }
  },
  beforeMount () {
    this.getWindow()
  },
  mounted () {
    this.windowResize()
    this.getMyStatus()
  },
  methods: {
    // 問題Dialogを開く
    openWindow (i) {
      this.$refs.dialog.open(this.posts[i])
    },
    // windowリサイズ
    windowResize () {
      let resizeTimer
      window.addEventListener('resize', () => {
        // リサイズ時に行う処理
        if (!resizeTimer) {
          clearTimeout(resizeTimer)
        }
        resizeTimer = setTimeout(() => {
          this.getWindow()
        }, 1000)
      }, false)
    },
    getWindow () {
      this.mapWidth = document.documentElement.clientWidth
      this.mapHeight = document.documentElement.clientHeight
    },
    // 天地中央
    centerMiddle (obj) {
      return {
        transform: `translate(${obj.cw / 2 - obj.tw / 2}px, ${obj.ch / 2 - obj.th / 2}px)`
      }
    },
    // Status保存
    getMyStatus () {
      // LSから取得
      const ls = localStorage.getItem('trikin')
      if (ls) {
        const arr = JSON.parse(ls)
        this.myStatus = arr
      }
    },
    setMyStatus (obj) {
      this.myStatus.push(obj)
      const jsonStr = JSON.stringify(this.myStatus)
      localStorage.setItem('trikin', jsonStr)
    },
    removeMyStatus () {
      localStorage.removeItem('trikin')
      this.myStatus = []
    }
  }
}
</script>
<style>
html,
body {
  overflow: hidden;
}
</style>
