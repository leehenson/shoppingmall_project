import axios from "axios"; // axios 호출

export default {
  methods: {
    // async와 await을 기반으로 서로 데이터를 주고 받을 수 있게 공통(모든 vue 컨포넌트에서 사용 가능한 모듈) 메소드 선언
    async $api(url, data) {
      // url을 받고, data를 파라미터로 주고 받음
      return (
        await axios({
          // axios로 서버를 호출하고, 그 결과를 return하는 방식
          method: "post", // 전부 post 방식으로 호출
          url, // url 호출
          data, // data 받음
        }).catch((e) => {
          // 예외처리
          console.log(e); // 일단 console.log로 에러 표현
        })
      ).data; // data retrun
    },
    $base64(file) {
      //  8비트 이진 데이터를 문자 코드에 영향을 받지 않는 공통 ASCII 문자열로 바꾸는 인코딩 방식
      return new Promise((resolve) => {
        var a = new FileReader();
        a.onload = (e) => resolve(e.target.result);
        a.readAsDataURL(file);
      });
    },
    $currencyFormat(value, format = "#,###") {
      // 가격,등 세자리마다 ,을 찍어주는 메소드
      if (value == 0 || value == null) return 0;

      var currency = format.substring(0, 1);
      if (currency === "$" || currency === "₩") {
        format = format.substring(1, format.length);
      } else {
        currency = "";
      }

      var groupingSeparator = ",";
      var maxFractionDigits = 0;
      var decimalSeparator = ".";
      if (format.indexOf(".") == -1) {
        groupingSeparator = ",";
      } else {
        if (format.indexOf(",") < format.indexOf(".")) {
          groupingSeparator = ",";
          decimalSeparator = ".";
          maxFractionDigits = format.length - format.indexOf(".") - 1;
        } else {
          groupingSeparator = ".";
          decimalSeparator = ",";
          maxFractionDigits = format.length - format.indexOf(",") - 1;
        }
      }

      var prefix = "";
      var d = "";
      // v = String(parseFloat(value).toFixed(maxFractionDigits));

      var dec = 1;
      for (var i = 0; i < maxFractionDigits; i++) {
        dec = dec * 10;
      }

      var v = String(Math.round(parseFloat(value) * dec) / dec);

      if (v.indexOf("-") > -1) {
        prefix = "-";
        v = v.substring(1);
      }

      if (
        maxFractionDigits > 0 &&
        format.substring(format.length - 1, format.length) == "0"
      ) {
        v = String(parseFloat(v).toFixed(maxFractionDigits));
      }

      if (maxFractionDigits > 0 && v.indexOf(".") > -1) {
        d = v.substring(v.indexOf("."));
        d = d.replace(".", decimalSeparator);
        v = v.substring(0, v.indexOf("."));
      }
      var regExp = /\D/g;
      v = v.replace(regExp, "");
      var r = /(\d+)(\d{3})/;
      while (r.test(v)) {
        v = v.replace(r, "$1" + groupingSeparator + "$2");
      }

      return prefix + currency + String(v) + String(d);
    },
  },
};
