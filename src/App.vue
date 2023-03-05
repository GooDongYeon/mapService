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
        <div class="harbor" v-for="hbr in harbors" :key="hbr.seq" @click="showOnMap(hbr)">
          <h4>{{ hbr.place }}</h4>
        </div>
      </div>
      <KakaoMap class="kmap" :options="mapOption" />
    </div>
  </div>
</template>

<script>
import KakaoMap from './components/map/KakaoMap.vue'
import api from './service/api'
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
      harbors: [], // empty
    }
  },
  mounted() {
    api.harbor.all((res) => {
      console.log("[삼정타워]", res.harbors);
      this.harbors = res.harbors;
    })
    // let kakao = window.kakao
    // console.log(this.$refs.map) // should be not null

    // var container = this.$refs.map //지도를 담을 영역의 DOM 레퍼런스
    // var options = { //지도를 생성할 때 필요한 기본 옵션
    //   center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    //   level: 6 //지도의 레벨(확대, 축소 정도)
    // }

    // var mapInstance = new kakao.maps.Map(container, options) //지도 생성 및 객체 리턴
    // console.log(mapInstance)
  },
  methods: {
    zoom(delta) { //delta is 1 or -1
      // console.log('[delta]', delta)
      const level = Math.max(3, this.mapOption.level + delta) // min level 3
      this.mapOption.level = level
      console.log(this.mapOption.level)
    },
    showOnMap(harbor) {
      console.log('[center]', harbor);
      this.mapOption.center = {
        lat: harbor.lat,
        lng: harbor.lng,
      }
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

.harbors .harbor {
  padding: 10px;
  border: 1px solid transparent;
}
.harbors .harbor:hover {
  background-color: aliceblue;
  border-color: #6a9dff;
  cursor: pointer;
}
.harbors .harbor:active {
  background-color: rgb(166, 197, 224);
  border-color: #4471c5;
  cursor: pointer;
}
.harbors .harbor h4 {
  margin: 0;
}
</style>

