<template>
  <main class="mt-5">
    <div class="container">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th></th>
                    <th>제품명</th>
                    <th>제품가격</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(product, i) in productList">
                    <td><img :src="product.path" style="height:50px; width:auto;" /></td>
                    <td>{{product.product_name}}</td>
                    <td>{{product.product_price}}</td>
                    <td>
                        <button type="button" class="btn btn-secondary me-1">사진등록</button>
                        <button type="button" class="btn btn-warning me-1">수정</button>
                        <button type="button" class="btn btn-danger">삭제</button>
                    </td>
                </tr>
            </tbody>
        </table>
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
    getCurrencyFormat(value) {  // $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getProductList() {    // getProductList 메소드 호출
      this.productList = await this.$api("/api/productList2",{});  // url를 따라 app.js의 /api/:alias를 타고 sql productList2의 data 호출
      console.log(this.productList); // 데이터를 잘 받아오는지 확인
    },
    goToDetail(product_id) {  // 제품 이미지 클릭시 제품 상세페이지로 router되도록 설정
      this.$router.push({path:'/detail', query:{product_id:product_id}}); // path중 /detail이 들어가면 product_id를 파라미터로 받아 라우터 시킴
    }
  }
}
</script>