export default defineEventHandler(async event => {
  // console.log("-----------------------------------------------------");
  // console.log("inside logout-complete api");
  // console.log("from logout-complete api token", getCookie(event, "token"));
  console.log('--------------------');
  console.log('inside of logout-complete.get.ts');
  setCookie(event, 'token', '');
  setCookie(event, 'role', '');
  console.log('--------------------');
  // const authToken = getCookie(event, "token");
  // authToken.value = null;
  // console.log("from logout-complete api token", getCookie(event, "token"));
  // console.log("-----------------------------------------------------");
  // setCookie(event, "cvuser", "");
  // await sendRedirect(event, "/");
  // console.log("from logout-complete api token", getCookie(event, "token"));
  // console.log("-----------------------------------------------------");
});
