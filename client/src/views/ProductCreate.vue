<template>
  <main class="mt-3">
        <div class="container">
            <h2 class="text-center mb-3">제품 등록</h2>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품명</label>
                <div class="col-md-9">
                  <input type="text" class="form-control">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 가격</label>
                <div class="col-md-9">
                  <div class="input-group mb-3">
                    <input type="number" class="form-control">
                    <span class="input-group-text">원</span>
                  </div>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">배송비</label>
                <div class="col-md-9">
                  <div class="input-group mb-3">
                    <input type="number" class="form-control">
                    <span class="input-group-text">원</span>
                  </div>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">추가배송비(도서산간)</label>
                <div class="col-md-9">
                  <div class="input-group mb-3">
                    <input type="number" class="form-control">
                    <span class="input-group-text">원</span>
                  </div>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 카테고리</label>
                <div class="col-md-9">
                  <select class="form-select">
                      <option>OUTER</option>
                      <option>TOP</option>
                      <option>BOTTOM</option>
                      <option>ACC</option>
                  </select>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">태그</label>
                <div class="col-md-9">
                  <input type="text" class="form-control">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">출고일</label>
                <div class="col-md-9">
                  <div class="input-group mb-3">
                    <input type="number" class="form-control">
                    <span class="input-group-text">일 이내 출고</span>
                  </div>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">썸네일 이미지</label>
                <div class="col-md-9">
                    <input class="form-control" type="file" accept="image/png, image/jpeg">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 이미지</label>
                <div class="col-md-9">
                    <input class="form-control" type="file" accept="image/png, image/jpeg" multiple>
                </div>
            </div>
            <div class="mb-3 row">
              <label class="col-md-3 col-form-label">제품 설명 이미지</label>
              <div class="col-md-9">
                  <input class="form-control" type="file" accept="image/png, image/jpeg" multiple>
              </div>
            </div>
            <div class="mb-3 row">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="col-6 d-grid p-1">
                        <button type="button" class="btn btn-lg btn-outline-primary">취소하기</button>
                    </div>
                    <div class="col-6 d-grid p-1">
                        <button type="button" class="btn btn-lg btn-outline-primary">저장하기</button>
                    </div>
                  </div>
            </div>
        </div>
      </main>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;  // user 정보가 바뀔 때마다 자동으로 user() 갱신
    }
  },
  mounted() {
    if(this.user.email == undefined) {  // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({path:'/'});
    }
  },
}
</script>