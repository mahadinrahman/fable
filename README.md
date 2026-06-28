# 📚 Fable – Digital Ebook Sharing & Publishing Platform

**Fable** is a comprehensive MERN stack digital platform that bridges the gap between ebook lovers, avid readers, collectors, and talented writers. It democratizes access to literature by allowing readers to browse, discover, and securely purchase original ebooks, while empowering emerging writers to reach a global audience and manage their digital creations.

## 🎯 Purpose of the Project

Traditional reading is often limited by physical bookstores or libraries. **Fable** aims to solve this by providing an online ecosystem for original literature. From a technical standpoint, this project serves to demonstrate advanced MERN stack engineering, including complex role-based access control (RBAC), secure multi-party authentication, automated payment processing pipelines, and responsive dynamic analytics.


🔗 **Live Client:** https://fable-jet.vercel.app
🔗 **Live Server:** https://fable-server-zeta.vercel.app

---

## ✨ Key Features

### 👤 User & Authentication Flow
* **Hybrid Authentication:** Multi-option registration using Email/Password or Google OAuth (integrated via `BetterAuth`).
* **Role-Based Access Control (RBAC):** Post-registration onboarding allowing selection between **Reader (User)** and **Writer** roles.
* **Secure Sessions:** Secure JWT-based session management with a 7-day expiration policy, built to prevent session drops upon browser reloading.

### 📖 Reader Features
* **Dynamic Exploration:** Advanced browse engine featuring text search, genre filtering, and sort functionality.
* **Immersive Previews:** Comprehensive information cards containing description previews, price tags, genres, and a "Sold" badge indicator.
* **Secure Payment Flow:** Instant payment processing using Stripe API. Purchased material instantly updates context states to render full content access.
* **Personalization:** Ability to bookmark favorite books and track historical readings directly on dashboards.

### ✍️ Writer Features
* **Verification Gate:** One-time verification payment infrastructure to activate writer capabilities.
* **Creative Freedom:** Robust CRUD operations to Upload, Edit, and Manage ebooks alongside structural publish/unpublish toggles.
* **Ebook Performance Tracking:** Dedicated sales analytical history dashboard showing metrics on sold materials.

### 🛡️ Admin & Operational Capabilities
* **System Oversight:** Centralized command center allowing role reassignments (User/Writer/Admin).
* **Global Content Controls:** Executive permissions to override publish statuses or delete materials across the platform.
* **Financial Tracking:** Consolidated ledger displaying all platform-wide transaction entries.

---

## 🎨 Design & UX/UI Elements

* **Anti-Gobindo Design Paradigm:** Designed with meticulous mathematical alignment, balanced negative white spacing, and high-quality modern layouts.
* **Fluid Animations:** Seamless UI transitions powered by **Framer Motion**, featuring staggered element reveals on scrolling, hover scaling, and hero text fade-ins.
* **Skeleton Loading Architecture:** Integrated custom Tailwind layout skeletons providing premium content transitions and preventing visual layout shifts.

---

## 🛠️ Technologies & npm Packages Used

### Frontend
* **Framework/Core:** React.js, React Router DOM (Dynamic Routing)
* **State Management & Auth:** JWT Decode, BetterAuth (Google OAuth integration)
* **Styling & Motion:** Tailwind CSS, Framer Motion, React Icons
* **Payment Gateways:** `@stripe/stripe-js`, `@stripe/react-stripe-js`
* **Image Hosting:** ImgBB API Integration

### Backend & Database
* **Environment:** Node.js, Express.js
* **Database:** MongoDB, Mongoose (Schema mapping & strict querying)
* **Security:** JSON Web Tokens (JWT), `bcryptjs`, `dotenv`, `cors`

---

## 👨‍💻 Author

Developed with ❤️ by **Mahadin Rahman** ✨  
*Feel free to reach out for collaborations or feedback!*