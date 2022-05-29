<template>
  <main class="mt-5">
    <div class="container">
      <div v-if="cartList == 0" class="row">
        <h5 class="m-4">장바구니가 비어있습니다.</h5>
      </div>
      <div v-else>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>이미지</th>
              <th>상품정보</th>
              <th>판매가</th>
              <th>수량</th>
              <th>합계</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(product, i) in cartList">
              <td>
                <img
                  :src="`/download/${product.id}/${product.path}`"
                  style="height: auto; width: 80px"
                />
              </td>
              <td class="align-middle">{{ product.product_name }}</td>
              <td class="align-middle">
                {{ getCurrencyFormat(product.product_price) }}
              </td>
              <td class="align-middle">
                <div>{{ product.quantity }}개</div>
              </td>
              <td class="align-middle">
                <div>{{ getCurrencyFormat(product.totalPrice) }}원</div>
              </td>
              <td class="align-middle">
                <div>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="deleteCart(product.cart_id)"
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
            <tr class="align-middle">
              <th colspan="6" style="text-align: right; font-size: large">
                총 상품금액 {{ getCurrencyFormat(total) }}원 + 배송비
                {{ getCurrencyFormat(deliveryPrice) }}원 = 총 결제금액
                {{ getCurrencyFormat(paymentAmount) }}원
              </th>
            </tr>
          </tbody>
        </table>
        <div class="col-12 mt-5">
          <button type="button" class="btn btn-outline-dark" @click="goToOrder">
            상품주문
          </button>
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
      cartList: {},
      cartId: "",
      total: 0,
      cartItem: 0,
      deliveryPrice: 0,
      paymentAmount: 0,
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  mounted() {
    if (this.user.email == undefined) {
      // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({ path: "/" });
    }
  },
  created() {
    this.cartId = this.$store.state.user.email; // store의 유저 이메일을 cartId로 선언
    this.getCartList(); // created 단계에서 getCartList()를 실행시켜 cartList 데이터를 미리 호출
  },
  methods: {
    // 메소드 호출
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getCartList() {
      // getCartList 메소드 호출
      let cartList = await this.$api("/api/cartList", { param: [this.cartId] }); // url를 따라 app.js의 /api/:alias를 타고 sql cartList로 data 호출
      this.cartList = cartList;
      console.log(this.cartList); // 데이터를 잘 받아오는지 확인

      let total = 0;
      cartList.forEach((item) => {
        total += item.totalPrice; // 장바구니에 담긴 제품들 모두 합친 가격
      });
      this.total = total;

      let deliveryPrice = 0;
      if (total >= 100000) {
        // total의 가격이 10만원이 넘어가면 배송료는 0
        deliveryPrice = 0;
      } else {
        deliveryPrice = 3000; // 그 외에는 배송료 3000원
      }
      this.deliveryPrice = deliveryPrice;

      let paymentAmount = total + deliveryPrice; // total 가격과 배송료를 모두 합친 총 결제 금액
      this.paymentAmount = paymentAmount;
    },
    goToOrder() {
      this.$router.push({ path: "/order" }); // /order로 라우팅
    },
    deleteCart(cart_id) {
      // cart_id를 받아 sweetAlert2를 통해 cartList 데이터 삭제
      this.$swal
        .fire({
          title: "정말 삭제하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "DELETE",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/cartDelete", { param: [cart_id] });
            this.getCartList();
            this.$swal.fire("Deleted.", "", "success");
          }
        });
    },
  },
};
</script>