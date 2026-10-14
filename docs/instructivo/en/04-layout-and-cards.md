# 📐 Module 04: Layouts and Cards — Organizing Your App Like a Room

> **"A clean room brings peace of mind. A clean interface brings happy users."**

Welcome to Module 04! If you have completed the previous modules, you already know how to create buttons, display badges, set up avatars, and capture input from users through forms. But right now, you might be wondering: *where do all these elements live on the screen?* 

If you just drop buttons, text boxes, and labels onto a blank page, everything quickly looks like a chaotic desk piled high with papers. To turn that chaos into a delightful, professional user interface, we need **structure**.

In this module, you will learn how to use three powerhouse components from `@alcspower/ui`:
- 🗂️ **`Card`**: Structured containers that group related pieces of information.
- 📑 **`Tabs`**: Clean tabbed panels that let users switch between different screens without leaving the page.
- ➖ **`Separator`**: Subtle dividing lines that give your layout visual breathing room.

Grab your favorite cup of coffee or tea, and let's get organizing!

---

## 📚 What You'll Learn

By the end of this module, you will be able to:
1. Explain the anatomy of a `Card` and know when to use each subcomponent (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
2. Build flexible, organized content cards for people, tasks, and system statistics.
3. Understand how `Tabs` work, including the difference between uncontrolled (`defaultValue`) and controlled tabs with `useState`.
4. Use horizontal and vertical `Separator` lines to establish visual hierarchy without clutter.
5. Assemble a complete, polished **Contact Book Main Screen** featuring tabbed views, cards, and clean dividers.
6. Troubleshoot common layout mistakes like vanishing vertical separators or mismatched tab triggers.

---

## 🏠 Introduction: Organizing Your App Like a Room

Imagine walking into an unfurnished room. If you unpack your clothes, books, and cooking utensils directly onto the bare floor, two things happen immediately:
1. It looks messy and overwhelming.
2. Finding anything takes forever.

What do we do in real life? We bring in **furniture**:
- We put books on a **bookshelf**.
- We put clothes in a **dresser with drawers**.
- We put dishes in **kitchen cabinets**.
- We use **dividers** inside drawers so socks do not mix with t-shirts.

In web development, your web page is the room, and **layout components** are your furniture. 

Instead of letting texts and buttons float freely across the screen:
- A **`Card`** acts like a neat display tray or framed picture box. Everything inside it belongs together.
- A **`Tabs`** container acts like a file cabinet with colored divider folders. You only look at one folder at a time so your brain stays calm.
- A **`Separator`** acts like a subtle physical shelf divider, gently separating one group of items from the next.

Let's dive into each of these components one by one.

---

## 🗂️ Component 1: Card

### What is a Card?

Think of a physical business card, a baseball trading card, or an employee badge. When you hold an employee badge in your hand:
- At the top, you see the company name or photo.
- In the middle, you see the person's name, role, and department.
- At the bottom, you might see an expiration date, a barcode, or emergency contact info.

All of that information belongs to **one specific entity**. The white cardboard boundary tells your eyes: *"Everything inside this boundary is connected."*

In `@alcspower/ui`, the `Card` component serves that exact purpose. It provides a clean container with rounded corners, a subtle border, and an optional soft shadow that lifts it off the background.

```
+-----------------------------------------------------------+
| [CardHeader]                                              |
|   [CardTitle]       User Profile                          |
|   [CardDescription] Manage your public account info       |
+-----------------------------------------------------------+
| [CardContent]                                             |
|   First Name: [  Ana      ]                               |
|   Last Name:  [  Garcia   ]                               |
|   Email:      [  ana@example.com  ]                       |
+-----------------------------------------------------------+
| [CardFooter]                                              |
|   [Cancel Button]                   [Save Changes Button] |
+-----------------------------------------------------------+
```

### The Card Family: Anatomy and Subcomponents

To make your cards clean and consistent, `@alcspower/ui` splits the card into specialized child components:

| Subcomponent | What it does | Real-world Analogy |
| :--- | :--- | :--- |
| **`Card`** | The outer wrapper box. Sets borders, background color, and rounded corners. | The picture frame or cardboard card stock. |
| **`CardHeader`** | The top section. Groups the title and description with comfortable padding. | The headline banner of a newspaper. |
| **`CardTitle`** | The main heading. Rendered with bold, prominent typography. | The book title on the cover. |
| **`CardDescription`** | A secondary subtitle below the title in muted gray text. | The subtitle explaining what the chapter is about. |
| **`CardContent`** | The main body where your primary information or form inputs live. | The main story or content of the letter. |
| **`CardFooter`** | The bottom bar, ideal for action buttons or timestamp labels. | The signature block at the bottom of a contract. |

### Your First Card: Step-by-Step Code

Here is how you import and assemble a card using `@alcspower/ui`:

```tsx
// Step 1: Import the card parts from @alcspower/ui
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@alcspower/ui';

// Step 2: Import any other components you want to display inside the card
import { Button, Badge } from '@alcspower/ui';

export function ContactSummaryCard() {
  return (
    // The main container with a max width so it doesn't stretch across the whole monitor
    <Card className="max-w-md w-full shadow-sm">
      {/* Header section: Title and subtitle */}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Ana Garcia</CardTitle>
          {/* A small badge in the upper corner */}
          <Badge variant="success">Active</Badge>
        </div>
        <CardDescription>
          Senior Frontend Developer · Engineering Team
        </CardDescription>
      </CardHeader>

      {/* Content section: The main details */}
      <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <p>
          <strong className="text-gray-900 dark:text-white">Email:</strong>{' '}
          ana.garcia@example.com
        </p>
        <p>
          <strong className="text-gray-900 dark:text-white">Phone:</strong>{' '}
          +1 (555) 888-0001
        </p>
        <p>
          <strong className="text-gray-900 dark:text-white">Location:</strong>{' '}
          Headquarters
        </p>
      </CardContent>

      {/* Footer section: Action buttons aligned to the right */}
      <CardFooter className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" size="sm">
          Send Message
        </Button>
        <Button size="sm">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Common Card Variations

You don't always need every single subcomponent in every card. The components are modular, so you can mix and match them according to your needs:

#### 1. Minimal Card (No Header or Footer)
When you just want a clean framed container for a single metric or piece of data:

```tsx
import { Card, CardContent } from '@alcspower/ui';

export function StatCard() {
  return (
    <Card className="p-6">
      <CardContent className="p-0">
        <span className="text-sm font-medium text-gray-500">Total Contacts</span>
        <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          1,482
        </div>
        <span className="text-xs text-green-600 font-medium">
          +12% from last month
        </span>
      </CardContent>
    </Card>
  );
}
```

#### 2. Action Card with Media / Banner
You can insert banners, illustrations, or avatar headers above the `CardHeader`:

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from '@alcspower/ui';

export function InviteTeammateCard() {
  return (
    <Card className="max-w-sm overflow-hidden">
      {/* Decorative top color bar */}
      <div className="h-3 w-full bg-gradient-to-r from-blue-500 to-indigo-600" />
      
      <CardHeader>
        <CardTitle>Invite Your Team</CardTitle>
        <CardDescription>
          Collaborate on shared address books and contacts in real time.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Sending invites allows colleagues to view, edit, and organize customer records.
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full">Generate Invite Link</Button>
      </CardFooter>
    </Card>
  );
}
```

---

## 📑 Component 2: Tabs

### What are Tabs?

Have you ever used a physical 3-ring binder for school or work, with colorful plastic tabs sticking out on the right side labeled *"History"*, *"Math"*, and *"Science"*? 

When you flip to the "Math" tab, you only see math formulas. The history notes are still there in the binder, but they are tucked away behind the current view so they don't distract you.

In web applications, **`Tabs`** do the exact same thing:
- They divide a single page into multiple distinct views.
- The user can click a button (a "Tab Trigger") to instantly swap what is visible on the screen.
- The page does not have to reload or navigate to a new URL.

### Anatomy of Tabs in `@alcspower/ui`

The `Tabs` system consists of four coordinated components:

```
+-----------------------------------------------------------+
| [Tabs defaultValue="list"]                                |
|   +---------------------------------------------------+   |
|   | [TabsList]                                        |   |
|   |   [TabsTrigger value="list"] My Contacts [/]      |   |
|   |   [TabsTrigger value="new"]  Add New     [/]      |   |
|   +---------------------------------------------------+   |
|                                                           |
|   [TabsContent value="list"]                              |
|     (Visible only when "list" tab is active)              |
|   [/TabsContent]                                          |
|                                                           |
|   [TabsContent value="new"]                               |
|     (Visible only when "new" tab is active)               |
|   [/TabsContent]                                          |
+-----------------------------------------------------------+
```

| Component | Role | What to keep in mind |
| :--- | :--- | :--- |
| **`Tabs`** | The parent conductor. Manages which tab is currently selected. | Accepts `defaultValue` or `value`. |
| **`TabsList`** | The horizontal bar containing the clickable tab buttons. | Centers and groups the triggers together. |
| **`TabsTrigger`** | An individual tab button the user clicks. | Must have a unique `value` prop (e.g., `value="list"`). |
| **`TabsContent`** | The container whose content is revealed when its corresponding trigger is active. | Its `value` prop MUST match the trigger's `value`! |

### Uncontrolled Tabs (`defaultValue`)

In most situations, you just want tabs to work out of the box without manually writing JavaScript state variables. You can provide `defaultValue="<tab-name>"` to the root `Tabs`:

```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@alcspower/ui';

export function UncontrolledTabsDemo() {
  return (
    // 'defaultValue' sets which tab is open when the page loads
    <Tabs defaultValue="overview" className="w-full max-w-xl">
      {/* The list of clickable tab buttons */}
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      {/* Content for the Overview tab */}
      <TabsContent value="overview" className="p-4 rounded-md border mt-2">
        <h3 className="font-semibold text-lg">Account Overview</h3>
        <p className="text-gray-600 text-sm mt-1">
          Here is a summary of your account activity for the past 30 days.
        </p>
      </TabsContent>

      {/* Content for the Settings tab */}
      <TabsContent value="settings" className="p-4 rounded-md border mt-2">
        <h3 className="font-semibold text-lg">Account Settings</h3>
        <p className="text-gray-600 text-sm mt-1">
          Update your notification preferences and password.
        </p>
      </TabsContent>
    </Tabs>
  );
}
```

### Controlled Tabs (`value` + `onValueChange`)

What if you want to change tabs programmatically? For example:
- The user clicks a button inside the form that says *"Finish and view contacts"*, and you want the app to automatically switch back to the contacts tab.

To do this, use standard React `useState`:

```tsx
import { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
} from '@alcspower/ui';

export function ControlledTabsDemo() {
  // Store the active tab name in React state
  const [activeTab, setActiveTab] = useState<string>('list');

  return (
    <div className="w-full max-w-xl space-y-4">
      {/* We pass our state variable and state setter to Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="list">Contact List</TabsTrigger>
          <TabsTrigger value="new">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="p-4 border rounded-md mt-2">
          <p className="text-sm text-gray-700">Currently showing 10 contacts.</p>
          {/* Clicking this button switches state to 'new' */}
          <Button
            size="sm"
            className="mt-3"
            onClick={() => setActiveTab('new')}
          >
            Go to Add Form
          </Button>
        </TabsContent>

        <TabsContent value="new" className="p-4 border rounded-md mt-2">
          <p className="text-sm text-gray-700">Form to add a brand new contact.</p>
          {/* Clicking this button switches state back to 'list' */}
          <Button
            size="sm"
            variant="outline"
            className="mt-3"
            onClick={() => setActiveTab('list')}
          >
            Cancel and Return to List
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## ➖ Component 3: Separator

### What is a Separator?

In newspapers and magazines, articles are separated by thin, elegant lines. Without those lines, two unrelated paragraphs would run into each other and confuse the reader.

The `Separator` component in `@alcspower/ui` is an accessible horizontal or vertical dividing line. It renders a clean border styled according to the current theme (light or dark mode) and announces itself correctly to screen readers.

### Horizontal vs. Vertical Separators

`Separator` has two modes:
1. **Horizontal (default)**: Stretches across the full width of its container. Perfect for separating the title section from the body, or separating list items.
2. **Vertical (`orientation="vertical"`)**: Stands upright. Perfect for dividing items inside a top navigation bar or inline action buttons.

```tsx
import { Separator } from '@alcspower/ui';

export function SeparatorExamples() {
  return (
    <div className="space-y-6 max-w-md">
      {/* --- Horizontal Separator Example --- */}
      <div>
        <h4 className="font-medium text-sm">Notifications</h4>
        <p className="text-xs text-gray-500">Configure how you receive alerts.</p>
        
        {/* A clean horizontal divider */}
        <Separator className="my-3" />
        
        <p className="text-xs text-gray-700">Email Alerts: Enabled</p>
      </div>

      {/* --- Vertical Separator Example --- */}
      <div className="flex items-center text-sm">
        <span className="font-medium">Ana Garcia</span>
        
        {/* Vertical divider: Make sure to give it a height with className="h-4" */}
        <Separator orientation="vertical" className="mx-3 h-4" />
        
        <span className="text-gray-500">Managua</span>
        
        <Separator orientation="vertical" className="mx-3 h-4" />
        
        <span className="text-gray-500">Developer</span>
      </div>
    </div>
  );
}
```

> [!TIP]
> **Why did we add `className="h-4"` to the vertical separator?**  
> By default, an element inside a flex container might shrink to 0 pixels if no height is specified. Giving a vertical separator a small fixed height like `h-4` (16 pixels) or `h-6` (24 pixels) ensures it appears crisp and centered between your text items.

---

## 🚀 Mini-Project: Contact Book Main Screen

Now let's combine all three components — `Card`, `Tabs`, and `Separator` — into a cohesive, realistic feature: the **Contact Book Main Screen**.

In this screen:
- We have a top header with the application name.
- We have two tabs: **"My Contacts"** and **"Add New Contact"**.
- The "My Contacts" tab renders contact cards with dividers and action buttons.
- The "Add New" tab renders a card containing a simple registration form.

Here is the complete, runnable code:

```tsx
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Button,
  Badge,
} from '@alcspower/ui';

// Type definition for a single contact record
interface Contact {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'Active' | 'Pending';
}

export function ContactBookScreen() {
  // Sample initial contacts
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Ana Garcia',
      role: 'Lead Architect',
      email: 'ana.garcia@company.com',
      phone: '+505 8888-0001',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      role: 'Frontend Engineer',
      email: 'carlos.m@company.com',
      phone: '+505 8888-0002',
      status: 'Pending',
    },
  ]);

  // Form input states
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  // Controlled tab state so we can return to "list" after adding
  const [currentTab, setCurrentTab] = useState('list');

  // Function to handle adding a new contact
  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newEntry: Contact = {
      id: Date.now(),
      name: newName,
      role: newRole || 'Member',
      email: newEmail,
      phone: newPhone || '+505 0000-0000',
      status: 'Active',
    };

    setContacts([...contacts, newEntry]);
    
    // Clear the form
    setNewName('');
    setNewRole('');
    setNewEmail('');
    setNewPhone('');

    // Switch back to the list tab to see the new contact!
    setCurrentTab('list');
  };

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      {/* Application Title Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Contact Directory
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Organize, inspect, and connect with your colleagues in one place.
        </p>
      </div>

      {/* Horizontal Divider beneath page title */}
      <Separator />

      {/* Tabs Container */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        {/* Navigation list of triggers */}
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="list">
            My Contacts ({contacts.length})
          </TabsTrigger>
          <TabsTrigger value="new">
            Add New
          </TabsTrigger>
        </TabsList>

        {/* ========================================================= */}
        {/* TAB 1: LIST OF CONTACTS                                   */}
        {/* ========================================================= */}
        <TabsContent value="list" className="mt-6 space-y-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <CardDescription>{contact.role}</CardDescription>
                  </div>
                  <Badge variant={contact.status === 'Active' ? 'success' : 'warning'}>
                    {contact.status}
                  </Badge>
                </div>
              </CardHeader>

              {/* Separator inside the card */}
              <Separator />

              <CardContent className="pt-3 pb-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex flex-wrap items-center gap-y-1">
                  <span>{contact.email}</span>
                  {/* Vertical separator between email and phone */}
                  <Separator orientation="vertical" className="mx-3 h-4" />
                  <span>{contact.phone}</span>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-2 bg-gray-50/50 dark:bg-gray-900/20 py-2.5">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        {/* ========================================================= */}
        {/* TAB 2: ADD NEW CONTACT FORM                              */}
        {/* ========================================================= */}
        <TabsContent value="new" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Register a New Contact</CardTitle>
              <CardDescription>
                Fill out the basic details below to add someone to the directory.
              </CardDescription>
            </CardHeader>

            <Separator />

            <form onSubmit={handleAddContact}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Lopez"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Role / Position</label>
                  <input
                    type="text"
                    placeholder="e.g. Product Designer"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="maria@company.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+505 8888-1234"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between border-t pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentTab('list')}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Contact
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## ⚠️ What Can Go Wrong? (Common Pitfalls & Fixes)

When you start assembling complex layouts, here are the most frequent hiccups beginners face, along with quick solutions:

### 1. "I click the tab, but nothing appears!"
- **Cause**: The `value` prop in your `<TabsTrigger value="xyz">` does not match the `value` in your `<TabsContent value="abc">`. They are case-sensitive strings!
- **Fix**: Double check spelling:
  ```tsx
  {/* ❌ Mismatched */}
  <TabsTrigger value="contacts">Contacts</TabsTrigger>
  <TabsContent value="contact">...</TabsContent>

  {/* ✅ Matched */}
  <TabsTrigger value="contacts">Contacts</TabsTrigger>
  <TabsContent value="contacts">...</TabsContent>
  ```

### 2. "My vertical Separator is invisible!"
- **Cause**: Vertical separators have a width of `1px`, but inside a flex container they won't automatically stretch in height unless their parent has a defined height or you give the separator an explicit Tailwind height class.
- **Fix**: Always specify a height utility on vertical separators:
  ```tsx
  {/* ❌ Might render with 0 height */}
  <Separator orientation="vertical" />

  {/* ✅ Visible and properly sized */}
  <Separator orientation="vertical" className="h-4 mx-2" />
  ```

### 3. "My CardHeader looks messy or elements overlap."
- **Cause**: Placing interactive inputs directly into `CardHeader` without a flex container. `CardHeader` is styled with standard vertical padding meant for titles and brief descriptions.
- **Fix**: Put inputs and tables into `CardContent`. Keep `CardHeader` dedicated to `CardTitle` and `CardDescription`.

### 4. "The card takes up the entire browser width and looks like a stretched rectangle."
- **Cause**: By default, `div` elements take 100% of the available horizontal space.
- **Fix**: Add a max-width class such as `max-w-md`, `max-w-xl`, or `max-w-2xl` and center it with `mx-auto`:
  ```tsx
  <Card className="max-w-lg mx-auto">
    {/* Clean, readable width */}
  </Card>
  ```

---

## 🎯 Try It Yourself! (Exercise)

Now it is your turn to put your hands on the keyboard and practice!

### Your Mission: Add a "Favorites" Tab
1. Open the mini-project code above in your code editor.
2. In the `Contact` interface, add a new boolean field: `isFavorite: boolean`.
3. Give at least one initial contact `isFavorite: true`.
4. Update `<TabsList>` to have three columns (`grid-cols-3`) and add a third trigger:
   ```tsx
   <TabsTrigger value="favorites">Favorites</TabsTrigger>
   ```
5. Add a third `<TabsContent value="favorites">`. Inside this tab, filter the contacts array so only contacts with `isFavorite === true` are rendered.
6. Add a small star or `Badge` saying *"Favorite"* on their card!

### Need a Hint?
```tsx
const favoriteContacts = contacts.filter((c) => c.isFavorite);

<TabsContent value="favorites" className="mt-6 space-y-4">
  {favoriteContacts.length === 0 ? (
    <p className="text-gray-500 text-sm">No favorites added yet.</p>
  ) : (
    favoriteContacts.map((contact) => (
      <Card key={contact.id}>
        {/* Render card */}
      </Card>
    ))
  )}
</TabsContent>
```

Take 15 minutes to code this out in your editor. You'll feel the satisfaction of seeing the tabs seamlessly switch between "All Contacts", "Add New", and "Favorites"!

---

## ✅ Summary

You've learned how to bring order and visual polish to your web applications:

- 🗂️ **`Card`** is your fundamental grouping container. Its subcomponents (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) ensure consistent margins and typography.
- 📑 **`Tabs`** divide your application into clean, digestible sub-views without leaving the page. They can be uncontrolled (`defaultValue`) or controlled via `useState`.
- ➖ **`Separator`** provides clear visual distinction, whether running horizontally between sections or vertically between small badges and metadata.
- 🧩 Combining these three components creates layouts that look engineered, structured, and easy to use.

In the next module, we will explore **Feedback components**: how your app communicates progress, success messages, warnings, and loading indicators to the user!

---

## 🧭 Navigation

| [← Previous: Module 03 (Forms)](03-forms.md) | [Table of Contents](README.md) | [Next: Module 05 (Feedback) →](05-feedback.md) |
| :--- | :---: | ---: |
