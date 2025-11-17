# SkillSwap: Knowledge Exchange Platform

## Project Description & Purpose

SkillSwap is a modern, single-page web application designed to be a dynamic marketplace for knowledge exchange. Its primary purpose is to connect individuals seeking to learn new skills with verified, expert providers. The application provides a seamless, secure, and intuitive platform for exploring various skills, viewing detailed course information, and instantly booking sessions.

 ## Key Features

* **Robust Authentication System:** Users can securely sign up and log in using email/password or instantly via Google Sign-in (Firebase Authentication).
* **Protected Routing:** Ensures security by restricting access to detailed skill views (`/skill/:skillId`) and the user's personal profile (`/profile`) until the user is authenticated.
* **User Profile Management:** Authenticated users have the ability to view and update their display name and profile avatar URL.
* **Dynamic Skill Display:** Features an image carousel (using Swiper) and categorized card grids for easy discovery of popular skills and top-rated providers.
* **Detailed Booking Page:** Provides a rich, dedicated page for each skill showing price, rating, provider contact information, course overview, and a functional session booking form.
* **Interactive UI/UX:** The interface is built with Tailwind CSS for a responsive, modern design and utilizes AOS (Animate On Scroll) for engaging, staggered entrance animations across the main pages.
* **Password Management:** Includes a dedicated page for users to easily request a password reset link.
* **Toast Notifications:** Uses `react-toastify` to display helpful success and error messages for login, signup, booking, and profile updates.

##  Tech Stack & Used Packages (npm)

## Live link- https://skillswap-3ba4e.web.app

The project is built on the **React** framework and uses **Firebase** for authentication and backend services.

## | Category | Package Name | Used For |
| **Core** | `react`, `react-dom` | Building the user interface and component logic. |
| **Routing** | `react-router-dom` | Managing navigation and URL routes (e.g., `/home`, `/skill/:skillId`). |
| **Styling** | `tailwindcss` | Utility-first CSS framework (Inferred from utility classes used across all components). |
| **Authentication** | `firebase` | User registration, login, social sign-in (Google), password reset, and profile updates. |
| **Auth State** | `react-firebase-hooks` | Simplifying the integration and state management of Firebase Authentication. |
| **Notifications** | `react-toastify` | Displaying success and error alerts across the app. |
| **UI Components** | `lucide-react` | Providing clean, modern icons for navigation and feature elements. |
| **Carousels** | `swiper`, `swiper/react` | Implementing the continuous image slider and the top providers carousel. |
| **Animations** | `aos` (Animate On Scroll) | Triggering visually appealing fade-in and slide animations as elements come into view. |


