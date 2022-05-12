<template>
  <main class="mt-5">
    <div class="container">
      <h4 class="text-center mb-5">Order Management</h4>
      <div v-if="orderList == 0" class="row">
          <h5 class="m-4">주문내역이 없습니다.</h5>
      </div>
      <div v-else>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>주문일자[주문번호]</th>
              <th>상품정보</th>
              <th>수량</th>
              <th>주문자 이메일</th>
              <th>받으시는 분</th>
              <th>휴대전화번호</th>
              <th>배송지</th>
              <th>요청사항</th>
              <th>입금자명</th>
              <th>결제금액</th>
              <th>주문처리상태</th>
              <th>운송장번호</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(order, i) in orderList">
              <td class="align-middle">{{order.created_date}} [{{order.order_id}}]</td>
              <td class="align-middle">{{order.product_name}}</td>
              <td class="align-middle">{{order.quantity}}</td>
              <td class="align-middle">{{order.user_email}}</td>
              <td class="align-middle">{{order.name}}</td>
              <td class="align-middle">{{order.phone}}</td>
              <td class="align-middle">{{order.address}}</td>
              <td class="align-middle">{{order.requested_term}}</td>
              <td class="align-middle">{{order.name_of_depositor}}</td>
              <td class="align-middle">{{order.totalPrice}}</td>
              <td class="align-middle">
                <select class="form-select" v-model="orderList.delivery_status">
                    <option :key="i" v-for="(status, i) in statusList">{{status.status}}</option>
                </select>
              </td>
              <td class="align-middle">
                <input type="text" class="form-control" v-model="orderList.transport_document_number">
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
      statusList: []
    };
  },
  created() {     // data가 정상적으로 들어오는지 확인
    this.getOrderList();
    this.getStatusList();
    console.log(this.orderList);
  },
  methods: {      // 메소드 호출
    getCurrencyFormat(value) {  // $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getOrderList() {    // getCartList 메소드 호출
      let orderList = await this.$api("/api/orderManagement");  // url를 따라 app.js의 /api/:alias를 타고 sql cartList의 data 호출
      this.orderList = orderList
      console.log(this.orderList); // 데이터를 잘 받아오는지 확인
    },
    async getStatusList() {
      let statusList = await this.$api("/api/statusList");
      this.statusList = statusList;
    },
    // async goToCancle(cart_id) {
    //   this.$swal.fire({
    //     title: '취소를 하시겠습니까?',
    //     showCancelButton: true,
    //     confirmButtonText: 'YES',
    //     cancelButtonText: 'CANCEL'
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       await this.$api("/api/orderCancle",{param:[cart_id]});
    //       this.$swal.fire('Saved.', '', 'success');
    //       this.$router.go();
    //     }
    //   });
    // }
  }
}
</script>