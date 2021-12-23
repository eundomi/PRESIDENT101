//회원가입창 변수
const register_id = document.forms["register"].querySelector('[name="id"]');
const register_password =
  document.forms["register"].querySelector('[name="password"]');
const register_password_chk = document.forms["register"].querySelector(
  '[name="password_chk"]'
);
const register_name = document.forms["register"].querySelector('[name="name"]');
const register_email =
  document.forms["register"].querySelector('[name="email"]');
const register_number =
  document.forms["register"].querySelector('[name="number"]');

//경고창 띄어주는 변수
const passworderr = document.getElementById("passwordError");
const passwordchkerr = document.getElementById("passwordchkError");
const emailerr = document.getElementById("emailError");
const numbererr = document.getElementById("numberError");

const port =
  "http://elice-kdt-sw-1st-vm11.koreacentral.cloudapp.azure.com:5000";

//팝업창 함수
function RegisterCheck() {
  if (!register_id.value) {
    swal({
      title: "회원가입 실패",
      text: "아이디을 확인해주세요.",
      icon: "warning",
    });
    return false;
  }
  pwdCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!pwdCheck.test(register_password.value)) {
    swal({
      title: "회원가입 실패",
      text: "4~12자의 영문 대 소문자 숫자 및 특수문자를 입력해야합니다.",
      icon: "warning",
    });
    return false;
  }
  if (register_password.value != register_password_chk.value) {
    swal({
      title: "회원가입 실패",
      text: "비밀번호가 일치하지 않습니다.",
      icon: "warning",
    });
    return false;
  }

  if (!register_name.value) {
    swal({
      title: "회원가입 실패",
      text: "이름을 확인해주세요.",
      icon: "warning",
    });
    return false;
  }
  var emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  if (!emailCheck.test(register_email.value)) {
    swal({
      title: "회원가입 실패",
      text: "이메일을 확인해주세요.",
      icon: "warning",
    });
    return false;
  }

  var reg = /^01[0|1|6|7|8|9]{1}[0-9]{8}$/;
  if (!reg.test(register_number.value)) {
    swal({
      title: "회원가입 실패",
      text: "정확한 휴대폰 번호를 입력해주세요.",
      icon: "warning",
    });
    return false;
  }
  return true;
}

//입력된 정보가 안맞는 경우 나오게되는 문구
register_password.addEventListener("input", (e) => {
  passworderr.innerHTML = "";
  var pwdCheck =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!pwdCheck.test(e.target.value)) {
    passworderr.style.display = "block";
    passworderr.innerHTML =
      "4~12자의 영문 대 소문자 숫자 및 특수문자를 입력하세요.";
  } else {
    passworderr.style.display = "none";
  }
});
register_password_chk.addEventListener("input", (e) => {
  if (register_password.value != e.target.value) {
    passwordchkerr.style.display = "block";
    passwordchkerr.innerHTML = "비밀번호가 일치하지 않습니다.";
    passwordchkerr.style.color = "red";
  } else {
    passwordchkerr.innerHTML = "";
    passwordchkerr.style.display = "none";
  }
});
register_email.addEventListener("input", (e) => {
  var emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  if (!emailCheck.test(e.target.value)) {
    emailerr.style.display = "block";
    emailerr.innerHTML = "example@email.com형식으로 입력되었는지 확인하세요.";
  } else {
    emailerr.style.display = "none";
  }
});
register_number.addEventListener("input", (e) => {
  numbererr.innerHTML = "";
  var reg = /^01[0|1|6|7|8|9]{1}[0-9]{8}$/;
  if (!reg.test(e.target.value)) {
    numbererr.style.display = "block";
    numbererr.innerHTML = "휴대폰번호가 올바르지 않습니다.";
  } else {
    numbererr.style.display = "none";
  }
});

document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    if (RegisterCheck() === true) {
      const req = {
        userId: register_id.value,
        userName: register_name.value,
        email: register_email.value,
        password: register_password.value,
        phone: register_number.value,
      };
      fetch(`${port}/api/user/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
        redirect: "follow",
      })
        .then((res) => {
          if (res.status === 201) {
            swal({
              title: "회원가입 성공",
              text: "회원가입 성공하였습니다.",
              icon: "success",
            }).then((value) => {
              if (value) {
                window.location.href = "/president101/index.html";
              }
            });
          } else {
            swal({
              title: "회원가입 실패",
              text: "이미 존재하는 계정입니다.",
              icon: "warning",
            });
          }
        })
        .catch((error) => console.log("error", error));
    }
  });
