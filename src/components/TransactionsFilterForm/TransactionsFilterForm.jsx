import { useState } from "react";

export default function ExpensesFilterForm({
  categories,
  selectedCategory,
  setSelectedCategory,
  setSelectedDateRange,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  function handleCategoryChange(event) {
    const category = event.target.value;
    setSelectedCategory(category);
  }

  function handleStartDateChange(event) {
    const date = event.target.value;
    setStartDate(date);
    setSelectedDateRange((prevDateRange) => ({
      ...prevDateRange,
      startDate: date,
    }));
  }

  function handleEndDateChange(event) {
    const date = event.target.value;
    setEndDate(date);
    setSelectedDateRange((prevDateRange) => ({
      ...prevDateRange,
      endDate: date,
    }));
  }

  return (
    <>
      <form>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category, index) => (
            <option key={category} value={index === 0 ? "" : category}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="start-date">Start Date</label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <label htmlFor="end-date">End Date</label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </form>
    </>
  );
}
