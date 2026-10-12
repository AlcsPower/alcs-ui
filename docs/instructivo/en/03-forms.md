# 🟡 Module 03: Interactive Forms & React State

> **Capturing user input with Inputs, Selects, Checkboxes, Switches, and mastering the `useState` hook.**

---

## 📚 What You'll Learn

Up to this point, our cards and buttons have been static—they looked great, but they couldn't remember anything or react dynamically when the user entered information.

In this module, we turn your application into an interactive dialog with the user. By the end of this chapter, you will:

- 🧠 **Understand React State (`useState`)**: The erasable whiteboard analogy for computer memory.
- 📝 **Master the `Input` Component**: Sizes, controlled value bindings, `onChange` event handlers, and visual states (`hasError`, `hasSuccess`, `leftElement`, `rightElement`).
- 🏷️ **Ensure Accessibility with `Label` & `Field`**: Why proper labels are critical for screen readers and how `Field` groups controls cleanly.
- 🔽 **Select Options with `Select`**: Compose accessible dropdowns using `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, and `SelectItem`.
- ☑️ **Capture Booleans with `Checkbox`**: Multi-option agreements and consent toggles with `checked` and `onCheckedChange`.
- 🎚️ **Toggle Settings with `Switch`**: Instant state activation and the UX difference between checkboxes and switches.
- 🚀 **Build a Complete "Add Contact" Form**: A fully-featured form with validation, submission feedback, and live state updates.
- 🩺 **Troubleshoot Form Pitfalls**: Form reload events, controlled vs. uncontrolled input warnings, and missing state handlers.

---

## 🧠 What is React State? (The Erasable Whiteboard Analogy)

Imagine you are sitting in a conference room with a **small whiteboard and a dry-erase marker**.

```
+-------------------------------------------------------------+
|                 THE ERASABLE WHITEBOARD (STATE)             |
+-------------------------------------------------------------+
|                                                             |
|       +---------------------------------------------+       |
|       |  Current Contact Name: "Sarah Jenkins"      |       |
|       +---------------------------------------------+       |
|                                                             |
|   1. When the user types an extra letter "s":               |
|      - You wipe off "Sarah Jenkins" with an eraser.         |
|      - You write "Sarah Jenkinss" on the board.             |
|                                                             |
|   2. The moment the board changes, everyone in the          |
|      room (the React components) looks up and sees          |
|      the updated name immediately!                          |
|                                                             |
+-------------------------------------------------------------+
```

In programming, normal variables disappear or don't trigger visual updates when they change. If you change a plain variable like `let name = "Sarah"`, the browser does not know that it needs to re-draw the screen.

**React State** is an interactive, monitored whiteboard.

Whenever you update state in React:
1. React records the new value on the whiteboard.
2. React immediately **re-renders** (refreshes) the component, updating every visual element that depends on that value in less than a millisecond.

### The Anatomy of `useState`
In React, we create state using the `useState` hook:

```tsx
// 1. Import useState from React
import { useState } from 'react';

// 2. Call useState inside your component function
const [name, setName] = useState('');
```

Let's break down those four elements:
- `name`: The **current value** currently written on the whiteboard (starts as `''` empty string).
- `setName`: The **marker function** used to erase the whiteboard and write a new value.
- `useState('')`: The **initial value** written on the board when the page first loads.
- `[name, setName]`: JavaScript array destructuring (unpacking the value and the updater function).

---

## 📝 The Input Component

The **Input** component is where users type text: names, emails, phone numbers, or search queries.

In `@alcspower/ui`, `Input` provides:
- Three sizes: `"sm"`, `"md"`, and `"lg"`.
- Error feedback styling with `hasError`.
- Success validation styling with `hasSuccess`.
- Prefix and suffix elements with `leftElement` and `rightElement` (ideal for icons, currency signs, or search buttons).

### Controlled Input Example Commented Line-by-Line

In modern React, we always use **Controlled Inputs**—meaning React state is the single source of truth for what text is currently displayed inside the box:

```tsx
import { useState } from 'react';
import { Input } from '@alcspower/ui';

export function ControlledInputExample() {
  // 1. Create state to hold the input text
  const [fullName, setFullName] = useState('');

  return (
    <div className="space-y-2 max-w-sm">
      {/* 2. Bind the value and onChange event */}
      <Input
        placeholder="Enter your full name..."
        value={fullName} // The input displays whatever is in state
        onChange={(e) => setFullName(e.target.value)} // Whenever the user types, update state!
      />

      {/* 3. Display the live typed value in real time */}
      <p className="text-xs text-slate-500">
        You are currently typing: <strong className="text-slate-800">{fullName || '(nothing yet)'}</strong>
      </p>
    </div>
  );
}
```

---

### Input Visual States: Normal, Error, and Success

Form inputs need to communicate feedback instantly. If an email address is missing an `@` symbol, you want to show a clear red outline:

```tsx
import { Input } from '@alcspower/ui';

export function InputVisualStates() {
  return (
    <div className="space-y-4 max-w-sm">
      {/* 1. Default standard input */}
      <Input placeholder="Normal input..." />

      {/* 2. Input with error outline */}
      <Input 
        hasError 
        placeholder="Invalid email address" 
        defaultValue="invalid-email" 
      />

      {/* 3. Input with success outline */}
      <Input 
        hasSuccess 
        placeholder="Valid input" 
        defaultValue="elena@example.com" 
      />

      {/* 4. Large input with left icon element */}
      <Input 
        size="lg"
        leftElement={<span className="text-slate-400">🔍</span>}
        placeholder="Search contacts..." 
      />
    </div>
  );
}
```

---

## 🏷️ The `Label` and `Field` Components

Why can't we just use a `<p>` tag above an input?

### The Importance of Semantic Accessibility (a11y)
When a visually impaired user navigates your website using a screen reader:
- If you use a regular `<p>` or `<div>`, the screen reader doesn't know that the text belongs to the box underneath it.
- When you use a proper `<Label htmlFor="email">`, clicking the label text automatically focuses the input cursor, and screen readers read: *"Email address, edit text"*.

### Grouping with the `Field` Component
`@alcspower/ui` provides a convenient `<Field>` container that automatically spaces and coordinates labels, inputs, and error helper messages:

```tsx
import { Field, Label, Input } from '@alcspower/ui';

export function FieldExample() {
  return (
    <Field className="space-y-1.5">
      <Label htmlFor="contact-email">Email Address</Label>
      <Input 
        id="contact-email" 
        type="email" 
        placeholder="alex@company.com" 
      />
      <span className="text-xs text-slate-500">
        We'll use this email to sync contacts across devices.
      </span>
    </Field>
  );
}
```

---

## 🔽 The Select Dropdown Component Suite

When you want users to pick **one option from a predefined list** (such as a contact category: Work, Family, or Friends), a **Select** dropdown prevents typos and ensures valid data.

`@alcspower/ui` provides a compound Select component built for accessibility:
- `<Select>`: Root controller managing open/close state and current value.
- `<SelectTrigger>`: The clickable box the user sees and taps.
- `<SelectValue>`: Displays the selected text or placeholder.
- `<SelectContent>`: The floating menu that opens with the list of options.
- `<SelectItem>`: Each selectable row with value and label.

### Complete Controlled Select Example

```tsx
import { useState } from 'react';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem,
  Field,
  Label 
} from '@alcspower/ui';

export function CategorySelectExample() {
  // 1. State holds the chosen category string
  const [category, setCategory] = useState('work');

  return (
    <Field className="max-w-sm space-y-1.5">
      <Label>Contact Category</Label>
      
      {/* 2. Bind value and onValueChange */}
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a category..." />
        </SelectTrigger>
        
        <SelectContent>
          <SelectItem value="work">💼 Work / Professional</SelectItem>
          <SelectItem value="family">🏡 Family</SelectItem>
          <SelectItem value="friends">🎉 Friends</SelectItem>
          <SelectItem value="other">📌 Other</SelectItem>
        </SelectContent>
      </Select>

      <p className="text-xs text-slate-500">
        Selected category value: <span className="font-semibold">{category}</span>
      </p>
    </Field>
  );
}
```

> [!NOTE]
> Unlike standard HTML `<select>` which triggers `onChange`, modern compound Select components in React trigger `onValueChange={(newValue) => setCategory(newValue)}`. This passes the chosen string directly without needing `e.target.value`!

---

## ☑️ The Checkbox Component

A **Checkbox** is used when a user can toggle an option on or off, or when selecting multiple options from a checklist (e.g., agreeing to terms, or subscribing to updates).

```tsx
import { useState } from 'react';
import { Checkbox, Label } from '@alcspower/ui';

export function CheckboxExample() {
  // State holds a boolean: true or false
  const [sendNotifications, setSendNotifications] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {/* Checkbox binds to checked and onCheckedChange */}
      <Checkbox 
        id="notifications" 
        checked={sendNotifications}
        onCheckedChange={(checked) => setSendNotifications(Boolean(checked))}
      />
      <Label htmlFor="notifications" className="cursor-pointer text-sm font-medium">
        Send me birthday reminder notifications
      </Label>
    </div>
  );
}
```

---

## 🎚️ The Switch Component

A **Switch** (toggle switch) also represents a boolean state (`true` or `false`), but it has a very different **user experience meaning** compared to a checkbox!

```
+-------------------------------------------------------------+
|                 CHECKBOX vs. SWITCH: UX GUIDE               |
+-------------------------------------------------------------+
|  Component   |  Mental Model       |  When to Use           |
|--------------|---------------------|------------------------|
|  [ ] Checkbox|  Form submission    |  Part of a larger form |
|              |  or multi-selection |  (e.g., terms agreement|
|              |                     |  or selecting rows).   |
|              |                     |                        |
|  ( )= Switch |  Physical light     |  Instant activation    |
|              |  switch             |  (e.g., "Dark Mode",   |
|              |                     |  "Mark as Favorite",   |
|              |                     |  "Mute Sounds").       |
+-------------------------------------------------------------+
```

### Switch Example in Code:

```tsx
import { useState } from 'react';
import { Switch, Label } from '@alcspower/ui';

export function FavoriteSwitchExample() {
  // State holds boolean favorite status
  const [isFavorite, setIsFavorite] = useState(true);

  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 max-w-sm">
      <div className="space-y-0.5">
        <Label htmlFor="favorite-toggle" className="font-semibold text-sm">
          Star Contact
        </Label>
        <p className="text-xs text-slate-500">
          Pin this contact to the top of your favorites list
        </p>
      </div>

      {/* Switch component binds to checked and onCheckedChange */}
      <Switch 
        id="favorite-toggle"
        checked={isFavorite}
        onCheckedChange={setIsFavorite}
      />
    </div>
  );
}
```

---

## 🚀 Mini-Project: Complete "Add Contact" Interactive Form

Let's synthesize everything we've learned into a complete, interactive **Add Contact Form** featuring:
- Full state management with `useState`.
- Name input with validation (shows error if user submits an empty name).
- Category dropdown (`Select`).
- Instant favorite switch (`Switch`).
- Reminder checkbox (`Checkbox`).
- Submission handler that prevents page refresh and simulates saving.

You can paste this entire component directly into `src/App.tsx`:

```tsx
// src/App.tsx
// Complete Add Contact Form using @alcspower/ui
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Button,
  Input,
  Label,
  Field,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Switch,
  Badge
} from '@alcspower/ui';

export default function App() {
  // ==========================================
  // 1. STATE WHITEBOARD: Storing Form Fields
  // ==========================================
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('work');
  const [isFavorite, setIsFavorite] = useState(false);
  const [allowNotifications, setAllowNotifications] = useState(true);
  
  // UI states for validation and saving feedback
  const [nameError, setNameError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastCreatedContact, setLastCreatedContact] = useState<string | null>(null);

  // ==========================================
  // 2. FORM SUBMISSION HANDLER
  // ==========================================
  const handleSubmit = (e: React.FormEvent) => {
    // Prevent default browser behavior (which reloads the whole page!)
    e.preventDefault();

    // Simple validation: Ensure name is not blank
    if (!name.trim()) {
      setNameError(true);
      return;
    }

    // Clear error
    setNameError(false);
    setIsSaving(true);

    // Simulate saving to a database with a 1.2 second timeout
    setTimeout(() => {
      setIsSaving(false);
      setLastCreatedContact(name);
      
      // Reset form fields
      setName('');
      setEmail('');
      setCategory('work');
      setIsFavorite(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6 flex flex-col items-center justify-center font-sans text-slate-900">
      <div className="w-full max-w-lg space-y-6">

        {/* Success Banner displayed when a contact is successfully added */}
        {lastCreatedContact && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center justify-between text-sm shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <span>🎉</span>
              <span>Contact <strong>{lastCreatedContact}</strong> added successfully!</span>
            </div>
            <Badge variant="success" size="sm">Saved</Badge>
          </div>
        )}

        {/* The Main Form Card */}
        <Card className="shadow-lg border border-slate-200 bg-white rounded-2xl overflow-hidden">
          <form onSubmit={handleSubmit}>

            {/* Card Header */}
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl font-bold text-slate-800">
                Add New Contact
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Fill in the details below to save a new contact to your personal directory.
              </CardDescription>
            </CardHeader>

            {/* Card Content Body */}
            <CardContent className="p-6 space-y-5">

              {/* Field 1: Full Name (Input with Error State) */}
              <Field className="space-y-1.5">
                <Label htmlFor="contact-name" className="text-sm font-semibold text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contact-name"
                  placeholder="e.g. Marcus Vance"
                  value={name}
                  hasError={nameError}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError(false); // Clear error while typing
                  }}
                />
                {nameError && (
                  <p className="text-xs text-red-500 font-medium">
                    ⚠️ Please enter a contact name before saving.
                  </p>
                )}
              </Field>

              {/* Field 2: Email Address (Input) */}
              <Field className="space-y-1.5">
                <Label htmlFor="contact-email" className="text-sm font-semibold text-slate-700">
                  Email Address
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="e.g. marcus.v@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              {/* Field 3: Category (Select Dropdown) */}
              <Field className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">💼 Work / Office</SelectItem>
                    <SelectItem value="family">🏡 Family</SelectItem>
                    <SelectItem value="friends">🎉 Friends</SelectItem>
                    <SelectItem value="vip">⭐ VIP / Important</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* Field 4: Favorite Toggle (Switch) */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="space-y-0.5">
                  <Label htmlFor="fav-toggle" className="text-sm font-semibold text-slate-800 cursor-pointer">
                    Mark as Favorite
                  </Label>
                  <p className="text-xs text-slate-500">
                    Quickly access this contact from your starred list
                  </p>
                </div>
                <Switch
                  id="fav-toggle"
                  checked={isFavorite}
                  onCheckedChange={setIsFavorite}
                />
              </div>

              {/* Field 5: Notifications Agreement (Checkbox) */}
              <div className="flex items-start gap-3 pt-1">
                <Checkbox
                  id="notifications-agreement"
                  checked={allowNotifications}
                  onCheckedChange={(checked) => setAllowNotifications(Boolean(checked))}
                />
                <div className="space-y-0.5">
                  <Label htmlFor="notifications-agreement" className="text-xs font-medium text-slate-700 cursor-pointer">
                    Enable activity notifications for this contact
                  </Label>
                  <p className="text-xs text-slate-400">
                    Receive alerts when notes or details are updated.
                  </p>
                </div>
              </div>

            </CardContent>

            {/* Card Footer with Submit Button */}
            <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => {
                  setName('');
                  setEmail('');
                  setNameError(false);
                }}
              >
                Clear Form
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSaving}
                loadingText="Saving Contact..."
              >
                Save Contact
              </Button>
            </CardFooter>

          </form>
        </Card>

      </div>
    </main>
  );
}
```

```
+-------------------------------------------------------------+
|  FORM PREVIEW IN BROWSER:                                   |
+-------------------------------------------------------------+
|  +-------------------------------------------------------+  |
|  |  Add New Contact                                      |  |
|  |  Fill in details below to save a new contact...       |  |
|  |  ---------------------------------------------------  |  |
|  |  Full Name *                                          |  |
|  |  [ Marcus Vance                                     ] |  |
|  |                                                       |  |
|  |  Email Address                                        |  |
|  |  [ marcus.v@example.com                             ] |  |
|  |                                                       |  |
|  |  Category                                             |  |
|  |  [ 💼 Work / Office                               v ] |  |
|  |                                                       |  |
|  |  +-------------------------------------------------+  |  |
|  |  | Mark as Favorite                         ( * )  |  |  |
|  |  +-------------------------------------------------+  |  |
|  |                                                       |  |
|  |  [x] Enable activity notifications                    |  |
|  |  ---------------------------------------------------  |  |
|  |  [ Clear Form ]                     [ Save Contact ]  |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

---

## 🩺 What Can Go Wrong? (Troubleshooting Forms)

### Issue 1: The browser reloads the entire page when clicking the button
- **Cause**: By default in HTML, submitting a `<form>` refreshes the browser window and clears all state.
- **Solution**: Always add `e.preventDefault()` inside your `onSubmit` function:
  ```tsx
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload!
    // your logic here...
  };
  ```

### Issue 2: Warning: "A component is changing an uncontrolled input to be controlled"
- **Cause**: You initialized state with `undefined` instead of an empty string `''`:
  ```tsx
  // ❌ Problem: starts undefined
  const [name, setName] = useState();
  
  // ✅ Solution: starts with empty string
  const [name, setName] = useState('');
  ```

### Issue 3: You can't type anything inside the Input box
- **Cause**: You provided `value={name}` but forgot to provide the `onChange={(e) => setName(e.target.value)}` handler. Without `onChange`, the input is locked to whatever value is currently in state!

---

## 🎯 Practice Exercise: Add Phone and Notes Fields

Take the form you just built and add two additional fields:

1. **Phone Number Field**:
   - Add a new state variable: `const [phone, setPhone] = useState('');`
   - Add an `Input` field with `placeholder="+1 (555) 000-0000"`.
   - Add a `leftElement` with a phone icon or emoji `📞`.

2. **Personal Notes Field**:
   - Add a new state variable: `const [notes, setNotes] = useState('');`
   - Add a multi-line input or styled text field for freeform notes.
   - Test submitting the form with all fields filled in!

---

---

## ⏱️ Form Validation Strategies: When Should You Validate?

Beginners often wonder: *"When should I check if the user entered valid information?"*

There are 3 main strategies, each with a specific trade-off:

```
+--------------------------------------------------------------------------+
|                       FORM VALIDATION STRATEGIES                         |
+--------------------------------------------------------------------------+
|  Strategy     | When it runs               | Best Used For               |
|---------------|----------------------------|-----------------------------|
|  1. On Submit | When user clicks "Save"    | Quick forms, checking that  |
|               |                            | required fields aren't empty|
|               |                            |                             |
|  2. On Blur   | When cursor leaves an input| Email formats, phone number |
|               | (user moves to next field) | length, password strength   |
|               |                            |                             |
|  3. On Change | Every single keystroke     | Password matching or live   |
|               |                            | search character count      |
+--------------------------------------------------------------------------+
```

### Pro Tip for Great User Experience:
Avoid yelling at the user while they are still in the middle of typing! If someone is typing `elena@`, don't immediately show a flashing red error saying *"Invalid email"*. Wait until they finish typing and move to the next field (the `onBlur` event) or click the submit button.

---

## 💡 Complete Solution to Practice Challenge

Here is the enhanced form snippet showing how to add the Phone and Notes fields with state and validation:

```tsx
// Solution: Adding Phone and Notes to state and UI
import { useState } from 'react';
import { Field, Label, Input } from '@alcspower/ui';

export function ExtendedFieldsSolution() {
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [phoneError, setPhoneError] = useState(false);

  // Validate phone on blur (when user clicks out)
  const handlePhoneBlur = () => {
    // Check if phone has at least 7 digits if provided
    if (phone && phone.replace(/\D/g, '').length < 7) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Phone Field with Icon */}
      <Field className="space-y-1.5">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 019-2834"
          leftElement={<span className="text-slate-400">📞</span>}
          value={phone}
          hasError={phoneError}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={handlePhoneBlur}
        />
        {phoneError && (
          <p className="text-xs text-red-500">
            Please enter a valid phone number with area code.
          </p>
        )}
      </Field>

      {/* Notes Field */}
      <Field className="space-y-1.5">
        <Label htmlFor="notes">Personal Notes</Label>
        <textarea
          id="notes"
          rows={3}
          className="w-full px-3 py-2 border rounded-md text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900"
          placeholder="Met at TechCon 2026. Interested in UI design system collaboration..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Field>
    </div>
  );
}
```

---

## ✅ Summary

- **`useState`** is React's erasable whiteboard: updating state triggers an instant, seamless re-render of your UI.
- **`Input`** captures user text with full support for controlled values, validation outlines (`hasError`, `hasSuccess`), and accessory elements (`leftElement`).
- **`Label`** and **`Field`** provide critical accessibility and consistent spacing for form controls.
- **`Select`** provides a compound dropdown menu for choosing from predefined lists.
- **`Checkbox`** handles multi-choice form selections, while **`Switch`** handles tactile, instant state toggles.
- Always use `e.preventDefault()` in form submission handlers to avoid page refreshes!

Now you know how to build both cards and interactive forms. But how do we organize a complex screen with multiple tabs, dialog modals, and responsive layout grids?

In the next module, we explore **Layouts, Modals, and Organization**!

---

### Navigation
| Previous | Home | Next |
| :---: | :---: | :---: |
| [← Module 02: Your First UI Building Blocks](02-first-component.md) | [Home](README.md) | [Module 04: Organization & Layouts →](04-layouts.md) |

