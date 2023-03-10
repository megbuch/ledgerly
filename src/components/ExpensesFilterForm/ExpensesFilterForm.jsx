export default function ExpensesFilterForm({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  function handleChange(event) {
    const category = event.target.value;
    setSelectedCategory(category);
  }

  return (
    <>
      <h3>Filter</h3>
      <form>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={handleChange}
        >
          {categories.map((category, index) => (
            <option key={category} value={index === 0 ? "" : category}>
              {category}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}
