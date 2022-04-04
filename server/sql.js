module.exports = {  // database의 data query로 가져오기
    productList: {  // 제품 리스트가 있는 메인 화면 쿼리
        query: `SELECT t1.*, t2.path
        FROM t_product t1, t_image t2
        WHERE t1.id = t2.product_id AND t2.type = 1`    // 메인 화면에 띄울 제품 썸네일 데이터 가져오기
    },
    outerList: {  // 제품 리스트가 있는 메인 화면 쿼리
        query: `SELECT t1.*, t2.path
        FROM t_product t1, t_image t2
        WHERE t1.id = t2.product_id AND t2.type = 1 AND t1.category_id = 1`    // 메인 화면에 띄울 제품 썸네일 데이터 가져오기
    },
    topList: {  // 제품 리스트가 있는 메인 화면 쿼리
        query: `SELECT t1.*, t2.path
        FROM t_product t1, t_image t2
        WHERE t1.id = t2.product_id AND t2.type = 1 AND t1.category_id = 2`    // 메인 화면에 띄울 제품 썸네일 데이터 가져오기
    },
    bottomList: {  // 제품 리스트가 있는 메인 화면 쿼리
        query: `SELECT t1.*, t2.path
        FROM t_product t1, t_image t2
        WHERE t1.id = t2.product_id AND t2.type = 1 AND t1.category_id = 3`    // 메인 화면에 띄울 제품 썸네일 데이터 가져오기
    },
    accList: {  // 제품 리스트가 있는 메인 화면 쿼리
        query: `SELECT t1.*, t2.path
        FROM t_product t1, t_image t2
        WHERE t1.id = t2.product_id AND t2.type = 1 AND t1.category_id = 4`    // 메인 화면에 띄울 제품 썸네일 데이터 가져오기
    },
    productList2: { // 세일즈 리스트에 제품 등록할 제품 데이터 가져오기
        query: `select t3.*, t4.path from (select t1.*, t2.category
          from t_product t1, t_category t2
          where t1.category_id = t2.id) t3
          left join (select * from t_image where type=1) t4
          on t3.id = t4.product_id`
      },
    productDetail: {    // 제품 상세페이지 쿼리
        query: `SELECT t1.*, t2.path, t3.category
        FROM t_product t1, t_image t2, t_category t3
        WHERE t1.id = ? AND t1.id = t2.product_id AND t2.type = 3 AND t1.category_id = t3.id`
    },
    productMainImages: {    // 제품 이미지 쿼리
        query: `SELECT * FROM t_image WHERE product_id = ? AND TYPE = 2`
    },
    productInsert: {    // 제품 정보 등록 쿼리
        query: `INSERT INTO t_product set ?`
    },
    productImageInsert: {   // 제품 이미지 등록 쿼리
        query: `insert into t_image set ?`
    },
    productUpdate: {    // 제품 수정 쿼리
        query: `insert into t_product set ? on duplicate key update ?`
    },
    imageList: {    // 해당 제품의 이미지들을 가져오는 쿼리
        query: `select * from t_image where product_id=?`
    },
    imageDelete: {  // 해당 제품의 이미지를 삭제하는 쿼리
        query: `delete from t_image where id=?`
    },
    productDelete: {    // 해당 제품을 삭제하는 쿼리
        query: `delete from t_product where id=?`  
    },
    categoryList: {   // 카테고리 리스트 쿼리
        query: `select * from t_category`     // t_category 테이블의 데이터 가져오기
    },
    sellerList: {   // 셀러 리스트 쿼리
        query: `select * from t_seller`     // t_seller 테이블의 데이터 가져오기
    },
    memberJoin: {    // 유저 회원가입 쿼리
        query: `INSERT INTO t_user set ?`
    },
    memberLogin: {    // 유저 로그인 쿼리
        query: `SELECT * FROM t_user WHERE email = ? AND password = ?`
    },
    bankList: {   // 은행 리스트 가져오는 쿼리
        query: `select * from t_bank_name`     // t_bank_name 테이블의 데이터 가져오기
    },
    signUp: {
        query: `insert into t_user set ? on duplicate key update ?` // 데이터가 없으면 insert를 하고, 있으면 update를 함.
    }
}