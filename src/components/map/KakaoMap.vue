<template>
  <div ref="map">
  </div>
</template>

<script>
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
  },
  mounted() {
    let kakao = window.kakao
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
  width: 100%;
  height: 600px;
}
</style>
