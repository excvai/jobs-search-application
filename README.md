# Job Search Application

## 🛠 Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Formik](https://formik.org/), [Yup](https://github.com/jquense/yup), [SWR](https://swr.vercel.app/), [Axios](https://axios-http.com/)
- **Backend**: [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/)

---

## 📁 Project Structure

src
├── app # Route-based files using Next.js 14 App Router
├── components # Reusable shared components
├── helpers # Small utility functions
├── hooks # Custom React hooks
├── icons # SVG icon components

---

## 🌐 Company Logos

Company logos are fetched using the [Ninjas Logo API](https://api-ninjas.com/api/logo).  
Please note that the API does not provide logos for all companies, so some job detail pages (`/job-details/:id`) may not display a logo. This is a known limitation of the external service.

---

## ⚠️ Route Customization

Although the original task suggested using the `/jobs` route, I intentionally opted to use the root `/` route for job listings.

---

## 🚀 Getting Started

To run the project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
