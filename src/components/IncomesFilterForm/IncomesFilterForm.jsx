export default function FilterForm() {
    return (
      <>
        <h3>Filter</h3>
        <form>
          <label htmlFor="category">Category</label>
          <select id="category" name="category">
            <option value="" disabled>
              Select a category
            </option>
            {[
              "Sales",
              "Uncategorized Income"
            ].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label htmlFor="date">Start Date</label>
          <input
            type="date"
            id="date"
            name="date"
          />
          <label htmlFor="date">End Date</label>
          <input
            type="date"
            id="date"
            name="date"
          />
        </form>
      </>
    );
  }
  