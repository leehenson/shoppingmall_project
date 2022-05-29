<template>
  <main class="mt-3">
    <div class="container">
      <h2 class="text-center">제품 사진 등록</h2>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품ID</label>
        <div class="col-md-9">
          {{ productId }}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품명</label>
        <div class="col-md-9">
          {{ productDetail.product_name }}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">썸네일이미지</label>
        <div class="col-md-9">
          <div class="row">
            <div
              class="col-lg-3 col-md-4 col-sm-2"
              :key="i"
              v-for="(m, i) in productImage.filter((c) => c.type == 1)"
            >
              <div class="position-relative">
                <img
                  :src="`/download/${productId}/${m.path}`"
                  class="img-fluid"
                />
                <div
                  class="position-absolute top-0 end-0"
                  style="cursor: pointer"
                  @click="deleteImage(m.id)"
                >
                  X
                </div>
              </div>
            </div>
          </div>
          <input
            type="file"
            class="form-control"
            accept="image/png,image/jpeg"
            @change="uploadFile($event.target.files, 1)"
          />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>이미지 사이즈 : 350*350</li>
              <li>파일 사이즈 : 1M 이하</li>
              <li>파일 확장자 : png, jpg만 가능</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품이미지</label>
        <div class="col-md-9">
          <div class="row">
            <div
              class="col-lg-3 col-md-4 col-sm-2"
              :key="i"
              v-for="(m, i) in productImage.filter((c) => c.type == 2)"
            >
              <div class="position-relative">
                <img
                  :src="`/download/${productId}/${m.path}`"
                  class="img-fluid"
                />
                <div
                  class="position-absolute top-0 end-0"
                  style="cursor: pointer"
                  @click="deleteImage(m.id)"
                >
                  X
                </div>
              </div>
            </div>
          </div>
          <input
            type="file"
            class="form-control"
            accept="image/png,image/jpeg"
            @change="uploadFile($event.target.files, 2)"
          />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>최대 5개 가능</li>
              <li>이미지 사이즈 : 700*700</li>
              <li>파일 사이즈 : 1M 이하</li>
              <li>파일 확장자 : png, jpg만 가능</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품설명이미지</label>
        <div class="col-md-9">
          <div class="row">
            <div class="col-lg-6 col-md-8">
              <input
                type="file"
                class="form-control"
                accept="image/png,image/jpeg"
                @change="uploadFile($event.target.files, 3)"
              />
              <div class="alert alert-secondary" role="alert">
                <ul>
                  <li>파일 사이즈 : 5M 이하</li>
                  <li>파일 확장자 : png, jpg만 가능</li>
                </ul>
              </div>
            </div>
            <div
              class="col-lg-6 col-md-4"
              :key="i"
              v-for="(m, i) in productImage.filter((c) => c.type == 3)"
            >
              <div class="position-relative">
                <img
                  :src="`/download/${productId}/${m.path}`"
                  class="img-fluid"
                />
                <div
                  class="position-absolute top-0 end-0"
                  style="cursor: pointer"
                  @click="deleteImage(m.id)"
                >
                  X
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3 row m-auto">
        <button
          type="button"
          class="btn btn-lg btn-outline-dark"
          @click="goToList"
        >
          CONFIRM
        </button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      productId: 0,
      productName: "",
      productDetail: {},
      productImage: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  created() {
    // created 단계에서 해당 메소드를 실행시켜 data를 받아오게 설정
    this.productId = this.$route.query.product_id; // path에 있는 product_id 값을 불러옴
    this.getProductDetail();
    this.getProductImage();
  },
  mounted() {
    if (this.user.email == undefined) {
      // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    goToList() {
      // confirm 버튼을 누르면 /sales 화면으로 라우팅되게 함
      this.$router.push({ path: "/sales" });
    },
    async getProductDetail() {
      // getProductDetail 메소드 호출
      let productDetail = await this.$api("/api/productDetail", {
        param: [this.productId],
      }); // url를 따라 app.js의 /api/:alias를 타고 productId의 파라미터를 받아 해당 sql productDatail의 data 호출
      if (productDetail.length > 0) {
        // productDetail의 데이터를 가져왔을 때 data가 있으면
        this.productDetail = productDetail[0]; // productDetail의 첫번째만 가져옴
      }
    },
    async getProductImage() {
      // getProductImage 메소드 호출
      this.productImage = await this.$api("/api/imageList", {
        param: [this.productId],
      }); // url를 따라 app.js의 /api/:alias를 타고 productId의 파라미터를 받아 해당 sql imageList의 data 호출
      console.log(this.productImage);
    },
    deleteImage(id) {
      // productImage의 id를 받고, sweetAlert2를 활용하여 이미지 삭제에 대해 alert를 띄움
      this.$swal
        .fire({
          title: "정말 삭제 하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: `삭제`,
          cancelButtonText: `취소`,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/imageDelete", { param: [id] }); // productImage의 id를 imageDelete sql에 파라미터로 보내 productImage 데이터 delete
            this.getProductImage(); // delete후 getProductImage 갱신
            this.$swal.fire("삭제되었습니다!", "", "success");
          }
        });
    },
    async uploadFile(files, type) {
      // 이미지 files와 type을 받아 업로드하는 메소드
      let name = "";
      let data = null;
      if (files) {
        // files이 있다면
        name = files[0].name; // 0번쨰 파일의 이름
        data = await this.$base64(files[0]); // files를 $base64를 통해 비동기적으로 읽음
      }
      const { error } = await this.$api(
        `/upload/${this.productId}/${type}/${name}`,
        { data }
      ); // 데이터의 productId와 type, name, data를 api로 전송
      if (error) {
        // 문제 발생 시
        return this.$swal("이미지 업로드 실패했습니다. 다시 시도하세요.");
      }
      this.$swal("이미지가 업로드 되었습니다."); // 문제 없을 시
      setTimeout(() => {
        // 1초 후 getProudctImage() 호출
        this.getProductImage();
      }, 1000);
    },
  },
};
</script>