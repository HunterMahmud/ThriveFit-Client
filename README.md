# ThriveFit

**ThriveFit** is a user-friendly online gym management website designed to help users choose gym classes or become a trainer.

**Visit the live site:** [ThriveFit](https://thrive-fit-f0d68.web.app/).

**Category:** assignment_category_0010

### Admin Login Credentials:
    Email: admin@admin.com
    Password: Admin@1234

## Features:
- **Home Page**: Provides a brief overview of the entire gym site, explaining why this website is beneficial and detailing the services offered.

- **Login and Registration**: Website provide a secure login and registration system and login with social accound such as goole popup login.

- **All Trainers Page**: Users can view detailed profiles of trainers and book available slots. Trainer profiles include images, expertise areas, and other relevant information.

- **All Classes Page**: Contains all the classes created by the admin. Trainers can add slots by selecting an existing class but cannot create new classes themselves.

- **Different Roles**: Users have three different roles: Admin, Trainer, and Member. New users register as Members by default. They can apply to become Trainers, and if the Admin approves, their role changes accordingly.

- **Dashboard**: The website features a comprehensive dashboard where users can:
    - **Admin**: Manage all trainers, delete trainers, add forum posts, view financial details, and more.
    - **Trainer**: Manage slots, delete slots, add new slots, and view bookings.
    - **Member**: Update profile information, apply to become a trainer, and view the activity log related to their application.

- **Admin Role**: Admins are the website owners with special privileges, such as managing trainers, approving or rejecting trainer applications with feedback, viewing financial details, managing newsletter subscriptions, adding new classes, and posting community or forum updates.

- **Trainer Role**: Trainers can manage their slots, delete slots, add new slots, view bookings, and post in the community or forum.

- **Member Role**: Members can view trainer details, book classes, make payments, read forum posts, upvote or downvote posts, view class schedules, manage their accounts, apply to become a trainer, and view the status and feedback of their applications.

- **Protected Routes**: The website uses protected routes to ensure that users can only access pages appropriate to their role, preventing unauthorized access to admin or trainer pages.

- **Security**: The website's login and registration system is secured with JSON Web Tokens (JWT), stored in local storage on the web browser. Each secure API call verifies the token to ensure the right user is making the request.

- **Responsive Design**: The website is fully responsive, providing a seamless user experience across desktops, tablets, and mobile phones.

- **Contact Form**: A simple and effective contact form allows users to get in touch with the gym for inquiries or feedback.




This project is a client-side application for ThriveFit, built with React and Vite. It includes various dependencies for smooth development and deployment.



## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/en/download/) (which includes npm).
- You have a Firebase project set up (for integrating Firebase services).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/programming-hero-web-course1/b9a12-client-side-HunterMahmud.git
   cd thrive-fit
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of your project and add your Firebase configuration keys. This file should include at least the following:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

   Replace `your_api_key`, `your_auth_domain`, etc., with your actual Firebase project configuration values.

## Usage

### Development Server

To start the development server, run:

```bash
npm run dev
```

This will start the Vite development server and you can view the application in your browser at `http://localhost:5173`.

### Building for Production

To build the application for production, run:

```bash
npm run build
```

This will create an optimized build in the `dist` folder.

### Previewing the Production Build

To preview the production build, run:

```bash
npm run preview
```

This will start a local server to preview the production build.

### Linting

To lint the project files, run:

```bash
npm run lint
```

This will run ESLint and check for any linting errors based on the configurations provided.

## Additional Information

### Dependencies

- **@fortawesome/fontawesome-free**: Provides free FontAwesome icons.
- **@splidejs/react-splide**: Used for creating splendid carousels.
- **@tanstack/react-query**: Handles server-state in React applications.
- **aos**: Animates elements on scroll.
- **axios**: Manages HTTP requests (GET, POST, PATCH) and responses.
- **firebase**: Handles authentication and other Firebase services.
- **keen-slider**: Implements smooth sliders.
- **localforage**: Provides offline storage capabilities.
- **match-sorter**: Sorts and filters data.
- **mdb-react-ui-kit**: Provides Material Design components.
- **react**: A JavaScript library for building user interfaces.
- **react-awesome-reveal**: Provides animation effects for React components.
- **react-chartjs-2**: Integrates Chart.js with React.
- **react-dom**: Serves as the entry point to the DOM and server renderers for React.
- **react-helmet-async**: Dynamically sets page titles.
- **react-hook-form**: Manages forms efficiently.
- **react-icons**: Displays React icons.
- **react-modal**: Provides accessible modal dialogs.
- **react-router-dom**: Enables dynamic routing in React apps.
- **react-select**: Provides select input elements.
- **react-slick**: Implements slick carousels.
- **react-toastify**: Shows toast notifications for success or failure messages.
- **recharts**: Provides composable chart components.
- **slick-carousel**: Enables slick carousels.
- **sort-by**: Sorts data by specific keys.
- **styled-components**: Utilizes tagged template literals for styling.
- **sweetalert2**: Displays beautiful alerts.
- **swiper**: Implements modern sliders.

### DevDependencies

- **@types/react**: Provides TypeScript definitions for React.
- **@types/react-dom**: Provides TypeScript definitions for React DOM.
- **@vitejs/plugin-react**: Integrates React with Vite.
- **autoprefixer**: Adds vendor prefixes to CSS rules.
- **daisyui**: Extends Tailwind CSS with additional UI components.
- **eslint**: Identifies and fixes problems in JavaScript code.
- **eslint-plugin-react**: Provides linting rules for React.
- **eslint-plugin-react-hooks**: Provides linting rules for React hooks.
- **eslint-plugin-react-refresh**: Enables fast refresh in React.
- **postcss**: Processes CSS with JavaScript plugins.
- **tailwindcss**: Provides utility-first CSS framework.
- **vite**: Provides a fast build tool for modern web projects.

### Environment Variables

Make sure to keep your `.env.local` file secure and do not commit it to version control. Use `.gitignore` to exclude it from your repository:

```plaintext
.env.local
```

## Contributing

If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

### Notes:

- Replace `"https://github.com/programming-hero-web-course1/b9a12-client-side-HunterMahmud.git"` with the actual URL of your repository.
- The `.env.local` file should be included in your `.gitignore` to prevent it from being committed to the repository.
- Ensure your Firebase configuration values are correctly set in the `.env.local` file.
- Adjust any additional instructions or configurations specific to your project.