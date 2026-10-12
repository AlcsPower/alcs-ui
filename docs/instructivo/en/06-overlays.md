# 🪟 Module 06: Overlays — Windows That Float Above Everything

> **"Don't clutter the main stage. Bring things forward only when the user asks for them."**

Welcome to Module 06! When designing a software application, space on the screen is precious. If you try to display every form, every confirmation question, and every single menu option on the main page all at once, your screen quickly becomes crowded, confusing, and overwhelming.

How do great applications solve this? They use **overlays**.

An overlay is an interface element that temporarily floats *above* the rest of your page. It steps into the spotlight, handles a specific task, and then disappears without forcing the user to leave their current screen.

In this module, you will master the three essential overlay components from `@alcspower/ui`:
- 💬 **`Dialog`**: Focused modal windows for critical forms and confirmation prompts.
- 💡 **`Tooltip`**: Helpful little hint bubbles that pop up when you hover over an icon or button.
- 📋 **`DropdownMenu`**: Tidy menus that unfold when clicked, packing dozens of actions into a single compact button.

Let's learn how to make elements float with elegance and precision!

---

## 📚 What You'll Learn

By the end of this module, you will be able to:
1. Explain what overlays are and why they are essential for clean, uncluttered user experiences.
2. Build accessible `Dialog` modals using all subcomponents (`DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`).
3. Control a `Dialog` programmatically with React state (`open` and `onOpenChange`).
4. Display helpful `Tooltip` hover hints with `TooltipProvider` for icon-only buttons.
5. Create slick `DropdownMenu` action menus with items, separators, and alignment options.
6. Assemble a complete **Contact Actions Mini-Project** combining dropdown menus, editing modals, delete confirmations, and tooltips.
7. Identify and fix common overlay gotchas, such as forgetting the `asChild` prop or omitting the `TooltipProvider`.

---

## ☁️ Introduction: Windows That Float Above Everything

Think about a physical desk where you are working on a tax document:
- When you need a quick calculator, you don't build a new wooden extension onto your desk. You pick up a handheld calculator, place it temporarily over your papers, do the math, and put it away.
- When you want to remember what a strange symbol on a form means, you slide a magnifying glass or sticky note over it.
- When you pull down a window blind, it covers the window temporarily without removing the glass.

In web development, **overlays** work the same way:
- **`Dialog` (Modal)**: Dims the rest of the webpage with a dark backdrop and centers a window in front of the user. It commands total attention (e.g., *"Are you sure you want to delete this contact?"*).
- **`Tooltip`**: A tiny whisper of text that appears when your mouse hovers over an unfamiliar icon, clarifying what will happen if you click it.
- **`DropdownMenu`**: A compact list that folds down like a pocket map, presenting actions without stealing the whole screen.

```
+-----------------------------------------------------------+
| Main Webpage (Dimmed Backdrop)                            |
|                                                           |
|        +-----------------------------------------+        |
|        | [DialogContent]                         |        |
|        |   [DialogHeader]                        |        |
|        |     [DialogTitle] Delete Contact? [/]   |        |
|        |   [/DialogHeader]                       |        |
|        |   This action cannot be undone.         |        |
|        |   [DialogFooter]                        |        |
|        |     [Cancel] [Confirm Delete]           |        |
|        |   [/DialogFooter]                       |        |
|        +-----------------------------------------+        |
|                                                           |
+-----------------------------------------------------------+
```

Let's explore each of these components in depth.

---

## 💬 Component 1: Dialog (Modals)

### What is a Dialog?

A **`Dialog`** (often referred to as a "modal") is a popup window that requires the user to interact with it before they can interact with the rest of the application. 

When a dialog opens:
1. A semi-transparent dark overlay (the "backdrop") covers the background content.
2. The user's keyboard focus is locked inside the dialog (pressing `Tab` cycles through the dialog's buttons, not the hidden page behind it).
3. Clicking outside the window or pressing the `Escape` key on the keyboard gently closes the dialog.

### The Dialog Family: Anatomy and Subcomponents

To ensure your modals are accessible to keyboard users and screen readers, `@alcspower/ui` provides a coordinated family of dialog subcomponents:

| Subcomponent | Purpose | Notes |
| :--- | :--- | :--- |
| **`Dialog`** | The root container that manages the open/closed state. | Wraps all other dialog parts. |
| **`DialogTrigger`** | The button or element that opens the dialog when clicked. | Always use `asChild` when wrapping a `<Button>`. |
| **`DialogContent`** | The floating white/dark modal box itself. | Placed directly inside `Dialog`. |
| **`DialogHeader`** | The top container for the title and subtitle. | Provides proper spacing and accessibility headers. |
| **`DialogTitle`** | The bold primary title of the dialog. | Screen readers announce this first! |
| **`DialogDescription`**| Muted text explaining the purpose of the modal. | Screen readers announce this as the accessible description. |
| **`DialogFooter`** | Bottom action bar for buttons (Cancel, Confirm, Save). | Automatically aligns buttons neatly. |
| **`DialogClose`** | A wrapper that closes the modal when clicked. | Perfect for "Cancel" or "Close" buttons. |

### Uncontrolled Dialog Example

Here is a straightforward example of a confirmation modal:

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button,
} from '@alcspower/ui';

export function DeleteConfirmationDialog() {
  const handleDelete = () => {
    // Perform delete action here
    console.log('Item deleted!');
  };

  return (
    <Dialog>
      {/* The trigger button: asChild passes click handlers to our Button */}
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>

      {/* The floating modal box */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        {/* Footer actions */}
        <DialogFooter className="gap-2 sm:gap-0">
          {/* DialogClose automatically closes the dialog on click */}
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            Yes, Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

> [!IMPORTANT]
> **What is `asChild` and why is it necessary?**  
> Notice we wrote `<DialogTrigger asChild><Button>...</Button></DialogTrigger>`.  
> By default, `DialogTrigger` renders its own HTML `<button>`. If you put another `<Button>` inside it without `asChild`, you would have a button nested inside another button (`<button><button>...</button></button>`), which is invalid HTML and causes subtle browser bugs.  
> The `asChild` prop tells `@alcspower/ui`: *"Do not create an extra HTML button; instead, pass your click behavior directly into the child `<Button>` I provided!"*

### Controlled Dialog Pattern (`open` + `onOpenChange`)

Sometimes, you need to open or close the dialog **programmatically** from your JavaScript code (for example, closing the modal only after an API request finishes successfully).

To do this, manage the state with `useState`:

```tsx
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  toast,
} from '@alcspower/ui';

export function ControlledDialogDemo() {
  // 1. Manage open state with boolean useState
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('Ana Garcia');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);

    // Simulate saving over the network
    setTimeout(() => {
      setIsSaving(false);
      // 2. Programmatically close the dialog!
      setIsOpen(false);
      toast.success('Contact details updated!');
    }, 1200);
  };

  return (
    <div>
      {/* Standalone button that opens the dialog */}
      <Button onClick={() => setIsOpen(true)}>Edit Contact</Button>

      {/* Controlled Dialog with open and onOpenChange props */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Contact Profile</DialogTitle>
            <DialogDescription>
              Make changes to your contact information here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          {/* Form inside Dialog */}
          <div className="py-4 space-y-3">
            <label className="text-sm font-medium">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              disabled={isSaving}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={isSaving} onClick={handleSave}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

---

## 💡 Component 2: Tooltip

### What is a Tooltip?

Have you ever used an app with an icon-only button — like a pencil, a trash can, or a magnifying glass — and paused for a second wondering: *"Does that pencil mean edit this note, or create a new note?"*

When you hover your mouse cursor over the button for half a second, a small black bubble appears saying *"Edit note"*. That is a **`Tooltip`**.

Tooltips are essential for:
- Giving meaning to icon-only buttons (`size="icon"`).
- Clarifying keyboard shortcuts (e.g., *"Search (Ctrl+K)"*).
- Explaining disabled buttons (e.g., *"You must enter a name first"*).

### Anatomy of Tooltip & `TooltipProvider`

In `@alcspower/ui`, tooltips use four pieces:
- `<TooltipProvider>`: Manages timing and delay so tooltips open smoothly.
- `<Tooltip>`: The wrapper for a single tooltip item.
- `<TooltipTrigger asChild>`: The target button you hover over.
- `<TooltipContent>`: The small popup bubble containing the hint text.

```tsx
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Button,
} from '@alcspower/ui';

export function TooltipShowcase() {
  return (
    // TooltipProvider should wrap your tooltips
    <TooltipProvider>
      <div className="flex items-center gap-4 p-4 border rounded-xl">
        {/* Tooltip on an Icon Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Delete contact">
              🗑️
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete contact permanently</p>
          </TooltipContent>
        </Tooltip>

        {/* Tooltip on an Edit Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Edit contact">
              ✏️
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit contact information</p>
          </TooltipContent>
        </Tooltip>

        {/* Tooltip with keyboard shortcut hint */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">
              Search
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Quick search (Press ⌘K)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

> [!TIP]
> **Pro Tip: Where should `<TooltipProvider>` go?**  
> You can wrap each tooltip individually with `<TooltipProvider>`, but in a real-world app, it is much cleaner to place a single `<TooltipProvider>` near the top of your app (around `<App />` or `<Layout />`). That way, all tooltips in your entire application share coordinated animations!

---

## 📋 Component 3: DropdownMenu

### What is a DropdownMenu?

Imagine a Swiss Army knife. It is small enough to fit in your pocket, but when you pull out a tool, you suddenly have a screwdriver, scissors, a bottle opener, and a knife blade ready to use.

A **`DropdownMenu`** is the digital Swiss Army knife of user interfaces. Instead of displaying five separate buttons on every row of a table or card, you display one compact three-dots button (`⋮`). When clicked, a menu drops down revealing all the available actions!

### Anatomy of DropdownMenu

In `@alcspower/ui`, a dropdown menu is constructed using:
- `<DropdownMenu>`: The root container managing open/closed state.
- `<DropdownMenuTrigger asChild>`: The button that activates the menu.
- `<DropdownMenuContent align="end">`: The floating menu container.
- `<DropdownMenuItem onClick={...}>`: An individual clickable action.
- `<DropdownMenuSeparator />`: A thin dividing line between groups of items (e.g., separating regular actions from dangerous actions).

### Code: DropdownMenu in Action

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button,
} from '@alcspower/ui';

export function ContactActionMenu() {
  const handleEdit = () => {
    console.log('Editing contact...');
  };

  const handleDuplicate = () => {
    console.log('Duplicating contact...');
  };

  const handleDelete = () => {
    console.log('Deleting contact...');
  };

  return (
    <DropdownMenu>
      {/* Trigger: Usually an icon button with three dots */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <span className="text-lg font-bold">⋮</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Content: 'align="end"' ensures the menu aligns with the right edge of the button */}
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleEdit}>
          ✏️ Edit Details
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleDuplicate}>
          📋 Duplicate Contact
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => alert('Exporting as vCard...')}>
          📤 Export vCard
        </DropdownMenuItem>

        {/* Visual separator before destructive actions */}
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleDelete}
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          🗑️ Delete Contact
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## 🚀 Mini-Project: Interactive Contact Actions System

Let's bring `Dialog`, `Tooltip`, and `DropdownMenu` together into a complete, realistic feature for our Contact Book!

In this mini-project:
1. Each contact card has a **DropdownMenu** triggered by a 3-dots button.
2. Clicking **"Edit Details"** opens an **Edit Dialog modal** pre-populated with that contact's current info.
3. Clicking **"Delete Contact"** opens a **Confirmation Dialog modal** asking for confirmation before deleting.
4. Action buttons have **Tooltips** that guide the user on hover.
5. All actions trigger realistic updates and toasts!

Here is the complete source code:

```tsx
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Toaster,
  toast,
} from '@alcspower/ui';

interface Contact {
  id: number;
  name: string;
  role: string;
  email: string;
}

export function ContactActionsMiniProject() {
  // Sample contact records
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'Elena Rostova', role: 'UX Designer', email: 'elena@company.com' },
    { id: 2, name: 'David Kim', role: 'DevOps Engineer', email: 'david@company.com' },
    { id: 3, name: 'Camila Morales', role: 'Product Manager', email: 'camila@company.com' },
  ]);

  // State to track which contact is currently being edited
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // State to track which contact is currently being deleted
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);

  // --- Handlers for Editing ---
  const handleOpenEdit = (contact: Contact) => {
    setEditingContact(contact);
    setEditName(contact.name);
    setEditRole(contact.role);
    setEditEmail(contact.email);
  };

  const handleSaveEdit = () => {
    if (!editingContact) return;

    setContacts((prev) =>
      prev.map((c) =>
        c.id === editingContact.id
          ? { ...c, name: editName, role: editRole, email: editEmail }
          : c
      )
    );

    toast.success(`Updated "${editName}" successfully!`);
    setEditingContact(null); // Closes the edit dialog
  };

  // --- Handlers for Deleting ---
  const handleConfirmDelete = () => {
    if (!deletingContact) return;

    setContacts((prev) => prev.filter((c) => c.id !== deletingContact.id));
    toast.error(`Deleted contact "${deletingContact.name}"`);
    setDeletingContact(null); // Closes the delete dialog
  };

  return (
    // Wrap entire view with TooltipProvider
    <TooltipProvider>
      <div className="mx-auto max-w-3xl p-6 space-y-6">
        <Toaster position="bottom-right" richColors />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Directory</h1>
            <p className="text-sm text-gray-500">
              Manage contacts using floating dropdowns and modal dialogs.
            </p>
          </div>
          <Badge variant="info">{contacts.length} Contacts</Badge>
        </div>

        {/* Contacts List */}
        <div className="space-y-3">
          {contacts.map((contact) => (
            <Card key={contact.id} className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                  {contact.name}
                </h3>
                <p className="text-xs text-gray-500">{contact.role} · {contact.email}</p>
              </div>

              {/* Action Buttons & Dropdown */}
              <div className="flex items-center gap-2">
                {/* Direct Edit Button with Tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleOpenEdit(contact)}
                      aria-label="Quick edit"
                    >
                      ✏️
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Quick edit contact</p>
                  </TooltipContent>
                </Tooltip>

                {/* Dropdown Menu for More Options */}
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="More actions">
                          <span className="text-base font-bold">⋮</span>
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>More actions</p>
                    </TooltipContent>
                  </Tooltip>

                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onClick={() => handleOpenEdit(contact)}>
                      ✏️ Edit Contact
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => toast.info(`Email copied: ${contact.email}`)}>
                      📋 Copy Email
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem
                      onClick={() => setDeletingContact(contact)}
                      className="text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                      🗑️ Delete Contact
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>

        {/* ======================================================== */}
        {/* MODAL 1: EDIT CONTACT DIALOG                             */}
        {/* ======================================================== */}
        <Dialog
          open={Boolean(editingContact)}
          onOpenChange={(open) => {
            if (!open) setEditingContact(null);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Contact</DialogTitle>
              <DialogDescription>
                Modify details for {editingContact?.name}. Changes apply immediately.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Role</label>
                <input
                  type="text"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingContact(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ======================================================== */}
        {/* MODAL 2: CONFIRM DELETE DIALOG                           */}
        {/* ======================================================== */}
        <Dialog
          open={Boolean(deletingContact)}
          onOpenChange={(open) => {
            if (!open) setDeletingContact(null);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Contact?</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove{' '}
                <strong className="text-gray-900 dark:text-white">
                  {deletingContact?.name}
                </strong>{' '}
                from your directory? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setDeletingContact(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
              >
                Yes, Delete Contact
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
```

---

## ⚠️ What Can Go Wrong? (Common Pitfalls & Fixes)

Working with overlays involves popups, event handlers, and layered HTML. Here are the most common pitfalls:

### 1. "React throws an error about button nesting!"
- **Error message**: `Warning: validateDOMNesting(...): <button> cannot appear as a descendant of <button>.`
- **Cause**: You wrapped a `<Button>` inside `<DialogTrigger>` or `<DropdownMenuTrigger>` without adding the `asChild` prop.
- **Fix**: Always include `asChild`:
  ```tsx
  {/* ❌ Invalid HTML */}
  <DialogTrigger><Button>Open</Button></DialogTrigger>

  {/* ✅ Valid HTML */}
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  ```

### 2. "Tooltips never appear when I hover over my buttons."
- **Cause**: You forgot to wrap the component tree with `<TooltipProvider>`.
- **Fix**: Wrap your page or component in `<TooltipProvider>...</TooltipProvider>`.

### 3. "My DropdownMenu opens off the edge of the monitor."
- **Cause**: By default, dropdown menus align to the start (left) edge of the trigger button. When the button is on the far right of the screen, the menu overflows off the viewport.
- **Fix**: Set `align="end"` on `<DropdownMenuContent>`:
  ```tsx
  <DropdownMenuContent align="end">
    {/* Neatly fits inside the screen boundary */}
  </DropdownMenuContent>
  ```

### 4. "Clicking Save closes the modal, but the state wasn't updated."
- **Cause**: Closing the modal before the state update completes, or mutating the object directly instead of using `setContacts`.
- **Fix**: Make sure you update state using proper immutability (`prev.map(...)` or `[...prev, newItem]`) and then set the modal state to `null` or `false`.

---

## 🎯 Try It Yourself! (Exercise)

Now it is your turn to expand this system!

### Your Challenge: Add a "View Details" Modal
1. In the `DropdownMenuContent`, add a new item:
   ```tsx
   <DropdownMenuItem onClick={() => setViewingContact(contact)}>
     👁️ View Full Details
   </DropdownMenuItem>
   ```
2. Create a new state variable: `const [viewingContact, setViewingContact] = useState<Contact | null>(null);`.
3. Add a third `<Dialog>` controlled by `open={Boolean(viewingContact)}`.
4. In the dialog body, show an enlarged Avatar, the contact's name, their role, their email, and a placeholder for notes.
5. In the footer, include a single `<Button onClick={() => setViewingContact(null)}>Close</Button>`.

Test it out! You will have a complete enterprise-grade view/edit/delete overlay system running right in your app.

---

## ✅ Summary

Overlays are the secret weapon of uncluttered, professional user interfaces:

- 💬 **`Dialog`**: Demands focus for critical actions, forms, or confirmations. Use `DialogTrigger asChild` and remember that `DialogClose asChild` provides quick dismiss buttons. Use controlled `open` + `onOpenChange` when coordinating with asynchronous operations.
- 💡 **`Tooltip`**: Provides instant clarity for icon buttons and keyboard shortcuts on hover. Requires `<TooltipProvider>` higher up in the component tree.
- 📋 **`DropdownMenu`**: Packs numerous actions into a single compact button. Use `align="end"` for buttons positioned on the right side of the screen.

In the next module, we will explore **Data components**: how to present large datasets cleanly with tables, status badges, and pagination!

---

## 🧭 Navigation

| [← Previous: Module 05 (Feedback)](05-feedback.md) | [Table of Contents](README.md) | [Next: Module 07 (Data) →](07-data.md) |
| :--- | :---: | ---: |
