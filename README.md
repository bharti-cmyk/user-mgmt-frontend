<h1 align="center">User Management Frontend</h1>

<p align="center">
  A responsive React application built with TypeScript for managing user registration, authentication, and administration features. Includes email verification, password reset, role-based access control, and more.
</p>

<hr />

<h2>🧰 Tech Stack</h2>
<ul>
  <li><strong>React</strong> (with TypeScript)</li>
  <li><strong>Axios</strong> for API requests</li>
  <li><strong>React Hook Form</strong> for form handling and validation</li>
  <li><strong>Material UI</strong> for UI components</li>
  <li><strong>React Router</strong> for routing</li>
  <li><strong>Responsive Design</strong> using Flexbox/Grid</li>
</ul>

<h2>📦 Folder Structure</h2>
<pre>
├── src
│   ├── components
│   │   ├── common          // Shared components like Loader, Navbar
│   │   ├── layout          // Layout-related components
│   │   ├── forms           // Form components (Login, Register, etc.)
│   ├── context             // Global context providers
│   ├── hooks               // Custom React hooks
│   ├── pages               // Page-level components (Login, Dashboard, Profile)
│   ├── services            // Axios API services
│   ├── utils               // Utility functions (token handlers, constants)
│   ├── App.tsx
│   ├── main.tsx
</pre>

<h2>🚀 Getting Started</h2>

<h3>1. Clone the Repository</h3>
<pre><code>git clone https://github.com/bharti-cmyk/user-mgmt-frontend.git
cd user-mgmt-frontend</code></pre>

<h3>2. Install Dependencies</h3>
<pre><code>npm install</code></pre>

<h3>3. Create <code>.env</code> File</h3>

<h3>4. Run the App</h3>
<pre><code>npm start</code></pre>

<p>The app will be available at <code>http://localhost:3000</code></p>

<h2>🧪 Features Implemented</h2>
<ul>
  <li>User registration with email verification</li>
  <li>Login with JWT and refresh token</li>
  <li>Role-based access (Admin/User)</li>
  <li>Upload and preview avatar during registration/edit</li>
  <li>Reset password via email</li>
  <li>Admin user listing with search, sort, pagination</li>
  <li>Edit/delete user (admin only)</li>
  <li>Profile page with edit support</li>
  <li>Global toast notifications and error handling</li>
</ul>

<h2>🎨 Responsive Design</h2>
<p>App supports mobile, tablet, and desktop breakpoints using Material UI's responsive layout system.</p>

<h2>📄 License</h2>
<p>MIT</p>

<h2>🔗 Backend Repository</h2>
<p>
  See the backend repo: 
  <a href="https://github.com/bharti-cmyk/user-mgmt-backend" target="_blank">
    user-mgmt-backend
  </a>
</p>
