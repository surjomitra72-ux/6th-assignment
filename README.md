# FitLog 🏋️

**FitLog** is a modern, dark-themed workout library and planning application built with Next.js and TypeScript. It helps users explore workouts, view detailed exercise information, create a daily workout plan, save workouts for later, and track completed exercises.

## 🔗 Live Demo

Add your deployed live link here:

`https://6th-assignment-mu.vercel.app/`

## 📌 GitHub Repository

Add your GitHub repository link here:

`https://github.com/surjomitra72-ux/6th-assignment`

---

## ✨ Features

### 1. 🏋️ Workout Library

Browse a collection of workouts with:

* Workout image
* Muscle group/category
* Workout name
* Equipment
* Duration
* Calories
* Rating

### 2. 📖 Workout Details

Each workout has a dedicated details page containing:

* Workout image
* Description
* Muscle groups
* Equipment
* Difficulty
* Sets and reps
* Duration
* Calories
* Rating
* Step-by-step instructions

### 3. 📋 Today's Plan

Users can add workouts to their daily plan and manage them from the **My Plan** page.

* Maximum 5 workouts per plan
* View workout details
* Mark workouts as completed
* Remove workouts
* Live plan counter

### 4. 🔖 Save for Later

Users can save workouts for later and access them from the **Saved** tab.

* Save workouts
* View saved workouts
* Remove saved workouts
* Live saved counter

### 5. 📊 Workout Statistics

The My Plan page provides live statistics for:

* Total exercises
* Total workout minutes
* Total calories

### 6. 🔄 Sort Workouts

Workouts in the My Plan page can be sorted by:

* Duration
* Calories
* Rating

### 7. 💾 Local Storage

Plan, saved workouts, and completed workout data are stored in the browser's local storage so the data remains available after refreshing the page.

### 8. 📱 Responsive Design

FitLog is designed to work across:

* Mobile
* Tablet
* Desktop

---

## 🛠️ Technologies Used

| Technology     | Purpose                       |
| -------------- | ----------------------------- |
| Next.js        | Application framework         |
| TypeScript     | Type-safe development         |
| React          | UI development                |
| Tailwind CSS   | Styling and responsive design |
| Framer Motion  | Hero animations               |
| Lucide React   | Icons                         |
| React Toastify | Toast notifications           |
| LocalStorage   | Client-side data persistence  |

---

## 🌐 API

FitLog uses the following API:

### All Workouts

```text
https://api.abcz.workers.dev/api/fitlog
```

### Single Workout

```text
https://api.abcz.workers.dev/api/fitlog/:id
```

---

## 📂 Main Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── my-plan/
│   │   └── page.tsx
│   └── workouts/
│       └── [id]/
│           ├── page.tsx
│           └── loading.tsx
│
├── components/
│   ├── shared/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── WorkoutCard.tsx
│   │   └── ToastProvider.tsx
│   │
│   ├── home/
│   │   ├── Hero.tsx
│   │   └── Library.tsx
│   │
│   ├── workout/
│   │   ├── WorkoutDetails.tsx
│   │   ├── Specs.tsx
│   │   └── WorkoutActions.tsx
│   │
│   └── myPlan/
│       ├── PlanHeader.tsx
│       ├── PlanStats.tsx
│       ├── PlanTabs.tsx
│       ├── PlannedWorkoutCard.tsx
│       └── EmptyState.tsx
│
├── context/
│   └── FitLogContext.tsx
│
├── types/
│   └── workout.type.ts
│
└── lib/
    └── api.ts
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
https://github.com/surjomitra72-ux/6th-assignment
```

### 2. Go to the project directory

```bash
cd fitlog
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open in browser

```text
http://localhost:3000
```

---

## 🎯 Core User Flow

```text
Home
  ↓
Browse Workouts
  ↓
Workout Details
  ↓
Add to Today's Plan
        or
Save for Later
  ↓
My Plan
  ↓
Mark as Done / Remove
```

---

## 📱 Responsive Layout

FitLog provides a responsive experience across different screen sizes.

* **Mobile:** Single-column workout cards
* **Tablet:** Two-column workout cards
* **Desktop:** Three-column workout grid

---

## 👨‍💻 Developer

**Surjo Mitra**

Built as a workout library and planning application using modern web development technologies.

---

## 📄 License

This project was created for educational and assignment purposes.
