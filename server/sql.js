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
    productDetail2: {    // 제품 상세페이지 쿼리
        query: `SELECT t1.product_name, t1.product_price, t1.product_description, t1.product_color, t1.product_fabric, t1.product_model, t1.product_size, t1.product_sizeGuide, t1.tags
        FROM t_product t1 WHERE t1.id = ?`
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
        query: `UPDATE t_product SET ? WHERE id = ?`
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
        query: `SELECT email FROM t_user WHERE email = ?`
    },
    bankList: {   // 은행 리스트 가져오는 쿼리
        query: `SELECT bank_name FROM t_bank_name`     // t_bank_name 테이블의 데이터 가져오기
    },
    signUp: {
        query: `insert into t_user set ? on duplicate key update ?` // 데이터가 없으면 insert를 하고, 있으면 update를 함.
    },
    cartInsert: {
        query: `INSERT INTO t_cart (product_id, user_email, quantity, totalPrice) VALUES (?, ?, ?, ?)`
    },
    cartList: {
        query: `SELECT t1.id, t1.product_name, t1.product_price, t2.path, t3.cart_id, t3.quantity, t3.totalPrice, t4.email
        FROM t_product t1, t_image t2, t_cart t3, t_user t4
        WHERE t1.id = t2.product_id AND t1.id = t3.product_id AND t3.user_email = t4.email AND t2.type = 1 AND t4.email = ?`
    },
    cartDelete: {    // 해당 제품을 장바구니에서 삭제하는 쿼리
        query: `DELETE FROM t_cart WHERE cart_id=?`
    },
    userInfo: {    // 회원 정보를 가져오는 쿼리
        query: `SELECT * FROM t_user WHERE email = ?`
    },
    sellerInfo: {    // 회원 정보를 가져오는 쿼리
        query: `SELECT * FROM t_seller`
    },
    orderPayment: {    // 회원 정보를 가져오는 쿼리
        query: `INSERT INTO t_order (address, name, phone, requested_term, name_of_depositor, user_email, payment_amount) VALUES (?, ?, ?, ?, ?, ?, ?)`
    },
    cartCopy: {    // 회원 정보를 가져오는 쿼리
        query: `INSERT INTO t_orders (cart_id, product_id, user_email, quantity, totalPrice, order_id)
        SELECT t1.cart_id, t1.product_id, t1.user_email, t1.quantity, t1.totalPrice, MAX(t2.order_id)
        FROM t_cart t1, t_order t2
        WHERE t1.user_email = ?
        GROUP BY t1.cart_id`
    },
    deleteCart: {    // 회원 정보를 가져오는 쿼리
        query: `DELETE FROM t_cart WHERE user_email = ?`
    },
    orderList: {
        query: `SELECT t1.id, t1.product_name, t1.product_price, t2.path, t3.quantity, t3.totalPrice, t5.payment_amount, t3.order_id, t5.delivery_status, t5.created_date, t5.transport_document_number, t4.email, t6.*
        FROM t_product t1, t_image t2, t_orders t3, t_user t4, t_order t5, t_status t6
        WHERE t1.id = t2.product_id AND t1.id = t3.product_id AND t3.user_email = t4.email AND t2.type = 1 AND t5.delivery_status = t6.status AND t4.email = ?`
    },
    orderCancle: {
        query: `UPDATE t_orders SET delivery_status = 3 WHERE cart_id = ?`
    },
    userManagement: {
        query: `SELECT * FROM t_user`
    },
    orderManagement: {
        query: `SELECT t1.created_date, t1.order_id, t1.user_email, t1.name_of_depositor, t1.payment_amount, t1.delivery_status, t1.transport_document_number, t2.*
        FROM t_order t1, t_status t2
        WHERE t1.delivery_status = t2.status`
    },
    statusList: {   // 상태 리스트 가져오는 쿼리
        query: `SELECT status FROM t_status`     // t_status 테이블의 데이터 가져오기
    },
    orderDetail: {
        query: `SELECT t1.id, t1.product_name, t1.product_price, t2.path, t3.quantity, t3.totalPrice, t3.order_id, t5.*, t4.email, t6.*
        FROM t_product t1, t_image t2, t_orders t3, t_user t4, t_order t5, t_status t6
        WHERE t1.id = t2.product_id AND t1.id = t3.product_id AND t3.user_email = t4.email AND t2.type = 1 AND t5.delivery_status = t6.status AND t5.order_id = ?`
    },
    orderUpdate: {
        query: `UPDATE t_order SET delivery_status = ?, transport_document_number = ? WHERE order_id = ?`
    },
    sellerInfo: {
        query: `SELECT admin FROM t_user WHERE email = ?`
    }
}