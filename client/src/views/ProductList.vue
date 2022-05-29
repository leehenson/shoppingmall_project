<template>
  <main class="mt-5">
    <div class="container">
      <div v-if="productList == 0" class="row">
        <h5 class="m-4">등록된 상품이 없습니다.</h5>
      </div>
      <div v-else class="row">
        <div
          class="col-xl-3 col-lg-4 col-md-6"
          :key="i"
          v-for="(product, i) in productList"
        >
          <div class="card text-start" style="width: 18rem; border: 0px">
            <a @click="goToDetail(product.id)" style="cursor: pointer"
              ><img
                :src="`/download/${product.id}/${product.path}`"
                class="card-img-top"
                alt="..."
            /></a>
            <div class="card-body">
              <h5 class="card-title">{{ product.product_name }}</h5>
              <p class="card-text">
                {{ getCurrencyFormat(product.product_price) }}원
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      productList: [],
    };
  },
  created() {
    this.getProductList(); // created 단계에서 getProductList를 실행시켜 data 미리 호출
  },
  methods: {
    // 메소드 호출
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getProductList() {
      // getProductList 메소드 호출
      this.productList = await this.$api("/api/productList", {}); // url를 따라 app.js의 /api/:alias를 타고 sql productList의 data 호출
      console.log(this.productList); // 데이터를 잘 받아오는지 확인
    },
    goToDetail(product_id) {
      // 제품 이미지 클릭시 product_id를 받아 제품 상세페이지로 router되도록 설정
      this.$router.push({ path: "/detail", query: { product_id: product_id } }); // path중 /detail이 들어가면 product_id를 파라미터로 받아 라우터 시킴
    },
  },
};
</script>