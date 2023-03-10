import sendRequest from "./send-request";
const BASE_URL = "/api/expenses";

export async function createExpense(expenseFormData) {
  return await sendRequest(`${BASE_URL}`, "POST", expenseFormData);
}

export async function getExpenses() {
  return await sendRequest(`${BASE_URL}`, "GET");
}

export async function deleteExpense(expenseId) {
  return await sendRequest(`${BASE_URL}/${expenseId}`, "DELETE");
}

export async function updateExpense(expenseId, expenseFormData) {
  return await sendRequest(`${BASE_URL}/${expenseId}`, "PUT", expenseFormData);
}