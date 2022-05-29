<template>
  <main class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h4 class="text-center mb-5">Order Detail</h4>
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
              <tr :key="i" v-for="(order, i) in orderDetail">
                <td class="align-middle">
                  <img
                    :src="`/download/${order.id}/${order.path}`"
                    style="height: auto; width: 40px"
                  />
                </td>
                <td class="align-middle">{{ order.product_name }}</td>
                <td class="align-middle">
                  {{ getCurrencyFormat(order.product_price) }}
                </td>
                <td class="align-middle">
                  <div>{{ order.quantity }}개</div>
                </td>
                <td class="align-middle">
                  <div>{{ getCurrencyFormat(order.totalPrice) }}원</div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">주문일자</label>
            <label class="col-md-9 col-form-label">{{
              orderDetail[0].created_date
            }}</label>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">주문번호</label>
            <label class="col-md-9 col-form-label">{{
              orderDetail[0].order_id
            }}</label>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">주문자 이메일</label>
            <label class="col-md-9 col-form-label">{{
              orderDetail[0].email
            }}</label>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">입금자 명</label>
            <label class="col-md-9 col-form-label">{{
              orderDetail[0].name_of_depositor
            }}</label>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">결제 금액</label>
            <label class="col-md-9 col-form-label"
              >{{ getCurrencyFormat(orderDetail[0].payment_amount) }}원</label
            >
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">받으시는 분</label>
            <label class="col-md-9 col-form-label">{{
              orderDetail[0].name
            }}</label>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">배송지</label>
            <label class="col-md-9 col-form-label">{{
              orderDetail[0].address
            }}</label>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">휴대폰번호</label>
            <label class="col-md-9 col-form-label">{{
              orderDetail[0].phone
            }}</label>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">요청사항</label>
            <label class="col-md-9 col-form-label">{{
              orderDetail[0].requested_term
            }}</label>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">주문처리상태</label>
            <div class="col-md-9">
              <select
                class="form-select"
                v-model="orderDetail[0].delivery_status"
              >
                <option :key="i" v-for="(status, i) in statusList">
                  {{ status.status }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">운송장번호</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                v-model="orderDetail[0].transport_document_number"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div class="col-6 d-grid p-1">
                <button
                  type="button"
                  class="btn btn-lg btn-outline-dark"
                  @click="goToList"
                >
                  CANCEL
                </button>
              </div>
              <div class="col-6 d-grid p-1">
                <button
                  type="button"
                  class="btn btn-lg btn-outline-dark"
                  @click="goToUpdate(this.orderId)"
                >
                  SAVE
                </button>
              </div>
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
      orderId: 0,
      orderDetail: {},
      statusList: [],
    };
  },
  created() {
    this.orderId = this.$route.query.order_id; // path의 order_id를 orderId로 선언
    this.getOrderDetail(); // created 단계에서 getOrderDetail를 실행시켜 data를 미리 호출
    this.getStatusList(); // created 단계에서 getStatusList를 실행시켜 data를 미리 호출
  },
  methods: {
    // 메소드 호출
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getOrderDetail() {
      // getCartList 메소드 호출
      let orderDetail = await this.$api("/api/orderDetail", {
        param: [this.orderId],
      }); // url를 따라 app.js의 /api/:alias를 타고 orderId를 보내고 sql cartList를 통해 data 호출
      this.orderDetail = orderDetail;
      console.log(this.orderDetail); // 데이터를 잘 받아오는지 확인
    },
    async getStatusList() {
      let statusList = await this.$api("/api/statusList"); // 해당 sql를 통해 status data 호출
      this.statusList = statusList;
    },
    goToList() {
      this.$router.push({ path: "/order_management" }); // 해당 메소드 실행 시, /order_management로 라우팅
    },
    async goToUpdate(order_id) {
      // order_id를 받아 sweetAlert2 실행
      this.$swal
        .fire({
          title: "정말 수정하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "MODIFY",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/orderUpdate", {
              param: [
                this.orderDetail[0].delivery_status,
                this.orderDetail[0].transport_document_number,
                order_id,
              ],
            }); // status, 운송장 번호, order_id data를 파라미터로 보내고 sql orderUpdate를 통해 주문정보 수정
            this.$swal.fire("Saved.", "", "success");
            this.$router.push({ path: "/order_management" }); // /order_management로 라우팅
          }
        });
    },
  },
};
</script>