export const validRegister = (user) => {

    const email = user.email
    const name = user.name
    const password = user.password

    console.log(user.email)

    const errors  = [];

    if(!email.trim()) {
         errors.push("Vui lòng nhập email của bạn!")
    }else if (!validateEmail(email) ) {
         errors.push("Email sai định dạng!")
    }else if (!name.trim() ) {
     errors.push("Vui lòng nhập tài khoản!")
    }else if (!password.trim() ) {
     errors.push("Vui lòng nhập mật khẩu!")
    }

    
  
     return {
         errMsg : errors,
         errLength : errors.length
     }

}



function validateEmail(email) 
{
var re = /\S+@\S+\.\S+/;
return re.test(email);
}
