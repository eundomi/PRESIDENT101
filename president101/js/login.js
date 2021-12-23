const login_id = document.forms["signin"].querySelector('[name="id"]');
const login_password =
  document.forms["signin"].querySelector('[name="password"]');

function LogInCheck() {
  if (!login_id.value) {
    swal({
      title: "로그인 실패",
      text: "아이디을 입력해 주세요.",
      icon: "warning",
    });
    return false;
  }
  if (!login_password.value) {
    swal({
      title: "로그인 실패",
      text: "비밀번호를 입력해 주세요.",
      icon: "warning",
    });
    return false;
  }
  return true;
}

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = login_id.value;
  const password = login_password.value;

  if (LogInCheck() === true) {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        userId: "elice",
        password: "helloelice",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "http://elice-kdt-sw-1st-vm11.koreacentral.cloudapp.azure.com:5000/api/user/login",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      //   서버랑 연동하는 post코드 여기에?
      swal({
        title: "로그인 성공",
        text: "회원가입에 성공하였습니다.",
        icon: "success",
      });
    } catch (err) {
      swal({
        title: "로그인 실패",
        text: "아이디, 비밀번호를 확인해주세요.",
        icon: "warning",
      });
      console.log(err);
    }
  }
});
