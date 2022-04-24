<template>
  <main class="mt-5">
    <div class="container">
        <div class="float-end mb-2">
            <button type="button" class="btn btn-outline-dark" @click="goToInsert">제품등록</button>
        </div>
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
                    <td><img :src="`/download/${product.id}/${product.path}`" style="height:50px; width:auto;" /></td>
                    <td>{{product.product_name}}</td>
                    <td>{{getCurrencyFormat(product.product_price)}}</td>
                    <td>
                        <button type="button" class="btn btn-outline-secondary me-1" @click="goToImageInsert(product.id);">사진등록</button>
                        <button type="button" class="btn btn-outline-success me-1" @click="goToUpdate(product.id);">수정</button>
                        <button type="button" class="btn btn-outline-danger" @click="deleteProduct(product.id);">삭제</button>
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
    goToInsert() {
      this.$router.push({path:'/create'});
    },
    goToDetail(product_id) {  // 제품 이미지 클릭시 제품 상세페이지로 router되도록 설정
      this.$router.push({path:'/detail', query:{product_id:product_id}}); // path중 /detail이 들어가면 product_id를 파라미터로 받아 라우터 시킴
    },
    goToUpdate(product_id) {
      this.$router.push({path:'/update', query:{product_id:product_id}});
    },
    goToImageInsert(product_id) {
      this.$router.push({path:'/image_insert', query:{product_id:product_id}});
    },
    deleteProduct(product_id) {
      this.$swal.fire({
        title: '정말 삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: 'DELETE',
        cancelButtonText: 'CANCEL'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$api("/api/productDelete",{param:[product_id]});
          this.getProductList();
          this.$swal.fire('Deleted.', '', 'success')
        }
      });
    }   
  }
}
</script>