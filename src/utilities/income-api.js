import sendRequest from "./send-request";
const BASE_URL = "/api/income";

export async function createIncome(incomeFormData) {
  return await sendRequest(`${BASE_URL}`, "POST", incomeFormData);
}
