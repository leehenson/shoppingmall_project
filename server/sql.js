module.exports = {  // database의 data query로 가져오기
    productList: {  
        query: `select * from t_product`    // t_product 테이블의 데이터 가져오기
    },
    sellerList: {
        query: `select * from t_seller`     // t_seller 테이블의 데이터 가져오기
    }
}