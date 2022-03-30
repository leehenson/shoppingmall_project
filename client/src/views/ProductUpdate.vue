<template>
  <main class="mt-3">
        <div class="container">
            <h2 class="text-center mb-3">제품 수정</h2>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품명</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="productDetail.product_name">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 가격</label>
                <div class="col-md-9">
                  <div class="input-group">
                    <input type="number" class="form-control" v-model="productDetail.product_price">
                    <span class="input-group-text">원</span>
                  </div>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 설명</label>
                <div class="col-md-9">
                  <textarea class="form-control" rows="3" v-model="productDetail.product_description"></textarea>                  
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">색상</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="productDetail.product_color">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">소재</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="productDetail.product_fabric">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">모델 착용</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="productDetail.product_model">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">사이즈</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="productDetail.product_size">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">사이즈 가이드</label>
                <div class="col-md-9">
                  <textarea class="form-control" rows="3" v-model="productDetail.product_sizeGuide"></textarea>               
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 카테고리</label>
                <div class="col-md-9">
                  <select class="form-select">
                      <option>OUTER</option>
                      <option>TOP</option>
                      <option>BOTTOM</option>
                      <option>ACC</option>
                  </select>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">태그</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="productDetail.tags">
                </div>
            </div>                   
            <div class="mb-3 row">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="col-6 d-grid p-1">
                        <button type="button" class="btn btn-lg btn-outline-secondary" @click="goToList">취소하기</button>
                    </div>
                    <div class="col-6 d-grid p-1">
                        <button type="button" class="btn btn-lg btn-outline-secondary">저장하기</button>
                    </div>
                  </div>
            </div>
        </div>
      </main>
</template>
<script>
export default {
    data() {  // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      productId: 0,
      productDetail: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.user;  // user 정보가 바뀔 때마다 자동으로 user() 갱신
    }
  },
  mounted() {
    if(this.user.email == undefined) {  // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({path:'/'});
    }
  },
  created() {     // data가 정상적으로 들어오는지 확인
    this.productId = this.$route.query.product_id;  // path에 있는 product_id 값을 불러옴
    this.getProductDetail();
  },
  methods: {
    goToList() {
      this.$router.push({path:'/sales'});
    },
    async getProductDetail() {    // getProductDetail 메소드 호출
      let productDetail = await this.$api("/api/productDetail",{param:[this.productId]});  // url를 따라 app.js의 /api/:alias를 타고 productId의 파라미터를 받아 해당 sql productDatail의 data 호출
      if (productDetail.length > 0) { // productDetail의 데이터를 가져왔을 때
        this.productDetail = productDetail[0];  // productDetail의 첫번째만 가져옴
      }
    }
  }
}
</script>