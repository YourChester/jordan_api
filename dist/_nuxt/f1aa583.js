(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{349:function(t,e,r){"use strict";r.r(e);r(25);var n=r(2),c={components:{VFormProduct:r(286).default},layout:"admin",asyncData:function(t){var e=t.$axios,r=t.params;return Object(n.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.get("/admin/products/".concat(r.id));case 3:return n=t.sent,t.abrupt("return",{product:n.data.product});case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},methods:{saveProduct:function(form){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(r=JSON.parse(JSON.stringify(form))).dateIn=r.dateIn?new Date(r.dateIn):"",e.next=5,t.$axios.put("/admin/products/".concat(t.product._id),r);case 5:t.$router.push("/admin-panel"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}}},o=r(6),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("v-form-product",{attrs:{"product-props":t.product},on:{save:t.saveProduct}})}),[],!1,null,null,null);e.default=component.exports}}]);