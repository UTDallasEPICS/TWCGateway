import { logoutRedirectUrl } from "./auth0";

export default defineEventHandler(async (event) => {
  // console.log("inside logout api");
  const id_token = getCookie(event, "token");
  setCookie(event, "token", "");
  setCookie(event, "role", "");

  // console.log("from logout api id_token", id_token);
  // console.log(
  //   "from logout api logoutRedirectUrl",
  //   logoutRedirectUrl(id_token as string) || ""
  // );
  console.log("inside of logout.get.ts");
  await sendRedirect(event, logoutRedirectUrl(id_token as string) || "");
  // window.location.href = "http://localhost:3000/";
  // return await sendRedirect(event, "/");
});
