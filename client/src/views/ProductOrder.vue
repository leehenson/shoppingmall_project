<template>
  <main class="mt-5">
    <div class="container">
      <h4 class="mb-3">주문내역</h4>
      <div>
        <table class="table table-bordered mb-5">
          <thead>
            <tr>
              <th>이미지</th>
              <th>상품정보</th>
              <th>판매가</th>
              <th>수량</th>
              <th>합계</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(product, i) in cartList">
              <td><img :src="`/download/${product.id}/${product.path}`" style="height:50px; width:auto;" /></td>
              <td>{{product.product_name}}</td>
              <td>{{getCurrencyFormat(product.product_price)}}</td>
              <td>
                <div>
                  {{product.quantity}}개
                </div>
              </td>
              <td>
                <div>
                  {{getCurrencyFormat(product.totalPrice)}}원
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="6" style="text-align: right; font-size: large;">총 상품금액 {{getCurrencyFormat(total)}}원 + 배송비 {{getCurrencyFormat(deliveryPrice)}}원 = 총 결제금액 {{getCurrencyFormat(paymentAmount)}}원</th>
            </tr>
          </tbody>
        </table>
        <div class="row justify-content-evenly">
          <div class="col-md-6">
            <h5 class="text-center ms-4 mb-3">배송지 정보</h5>
            <div class="mb-3 row">
              <label class="col-md-3 col-form-label">배송지</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="userInfo.address">
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-md-3 col-form-label">받으시는 분</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="userInfo.name">
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-md-3 col-form-label">휴대전화번호</label>
              <div class="col-md-9">
                <input type="text" class="form-control"  v-model="userInfo.phone">
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-md-3 col-form-label">배송시 요청사항</label>
              <div class="col-md-9">
                <textarea class="form-control" rows="4" v-model="orderInfo.requested_term"></textarea>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <h5 class="text-center ms-4 mb-3">결제 정보</h5>
            <label class="col-md-12 col-form-label text-start mb-2">무통장 입금</label>
            <div class="col-md-12 mb-3">
              <select class="form-select">
                <option selected>- 입금은행 선택 -</option>
                <option>{{sellerInfo.bank}}</option>
              </select>
            </div>
            <div class="col-md-12">
                <input type="text" class="form-control" placeholder="입금자명" v-model="orderInfo.name_of_depositor">
            </div>
          </div>
        </div>
        <div class="col-12 mt-5">
          <button type="button" class="btn btn-outline-dark"  @click="orderPayment">결제하기</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {  // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      cartList: {},
      cartId:"",
      total: 0,
      deliveryPrice: 0,
      paymentAmount: 0,
      userInfo: {},
      sellerInfo: {},
      orderInfo: {}
    };
  },
  created() {     // data가 정상적으로 들어오는지 확인
    this.cartId = this.$store.state.user.email;
    this.getCartList();
    this.getUserInfo();
    this.getSellerInfo();
  },
  methods: {      // 메소드 호출
    getCurrencyFormat(value) {  // $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getUserInfo() {    // getCartList 메소드 호출
      let userInfo = await this.$api("/api/userInfo",{param:[this.cartId]});  // url를 따라 app.js의 /api/:alias를 타고 sql t_user data 호출
      if (userInfo.length > 0) { // UserInfo의 데이터를 가져왔을 때
        this.userInfo = userInfo[0];  // UserInfo의 첫번째만 가져옴
      }
    },
    async getSellerInfo() {    // getSellerInfo 메소드 호출
      let sellerInfo = await this.$api("/api/sellerInfo");  // url를 따라 app.js의 /api/:alias를 타고 sql t_user data 호출
      if (sellerInfo.length > 0) { // sellerInfo의 데이터를 가져왔을 때
        this.sellerInfo = sellerInfo[0];  // sellerInfo의 첫번째만 가져옴
      }
    },
    async getCartList() {    // getCartList 메소드 호출
      let cartList = await this.$api("/api/cartList",{param:[this.cartId]});  // url를 따라 app.js의 /api/:alias를 타고 sql cartList의 data 호출
      this.cartList = cartList
      console.log(this.cartList); // 데이터를 잘 받아오는지 확인

      let total = 0;
      cartList.forEach(item => {
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
    async orderPayment() {

      this.$swal.fire({
            title: '결제를 하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: 'PAYMENT',
            cancelButtonText: 'CANCEL'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await this.$api("/api/orderPayment", {param:[this.userInfo.address, this.userInfo.name, this.userInfo.phone, this.orderInfo.requested_term, this.orderInfo.name_of_depositor, this.$store.state.user.email, this.paymentAmount]});
                this.$api("/api/cartCopy", {param:[this.$store.state.user.email]});
                this.$api("/api/deleteCart", {param:[this.$store.state.user.email]});
                this.$swal.fire('Complete.', '', 'success');
                this.$router.push({path:'/'});
            }
        });
    }
  }
}
</script>