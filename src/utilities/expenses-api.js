import sendRequest from "./send-request";
const BASE_URL = "/api/expenses";

export async function createExpense(expenseData) {
  return await sendRequest(`${BASE_URL}`, "POST", expenseData);
}
