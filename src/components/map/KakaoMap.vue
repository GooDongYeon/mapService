<template>
  <div ref="map">
  </div>
</template>

<script>
let kakao = window.kakao
export default {
  props: ['options'],
  data() {
    return {
      mapInstance: null
    }
  },
  watch: {
    'options.level'(cur, prev) {
      console.log(`[LEVEL CHANGD] ${prev} => ${cur}`)
      this.mapInstance.setLevel(cur)
    },
    'options.center'(cur) {
      console.log('[NEW CENTER]', cur.lat, cur.lng)
      this.mapInstance.setCenter(new kakao.maps.LatLng(cur.lat, cur.lng))
    }
  },
  mounted() {
    kakao = kakao || window.kakao
    console.log(this.$refs.map)

    var container = this.$refs.map

    const { center, level } = this.options
    this.mapInstance = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level,  
    })
    // console.log(mapInstance)
  },
}
</script>

<style>
.kmap {
  height: 600px;
}
</style>
