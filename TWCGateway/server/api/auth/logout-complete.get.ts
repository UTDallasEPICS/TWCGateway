export default defineEventHandler(async event => {
  // console.log("-----------------------------------------------------");
  // console.log("inside logout-complete api");
  // console.log("from logout-complete api token", getCookie(event, "token"));
  setCookie(event, 'token', '');
  setCookie(event, 'role', '');
  // const authToken = getCookie(event, "token");
  // authToken.value = null;
  // console.log("from logout-complete api token", getCookie(event, "token"));
  // console.log("-----------------------------------------------------");
  // setCookie(event, "cvuser", "");
  // await sendRedirect(event, "/");
  // console.log("from logout-complete api token", getCookie(event, "token"));
  // console.log("-----------------------------------------------------");
});
