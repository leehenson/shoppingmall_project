module.exports = {
  // database의 data query로 가져오기
  productList: {
    // 제품 리스트가 있는 메인 화면 쿼리
    query: `SELECT t1.*, t2.path
        FROM t_product t1, t_image t2
        WHERE t1.id = t2.product_id AND t2.type = 1`, // 메인 화면에 띄울 제품 썸네일 데이터 가져오기
  },
  outerList: {
    // 아우터 리스트 화면 쿼리
    query: `SELECT t1.*, t2.path
        FROM t_product t1, t_image t2
        WHERE t1.id = t2.product_id AND t2.type = 1 AND t1.category_id = 1`, // category_id가 1인 아우터 제품들의 정보와 썸네일 이미지 가져오기
  },
  topList: {
    // 상의 리스트 화면 쿼리
    query: `SELECT t1.*, t2.path
        FROM t_product t1, t_image t2
        WHERE t1.id = t2.product_id AND t2.type = 1 AND t1.category_id = 2`, // category_id가 2인 상의 제품들의 정보와 썸네일 이미지 가져오기
  },
  bottomList: {
    // 하의 리스트 화면 쿼리
    query: `SELECT t1.*, t2.path
        FROM t_product t1, t_image t2
        WHERE t1.id = t2.product_id AND t2.type = 1 AND t1.category_id = 3`, // category_id가 3인 하의 제품들의 정보와 썸네일 이미지 가져오기
  },
  accList: {
    // 악세사리 리스트 화면 쿼리
    query: `SELECT t1.*, t2.path
        FROM t_product t1, t_image t2
        WHERE t1.id = t2.product_id AND t2.type = 1 AND t1.category_id = 4`, // category_id가 4인 악세사리 제품들의 정보와 썸네일 이미지 가져오기
  },
  productList2: {
    // 세일즈 리스트에 제품 등록할 제품 데이터 가져오는 쿼리
    query: `SELECT t3.*, t4.path FROM (SELECT t1.*, t2.category
          FROM t_product t1, t_category t2
          WHERE t1.category_id = t2.id) t3
          LEFT JOIN (SELECT * FROM t_image WHERE type=1) t4
          on t3.id = t4.product_id`,
  },
  productDetail: {
    // 제품 상세페이지 쿼리
    query: `SELECT t1.*, t2.path, t3.category
        FROM t_product t1, t_image t2, t_category t3
        WHERE t1.id = ? AND t1.id = t2.product_id AND t2.type = 3 AND t1.category_id = t3.id`,
  },
  productDetail2: {
    // t_product에서 해당 id를 가진 제품의 필요한 data만 가져오는 쿼리
    query: `SELECT t1.product_name, t1.product_price, t1.product_description, t1.product_color, t1.product_fabric, t1.product_model, t1.product_size, t1.product_sizeGuide, t1.tags
        FROM t_product t1 WHERE t1.id = ?`,
  },
  productMainImages: {
    // type이 2인 해당 id를 가진 이미지를 가져오는 쿼리
    query: `SELECT * FROM t_image WHERE product_id = ? AND type = 2`,
  },
  productInsert: {
    // 받아온 파라미터들을 t_product에 Insert하는 쿼리
    query: `INSERT INTO t_product SET ?`,
  },
  productImageInsert: {
    // 받아온 파라미터들을 t_image에 Insert하는 쿼리
    query: `INSERT INTO t_image SET ?`,
  },
  productUpdate: {
    // 해당 id를 가진 제품의 data를 받아온 파라미터들로 Update하는 쿼리
    query: `UPDATE t_product SET ? WHERE id = ?`,
  },
  imageList: {
    // 해당 id를 가진 제품의 이미지 가져오는 쿼리
    query: `SELECT * FROM t_image WHERE product_id=?`,
  },
  imageDelete: {
    // 해당 id를 가진 이미지 삭제하는 쿼리
    query: `DELETE FROM t_image WHERE id=?`,
  },
  productDelete: {
    // 해당 id를 가진 제품 삭제하는 쿼리
    query: `DELETE FROM t_product WHERE id=?`,
  },
  categoryList: {
    // 카테고리 리스트 갸져오는 쿼리
    query: `SELECT * FROM t_category`, // t_category 테이블의 데이터 가져오기
  },
  sellerList: {
    // 셀러 리스트 가져오는 쿼리
    query: `SELECT * FROM t_seller`, // t_seller 테이블의 데이터 가져오기
  },
  memberJoin: {
    // 유저 회원가입을 위한 동일한 email이 있는지 찾는 쿼리
    query: `SELECT email FROM t_user WHERE email = ?`,
  },
  bankList: {
    // 은행 리스트 가져오는 쿼리
    query: `SELECT bank_name FROM t_bank_name`, // t_bank_name 테이블의 데이터 가져오기
  },
  signUp: {
    // 카카오 로그인시 해당 정보를 Insert하는 쿼리
    query: `INSERT INTO t_user SET ? ON DUPLICATE KEY UPDATE ?`, // t_user에 동일한 데이터가 없으면 insert를 하고, 있으면 update를 함.
  },
  cartInsert: {
    // 받아온 파리미터를 t_cart에 Insert하는 쿼리
    query: `INSERT INTO t_cart (product_id, user_email, quantity, totalPrice) VALUES (?, ?, ?, ?)`,
  },
  cartList: {
    // 해당 email를 가진 t_product, t_image, t_cart data 가져오기
    query: `SELECT t1.id, t1.product_name, t1.product_price, t2.path, t3.cart_id, t3.quantity, t3.totalPrice, t4.email
        FROM t_product t1, t_image t2, t_cart t3, t_user t4
        WHERE t1.id = t2.product_id AND t1.id = t3.product_id AND t3.user_email = t4.email AND t2.type = 1 AND t4.email = ?`,
  },
  cartDelete: {
    // 해당 id를 가진 장바구니 정보 장바구니에서 삭제하는 쿼리
    query: `DELETE FROM t_cart WHERE cart_id=?`,
  },
  userInfo: {
    // 해당 email를 가진 회원 정보를 가져오는 쿼리
    query: `SELECT * FROM t_user WHERE email = ?`,
  },
  sellerInfo: {
    // t_seller 정보를 가져오는 쿼리
    query: `SELECT * FROM t_seller`,
  },
  orderPayment: {
    // 받아온 파리미터들을 t_order에 Insert하는 쿼리
    query: `INSERT INTO t_order (address, name, phone, requested_term, name_of_depositor, user_email, payment_amount) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  },
  cartCopy: {
    // 해당 email를 가진 t_cart data를 t_order로 복사하는 쿼리
    query: `INSERT INTO t_orders (cart_id, product_id, user_email, quantity, totalPrice, order_id)
        SELECT t1.cart_id, t1.product_id, t1.user_email, t1.quantity, t1.totalPrice, MAX(t2.order_id)
        FROM t_cart t1, t_order t2
        WHERE t1.user_email = ?
        GROUP BY t1.cart_id`,
  },
  deleteCart: {
    // 해당 email를 가진 t_cart data 삭제하는 쿼리
    query: `DELETE FROM t_cart WHERE user_email = ?`,
  },
  orderList: {
    // 해당 email를 가진 주문내역 정보 가져오기
    query: `SELECT t1.id, t1.product_name, t1.product_price, t2.path, t3.quantity, t3.totalPrice, t5.payment_amount, t3.order_id, t5.delivery_status, t5.created_date, t5.transport_document_number, t4.email, t6.*
        FROM t_product t1, t_image t2, t_orders t3, t_user t4, t_order t5, t_status t6
        WHERE t1.id = t2.product_id AND t1.id = t3.product_id AND t3.user_email = t4.email AND t2.type = 1 AND t5.delivery_status = t6.status AND t4.email = ?`,
  },
  orderCancle: {
    // 해당 cart_id를 가진 data의 delivery_state를 3으로 변경하여 주문취소로 바꿔주는 쿼리
    query: `UPDATE t_orders SET delivery_status = 3 WHERE cart_id = ?`,
  },
  userManagement: {
    // t_user의 data를 가져오는 쿼리
    query: `SELECT * FROM t_user`,
  },
  orderManagement: {
    // 모든 주문 정보를 가져오는 쿼리
    query: `SELECT t1.created_date, t1.order_id, t1.user_email, t1.name_of_depositor, t1.payment_amount, t1.delivery_status, t1.transport_document_number, t2.*
        FROM t_order t1, t_status t2
        WHERE t1.delivery_status = t2.status`,
  },
  statusList: {
    // 상태 리스트 가져오는 쿼리
    query: `SELECT status FROM t_status`, // t_status 테이블의 데이터 가져오기
  },
  orderDetail: {
    // 해당 order_id를 가진 주문내역 상세 정보 가져오기
    query: `SELECT t1.id, t1.product_name, t1.product_price, t2.path, t3.quantity, t3.totalPrice, t3.order_id, t5.*, t4.email, t6.*
        FROM t_product t1, t_image t2, t_orders t3, t_user t4, t_order t5, t_status t6
        WHERE t1.id = t2.product_id AND t1.id = t3.product_id AND t3.user_email = t4.email AND t2.type = 1 AND t5.delivery_status = t6.status AND t5.order_id = ?`,
  },
  orderUpdate: {
    // 받아온 파라미터들로 주문정보 변경하는 쿼리
    query: `UPDATE t_order SET delivery_status = ?, transport_document_number = ? WHERE order_id = ?`,
  },
};
