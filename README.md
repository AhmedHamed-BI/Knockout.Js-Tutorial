# Knockout.js Tutorial - POS System

A beginner-friendly tutorial project demonstrating Knockout.js two-way data binding with a Point of Sale (POS) invoice system.

## Table of Contents

- [Installation](#installation)
- [Starting the Application](#starting-the-application)
- [Creating Your Own View Model](#creating-your-own-view-model)
- [Creating Your Own Template](#creating-your-own-template)
- [Binding Templates to View Models](#binding-templates-to-view-models)

## Installation

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Steps

1. **Install Dependencies**

   Navigate to the project directory and install all required packages:

   ```bash
   npm install
   ```

   This installs:
   - **knockout** - The main Knockout.js library for data binding
   - **typescript** - TypeScript compiler
   - **webpack** & **webpack-cli** - Module bundler
   - **webpack-dev-server** - Development server with hot reload
   - **ts-loader** - TypeScript loader for Webpack
   - **@types/knockout** - TypeScript type definitions for Knockout.js

2. **Verify Installation**

   Check that all packages are installed correctly:

   ```bash
   npm list
   ```

## Starting the Application

### Development Mode (Recommended)

Start the development server with hot reload:

```bash
npm run dev
```

Or if the script is not configured, use webpack-dev-server directly:

```bash
npx webpack serve
```

The application will:
- Automatically open in your default browser at `http://localhost:7000`
- Recompile on file changes
- Reload the browser automatically

### Build for Production

Bundle the application for production:

```bash
npx webpack --mode production
```

The compiled files will be in the `dist/` folder.

## Creating Your Own View Model

A view model is a TypeScript class that contains your application data and logic.

### Example: Creating a Product View Model

1. **Create a new file**: `src/view-models/product.vm.ts`

   ```typescript
   import * as ko from "knockout";

   export class Product {
     name: KnockoutObservable<string>;
     price: KnockoutObservable<number>;
     quantity: KnockoutObservable<number>;
     inStock: KnockoutComputed<boolean>;

     constructor(name: string, price: number, quantity: number) {
       this.name = ko.observable(name);
       this.price = ko.observable(price);
       this.quantity = ko.observable(quantity);

       // Computed property: true if quantity > 0
       this.inStock = ko.pureComputed(() => {
         return this.quantity() > 0;
       });
     }
   }

   export class ProductVM {
     products: KnockoutObservableArray<Product> = ko.observableArray<Product>([
       new Product("Laptop", 999, 5),
       new Product("Mouse", 25, 50),
       new Product("Keyboard", 75, 30)
     ]);

     // Add new product
     addProduct = (name: string, price: number, quantity: number) => {
       this.products.push(new Product(name, price, quantity));
     };

     // Remove product
     removeProduct = (product: Product) => {
       this.products.remove(product);
     };
   }
   ```

### Key Concepts

- **Observable**: `ko.observable(value)` - Creates a reactive property
  - Use `property()` to read the value
  - Use `property(newValue)` to update the value

- **Observable Array**: `ko.observableArray([])` - Array of observables
  - Methods: `push()`, `pop()`, `remove()`, `splice()`, etc.

- **Computed**: `ko.pureComputed(() => { ... })` - Automatically updates when dependencies change
  - Use `pureComputed` for functions with no side effects

## Creating Your Own Template

Templates are HTML elements where you bind your view model data.

### Example: Creating a Product List Template

1. **Add to `src/index.html` in the `<body>`**:

   ```html
   <div class="container mt-5">
     <h1>Product Catalog</h1>

     <!-- Product Cards -->
     <div class="row" data-bind="foreach: products">
       <div class="col-md-4 mb-4">
         <div class="card h-100">
           <div class="card-body">
             <h5 class="card-title" data-bind="text: name"></h5>
             <p class="card-text">
               Price: $<span data-bind="text: price().toFixed(2)"></span>
             </p>
             <p class="card-text">
               Stock: <span data-bind="text: quantity"></span>
             </p>
             <p>
               <span
                 class="badge"
                 data-bind="
                   css: { 'bg-success': inStock(), 'bg-danger': !inStock() },
                   text: inStock() ? 'In Stock' : 'Out of Stock'
                 "
               ></span>
             </p>
             <button
               class="btn btn-primary btn-sm"
               data-bind="click: () => { quantity(quantity() - 1); }"
             >
               Decrease Stock
             </button>
           </div>
         </div>
       </div>
     </div>
   </div>
   ```

### Template Binding Syntax

- **`data-bind="text: property"`** - Display text
- **`data-bind="value: property"`** - Two-way binding for input
- **`data-bind="foreach: array"`** - Loop through array
- **`data-bind="click: method"`** - Click handler
- **`data-bind="css: { className: condition }"`** - Conditional CSS classes
- **`data-bind="visible: condition"`** - Show/hide element
- **`data-bind="disabled: condition"`** - Disable element

## Binding Templates to View Models

### Step 1: Import and Create ViewNodel in `src/main.ts`

```typescript
import * as ko from "knockout";
import { ProductVM } from "./view-models/product.vm";

const vm = new ProductVM();
ko.applyBindings(vm);
```

### Step 2: Add Binding Script in `src/index.html`

In your HTML file, add the webpack bundle before closing `</body>`:

```html
<script src="/bundle.js"></script>
```

### Step 3: Start Development Server

```bash
npm run dev
```

Your template will now be bound to your view model with full two-way data binding!

## Complete Example: Invoice System

See the existing `src/view-models/invoice.vm.ts` for a complete example of:
- Observable properties
- Computed properties
- Observable arrays
- Methods for adding/removing items

## Tips for Success

✅ Always use `ko.observable()` for properties you want to bind
✅ Use `ko.pureComputed()` for derived/calculated properties
✅ Use `ko.observableArray()` for dynamic lists
✅ Use `data-bind` attributes to connect HTML to your view model
✅ Check browser console (F12) for binding errors
✅ Use TypeScript for better IDE support and type safety

## Resources

- [Knockout.js Documentation](https://knockoutjs.com/documentation/introduction.html)
- [Knockout.js Tutorial Book](https://learn.knockoutjs.com/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
