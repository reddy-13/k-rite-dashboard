// script.js
// Function to generate random dummy data for products
function generateDummyData() {
  const products = [];
  for (let i = 1; i <= 100; i++) {
    products.push({
      id: i,
      brand: `Brand ${i}`,
      description: `Description ${i}`,
      members: [`Member ${i}`, `Member ${i + 1}`, `Member ${i + 2}`],
      category: "Automation",
      tags: [`Tag${i}`, `Tag${i + 1}`],
      nextMeeting: "In 30 minutes",
    });
  }
  return products;
}

// Function to render products in the table
function renderProducts(products, currentPage, itemsPerPage) {
  const productTableBody = document.getElementById("productTableBody");
  productTableBody.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageProducts = products.slice(startIndex, endIndex);

  currentPageProducts.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="py-2 px-4 border-b"><input type="checkbox" class="form-checkbox" @click="selectRow(${
              product.id
            })"></td>
            <td class="py-2 px-4 border-b">
                <div class="flex items-center">
                    <img src="https://placekitten.com/30/30" alt="Brand Avatar" class="w-6 h-6 rounded-full mr-2">
                    ${product.brand}
                </div>
            </td>
            <td class="py-2 px-4 border-b">${product.description}</td>
            <td class="py-2 px-4 border-b">
                <div class="flex items-center space-x-2">
                    ${product.members
                      .map(
                        (member) =>
                          `<img src="https://placekitten.com/20/20" alt="${member}" class="w-4 h-4 rounded-full">`
                      )
                      .join("")}
                </div>
            </td>
            <td class="py-2 px-4 border-b">
                <span class="bg-blue-200 text-blue-800 py-1 px-2 rounded-full">${
                  product.category
                }</span>
            </td>
            <td class="py-2 px-4 border-b">
                ${product.tags
                  .map(
                    (tag) =>
                      `<span class="bg-gray-300 text-gray-600 py-1 px-2 rounded-full">#${tag}</span>`
                  )
                  .join("")}
            </td>
            <td class="py-2 px-4 border-b">
                <span class="bg-gray-300 text-gray-600 py-1 px-2 rounded-full">${
                  product.nextMeeting
                }</span>
            </td>
        `;
    productTableBody.appendChild(row);
  });
}

// Alpine.js functions
Alpine.data("selectedRows", () => ({
  rows: [],
  selectRow(id) {
    if (this.rows.includes(id)) {
      this.rows = this.rows.filter((rowId) => rowId !== id);
    } else {
      this.rows.push(id);
    }
  },
  selectAllRows() {
    const checkboxes = document.querySelectorAll(".form-checkbox");
    this.rows = [];
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        this.rows.push(index + 1);
      }
    });
  },
}));

// Initialize products and render the table
const products = generateDummyData();
const currentPage = 1;
const itemsPerPage = 10;
renderProducts(products, currentPage, itemsPerPage);
