<template>
  <main class="mt-5">
    <div class="container">
      <div class="row">
        <div class="col-xl-3 col-lg-4 col-md-6" :key="i" v-for="(product, i) in productList">
          <div class="card" style="width: 18rem;">
            <a href="/product_detail.html"><img :src="product.path" class="card-img-top" alt="..."></a>
            <div class="card-body">
              <h5 class="card-title">{{product.product_name}}</h5>
              <p class="card-text">{{product.product_price}}원</p>
            </div>
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
      productList: []
    };
  },
  created() {     // data가 정상적으로 들어오는지 확인
    this.getProductList();
  },
  methods: {      // 메소드 호출
    async getProductList() {    // getProductList 메소드 호출
      this.productList = await this.$api("/api/productList",{});  // url를 따라 app.js의 /api/:alias를 타고 sql productList의 data 호출
      console.log(this.productList); // 데이터를 잘 받아오는지 확인
    }
  }
}
</script>