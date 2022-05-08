<template>
  <main class="mt-5">
    <div class="container">
      <div v-if="orderList == 0" class="row">
          <h5 class="m-4">주문내역이 없습니다.</h5>
      </div>
      <div v-else>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>주문일자[주문번호]</th>
              <th>이미지</th>
              <th>상품정보</th>
              <th>판매가</th>
              <th>수량</th>
              <th>합계</th>
              <th>주문처리상태</th>
              <th>취소</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(product, i) in orderList">
              <td class="align-middle">{{product.created_date}} [{{product.order_id}}]</td>
              <td class="align-middle"><img :src="`/download/${product.id}/${product.path}`" style="height:auto; width:80px;" /></td>
              <td class="align-middle">{{product.product_name}}</td>
              <td class="align-middle">{{getCurrencyFormat(product.product_price)}}</td>
              <td class="align-middle">
                <div>
                  {{product.quantity}}개
                </div>
              </td>
              <td class="align-middle">
                <div>
                  {{getCurrencyFormat(product.totalPrice)}}원
                </div>
              </td>
              <td class="align-middle">
                <div v-if="product.delivery_status == 1">입금 확인중</div>
                <div v-else-if="product.delivery_status == 2">입금 완료</div>
                <div v-else-if="product.delivery_status == 3">취소</div>
                <div v-else-if="product.delivery_status == 4">상품 준비중</div>
                <div v-else-if="product.delivery_status == 5">
                    <div class="mb-2">배송중</div>
                    <div>CJ 대한통운</div>
                    <div style="cursor:pointer; text-decoration: underline;" @click="goToDelivery(product.transport_document_number)">[{{product.transport_document_number}}]</div>
                </div>
                <div v-else>
                    <div class="mb-2">배송 완료</div>
                    <div>CJ 대한통운</div>
                    <div style="cursor:pointer; text-decoration: underline;" @click="goToDelivery(product.transport_document_number)">[{{product.transport_document_number}}]</div>
                </div>
              </td>
              <td class="align-middle">
                <div v-if="product.delivery_status == 1">
                  <div style="font-size: 10px;" class="mb-1">상품 준비중부터는<br>취소 및 교환, 환불이<br>불가능합니다.</div>
                  <button class="btn btn-outline-danger" @click="goToCancle(product.cart_id)">취소</button>
                </div>
                <div v-else-if="product.delivery_status == 2">
                  <button class="btn btn-outline-danger">취소</button>
                </div>
                <div v-else>-</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {  // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      orderList: {},
      user_email:"",
      total: 0,
      cartItem: 0,
      deliveryPrice: 0,
      paymentAmount: 0
    };
  },
  created() {     // data가 정상적으로 들어오는지 확인
    this.user_email = this.$store.state.user.email;
    this.getCartList();
  },
  methods: {      // 메소드 호출
    getCurrencyFormat(value) {  // $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getCartList() {    // getCartList 메소드 호출
      let orderList = await this.$api("/api/orderList",{param:[this.user_email]});  // url를 따라 app.js의 /api/:alias를 타고 sql cartList의 data 호출
      this.orderList = orderList
      console.log(this.orderList); // 데이터를 잘 받아오는지 확인

      let total = 0;
      orderList.forEach(item => {
        total += item.totalPrice;
      });
      this.total = total;

      let deliveryPrice = 0;
      if (total >= 100000) {
        deliveryPrice = 0;
      }
      else {
        deliveryPrice = 3000;
      }
      this.deliveryPrice = deliveryPrice

      let paymentAmount = total + deliveryPrice;
      this.paymentAmount = paymentAmount;
    },
    goToOrder() {
        this.$router.push({path:'/order'});
    },
    goToDelivery(delivery_address) {
        window.open("http://nplus.doortodoor.co.kr/web/detail.jsp?slipno="+(delivery_address));
    },
    async goToCancle(cart_id) {
      this.$swal.fire({
        title: '취소를 하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: 'YES',
        cancelButtonText: 'CANCEL'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$api("/api/orderCancle",{param:[cart_id]});
          this.$swal.fire('Saved.', '', 'success');
          this.$router.go();
        }
      });
    }
  }
}
</script>