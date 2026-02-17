export default defineEventHandler(async (event) => {
  clearAuthCookies(event);
  return { success: true };
});
