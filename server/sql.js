module.exports = {  // database의 data query로 가져오기
    productList: {  // 제품 리스트가 있는 메인 화면 쿼리
        query: `SELECT t1.id, t1.product_name, t1.product_price, t2.path
        FROM t_product t1, t_image t2
        WHERE t1.id = t2.product_id AND t2.type = 1`    // 메인 화면에 띄울 제품 썸네일 데이터 가져오기
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
        query: `INSERT INTO t_product (product_name, product_price, delivery_price, add_delivery_price, tags, outbound_days, seller_id, category_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    },
    productImageInsert: {   // 제품 이미지 등록 쿼리
        query: `INSERT INTO t_image (product_id, type, path)
        VALUES (?, ?, ?)`
    },
    sellerList: {   // 셀러 리스트 쿼리
        query: `select * from t_seller`     // t_seller 테이블의 데이터 가져오기
    }
}