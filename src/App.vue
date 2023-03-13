<template>
  <div>
    <h3>kakao map demo(center, level)</h3>
    <div class="controll">
      <button @click="zoom(1)">
        <i class="fa-solid fa-plus"></i>
      </button>
      <button @click="zoom(-1)">
        <i class="fa-solid fa-minus"></i>
      </button>
    </div>

    <div class="map-area">
      <div class="harbors">
        <div
          v-for="hbr in harbors"
          :key="hbr.seq"
          class="harbor"
          :class="{ active: hbr === activeHarbor }"
          @click="showOnMap(hbr)">
          <h4>{{ hbr.place }}</h4>
        </div>
      </div>

      <KakaoMap
        ref="kmap"
        class="kmap"
        :options="mapOption" />
      <div
        ref="harborOverlay"
        slot="overlay"
        class="overlay-popup">
        <h3>오버레이 화면</h3>
        <div>이곳에 정보를 표시함</div>
      </div>
    </div>
  </div>
</template>

<script>
import KakaoMap from './components/map/KakaoMap.vue'
import api from './service/api'
import MarkerHandler from './components/map/marker-handler'
import KakaoOverlay from './components/map/overlay'

export default {
  components: {
    KakaoMap,
  },
  data() {
    return {
      mapOption: {
        center: {
          lat: 35.1795543,
          lng: 129.0756416,
        },
        level: 8,
      },
      harbors: [], // emptyt
      markers: null, // marker handler
      activeHarbor: null,
      mapInstance: null
    }
  },
  mounted() {
    const vueKakaoMap = this.$refs.kmap

    this.markers = new MarkerHandler(vueKakaoMap, {
      markerClicked: (harbor) => {
        console.log('[clicked]', harbor)
        this.activeHarbor = harbor
      }
    })
    
    api.harbor.all((res) => {
      console.log('[부산광역시]', res.harbors)
      this.harbors = res.harbors

      // create markers
      this.markers.add(this.harbors, (harbor) => {
        return {
          lat: harbor.lat, lng: harbor.lng
        }
      })
    })
  },
  methods: {
    zoom(delta) { //delta is 1 or -1
      const level = Math.max(3, this.mapOption.level + delta) // min level 3
      this.mapOption.level = level
      console.log(this.mapOption.level)
    },
    showOnMap(harbor) {
      console.log('[center]', harbor)
      this.mapOption.center = {
        lat: harbor.lat,
        lng: harbor.lng,
      }
      this.mapOption.level = 3
    },
    closeOverlay() {
      this.overlay.hide()
    }
  }
}
</script>
  
<style>
button {
  border: 1px solid transparent;
  padding: 6px;
  background-color: #efefefdd;
  border-radius: 6px;
}

button:hover {
  background-color: #ddd;
  border-color: #ddd;
  cursor: pointer;
}

button:active {
  background-color: #aaa;
  border-color: #aaa;
}

.map-area {
  display: flex;
}

.kmap {
  flex: 1 1 auto;
}

.map-area .harbors .harbor {
  padding: 10px;
  border: 1px solid transparent;
}

.map-area .harbors .harbor:hover {
  background-color: aliceblue;
  border-color: #6a9dff;
  cursor: pointer;
}

.map-area .harbors .harbor:active {
  background-color: rgb(166, 197, 224);
  border-color: #4471c5;
  cursor: pointer;
}

.map-area .harbors .harbor h4 {
  margin: 0;
}

.kmap {
  flex: 1 1 auto;
}

.kmap .overlay-popup {
  background-color: #ffffffcc;
  box-shadow: 0 0 8px #0000004d;
}
</style>

