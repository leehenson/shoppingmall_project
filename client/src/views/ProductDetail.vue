<template>
  <main class="mt-3">
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div :class="`carousel-item ${i==0?'active':''}`" :key="i" v-for="(pimg, i) in productImage">
                <img :src="`/download/${productId}/${pimg.path}`" class="d-block w-100" alt="...">
              </div>                      
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-md-7">
            <div class="card shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">{{productDetail.product_name}}</h5>
                  <h5><p class="card-text pt-3 pb-3 border-top">{{getCurrencyFormat(productDetail.product_price)}}원</p></h5>
                  <div class="card-text pb-3 border-top mb-4">
                    <div class="row">
                      <div class="col-auto">
                        <nav>
                          <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">INSTRUCTION</button>
                            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">SIZE GUIDE</button>
                            <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">SHIPPING</button>
                          </div>
                        </nav>
                          <div class="tab-content" id="nav-tabContent">
                          <div class="tab-pane fade show active pt-3" style="white-space: pre-line;" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">{{productDetail.product_description}} <br><br>[color] <br>{{productDetail.product_color}} <br><br>[Fabric] <br>{{productDetail.product_fabric}} <br><br>[Model] <br>{{productDetail.product_model}}</div>
                          <div class="tab-pane fade pt-3" style="white-space: pre-line;" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">{{productDetail.product_sizeGuide}} <br><br>제품 측정에 따라 1-3cm 차이가 있을 수 있습니다.</div>
                          <div class="tab-pane fade pt-3" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">- 선주문 후 거래처 입고를 통해 상품 발송을 도와드리고 있습니다. <br>(당일 20시 이전 주문 건, 거래처 입고 후 다음날 발송) <br><br> - 영업일 기준 3-7일 정도의 배송기간이 소요되며, 입고 지연 발생 시 개별적 연락 도와드리고 있습니다. <br><br> - 배송비 3,000원 (실구매금액 100,000원 이상 구매 시 무료 배송) <br><br> - 도서산간 및 제주지역은 별도의 추가 운임비가 발생할 수 있습니다. <br><br> - 다폼목 주문시 합배송을 원칙으로 합니다. <br> (개별상품 지연기간이 7일 이상일 경우 부분 발송)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-auto dropdown pb-3">
                        <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          - [필수] 옵션을 선택해주세요 -
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><a class="dropdown-item" href="#">블랙</a></li>
                        </ul>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-auto dropdown pb-3">
                        <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          - [필수] 옵션을 선택해주세요 -
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><a class="dropdown-item" href="#">M</a></li>
                          <li><a class="dropdown-item" href="#">L</a></li>
                        </ul>
                      </div>
                  </div>
                  <div class="row pt-3 pb-3">
                    <div class="col-6">
                        <h3>총 상품금액</h3>
                    </div>
                    <div class="col-6" style="text-align: right;">
                        <h3>83,000원</h3>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="col-6 d-grid p-1">
                        <button type="button" class="btn btn-lg btn-outline-primary">ADD CART</button>
                    </div>
                    <div class="col-6 d-grid p-1">
                        <button type="button" class="btn btn-lg btn-outline-primary">BUY NOW</button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <img :src="`/download/${productId}/${productDetail.path}`" class="img-fluid" style="width: 1000px;"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {  // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      productId: 0,
      productDetail: {},
      productImage: []
    };
  },
  created() {     // data가 정상적으로 들어오는지 확인
    this.productId = this.$route.query.product_id;  // path에 있는 product_id 값을 불러옴
    this.getProductDetail();
    this.getProductImage();
  },
  methods: {      // 메소드 호출
    getCurrencyFormat(value) {  // $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getProductDetail() {    // getProductDetail 메소드 호출
      let productDetail = await this.$api("/api/productDetail",{param:[this.productId]});  // url를 따라 app.js의 /api/:alias를 타고 productId의 파라미터를 받아 해당 sql productDatail의 data 호출
      if (productDetail.length > 0) { // productDetail의 데이터를 가져왔을 때
        this.productDetail = productDetail[0];  // productDetail의 첫번째만 가져옴
      }
      console.log(this.productDetail); // 데이터를 잘 받아오는지 확인
    },
    async getProductImage() {    // getProductImage 메소드 호출
      this.productImage = await this.$api("/api/productMainImages",{param:[this.productId]});  // url를 따라 app.js의 /api/:alias를 타고 productId의 파라미터를 받아 해당 sql productMainImages의 data 호출
      console.log('this.productImage',this.productImage)
    }
  }
}
</script>