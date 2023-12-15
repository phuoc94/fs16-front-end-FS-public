# Library Management System

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)

## Table of Contents

1. [Introduction](#1-introduction)
2. [Getting Started](#2-getting-started)
3. [Usage](#3-usage)
4. [Architecture & Design](#4-architecture--design)
5. [Testing](#5-testing)
6. [Deployment](#6-deployment)

---

### 1. Introduction

The Library Management System is a web application developed using React.js, Redux Toolkit, and TypeScript. It provides a comprehensive platform for managing library resources, including books, journals, and other media. Users can browse, search for items, borrow, and return materials seamlessly. The system is designed to cater to the needs of librarians and library patrons.

#### Target Audience

- Librarians and library staff looking for a modern, efficient system to manage library resources.
- Developers interested in exploring the integration of popular technologies like React, Redux, and TypeScript in a real-world application.

#### Live Project

You can explore the live project by visiting the following link:
[Library Management System](https://fs16-front-end-fs-chi.vercel.app/)

---

### 2. Getting Started

#### Prerequisites

Before you begin, ensure you have the following software and tools installed:

- Node.js
- npm (Node Package Manager) or yarn
- Git

#### Backend Repository

Make sure to set up the backend of the Library Management System by cloning the backend repository from:

[Library Management System Backend Repository](https://github.com/phuoc94/library-management-system.git)

Clone the repository to your local machine:

```bash
git clone https://github.com/phuoc94/library-management-system.git
```

#### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/phuoc94/fs16-front-end-FS.git
```

Installation Steps
Install project dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

This command will install all the required packages listed in the package.json file.

### 3. Usage

#### Scripts

The project includes several scripts defined in the `package.json` file:

- `start`: Starts the development server.
- `build`: Builds the production version of the project.
- `test`: Runs tests.

To start the development server, use the following command:

```bash
`npm start`
# or
`yarn start`
```

#### Features

- Browse and search for library resources.
- Borrow and return books and other materials.
- Admin functionality to manage the library catalog.
- User authentication for patrons.

---

### 4. Architecture & Design

#### Folder Structure

The project is organized into directories for better code organization. Here's a brief overview of the key directories:

```
src/
├── components: Holds React components.
├── containers: Contains higher-level components or containers.
├── hooks: Stores custom React hooks.
├── layouts: Contains layout components defining page structure.
├── pages: Houses the main pages or views.
├── routes: May include route configuration and routing code.
├── store: Contains state management related code.
├── styles: Stores stylesheets or styles-related code.
├── test: Holds unit tests, integration tests, or test utilities.
├── types: Contains TypeScript type definitions and interfaces.
└── utils: Stores utility functions or modules.
```

#### Data Flow

Data in the application is managed using Redux Toolkit, which provides a predictable state container. The data flows in a unidirectional manner, making it easy to maintain and update.

1. **Component Dispatch (User Interaction)**

- A component dispatches actions like `borrowBooks()` or `returnBooks()`. These actions are created using createAsyncThunk, a Redux Toolkit utility that simplifies the process of handling asynchronous operations.

2. **API Request and Response**

- The actions send requests to the backend API for borrowing, returning, or fetching library resources. The API responds with the necessary data.

3. **Reducers - ExtraReducers**

- In the Redux store, reducers define how the fetched data or state changes are processed. The `extraReducers` section of the `createSlice` or `createAsyncThunk` builder is used to handle different action outcomes.

- For instance, `builder.addCase(borrowBook.fulfilled)` specifies the logic that runs when the `borrowBoosk` action is fulfilled successfully. In this case, the borrowed item's status is updated in the Redux store.

4. **Store Reducers**

- Within the store reducers, the data is updated in response to dispatched actions. The actions' payloads contain information about the library resources, borrowers, and other relevant data.

This data flow ensures efficient management of library resources and user interactions, making it easy to track borrowed items and manage the library catalog.

#### Component Structure

In this project, the component structure follows a route-based organization, where each route corresponds to a specific URL path. Here's a breakdown of the component structure:

##### Routes

- The project starts by routing requests to their respective paths. For example, when a user accesses domain.com/products, the route system directs the request to the appropriate page component.

##### Page Components

- Each route typically has an associated page component responsible for rendering the main content of that route. For example, `pages/ProductsPage.tsx` is a page component that represents the /products route.

###### Containers

- Within the page components, you may find container components. These containers act as intermediary components that connect the page component to various data sources, including Redux for state management. They facilitate the passing of data and actions between the page component and other components.

##### Individual Components

- Inside the container components, you'll find individual components that make up the user interface. These components are designed to be reusable and modular. They can include components like product cards, cart displays, and checkout forms.

This structured approach ensures that the project's codebase remains organized and maintainable, allowing for the separation of concerns and facilitating code reusability. It also makes it easier to understand the relationship between different parts of the application and helps in the efficient development and testing of each component.

### 5. Testing

#### Testing Framework

The project uses Jest as the testing framework.

#### How to Run Tests

To run tests, use the following command:

```bash
`npm test`
or
`yarn test`
```

Describe the structure of your tests (unit, integration, end-to-end) and any other relevant testing details.

---

### 6. Deployment

The project is deployed on Vercel.
