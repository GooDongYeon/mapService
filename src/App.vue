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
        <div v-if="overlayHarber">
          <h3>{{ overlayHarber.place }}</h3>
          <div class="addr">
            {{ overlayHarber.addr }}
          </div>
          <a
            href="#"
            class="close"
            @click.prevent="closeOverlay()">
            <span><i class="fa-solid fa-xmark"></i></span>
          </a>
        </div>
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
      mapInstance: null,
      overlay: null,
      overlayHarber: null
    }
  },
  mounted() {
    const vueKakaoMap = this.$refs.kmap

    this.markers = new MarkerHandler(vueKakaoMap, {
      markerClicked: (harbor) => {
        console.log('[clicked]', harbor)
        this.mapOption.level = 3
        this.showOnMap(harbor)

        // 마커 클릭 시
        this.overlay.showAt(harbor.lat, harbor.lng)
        this.overlayHarber = harbor
      },
    })

    this.overlay = new KakaoOverlay(vueKakaoMap, this.$refs.harborOverlay)

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
      this.mapOption.level = 6
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

button:hover:active {
  background-color: #aaa;
  border-color: #aaa;
}

.map-area {
  display: flex;
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
}
.map-area .harbors .harbor .active {
  background-color: rgb(253, 229, 150);
  border-color: rgb(211, 173, 3);
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
  max-width: 200px;
  min-width: 160px;
  position: absolute;
  bottom: 44px;
  left: 50%;
  transform: translateX(-50%);
}

.kmap .overlay-popup h3 {
  margin: 0;
  padding: 8px;
  padding-right: 24px;
  background-color: lightskyblue;
  color: white;
  font-weight: 400;
  font-size: 16px;
}

.addr {
  padding: 8px;
  white-space: break-spaces;
}

.close {
  color: black;
  position: absolute;
  top: 0;
  left: 100%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 100%;
  line-height: 0;
  padding: 6px;
  box-shadow: 0 0 6px #0000004d;
}
</style>

