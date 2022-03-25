<template>
  <main class="mt-3">
        <div class="container">
            <h2 class="text-center mb-3">제품 이미지 등록</h2>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 ID</label>
                <div class="col-md-9">
                  {{productId}}
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품명</label>
                <div class="col-md-9">
                  {{productDetail.product_name}}
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">썸네일 이미지</label>
                <div class="col-md-9">
                    <input class="form-control" type="file" accept="image/png, image/jpeg">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 이미지</label>
                <div class="col-md-9">
                    <input class="form-control" type="file" accept="image/png, image/jpeg" multiple>
                </div>
            </div>
            <div class="mb-3 row">
              <label class="col-md-3 col-form-label">제품 설명 이미지</label>
              <div class="col-md-9">
                  <input class="form-control" type="file" accept="image/png, image/jpeg" multiple>
              </div>
            </div>
            <div class="mb-3 row">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="col-6 d-grid p-1">
                        <button type="button" class="btn btn-lg btn-outline-primary" @click="goToList">취소하기</button>
                    </div>
                    <div class="col-6 d-grid p-1">
                        <button type="button" class="btn btn-lg btn-outline-primary">저장하기</button>
                    </div>
                  </div>
            </div>
        </div>
      </main>
</template>
<script>
export default {
    data() {
        return {
            productId: 0,
            productName: "",
            productDetail: {},
            productImage: []
        };
    },
  computed: {
    user() {
      return this.$store.state.user;  // user 정보가 바뀔 때마다 자동으로 user() 갱신
    }
  },
  created() {     // data가 정상적으로 들어오는지 확인
    this.productId = this.$route.query.product_id;  // path에 있는 product_id 값을 불러옴
    this.getProductDetail();
    this.getProductImage();
  },
  mounted() {
    if(this.user.email == undefined) {  // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({path:'/'});
    }
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
    },
    async getProductImage() {    // getProductImage 메소드 호출
      this.productImage = await this.$api("/api/productMainImages",{param:[this.productId]});  // url를 따라 app.js의 /api/:alias를 타고 productId의 파라미터를 받아 해당 sql productMainImages의 data 호출
      console.log('this.productImage',this.productImage)
    }
  }
}
</script>