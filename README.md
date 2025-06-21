
# Geer-Inspired E-commerce Platform 🛒

This is a full-stack e-commerce web application built as part of an internship assignment. The frontend is built using **Next.js with the App Router**, and backend APIs are implemented using **Next.js API Routes**.

---

## 🧩 Tech Stack

- **Frontend & Backend:** Next.js (App Router with API Routes)
- **Styling:** Tailwind CSS / CSS Modules / Styled Components (adjust based on what you used)
- **Data Storage:** In-memory array or local JSON file

---

## 📁 Folder Structure

```
geer-intern-assignment/
├── app/                      # App Router-based pages
│   ├── products/             # Product listing page
│   └── products/[id]/        # Single product page (optional)
├── pages/api/products/       # API routes for product management
│   ├── index.js              # GET and POST handler
│   └── [id].js               # DELETE handler
├── components/               # Reusable components
├── public/                   # Public assets like product images
├── styles/                   # Styling files
└── README.md
```

---

## 🚀 How to Run the Project

### 📦 Prerequisites

- Node.js ≥ 18.x
- npm or yarn

### ▶️ Running the App

```bash
git clone https://github.com/your-username/geer-intern-assignment.git
cd geer-intern-assignment
npm install
npm run dev
```

Then open your browser at:  
`http://localhost:3000/products`

---

## 📌 Features Implemented

- Responsive Product Listing Page (`/products`)
- Each product shows:
  - Image
  - Name
  - Price
- API Routes:
  - `GET /api/products` – Fetch all products
  - `POST /api/products` – Add a new product
  - `DELETE /api/products/:id` – Delete a product by ID

---

## 💡 Bonus Features (if implemented)

- Product search or filtering
- Product details page at `/products/[id]`

---

## 📝 Notes & Assumptions

- Product data is stored in memory; restarting the server resets the data.
- App uses the App Router (`app/`) in Next.js 13+.
- No authentication or user accounts are implemented.
- Meant for demo and evaluation purposes.

---

## 👨‍💻 Author

Shivam Singh Yadav  
Internship Assignment – Full Stack Developer (Next.js)  
Submitted via Internshala
