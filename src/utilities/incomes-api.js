import sendRequest from "./send-request";
const BASE_URL = "/api/incomes";

export async function createIncome(incomeFormData) {
  return await sendRequest(`${BASE_URL}`, "POST", incomeFormData);
}

export async function getIncomes() {
  return await sendRequest(`${BASE_URL}`, "GET");
}

export async function deleteIncome(incomeId) {
  return await sendRequest(`${BASE_URL}/${incomeId}`, "DELETE");
}

export async function updateIncome(incomeId, incomeFormData) {
  return await sendRequest(`${BASE_URL}/${incomeId}`, "PUT", incomeFormData);
}
