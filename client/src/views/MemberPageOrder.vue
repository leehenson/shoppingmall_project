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
              <td class="align-middle">
                {{ product.created_date }} [{{ product.order_id }}]
              </td>
              <td class="align-middle">
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
                <div v-if="product.delivery_status == '입금확인중'">
                  입금 확인중
                </div>
                <div v-else-if="product.delivery_status == '입금완료'">
                  입금 완료
                </div>
                <div v-else-if="product.delivery_status == '취소'">취소</div>
                <div v-else-if="product.delivery_status == '상품준비'">
                  상품 준비중
                </div>
                <div v-else-if="product.delivery_status == '배송중'">
                  <div class="mb-2">배송중</div>
                  <div>CJ 대한통운</div>
                  <div
                    style="cursor: pointer; text-decoration: underline"
                    @click="goToDelivery(product.transport_document_number)"
                  >
                    [{{ product.transport_document_number }}]
                  </div>
                </div>
                <div v-else>
                  <div class="mb-2">배송 완료</div>
                  <div>CJ 대한통운</div>
                  <div
                    style="cursor: pointer; text-decoration: underline"
                    @click="goToDelivery(product.transport_document_number)"
                  >
                    [{{ product.transport_document_number }}]
                  </div>
                </div>
              </td>
              <td class="align-middle">
                <div v-if="product.delivery_status == '입금확인중'">
                  <div style="font-size: 10px" class="mb-1">
                    상품 준비중부터는<br />취소 및 교환, 환불이<br />불가능합니다.
                  </div>
                  <button
                    class="btn btn-outline-danger"
                    @click="goToCancle(product.cart_id)"
                  >
                    취소
                  </button>
                </div>
                <div v-else-if="product.delivery_status == '입금완료'">
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
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      orderList: {},
      user_email: "",
      total: 0,
      cartItem: 0,
      deliveryPrice: 0,
      paymentAmount: 0,
    };
  },
  created() {
    this.user_email = this.$store.state.user.email; // 상태관리 되어있는 email를 user_email로 선언
    this.getCartList(); // created 단계에서 getCartList를 실행시켜 data를 미리 호출
  },
  methods: {
    // 메소드 호출
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getCartList() {
      // getCartList 메소드 호출
      let orderList = await this.$api("/api/orderList", {
        param: [this.user_email],
      }); // url를 따라 app.js의 /api/:alias를 타고 sql orderList를 통해 해당 회원의 주문정보 data 호출
      this.orderList = orderList;
      console.log(this.orderList); // 데이터를 잘 받아오는지 확인

      let total = 0;
      orderList.forEach((item) => {
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
      this.$router.push({ path: "/order" }); // 해당 메소드 실행 시, /order로 라우팅
    },
    goToDelivery(delivery_address) {
      // 운송장 번호 클릭 시, 배송조회가 가능한 웹페이지 새창으로 열기
      window.open(
        "http://nplus.doortodoor.co.kr/web/detail.jsp?slipno=" +
          delivery_address
      );
    },
    async goToCancle(cart_id) {
      // cart_id를 받아 sweetAlert2 실행
      this.$swal
        .fire({
          title: "취소를 하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "YES",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/orderCancle", { param: [cart_id] }); // 해당 cart_id의 data를 sql orderCancle를 통해 주문취소상태로 변경
            this.$swal.fire("Saved.", "", "success");
            this.$router.go(); // 새로고침
          }
        });
    },
  },
};
</script>