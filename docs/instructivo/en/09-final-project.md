# 🏆 Module 09: Final Project — Building the Complete Enterprise Contact Book

> **"Congratulations! You started from the very basics, and now you have the skills to build a complete, production-grade application."**

Welcome to Module 09, your capstone final project! 

Take a deep breath and give yourself credit for how far you've come. When you began this journey:
- You learned how web pages work and how React breaks complex screens into reusable LEGO blocks.
- You mastered fundamental visual elements: `Button`, `Badge`, and `Avatar`.
- You conquered user input and state management: `Input`, `Select`, `Checkbox`, `Switch`, and `useState`.
- You organized layouts with `Card`, `Tabs`, and `Separator`.
- You mastered user feedback with `Alert`, `Toast`, `Spinner`, `Skeleton`, and `Progress`.
- You built floating overlays with `Dialog`, `Tooltip`, and `DropdownMenu`.
- You displayed data grids with `Table`, `StatusBadge`, and `Pagination`.
- You guided users with `Accordion`, `Breadcrumb`, and `Stepper`.

In this final module, we will bring **all of these components together** to architect, assemble, and run a full-featured, modular **Enterprise Contact Book Application**.

---

## 📚 What You'll Learn & Build

In this capstone project, you will:
1. Architect a clean, scalable folder structure for modern React applications.
2. Define strong TypeScript models in `types.ts` to guarantee type safety throughout your codebase.
3. Construct a responsive master `Layout.tsx` featuring breadcrumbs, tabs, and dark mode-ready container cards.
4. Assemble a rich `ContactCard.tsx` featuring avatars, status badges, tooltips, and action dropdowns.
5. Build an interactive `ContactForm.tsx` with inputs, selects, switches, inline alerts, and toast notifications.
6. Develop a paginated `ContactList.tsx` table with skeleton loading states, status indicators, and empty states.
7. Craft a guided `AddContactStepper.tsx` registration wizard with real-time progress calculations and confirmation dialogs.
8. Wire everything together inside `App.tsx` and `main.tsx` with global toast notifications.
9. Review your comprehensive learning checklist and explore clear next steps for your career as a web developer.

---

## 🧰 Summary of Everything Learned

Here is the complete palette of `@alcspower/ui` components you now command:

| Category | Components Mastered |
| :--- | :--- |
| **Primitives & Actions** | `Button`, `Badge`, `Avatar` |
| **Form Inputs** | `Input`, `Label`, `Field`, `Select`, `Checkbox`, `Switch` |
| **Layout & Structure** | `Card` (Header, Title, Description, Content, Footer), `Tabs` (List, Trigger, Content), `Separator` |
| **Feedback & Loading** | `Alert` (Title, Description), `Toast` / `Toaster`, `Spinner`, `Skeleton`, `Progress` |
| **Overlays & Menus** | `Dialog` (Trigger, Content, Header, Title, Description, Footer, Close), `Tooltip` (Provider, Trigger, Content), `DropdownMenu` (Trigger, Content, Item, Separator) |
| **Data Presentation** | `Table` (Header, Body, Row, Head, Cell), `StatusBadge`, `Pagination` (Content, Item, Link, Previous, Next) |
| **Navigation & Disclosure** | `Accordion` (Item, Trigger, Content), `Breadcrumb` (List, Item, Link, Separator, Page), `Stepper` (Item, Trigger, Separator, Title) |

---

## 🏗️ Architecture & File Structure

A well-structured application makes code easy to read, test, and maintain. Instead of dumping hundreds of lines into a single file, we will divide our project into clean, single-responsibility files:

```
my-contacts/
├── src/
│   ├── components/
│   │   ├── AddContactStepper.tsx   # 3-step registration wizard with progress & dialog
│   │   ├── ContactCard.tsx         # Detailed profile card with avatar, badges & dropdown
│   │   ├── ContactForm.tsx         # Direct creation form with inputs, select, switch & alert
│   │   ├── ContactList.tsx         # Paginated table with status badges & skeletons
│   │   └── Layout.tsx              # Application shell with Breadcrumb and Tabs
│   ├── types.ts                    # TypeScript data types and constants
│   ├── App.tsx                     # Top-level state coordinator and Toaster root
│   └── main.tsx                    # Standard React 19 entrypoint
├── package.json
└── tsconfig.json
```

Let's write each of these files step by step!

---

## 📄 File 1: `src/types.ts`

First, we create our data contracts. In TypeScript, creating an interface acts like a blueprint for our objects. It ensures that every contact in our system has all the expected fields, catching typos before our code even runs.

```typescript
// src/types.ts
// Data models and shared types for the Contact Book application

export type ContactCategory = 'Work' | 'Personal' | 'Family' | 'VIP';

export type ContactStatus = 'active' | 'inactive' | 'pending' | 'warning' | 'error';

export interface Contact {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  category: ContactCategory;
  active: boolean;
  status: ContactStatus;
  favorite: boolean;
  avatarUrl?: string;
  notes?: string;
}

// Initial mock dataset to populate the application on first load
export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 1,
    name: 'Ana',
    lastName: 'Garcia',
    phone: '+505 8888-0001',
    email: 'ana.garcia@enterprise.com',
    category: 'Work',
    active: true,
    status: 'active',
    favorite: true,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    notes: 'Senior Software Architect. Lead developer for the Core UI project.',
  },
  {
    id: 2,
    name: 'Carlos',
    lastName: 'Mendoza',
    phone: '+505 8888-0002',
    email: 'carlos.m@enterprise.com',
    category: 'Work',
    active: true,
    status: 'pending',
    favorite: false,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    notes: 'Joined marketing team last month. Pending final onboarding review.',
  },
  {
    id: 3,
    name: 'Sofia',
    lastName: 'Herrera',
    phone: '+505 8888-0003',
    email: 'sofia.h@family.net',
    category: 'Family',
    active: true,
    status: 'active',
    favorite: true,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    notes: 'Sister. Remember to call for weekend birthday celebrations.',
  },
  {
    id: 4,
    name: 'Mateo',
    lastName: 'Ortega',
    phone: '+505 8888-0004',
    email: 'mateo.o@client.org',
    category: 'VIP',
    active: false,
    status: 'inactive',
    favorite: false,
    avatarUrl: '',
    notes: 'Key client partner. Account temporarily inactive during annual audit.',
  },
  {
    id: 5,
    name: 'Elena',
    lastName: 'Rostova',
    phone: '+505 8888-0005',
    email: 'elena.rostova@design.io',
    category: 'Work',
    active: true,
    status: 'active',
    favorite: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    notes: 'Lead Product Designer. Available weekdays 9 AM - 5 PM.',
  },
  {
    id: 6,
    name: 'David',
    lastName: 'Kim',
    phone: '+505 8888-0006',
    email: 'david.kim@cloudinfra.net',
    category: 'Work',
    active: true,
    status: 'active',
    favorite: false,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    notes: 'DevOps & SRE Specialist. Contact for emergency server alerts.',
  },
];
```

---

## 📄 File 2: `src/components/Layout.tsx`

The `Layout` component provides our application frame:
- Displays a top **`Breadcrumb`** showing navigation context.
- Houses the root **`Card`** container.
- Hosts our primary **`Tabs`** bar (`TabsList`, `TabsTrigger`, and `TabsContent`), allowing users to toggle between:
  1. **"All Contacts"** (Grid/Table view)
  2. **"Favorites"** (Filtered VIP cards)
  3. **"Quick Add"** (Standard form)
  4. **"Guided Wizard"** (3-step onboarding stepper)

```tsx
// src/components/Layout.tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Badge,
} from '@alcspower/ui';

interface LayoutProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  totalContacts: number;
  favoriteCount: number;
  children: {
    listTab: React.ReactNode;
    favoritesTab: React.ReactNode;
    addTab: React.ReactNode;
    wizardTab: React.ReactNode;
  };
}

export function Layout({
  currentTab,
  onTabChange,
  totalContacts,
  favoriteCount,
  children,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* ======================================================== */}
        {/* 1. BREADCRUMB NAVIGATION                                 */}
        {/* ======================================================== */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Directory</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {currentTab === 'list' && 'All Contacts'}
                {currentTab === 'favorites' && 'Favorite Contacts'}
                {currentTab === 'add' && 'Direct Registration'}
                {currentTab === 'wizard' && 'Step-by-Step Wizard'}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* ======================================================== */}
        {/* 2. MAIN APPLICATION CARD                                */}
        {/* ======================================================== */}
        <Card className="shadow-sm border-gray-200 dark:border-gray-800">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📇</span>
                  <CardTitle className="text-2xl font-bold tracking-tight">
                    Enterprise Contact Book
                  </CardTitle>
                </div>
                <CardDescription className="mt-1">
                  Manage personal and professional connections with real-time feedback and validation.
                </CardDescription>
              </div>

              {/* Status Counters */}
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  Total: {totalContacts}
                </Badge>
                <Badge variant="success" className="px-3 py-1">
                  ⭐ Favorites: {favoriteCount}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            {/* ==================================================== */}
            {/* 3. TABS CONTROLLER                                   */}
            {/* ==================================================== */}
            <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
                <TabsTrigger value="list">
                  All Contacts ({totalContacts})
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  Favorites ({favoriteCount})
                </TabsTrigger>
                <TabsTrigger value="add">
                  Quick Add
                </TabsTrigger>
                <TabsTrigger value="wizard">
                  Guided Wizard
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: All Contacts (Table & List) */}
              <TabsContent value="list" className="mt-0 focus-visible:outline-none">
                {children.listTab}
              </TabsContent>

              {/* Tab 2: Favorites Cards */}
              <TabsContent value="favorites" className="mt-0 focus-visible:outline-none">
                {children.favoritesTab}
              </TabsContent>

              {/* Tab 3: Quick Add Form */}
              <TabsContent value="add" className="mt-0 focus-visible:outline-none">
                {children.addTab}
              </TabsContent>

              {/* Tab 4: Guided Stepper Wizard */}
              <TabsContent value="wizard" className="mt-0 focus-visible:outline-none">
                {children.wizardTab}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

## 📄 File 3: `src/components/ContactCard.tsx`

The `ContactCard` component provides a rich profile presentation:
- Displays user photo with **`Avatar`** (falling back to initials if photo is empty).
- Shows category badge with **`Badge`**.
- Displays activity status indicator with **`StatusBadge`**.
- Features quick actions with **`Tooltip`** and **`Button`**.
- Offers an overflow action menu using **`DropdownMenu`**.

```tsx
// src/components/ContactCard.tsx
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Avatar,
  Badge,
  StatusBadge,
  Button,
  Separator,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@alcspower/ui';
import { Contact } from '../types';

interface ContactCardProps {
  contact: Contact;
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (contact: Contact) => void;
}

export function ContactCard({
  contact,
  onToggleFavorite,
  onDelete,
  onEdit,
}: ContactCardProps) {
  // Calculate initials for fallback avatar (e.g., "Ana Garcia" -> "AG")
  const initials = `${contact.name.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase();

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
      <div>
        {/* Card Header with Avatar, Name, and Status */}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* User Avatar with automatic initials fallback */}
              <Avatar
                src={contact.avatarUrl}
                alt={`${contact.name} ${contact.lastName}`}
                fallback={initials}
                className="h-12 w-12 border"
              />

              <div>
                <h3 className="font-semibold text-base text-gray-900 dark:text-white flex items-center gap-1.5">
                  {contact.name} {contact.lastName}
                  {contact.favorite && (
                    <span className="text-amber-500 text-sm" title="Favorite">
                      ★
                    </span>
                  )}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {contact.email}
                </p>
              </div>
            </div>

            {/* Category Badge */}
            <Badge
              variant={
                contact.category === 'VIP'
                  ? 'destructive'
                  : contact.category === 'Work'
                  ? 'default'
                  : 'outline'
              }
            >
              {contact.category}
            </Badge>
          </div>
        </CardHeader>

        <Separator />

        {/* Card Content with Phone, Status, and Notes */}
        <CardContent className="pt-3 pb-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Phone:</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {contact.phone}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">System Status:</span>
            <StatusBadge status={contact.status} />
          </div>

          {contact.notes && (
            <p className="text-xs text-gray-500 italic bg-gray-50 dark:bg-gray-900/50 p-2 rounded border mt-2">
              "{contact.notes}"
            </p>
          )}
        </CardContent>
      </div>

      {/* Card Footer with Quick Action Buttons & Dropdown */}
      <div>
        <Separator />
        <CardFooter className="py-2.5 px-4 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/20">
          {/* Favorite Toggle Button with Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={contact.favorite ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onToggleFavorite(contact.id)}
                className="text-xs"
              >
                {contact.favorite ? '★ Favorited' : '☆ Add Favorite'}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{contact.favorite ? 'Remove from favorites' : 'Mark as favorite'}</p>
            </TooltipContent>
          </Tooltip>

          {/* Action Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="More actions">
                <span className="text-base font-bold">⋮</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={() => onEdit(contact)}>
                ✏️ Edit Contact
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleFavorite(contact.id)}>
                {contact.favorite ? '★ Unstar' : '☆ Star as Favorite'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(contact.id)}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                🗑️ Delete Contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </div>
    </Card>
  );
}
```

---

## 📄 File 4: `src/components/ContactForm.tsx`

The `ContactForm` component captures user information with thorough validation:
- Uses **`Input`** for text fields (First name, Last name, Email, Phone).
- Uses **`Select`** for category choosing (`Work`, `Personal`, `Family`, `VIP`).
- Uses **`Switch`** to toggle VIP / Favorite status.
- Uses **`Checkbox`** to confirm agreement with company data privacy policy.
- Shows immediate inline **`Alert`** banners for missing data.
- Features animated **`Spinner`** inside the submit button during save.
- Triggers success and error messages via **`toast`**.

```tsx
// src/components/ContactForm.tsx
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  Spinner,
  toast,
} from '@alcspower/ui';
import { Contact, ContactCategory } from '../types';

interface ContactFormProps {
  onAddContact: (contact: Contact) => void;
  onSuccessRedirect: () => void;
}

export function ContactForm({ onAddContact, onSuccessRedirect }: ContactFormProps) {
  // Input form state variables
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<ContactCategory>('Work');
  const [isFavorite, setIsFavorite] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notes, setNotes] = useState('');

  // UI status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 1. Validation checks
    if (!name.trim() || !lastName.trim()) {
      setFormError('Please enter both a first name and a last name.');
      toast.warning('Name fields are required');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address with an @ symbol.');
      toast.warning('Valid email is required');
      return;
    }

    if (!termsAccepted) {
      setFormError('You must acknowledge the enterprise directory data policy.');
      toast.error('Policy agreement required');
      return;
    }

    // 2. Simulate network latency
    setIsSubmitting(true);

    setTimeout(() => {
      const newContact: Contact = {
        id: Date.now(),
        name: name.trim(),
        lastName: lastName.trim(),
        phone: phone.trim() || '+505 0000-0000',
        email: email.trim(),
        category,
        active: true,
        status: 'active',
        favorite: isFavorite,
        notes: notes.trim(),
      };

      onAddContact(newContact);
      setIsSubmitting(false);

      // Reset form
      setName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setNotes('');
      setIsFavorite(false);
      setTermsAccepted(false);

      // Toast feedback
      toast.success(`Contact "${newContact.name} ${newContact.lastName}" registered successfully!`);
      
      // Redirect back to list
      onSuccessRedirect();
    }, 1200);
  };

  return (
    <Card className="max-w-2xl mx-auto border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">Direct Contact Registration</CardTitle>
        <CardDescription>
          Enter the contact details below to add a new colleague or personal connection.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Validation Alert */}
          {formError && (
            <Alert variant="destructive">
              <AlertTitle>Cannot Submit Form</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          {/* Name & Last Name Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maria"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Rodriguez"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maria.r@company.com"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+505 8888-9999"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Directory Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ContactCategory)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Family">Family</option>
              <option value="VIP">VIP Client</option>
            </select>
          </div>

          {/* Favorite Switch Toggle */}
          <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-900/40">
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-white block">
                Mark as Favorite Contact
              </span>
              <span className="text-xs text-gray-500">
                Starred contacts appear in your quick-access favorites tab.
              </span>
            </div>
            <input
              type="checkbox"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
              className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </div>

          {/* Notes Textarea */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Internal Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Lead designer on project Alpha..."
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            />
          </div>

          {/* Policy Agreement Checkbox */}
          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-xs text-gray-600 dark:text-gray-400">
              I certify that this contact information adheres to the organization's privacy and data governance policies.
            </label>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onSuccessRedirect}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting && <Spinner size="sm" />}
            {isSubmitting ? 'Saving Contact...' : 'Save to Directory'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
```

---

## 📄 File 5: `src/components/ContactList.tsx`

The `ContactList` component delivers enterprise data management:
- Full tabular grid using **`Table`**, **`TableHeader`**, **`TableBody`**, **`TableRow`**, **`TableHead`**, and **`TableCell`**.
- Visual status indicators via **`StatusBadge`**.
- Interactive client-side **`Pagination`** controls.
- Simulated loading states with **`Skeleton`** placeholders.
- A friendly empty state when no contacts match the current search query.

```tsx
// src/components/ContactList.tsx
import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  StatusBadge,
  Badge,
  Button,
  Skeleton,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  toast,
} from '@alcspower/ui';
import { Contact } from '../types';

interface ContactListProps {
  contacts: Contact[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onEdit: (contact: Contact) => void;
  onToggleFavorite: (id: number) => void;
}

export function ContactList({
  contacts,
  isLoading,
  onDelete,
  onEdit,
  onToggleFavorite,
}: ContactListProps) {
  // Search filter query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // 1. Filter contacts based on search query
  const filteredContacts = contacts.filter((c) => {
    const fullName = `${c.name} ${c.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || c.email.toLowerCase().includes(query);
  });

  // 2. Pagination Calculations
  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredContacts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar & Counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Always reset to page 1 on search
          }}
          placeholder="Search by name or email..."
          className="w-full sm:max-w-xs border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
        />

        <span className="text-xs text-gray-500">
          Showing {filteredContacts.length} matching entries
        </span>
      </div>

      {/* ======================================================== */}
      {/* TABLE OR SKELETON LOADING STATE                          */}
      {/* ======================================================== */}
      <div className="rounded-lg border overflow-hidden">
        {isLoading ? (
          // Skeleton placeholders
          <div className="p-4 space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : filteredContacts.length === 0 ? (
          // Empty State
          <div className="text-center py-12 space-y-2">
            <span className="text-3xl block">🔍</span>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200">
              No contacts found
            </h4>
            <p className="text-xs text-gray-500">
              Try adjusting your search query or add a new contact above.
            </p>
          </div>
        ) : (
          // Real Data Table
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((contact) => (
                <TableRow key={contact.id}>
                  {/* Name, Email, and Favorite Star */}
                  <TableCell>
                    <div className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-white">
                      <span>{contact.name} {contact.lastName}</span>
                      {contact.favorite && (
                        <span className="text-amber-500 text-xs">★</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{contact.email}</div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {contact.category}
                    </Badge>
                  </TableCell>

                  {/* Phone */}
                  <TableCell className="text-xs text-gray-600 dark:text-gray-300">
                    {contact.phone}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <StatusBadge status={contact.status} />
                  </TableCell>

                  {/* Action Buttons */}
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleFavorite(contact.id)}
                      className="text-xs"
                    >
                      {contact.favorite ? '★' : '☆'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(contact)}
                      className="text-xs"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(contact.id)}
                      className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* ======================================================== */}
      {/* PAGINATION FOOTER                                        */}
      {/* ======================================================== */}
      {!isLoading && filteredContacts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <span className="text-xs text-gray-500">
            Page {currentPage} of {totalPages}
          </span>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => handlePageChange(currentPage - 1, e)}
                  aria-disabled={currentPage === 1}
                  className={currentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === pageNum}
                      onClick={(e) => handlePageChange(pageNum, e)}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => handlePageChange(currentPage + 1, e)}
                  aria-disabled={currentPage === totalPages}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
```

---

## 📄 File 6: `src/components/AddContactStepper.tsx`

The `AddContactStepper` provides a guided multi-step onboarding wizard:
- Visual step progression with **`Stepper`**, **`StepperItem`**, **`StepperTrigger`**, **`StepperTitle`**, and **`StepperSeparator`**.
- Real-time overall completion bar with **`Progress`**.
- Optional details accordion with **`Accordion`**.
- Modal confirmation popup before final database writing using **`Dialog`**.

```tsx
// src/components/AddContactStepper.tsx
import React, { useState } from 'react';
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperTitle,
  StepperSeparator,
  Progress,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  toast,
} from '@alcspower/ui';
import { Contact, ContactCategory } from '../types';

interface AddContactStepperProps {
  onAddContact: (contact: Contact) => void;
  onFinishRedirect: () => void;
}

export function AddContactStepper({
  onAddContact,
  onFinishRedirect,
}: AddContactStepperProps) {
  // Stepper Stage: 1 = Basic Info, 2 = Contact Methods, 3 = Confirmation
  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<ContactCategory>('Work');
  const [notes, setNotes] = useState('');

  // Validation Error State
  const [stepError, setStepError] = useState<string | null>(null);

  // Confirmation Dialog Open State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const steps = [
    { id: 1, title: 'Basic Identity' },
    { id: 2, title: 'Contact Methods' },
    { id: 3, title: 'Final Review' },
  ];

  // Calculate Progress Percentage: Step 1 = 33%, Step 2 = 66%, Step 3 = 100%
  const progressPercent = Math.round((currentStep / steps.length) * 100);

  // Validate Step 1
  const handleProceedStep1 = () => {
    if (!name.trim() || !lastName.trim()) {
      setStepError('First and last name are required to advance to the next step.');
      return;
    }
    setStepError(null);
    setCurrentStep(2);
  };

  // Validate Step 2
  const handleProceedStep2 = () => {
    if (!email.trim() || !email.includes('@')) {
      setStepError('A valid email address is required.');
      return;
    }
    setStepError(null);
    setCurrentStep(3);
  };

  // Execute Final Creation
  const handleFinalConfirm = () => {
    const created: Contact = {
      id: Date.now(),
      name: name.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim() || '+505 0000-0000',
      category,
      active: true,
      status: 'active',
      favorite: false,
      notes: notes.trim(),
    };

    onAddContact(created);
    setIsConfirmModalOpen(false);

    toast.success(`Wizard completed: ${created.name} ${created.lastName} created!`);
    onFinishRedirect();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 1. STEPPER MILESTONES */}
      <Card className="p-4 border border-gray-200 dark:border-gray-800">
        <Stepper value={currentStep}>
          {steps.map((step) => (
            <StepperItem key={step.id} step={step.id}>
              <StepperTrigger>
                <StepperTitle>{step.title}</StepperTitle>
              </StepperTrigger>
              {step.id < steps.length && <StepperSeparator />}
            </StepperItem>
          ))}
        </Stepper>

        {/* Progress Bar under Stepper */}
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Overall Wizard Progress</span>
            <span>{progressPercent}% Complete</span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>
      </Card>

      {/* Validation Alert */}
      {stepError && (
        <Alert variant="destructive">
          <AlertTitle>Validation Notice</AlertTitle>
          <AlertDescription>{stepError}</AlertDescription>
        </Alert>
      )}

      {/* ======================================================== */}
      {/* 2. STEP CONTENT CARD                                     */}
      {/* ======================================================== */}
      <Card className="border border-gray-200 dark:border-gray-800">
        {/* STEP 1: IDENTITY */}
        {currentStep === 1 && (
          <div>
            <CardHeader>
              <CardTitle>Step 1: Contact Identity</CardTitle>
              <CardDescription>
                Provide the full name and organizational role for this contact.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">First Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Gabriel"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Last Name *</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Lopez"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-end border-t pt-4">
              <Button onClick={handleProceedStep1}>
                Continue to Contact Info →
              </Button>
            </CardFooter>
          </div>
        )}

        {/* STEP 2: CONTACT METHODS */}
        {currentStep === 2 && (
          <div>
            <CardHeader>
              <CardTitle>Step 2: Communication Channels</CardTitle>
              <CardDescription>
                How can team members and clients reach this contact?
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gabriel.lopez@enterprise.com"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+505 8888-7777"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ContactCategory)}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Family">Family</option>
                  <option value="VIP">VIP Client</option>
                </select>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                ← Back
              </Button>
              <Button onClick={handleProceedStep2}>
                Continue to Review →
              </Button>
            </CardFooter>
          </div>
        )}

        {/* STEP 3: REVIEW & CONFIRMATION */}
        {currentStep === 3 && (
          <div>
            <CardHeader>
              <CardTitle>Step 3: Verification & Notes</CardTitle>
              <CardDescription>
                Confirm the details before final registration into the central directory.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Summary Box */}
              <div className="p-4 rounded-lg border bg-gray-50/50 dark:bg-gray-900/40 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {name} {lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {phone || 'None provided'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {category}
                  </span>
                </div>
              </div>

              {/* Optional Notes Accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="notes">
                  <AccordionTrigger>Optional: Add Biographical Notes</AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add team, shift, or specialty notes here..."
                      className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                ← Back
              </Button>

              {/* Trigger Confirmation Dialog */}
              <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
                <DialogTrigger asChild>
                  <Button>Submit Wizard ✓</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Contact Creation</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to add{' '}
                      <strong>{name} {lastName}</strong> to the directory? This will notify directory administrators.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                      <Button variant="outline">Review Again</Button>
                    </DialogClose>
                    <Button onClick={handleFinalConfirm}>
                      Yes, Save Contact
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </div>
        )}
      </Card>
    </div>
  );
}
```

---

## 📄 File 7: `src/App.tsx`

Now we assemble the entire application into our master orchestrator `App.tsx`!
- Houses the centralized state for `contacts`.
- Provides edit dialog handling.
- Renders the global `<Toaster />` for notifications.
- Passes all tab views directly into `<Layout>`.

```tsx
// src/App.tsx
import { useState } from 'react';
import {
  Toaster,
  toast,
  TooltipProvider,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@alcspower/ui';
import { Contact, INITIAL_CONTACTS } from './types';
import { Layout } from './components/Layout';
import { ContactCard } from './components/ContactCard';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { AddContactStepper } from './components/AddContactStepper';

export function App() {
  // Master Contacts Collection
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);

  // Active Tab
  const [currentTab, setCurrentTab] = useState<string>('list');

  // Contact Edit Modal State
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');

  // Contact Handlers
  const handleAddContact = (newContact: Contact) => {
    setContacts((prev) => [newContact, ...prev]);
  };

  const handleDeleteContact = (id: number) => {
    const target = contacts.find((c) => c.id === id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
    toast.error(`Removed "${target?.name} ${target?.lastName}" from contacts`);
  };

  const handleToggleFavorite = (id: number) => {
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextFav = !c.favorite;
          if (nextFav) {
            toast.success(`Marked ${c.name} as favorite!`);
          } else {
            toast.info(`Removed ${c.name} from favorites`);
          }
          return { ...c, favorite: nextFav };
        }
        return c;
      })
    );
  };

  // Edit Handlers
  const handleOpenEdit = (contact: Contact) => {
    setEditingContact(contact);
    setEditFirstName(contact.name);
    setEditLastName(contact.lastName);
    setEditEmail(contact.email);
    setEditPhone(contact.phone);
  };

  const handleSaveEdit = () => {
    if (!editingContact) return;

    setContacts((prev) =>
      prev.map((c) =>
        c.id === editingContact.id
          ? {
              ...c,
              name: editFirstName,
              lastName: editLastName,
              email: editEmail,
              phone: editPhone,
            }
          : c
      )
    );

    toast.success(`Saved changes to ${editFirstName} ${editLastName}!`);
    setEditingContact(null);
  };

  // Derived Values
  const favoriteContacts = contacts.filter((c) => c.favorite);

  return (
    <TooltipProvider>
      {/* Global Toast Provider */}
      <Toaster position="bottom-right" richColors />

      {/* Main Layout Frame */}
      <Layout
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        totalContacts={contacts.length}
        favoriteCount={favoriteContacts.length}
      >
        {{
          // TAB 1: ALL CONTACTS TABLE
          listTab: (
            <ContactList
              contacts={contacts}
              isLoading={false}
              onDelete={handleDeleteContact}
              onEdit={handleOpenEdit}
              onToggleFavorite={handleToggleFavorite}
            />
          ),

          // TAB 2: FAVORITES GRID OF CARDS
          favoritesTab: (
            <div className="space-y-4">
              {favoriteContacts.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-gray-50 dark:bg-gray-900/20">
                  <span className="text-3xl block mb-2">⭐</span>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    No favorite contacts yet
                  </h4>
                  <p className="text-xs text-gray-500">
                    Click the star button on any contact card to bookmark them here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteContacts.map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      onToggleFavorite={handleToggleFavorite}
                      onDelete={handleDeleteContact}
                      onEdit={handleOpenEdit}
                    />
                  ))}
                </div>
              )}
            </div>
          ),

          // TAB 3: DIRECT ADD FORM
          addTab: (
            <ContactForm
              onAddContact={handleAddContact}
              onSuccessRedirect={() => setCurrentTab('list')}
            />
          ),

          // TAB 4: 3-STEP STEPPER WIZARD
          wizardTab: (
            <AddContactStepper
              onAddContact={handleAddContact}
              onFinishRedirect={() => setCurrentTab('list')}
            />
          ),
        }}
      </Layout>

      {/* ======================================================== */}
      {/* GLOBAL EDIT CONTACT MODAL DIALOG                         */}
      {/* ======================================================== */}
      <Dialog
        open={Boolean(editingContact)}
        onOpenChange={(open) => {
          if (!open) setEditingContact(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Contact Profile</DialogTitle>
            <DialogDescription>
              Update information for {editingContact?.name} {editingContact?.lastName}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium">First Name</label>
                <input
                  type="text"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                  className="w-full border rounded-md px-3 py-1.5 text-sm dark:bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">Last Name</label>
                <input
                  type="text"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                  className="w-full border rounded-md px-3 py-1.5 text-sm dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">Email Address</label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full border rounded-md px-3 py-1.5 text-sm dark:bg-gray-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">Phone</label>
              <input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full border rounded-md px-3 py-1.5 text-sm dark:bg-gray-800"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingContact(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}

export default App;
```

---

## 📄 File 8: `src/main.tsx`

Finally, here is our root entrypoint where React 19 boots our application into the HTML document:

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Make sure Tailwind styles and @alcspower/ui tokens are imported!

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## ✅ Final Learning Checklist

Review this checklist to celebrate everything you have accomplished across these modules:

- [x] **React 19 Foundations**: You understand components, props, children, and state hooks (`useState`, `useEffect`).
- [x] **Card Architecture**: You know how to group interfaces with `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`.
- [x] **Interactive Tabs**: You know how to toggle screen states with `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent`.
- [x] **Dividers**: You know how to apply horizontal and vertical `Separator` elements for visual breathing room.
- [x] **Feedback & Notifications**: You can alert users permanently with `Alert` and transiently with `toast` / `<Toaster />`.
- [x] **Loading Indicators**: You can show spinners during submission with `Spinner` and wireframe silhouettes with `Skeleton`.
- [x] **Completion Gauges**: You can animate percentage bars with `Progress`.
- [x] **Floating Windows**: You can create accessible modals with `Dialog` and quick hover descriptions with `Tooltip`.
- [x] **Action Dropdowns**: You can collapse secondary actions into tidy menus with `DropdownMenu`.
- [x] **Data Tables**: You can display structured information with `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell`.
- [x] **System Status Badges**: You know when to use the 5 semantic values of `StatusBadge` (`active`, `inactive`, `pending`, `error`, `warning`).
- [x] **Pagination**: You can slice arrays and navigate page sets using `Pagination`.
- [x] **Progressive Disclosure**: You can collapse long text sections using `Accordion`.
- [x] **Breadcrumbs**: You can leave clean navigational breadcrumbs using `Breadcrumb`.
- [x] **Step-by-Step Wizards**: You can guide users through multi-stage forms using `Stepper`.

---

## 🚀 What's Next? (Your Journey Continues!)

You now possess real, production-ready frontend development capabilities. Here are 4 exciting ways to take this application to the next level:

### 1. Multi-Page Routing with React Router
Right now, our app toggles views using `Tabs`. In larger enterprise applications, you can install **[React Router](https://reactrouter.com/)** to give every view its own real URL (such as `/contacts`, `/contacts/new`, `/contacts/:id`).

### 2. Persisting Data with `localStorage`
Whenever you refresh the browser page, your new contacts disappear because state lives in RAM memory. You can use browser `localStorage` in an `useEffect` hook to save contacts to the user's hard drive so they survive page refreshes:
```typescript
// Save to disk whenever contacts change
useEffect(() => {
  localStorage.setItem('my_contacts', JSON.stringify(contacts));
}, [contacts]);
```

### 3. Connecting to a Real Backend API
Instead of mock data, connect your app to a real REST or GraphQL server using `fetch` or `axios`. You can practice for free using public dummy backends like [JSONPlaceholder](https://jsonplaceholder.typicode.com/) or [ReqRes](https://reqres.in/).

### 4. Authentication & Protected Routes
Add a login screen so different team members have their own private contact books, complete with password protection and security badges!

---

## 🌟 Final Words of Encouragement

Programming is not about memorizing thousands of lines of syntax; it is about **learning how to break big problems into small, friendly pieces**. 

You just took on a comprehensive, professional component library and built an enterprise-grade web application from scratch. Be proud of the hours you invested, the bugs you solved, and the new skills you unlocked.

Keep experimenting, keep asking questions, and happy coding! 🚀

---

## 🧭 Navigation

| [← Previous: Module 08 (Navigation)](08-navigation.md) | [Table of Contents](README.md) | [Start from Beginning (Module 00) →](00-introduction.md) |
| :--- | :---: | ---: |
