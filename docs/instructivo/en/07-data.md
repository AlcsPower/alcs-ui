# 📊 Module 07: Data — Displaying Lists of Information Professionally

> **"Data is only as good as its presentation. Clean tables turn raw numbers into actionable insight."**

Welcome to Module 07! In the early days of computers, information was dumped onto screens as dense blocks of green text. If you wanted to find one person in a list of a hundred, you had to squint and read every single line.

Modern enterprise applications do not do that. When you open a dashboard in Stripe, GitHub, or your banking app, information is presented in clean, well-aligned grids. Statuses are indicated with subtle color indicators, and long lists are neatly divided into manageable pages.

In this module, you will learn the three data presentation tools of `@alcspower/ui`:
- 📋 **`Table`**: Structured tabular grids with headers, rows, and cells designed for scanning large lists.
- 🟢 **`StatusBadge`**: Semantic badges with built-in visual status indicators (`active`, `pending`, `error`, etc.).
- 📄 **`Pagination`**: Page navigation controls that prevent your users from drowning in endless scrolling lists.

Let's transform your data from messy text into an enterprise-ready dashboard!

---

## 📚 What You'll Learn

By the end of this module, you will know how to:
1. Explain the anatomy of an accessible web table: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell`.
2. Format table cells for diverse data types: text, emails, actions, and dates.
3. Understand the difference between a generic `Badge` and a specialized `StatusBadge`, and use its 5 status variants (`active`, `inactive`, `pending`, `error`, `warning`).
4. Implement client-side pagination logic using standard JavaScript array slicing (`slice`).
5. Wire up the `Pagination` component with interactive page state and next/previous controls.
6. Assemble a complete **Paginated Contacts Table Mini-Project** with sample data and interactive controls.
7. Avoid common pitfalls, such as 0-indexed vs. 1-indexed pagination errors and missing React keys.

---

## 📑 Introduction: Displaying Lists of Information Professionally

Think about how information is organized in the real world:
- **A Spreadsheet or Accounting Ledger**: Lines are drawn strictly in rows and columns so the eyes can trace across without getting lost.
- **An Airport Flight Departure Board**: Every flight has its flight number, destination, departure gate, and a color-coded status light (*"Boarding"*, *"Delayed"*, *"Departed"*).
- **A Book with Numbered Pages**: A 500-page book isn't printed on a continuous 200-foot roll of paper that unrolls onto the floor. It is chopped into numbered pages so you can browse, pause, and find what you need comfortably.

In web applications:
- **`Table`** is our digital ledger.
- **`StatusBadge`** is our airport status light.
- **`Pagination`** is our book's page numbers.

```
+-----------------------------------------------------------------------------------+
| TABLE CONTAINER                                                                   |
| +-------------------------------------------------------------------------------+ |
| | [TableHeader]                                                                 | |
| |   [TableRow]                                                                  | |
| |     [TableHead] Name    | [TableHead] Phone     | [TableHead] Status | Actions| |
| +-------------------------------------------------------------------------------+ |
| | [TableBody]                                                                   | |
| |   [TableRow]                                                                  | |
| |     [TableCell] Ana G.  | [TableCell] 8888-0001 | [StatusBadge status="active"] |
| |   [TableRow]                                                                  | |
| |     [TableCell] Carlos  | [TableCell] 8888-0002 | [StatusBadge status="pending"]|
| +-------------------------------------------------------------------------------+ |
|                                                                                   |
| [Pagination]  [Previous]  [Page 1 (Active)]  [Page 2]  [Page 3]  [Next]          |
+-----------------------------------------------------------------------------------+
```

Let's inspect the components one by one!

---

## 📋 Component 1: Table

### What is a Table?

A web table is designed to represent **two-dimensional data** (data organized into rows and columns). Each row represents a single record (e.g., one contact), and each column represents a specific attribute of that record (e.g., Name, Email, Phone, Status).

### Anatomy of Table in `@alcspower/ui`

`@alcspower/ui` provides standard HTML table semantic elements wrapped with responsive styling, smooth hover states, and dark mode support:

| Component | HTML Equivalent | Purpose |
| :--- | :--- | :--- |
| **`Table`** | `<table>` | Outer container that establishes the grid. |
| **`TableHeader`** | `<thead>` | Top section that holds header column titles. |
| **`TableBody`** | `<tbody>` | Main body holding the actual data rows. |
| **`TableRow`** | `<tr>` | A single horizontal row spanning across all columns. |
| **`TableHead`** | `<th>` | Header cell with bold typography and muted color. |
| **`TableCell`** | `<td>` | Standard data cell holding individual values. |

### Code: Your First Basic Table

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
} from '@alcspower/ui';

export function SimpleContactTable() {
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        {/* Header row defining column names */}
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        {/* Data rows */}
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Ana Garcia</TableCell>
            <TableCell>+505 8888-0001</TableCell>
            <TableCell>Engineering</TableCell>
            <TableCell className="text-right">
              <Badge variant="success">Active</Badge>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Carlos Mendoza</TableCell>
            <TableCell>+505 8888-0002</TableCell>
            <TableCell>Marketing</TableCell>
            <TableCell className="text-right">
              <Badge variant="warning">Pending</Badge>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Lucia Rivera</TableCell>
            <TableCell>+505 8888-0003</TableCell>
            <TableCell>Human Resources</TableCell>
            <TableCell className="text-right">
              <Badge variant="destructive">Inactive</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
```

> [!TIP]
> **Pro Tip on Alignment**:  
> - Use left alignment (default) for text names and email addresses.
> - Use right alignment (`className="text-right"`) for currency amounts, numeric quantities, and status badges on the far right edge of the table.

---

## 🟢 Component 2: StatusBadge

### What is a StatusBadge?

In Module 02, you learned about the general-purpose `Badge` component, which is great for categories like `"Design"`, `"VIP"`, or `"Version 2.0"`.

However, when displaying system statuses — such as whether a server is online, whether an account is verified, or whether a payment failed — you often want a **specialized status indicator** featuring a colored indicator dot or distinct status iconography.

That is where **`StatusBadge`** shines!

### StatusBadge Values and Semantics

The `StatusBadge` component accepts a `status` prop with 5 built-in semantic values:

| `status` Prop | Visual Tone | Real-world Use Case |
| :--- | :--- | :--- |
| `'active'` | Emerald Green | Active user, online server, paid invoice, completed job. |
| `'inactive'` | Slate / Gray | Suspended user, offline machine, draft state, archived file. |
| `'pending'` | Warm Amber / Yellow | Awaiting email verification, review in progress, pending approval. |
| `'error'` | Bright Red | Payment rejected, server down, validation failure. |
| `'warning'` | Orange / Warning Amber | Near storage limit, expiring subscription, caution needed. |

### Code: Using StatusBadge

```tsx
import { StatusBadge } from '@alcspower/ui';

export function StatusBadgeShowcase() {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 border rounded-xl">
      <div className="space-y-1">
        <span className="text-xs text-gray-500 block">Active Status:</span>
        <StatusBadge status="active" />
      </div>

      <div className="space-y-1">
        <span className="text-xs text-gray-500 block">Pending Status:</span>
        <StatusBadge status="pending" />
      </div>

      <div className="space-y-1">
        <span className="text-xs text-gray-500 block">Warning Status:</span>
        <StatusBadge status="warning" />
      </div>

      <div className="space-y-1">
        <span className="text-xs text-gray-500 block">Error Status:</span>
        <StatusBadge status="error" />
      </div>

      <div className="space-y-1">
        <span className="text-xs text-gray-500 block">Inactive Status:</span>
        <StatusBadge status="inactive" />
      </div>
    </div>
  );
}
```

Notice how much cleaner this is than manually typing `Badge variant="success"` and trying to remember which color corresponds to which status! With `StatusBadge`, the entire design language is standardized across your entire team.

---

## 📄 Component 3: Pagination

### Why Do We Paginate?

Imagine you work for a company with 5,000 employees. If you try to render all 5,000 contacts on a single web page at the same time:
1. **The browser slows down**: Creating 5,000 HTML table rows uses a lot of memory.
2. **The user feels lost**: The scrollbar shrinks to a tiny dot, and scrolling down takes minutes.
3. **Finding anything is difficult**: It is much easier for humans to process items in bite-sized chunks of 5, 10, or 25 items per view.

### Anatomy of Pagination in `@alcspower/ui`

The `Pagination` suite provides accessible navigation controls:
- `<Pagination>`: Root wrapper with `aria-label="pagination"`.
- `<PaginationContent>`: Flex container holding page items.
- `<PaginationItem>`: List wrapper item (`<li>`).
- `<PaginationLink href="#" isActive>`: Individual numbered page button. Use `isActive` to mark the current page!
- `<PaginationPrevious href="#" />`: "Previous" button.
- `<PaginationNext href="#" />`: "Next" button.

### How Array Slicing Works in JavaScript

To display only the items for the current page, we use JavaScript's built-in `.slice()` method:

```typescript
// Example: If pageSize is 5 and currentPage is 1 (Page 1)
const pageSize = 5;
const currentPage = 1;

// Start index: (1 - 1) * 5 = 0
const startIndex = (currentPage - 1) * pageSize;

// End index: 0 + 5 = 5
const endIndex = startIndex + pageSize;

// Slice extracts items from index 0 up to (but not including) index 5
const currentItems = allItems.slice(startIndex, endIndex);
```

Let's test the math for Page 2:
- `startIndex = (2 - 1) * 5 = 5`
- `endIndex = 5 + 5 = 10`
- `currentItems = allItems.slice(5, 10)` (Items 5 through 9)

It works out! And to calculate total pages:
```typescript
const totalPages = Math.ceil(allItems.length / pageSize);
```

---

## 🚀 Mini-Project: Paginated Contacts Table

Let's build a fully functioning, interactive data dashboard!

In this mini-project:
1. We have a list of **15 realistic contacts**.
2. We display them inside a **`Table`** with columns for Name, Phone, Category, Status (`StatusBadge`), and Actions.
3. We set a page size of **5 contacts per page**, giving us exactly 3 pages.
4. We wire up **`Pagination`** controls with full next/previous and direct page selection!

Here is the complete source code:

```tsx
import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  StatusBadge,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  Toaster,
  toast,
} from '@alcspower/ui';

// 1. Data Type Definition
interface ContactRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  status: 'active' | 'inactive' | 'pending' | 'warning' | 'error';
}

// 2. 15 Mock Contact Records
const INITIAL_CONTACTS: ContactRecord[] = [
  { id: 1, name: 'Ana Garcia', email: 'ana.g@example.com', phone: '+505 8888-0001', department: 'Engineering', status: 'active' },
  { id: 2, name: 'Carlos Mendoza', email: 'carlos.m@example.com', phone: '+505 8888-0002', department: 'Marketing', status: 'pending' },
  { id: 3, name: 'Lucia Rivera', email: 'lucia.r@example.com', phone: '+505 8888-0003', department: 'HR', status: 'active' },
  { id: 4, name: 'Mateo Ortega', email: 'mateo.o@example.com', phone: '+505 8888-0004', department: 'Design', status: 'inactive' },
  { id: 5, name: 'Elena Rostova', email: 'elena.r@example.com', phone: '+505 8888-0005', department: 'Engineering', status: 'active' },
  { id: 6, name: 'David Kim', email: 'david.k@example.com', phone: '+505 8888-0006', department: 'DevOps', status: 'active' },
  { id: 7, name: 'Camila Morales', email: 'camila.m@example.com', phone: '+505 8888-0007', department: 'Product', status: 'warning' },
  { id: 8, name: 'Jorge Silva', email: 'jorge.s@example.com', phone: '+505 8888-0008', department: 'Support', status: 'pending' },
  { id: 9, name: 'Valeria Castro', email: 'valeria.c@example.com', phone: '+505 8888-0009', department: 'Finance', status: 'active' },
  { id: 10, name: 'Gabriel Lopez', email: 'gabriel.l@example.com', phone: '+505 8888-0010', department: 'Legal', status: 'inactive' },
  { id: 11, name: 'Sofia Herrera', email: 'sofia.h@example.com', phone: '+505 8888-0011', department: 'Sales', status: 'active' },
  { id: 12, name: 'Andres Rios', email: 'andres.r@example.com', phone: '+505 8888-0012', department: 'Engineering', status: 'error' },
  { id: 13, name: 'Mariana Duarte', email: 'mariana.d@example.com', phone: '+505 8888-0013', department: 'Marketing', status: 'active' },
  { id: 14, name: 'Fernando Ruiz', email: 'fernando.r@example.com', phone: '+505 8888-0014', department: 'Product', status: 'active' },
  { id: 15, name: 'Diana Torres', email: 'diana.t@example.com', phone: '+505 8888-0015', department: 'Customer Success', status: 'pending' },
];

export function PaginatedContactsTableMiniProject() {
  const [contacts, setContacts] = useState<ContactRecord[]>(INITIAL_CONTACTS);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Pagination Calculations
  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentContacts = contacts.slice(startIndex, startIndex + itemsPerPage);

  // Handlers for Page Change
  const handlePageChange = (page: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevents page from jumping to top when clicking "#"
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = (id: number, name: string) => {
    setContacts((prev) => prev.filter((item) => item.id !== id));
    toast.error(`Removed ${name} from directory.`);
    
    // If deleting the last item on the last page, step back one page
    if (currentContacts.length === 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <Toaster position="bottom-right" richColors />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-xl">Enterprise Contact Registry</CardTitle>
              <CardDescription>
                Viewing page {currentPage} of {totalPages} ({contacts.length} total contacts)
              </CardDescription>
            </div>
            <Badge variant="outline">{contacts.length} Records</Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentContacts.map((contact) => (
                <TableRow key={contact.id}>
                  {/* Name & Email Cell */}
                  <TableCell>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {contact.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {contact.email}
                    </div>
                  </TableCell>

                  {/* Phone Cell */}
                  <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                    {contact.phone}
                  </TableCell>

                  {/* Department Cell */}
                  <TableCell>
                    <span className="inline-block px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {contact.department}
                    </span>
                  </TableCell>

                  {/* StatusBadge Cell */}
                  <TableCell>
                    <StatusBadge status={contact.status} />
                  </TableCell>

                  {/* Actions Cell */}
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.info(`Viewing ${contact.name}`)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(contact.id, contact.name)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t p-4 gap-4">
          <div className="text-xs text-gray-500">
            Showing <strong className="text-gray-800 dark:text-gray-200">{startIndex + 1}</strong> to{' '}
            <strong className="text-gray-800 dark:text-gray-200">
              {Math.min(startIndex + itemsPerPage, contacts.length)}
            </strong>{' '}
            of <strong className="text-gray-800 dark:text-gray-200">{contacts.length}</strong> contacts
          </div>

          {/* ======================================================== */}
          {/* PAGINATION CONTROLS                                      */}
          {/* ======================================================== */}
          <Pagination>
            <PaginationContent>
              {/* Previous Page Button */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => handlePageChange(currentPage - 1, e)}
                  aria-disabled={currentPage === 1}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>

              {/* Numbered Page Links */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === pageNumber}
                      onClick={(e) => handlePageChange(pageNumber, e)}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {/* Next Page Button */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => handlePageChange(currentPage + 1, e)}
                  aria-disabled={currentPage === totalPages}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  );
}
```

---

## ⚠️ What Can Go Wrong? (Common Pitfalls & Fixes)

Working with tables and pagination introduces classic data-management traps:

### 1. "When I click page 2, the browser jumps to the very top of the page!"
- **Cause**: The `<PaginationLink href="#">` has an `href="#"`. Clicking a regular anchor tag with `#` jumps the viewport to the top of the webpage.
- **Fix**: Call `e.preventDefault()` inside your click handler:
  ```tsx
  const handlePageClick = (page: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevents jumping!
    setCurrentPage(page);
  };
  ```

### 2. "The last page says 'Showing 11 to 15 of 13 contacts'!"
- **Cause**: Adding `startIndex + itemsPerPage` without checking the total count. On the last page, `10 + 5 = 15`, but you only have 13 contacts total.
- **Fix**: Use `Math.min`:
  ```tsx
  {Math.min(startIndex + itemsPerPage, contacts.length)}
  ```

### 3. "React warning: Each child in a list should have a unique 'key' prop."
- **Cause**: Mapping over array rows without passing `key={item.id}` on the root `<TableRow>`.
- **Fix**: Always specify `key={contact.id}` on `<TableRow>`:
  ```tsx
  {currentContacts.map((contact) => (
    <TableRow key={contact.id}>
      <TableCell>{contact.name}</TableCell>
    </TableRow>
  ))}
  ```

### 4. "I deleted an item on page 3, and now the table is completely blank!"
- **Cause**: If page 3 had only 1 item and you delete it, `contacts.length` drops, making total pages 2. But your `currentPage` state is still 3! Slicing page 3 returns an empty array `[]`.
- **Fix**: Add a boundary check when deleting:
  ```tsx
  if (currentContacts.length === 1 && currentPage > 1) {
    setCurrentPage((prev) => prev - 1);
  }
  ```

---

## 🎯 Try It Yourself! (Exercise)

Now let's enhance this table with an essential enterprise feature: **search filtering**!

### Your Challenge: Filter Contacts by Name
1. Above the `<Table>`, add a text search input:
   ```tsx
   <input
     type="text"
     placeholder="Search by name or email..."
     value={searchQuery}
     onChange={(e) => {
       setSearchQuery(e.target.value);
       setCurrentPage(1); // Always reset to page 1 on new search!
     }}
     className="border rounded-md px-3 py-2 text-sm w-full max-w-xs mb-4"
   />
   ```
2. Before slicing for pagination, filter the `contacts` array based on `searchQuery`:
   ```tsx
   const filteredContacts = contacts.filter((c) =>
     c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.email.toLowerCase().includes(searchQuery.toLowerCase())
   );
   ```
3. Update your pagination math to slice from `filteredContacts` instead of `contacts`:
   ```tsx
   const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
   const currentContacts = filteredContacts.slice(startIndex, startIndex + itemsPerPage);
   ```

Try searching for *"Ana"* or *"Engineering"*. Notice how the table updates smoothly, and the pagination count reflects only the matching items!

---

## ✅ Summary

Presenting data professionally is what turns raw code into business-grade software:

- 📋 **`Table`**: Structured, accessible grid container. Uses `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell`. Use `text-right` for actions and numbers.
- 🟢 **`StatusBadge`**: Specialized badge with 5 distinct status indicators: `'active'`, `'inactive'`, `'pending'`, `'error'`, and `'warning'`. Keeps visual status language uniform across your entire app.
- 📄 **`Pagination`**: Breaks large collections into digestible chunks. Managed using `useState` for current page and array `.slice((page - 1) * size, page * size)`.

In the next module, we will explore **Navigation components**: accordions, breadcrumbs, and multi-step steppers that guide users step-by-step!

---

## 🧭 Navigation

| [← Previous: Module 06 (Overlays)](06-overlays.md) | [Table of Contents](README.md) | [Next: Module 08 (Navigation) →](08-navigation.md) |
| :--- | :---: | ---: |
