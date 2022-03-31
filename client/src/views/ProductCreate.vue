<template>
  <main class="mt-3">
        <div class="container">
            <h2 class="text-center mb-3">제품 등록</h2>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품명</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="product.product_name">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 가격</label>
                <div class="col-md-9">
                  <div class="input-group">
                    <input type="number" class="form-control" v-model="product.product_price">
                    <span class="input-group-text">원</span>
                  </div>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 설명</label>
                <div class="col-md-9">
                  <textarea class="form-control" rows="7" v-model="product.product_description"></textarea>              
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">색상</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="product.product_color">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">소재</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="product.product_fabric">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">모델 착용</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="product.product_model">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">사이즈</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="product.product_size">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">사이즈 가이드</label>
                <div class="col-md-9">
                  <textarea class="form-control" rows="3" v-model="product.product_sizeGuide"></textarea>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 카테고리</label>
                <div class="col-md-9">
                  <select class="form-select" v-model="cate">
                      <option :value="cate" :key="i" v-for="(cate, i) in category">{{cate}}</option>              
                  </select>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">태그</label>
                <div class="col-md-9">
                  <input type="text" class="form-control"  v-model="product.tags">
                </div>
            </div>                   
            <div class="mb-3 row">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="col-6 d-grid p-1">
                      <button type="button" class="btn btn-lg btn-outline-primary"  @click="goToList">취소하기</button>
                    </div>
                    <div class="col-6 d-grid p-1">
                      <button type="button" class="btn btn-lg btn-outline-primary" @click="productInsert">저장하기</button>
                    </div>
                  </div>
            </div>
        </div>
      </main>
</template>
<script>
export default {
  data() {
    return {
      product: {
        product_name: "",
        product_price: 0,
        product_description: "",
        product_color: "",
        product_fabric: "",
        product_model: "",        
        product_size: "",
        product_sizeGuide: "",
        tags: "",
        seller_id: 1,
        category_id: 1
      },
      categoryList: [],
      category: [],
      cate: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.user;  // user 정보가 바뀔 때마다 자동으로 user() 갱신
    }
  },
  created() {
    this.getCategoryList();
  },
  mounted() {
    if(this.user.email == undefined) {  // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({path:'/'});
    }
  },
  methods: {
    goToList() {
      this.$router.push({path:'/sales'});
    },
    async getCategoryList() {
      let categoryList = await this.$api("/api/categoryList", {});
      this.categoryList = categoryList;

      let oCategory = {};
      categoryList.forEach(item => {
        oCategory[item.category] = item.id;
      });
      console.log(oCategory);

      let category = [];
      for(let key in oCategory) {
        category.push(key);
      }

      this.category = category;
    },
    productInsert() {
      if(this.product.product_name == "") {
        return this.$swal("제품명은 필수 입력값입니다.");
      }

      if(this.product.product_price == "" || this.product.product_price == 0) {
        return this.$swal("제품가격을 입력하세요.");
      }

      if(this.product.product_description == "") {
        return this.$swal("제품설명은 필수 입력값입니다.");
      }

      if(this.product.product_color == "") {
        return this.$swal("색상은 필수 입력값입니다.");
      }

      if(this.product.product_fabric == "") {
        return this.$swal("소재는 필수 입력값입니다.");
      }
      
      if(this.product.product_model == "") {
        return this.$swal("모델 착용 정보는 필수 입력값입니다.");
      }

      if(this.product.product_size == "") {
        return this.$swal("사이즈는 필수 입력값입니다.");
      }

      if(this.product.product_sizeGuide == "") {
        return this.$swal("사이즈 가이드는 필수 입력값입니다.");
      }

      this.product.category_id = this.categoryList.filter(c => {
        return (c.category == this.cate);
      })[0].id;

      console.log(this.product.category_id);
      
      this.$swal.fire({
            title: '정말 등록하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: 'REGISTRATION',
            cancelButtonText: 'CANCEL'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await this.$api("/api/productInsert",{param:[this.product]});
                this.$swal.fire('Saved.', '', 'success');
                this.$router.push({path:'/sales'});
            }
        });
    }
  }
}
</script>