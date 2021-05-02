<template>
  <div class="form-signin text-center" >
    <img class="mb-4" src="../assets/logo.png" alt="" width="300px">
    <form @submit.prevent="login">
  
      <!-- <label for="phoneNumber" class="visually-hidden">電話號碼</label> -->
      <input type="text" v-model="phoneNumber" id="inputPhoneNumber" class="form-control" required autofocus>
       <br>
      <!-- <label for="inputPassword" class="visually-hidden">密碼</label> -->
      <input type="passWord"  v-model="passWord" id="inputPassword" class="form-control" placeholder="密碼" required>
      <br>
      
      <button class="w-100 btn btn-lg btn-primary" type="submit">登入</button>
    </form>
    
   
  </div>
</template>
<script>
  
  export default {
    data () {
      return {
        phoneNumber: '',
        passWord: '',
      }
    },
    methods: {
      login(){
      
        let phoneNumber = this.phoneNumber
        let passWord = this.passWord
        let status = ""
        let userId = ""
        // 帳號密碼需驗證不能為空
        // if (phoneNumber !== '' && passWord !== '') {
        //   this.loginForm.token = token
        // } else {
        //   alert('帳號密碼不能為空')
        // }
        console.log("data");
         $.post(
            "http://140.113.216.53:8000/login/",
            {
              // phoneNum: this.phoneNumber,
              // password: this.passWord,
              phoneNum: "0911111111",
              password: "test",
              platform: "1",
            },
            function (data) {
              console.log(data);
               status = data.status
              userId = data.userID
            }
          );
        if( status == 0 )
          this.$router.push('Home');
        else
          alert('login failed');
      }
    } 
  }
</script>
<style>
    html,
    body {
    height: 100%;
    }

    body {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    }

    .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    }
    .form-signin .checkbox {
    font-weight: 400;
    }
    .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
    }
    .form-signin .form-control:focus {
    z-index: 2;
    }
    .form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    }

    
    .bd-placeholder-img {
      font-size: 1.125rem;
      text-anchor: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    @media (min-width: 768px) {
      .bd-placeholder-img-lg {
        font-size: 3.5rem;
      }
    }

</style>