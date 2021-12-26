const login_id = document.forms["signin"].querySelector('[name="id"]');
const login_password =
  document.forms["signin"].querySelector('[name="password"]');
const port =
  "http://elice-kdt-sw-1st-vm11.koreacentral.cloudapp.azure.com:5000";

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

  if (LogInCheck() === true) {
    const req = {
      userId: login_id.value,
      password: login_password.value,
    };
    fetch(`${port}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(req),
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.token) {
          swal({
            title: "로그인 성공",
            text: "로그인에 성공하였습니다.",
            icon: "success",
          }).then((value) => {
            if (value) {
              history.back();
            }
          });
        } else {
          swal({
            title: "로그인 실패",
            text: "아이디, 비밀번호를 확인해주세요.",
            icon: "warning",
          });
        }
      })
      .catch((error) => console.log("error", error));
  }
});
