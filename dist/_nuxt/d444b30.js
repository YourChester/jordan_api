(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{269:function(t,e,r){var content=r(299);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(24).default)("28af8bfe",content,!0,{sourceMap:!1})},298:function(t,e,r){"use strict";r(269)},299:function(t,e,r){var o=r(23)(!1);o.push([t.i,".auth-form[data-v-12d6ed8e]{width:300px;background-color:#fff;border-radius:10px;box-shadow:0 0 30px rgba(0,0,0,.2)}.auth-form__wrapper[data-v-12d6ed8e]{width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;background-color:#d2d2d2}.auth-form__top[data-v-12d6ed8e]{display:flex;justify-content:center;padding:10px}.auth-form__top img[data-v-12d6ed8e]{width:70%}.auth-form__main[data-v-12d6ed8e]{display:flex;flex-direction:column;align-items:center;padding:0 10px}.auth-form__main .input-group[data-v-12d6ed8e]{width:100%;margin-bottom:10px;text-align:center}.auth-form__main .input-group input[data-v-12d6ed8e]{width:100%;box-sizing:border-box;border-radius:5px;border:2px solid #000;padding:5px;font-size:16px;font-weight:600;outline:none}.auth-form__main .input-group input[data-v-12d6ed8e]:active,.auth-form__main .input-group input[data-v-12d6ed8e]:focus{border-color:red}.auth-form__bottom[data-v-12d6ed8e]{padding:0 10px 10px;display:flex;align-items:center;justify-content:center}.auth-form__bottom button[data-v-12d6ed8e]{padding:10px 20px;font-size:16px;font-weight:600;color:#fff;border:none;border-radius:10px;background-color:red;outline:none}",""]),t.exports=o},335:function(t,e,r){"use strict";r.r(e);var o=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"auth-form__top"},[e("img",{attrs:{src:r(97),alt:"logo"}})])}],n=(r(25),r(2)),d={layout:"auth",data:function(){return{form:{login:"",password:""}}},methods:{getAuth:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$auth.loginWith("local",{data:t.form});case 3:t.$router.push("/admin-panel/products"),r=setInterval(Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.$auth.strategy.token.status().valid()){e.next=5;break}return e.next=3,t.$auth.logout();case 3:t.$router.push("/admin-panel/login"),clearInterval(r);case 5:case"end":return e.stop()}}),e)}))),5e3),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()}}},l=(r(298),r(6)),component=Object(l.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"auth-form__wrapper"},[r("div",{staticClass:"auth-form"},[t._m(0),t._v(" "),r("div",{staticClass:"auth-form__main"},[r("div",{staticClass:"input-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.login,expression:"form.login"}],attrs:{type:"text",name:"login",placeholder:"Login"},domProps:{value:t.form.login},on:{input:function(e){e.target.composing||t.$set(t.form,"login",e.target.value)}}})]),t._v(" "),r("div",{staticClass:"input-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.password,expression:"form.password"}],attrs:{type:"password",name:"login",placeholder:"Пароль"},domProps:{value:t.form.password},on:{input:function(e){e.target.composing||t.$set(t.form,"password",e.target.value)}}})])]),t._v(" "),r("div",{staticClass:"auth-form__bottom"},[r("button",{on:{click:t.getAuth}},[t._v("Войти")])])])])}),o,!1,null,"12d6ed8e",null);e.default=component.exports}}]);