# 📣 Module 05: Feedback — How Your App Talks to the User

> **"Silence is confusing. Good feedback makes software feel responsive, thoughtful, and alive."**

Welcome to Module 05! Imagine ordering food at a restaurant. You tell the waiter what you'd like to eat. The waiter says nothing, makes no facial expression, walks away into the kitchen, and leaves you sitting there in total silence. 

Did they hear your order? Did the kitchen run out of ingredients? Should you order again, or will they accidentally charge you twice?

That uneasy feeling is exactly what users feel when an application does not provide **feedback**. 

When a user clicks a button, submits a form, or waits for data to download over the internet, your app must communicate clearly:
- *"I heard you! Working on it right now..."*
- *"Great news, your changes are saved!"*
- *"Oops! That email address seems invalid."*
- *"We are 80% done loading your file."*

In this module, you will learn the five feedback superpowers of `@alcspower/ui`:
- 🚨 **`Alert`**: Prominent inline message banners that stay on the screen until resolved.
- 🍞 **`Toast` & `Toaster`**: Ephemeral floating notification popups that appear, deliver good news, and slide away.
- 🌀 **`Spinner`**: Animated rotating wheels for quick background tasks.
- 💀 **`Skeleton`**: Elegant placeholder wireframes that mirror the shape of content before it arrives.
- 📊 **`Progress`**: Visual completion bars showing exact percentage progress.

Let's explore how to make your app speak clearly!

---

## 📚 What You'll Learn

By the end of this module, you will know how to:
1. Choose the right feedback tool for every situation: knowing when to use an `Alert` versus a `Toast`.
2. Render all variants of `Alert` (`default`, `destructive`, `success`, `warning`, `info`) with clear headings and descriptions.
3. Configure the global `<Toaster />` container and fire rich toast notifications (`toast.success`, `toast.error`, `toast.warning`).
4. Display a `Spinner` standalone or embedded directly into action buttons during async tasks.
5. Create modern `Skeleton` loading states so your users never stare at a blank, jittery screen.
6. Animate a `Progress` bar using React state and intervals.
7. Build a comprehensive **Feedback & Loading States Mini-Project** in our Contact Book app.

---

## 🚦 Introduction: How Your App Talks to the User

In the physical world, feedback surrounds us:
- When you press an elevator button, a small light turns on immediately to confirm the call.
- When an elevator arrives, it makes a pleasant chime.
- When a microwave finishes, it beeps.
- When you swipe your credit card, the terminal lights up green and sounds a chime.

In web applications, we have two distinct types of user feedback:

```
+-------------------------------------------------------------------------+
| FEEDBACK MATRIX                                                         |
+--------------------+----------------------------------------------------+
| Type of Event      | Best Component to Use                              |
+--------------------+----------------------------------------------------+
| Permanent / High   | Alert                                              |
| Importance Notice  | (e.g., "Account suspended", "Server offline")      |
+--------------------+----------------------------------------------------+
| Quick Confirmation | Toast                                              |
| or Transient Note  | (e.g., "Contact saved", "Copied to clipboard")     |
+--------------------+----------------------------------------------------+
| Waiting for an     | Spinner                                            |
| immediate action   | (e.g., inside a button: "Saving...")               |
+--------------------+----------------------------------------------------+
| Waiting for page   | Skeleton                                           |
| content to load    | (e.g., placeholder cards while fetching data)      |
+--------------------+----------------------------------------------------+
| Measurable         | Progress                                           |
| multi-step process | (e.g., file upload: 45% of 100%)                   |
+--------------------+----------------------------------------------------+
```

Let's study each component in detail!

---

## 🚨 Component 1: Alert

### What is an Alert?

An **`Alert`** is an inline banner placed directly within the flow of your page content. Unlike popups that vanish after 3 seconds, an `Alert` stays on screen until the condition changes or the user fixes the issue.

Use an `Alert` when the information is **critical to the user's current task**:
- *"Your session will expire in 2 minutes."*
- *"Please verify your email address before continuing."*
- *"Unable to connect to the database. Retrying..."*

### Alert Variants in `@alcspower/ui`

`@alcspower/ui` provides 5 semantic variants through the `variant` prop:
- `'default'`: Neutral gray/blue tone for standard notices.
- `'destructive'`: Bold red tone for errors, failures, and irreversible actions.
- `'success'`: Fresh green tone for confirmations and achievements.
- `'warning'`: Amber/yellow tone for cautions, limits, and reminders.
- `'info'`: Bright blue tone for helpful tips and system updates.

### Code: Anatomy of an Alert

An `Alert` consists of:
- `<Alert variant="...">`: The outer box with appropriate border, background, and icon colors.
- `<AlertTitle>`: A concise, bold headline.
- `<AlertDescription>`: The descriptive text explaining what happened or what action to take next.

```tsx
import { Alert, AlertTitle, AlertDescription } from '@alcspower/ui';

export function AlertShowcase() {
  return (
    <div className="space-y-4 max-w-lg">
      {/* 1. Success Variant */}
      <Alert variant="success">
        <AlertTitle>Saved Successfully!</AlertTitle>
        <AlertDescription>
          The contact has been updated in your address book.
        </AlertDescription>
      </Alert>

      {/* 2. Destructive (Error) Variant */}
      <Alert variant="destructive">
        <AlertTitle>Network Error</AlertTitle>
        <AlertDescription>
          Unable to save changes. Please check your internet connection and try again.
        </AlertDescription>
      </Alert>

      {/* 3. Warning Variant */}
      <Alert variant="warning">
        <AlertTitle>Incomplete Profile</AlertTitle>
        <AlertDescription>
          This contact does not have a phone number assigned yet.
        </AlertDescription>
      </Alert>

      {/* 4. Info Variant */}
      <Alert variant="info">
        <AlertTitle>Pro Tip</AlertTitle>
        <AlertDescription>
          You can press Ctrl+K to quickly search through all your contacts.
        </AlertDescription>
      </Alert>

      {/* 5. Default Variant */}
      <Alert variant="default">
        <AlertTitle>System Maintenance</AlertTitle>
        <AlertDescription>
          Scheduled maintenance will take place this Sunday at 02:00 AM UTC.
        </AlertDescription>
      </Alert>
    </div>
  );
}
```

---

## 🍞 Component 2: Toast & Toaster

### What is a Toast?

Have you ever watched an electric kitchen toaster? A slice of bread goes down, and when it is ready, it **pops up** above the counter for you to grab.

In web terminology, a **`Toast`** is a gentle floating message that slides into view from the corner of the screen, stays visible for 3 to 5 seconds so you can read it, and then smoothly glides away.

Toasts are ideal for **non-disruptive, quick confirmations**:
- *"Copied link to clipboard!"*
- *"Contact added to favorites."*
- *"Draft saved automatically."*

Because toasts disappear automatically, **never** put critical error details in a toast that the user needs to read slowly or refer back to while troubleshooting. For that, use an `Alert`.

### The Two Steps to Using Toasts

Using toasts in `@alcspower/ui` requires two simple steps:

#### Step 1: Mount the `<Toaster />` once at the root of your application
You only need to put `<Toaster />` in your app once, usually in `main.tsx` or `App.tsx`. Think of it like installing the speaker system in your house. Once the speaker is mounted, any room can broadcast audio!

```tsx
// src/App.tsx or src/main.tsx
import { Toaster } from '@alcspower/ui';

export function App() {
  return (
    <div>
      {/* Your main application components live here */}
      <MainDashboard />

      {/* The Toaster listens for toast calls and displays them */}
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
```

> [!NOTE]
> - `position="bottom-right"`: Places notifications in the bottom-right corner. You can also use `"top-right"`, `"top-center"`, `"bottom-left"`, etc.
> - `richColors`: Automatically styles success toasts in green, errors in red, and warnings in amber.

#### Step 2: Trigger toasts anywhere using the `toast` function
From any component, button click, or API callback, import `toast` and call it:

```tsx
import { toast, Button } from '@alcspower/ui';

export function ToastButtonsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Success notification */}
      <Button
        variant="default"
        onClick={() => toast.success('Contact saved successfully!')}
      >
        Trigger Success
      </Button>

      {/* Error notification */}
      <Button
        variant="destructive"
        onClick={() => toast.error('Failed to delete contact. Please retry.')}
      >
        Trigger Error
      </Button>

      {/* Warning notification */}
      <Button
        variant="outline"
        onClick={() => toast.warning('Your storage is 90% full.')}
      >
        Trigger Warning
      </Button>

      {/* Neutral notification */}
      <Button
        variant="ghost"
        onClick={() => toast('Draft autosaved at 3:15 PM')}
      >
        Trigger Neutral
      </Button>
    </div>
  );
}
```

---

## 🌀 Component 3: Spinner

### What is a Spinner?

A **`Spinner`** is an animated circular icon that rotates continuously. Its circular motion tells the human eye: *"The machine is thinking, please wait a moment."*

### Spinner Sizes

`@alcspower/ui` provides three clean sizes via the `size` prop:
- `size="sm"`: Compact (ideal for embedding inside a button or table row).
- `size="md"`: Standard size (great for cards or loading dialogs).
- `size="lg"`: Large size (great for full-page loading screens).

```tsx
import { Spinner } from '@alcspower/ui';

export function SpinnerSizesDemo() {
  return (
    <div className="flex items-center gap-6 p-4 border rounded-lg">
      <div className="text-center">
        <Spinner size="sm" />
        <span className="text-xs text-gray-500 block mt-1">Small (sm)</span>
      </div>

      <div className="text-center">
        <Spinner size="md" />
        <span className="text-xs text-gray-500 block mt-1">Medium (md)</span>
      </div>

      <div className="text-center">
        <Spinner size="lg" />
        <span className="text-xs text-gray-500 block mt-1">Large (lg)</span>
      </div>
    </div>
  );
}
```

### The Best Pattern: Spinner Inside an Action Button

When a user submits a form, you should always:
1. Disable the button so they don't accidentally click it three times.
2. Show a small spinner next to a *"Saving..."* label.

```tsx
import { useState } from 'react';
import { Button, Spinner, toast } from '@alcspower/ui';

export function SaveContactButton() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    // 1. Enter loading state
    setIsSaving(true);

    // 2. Simulate saving to a backend server (takes 1.5 seconds)
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Saved to server!');
    }, 1500);
  };

  return (
    <Button
      onClick={handleSave}
      disabled={isSaving}
      className="flex items-center gap-2"
    >
      {isSaving && <Spinner size="sm" />}
      {isSaving ? 'Saving Contact...' : 'Save Contact'}
    </Button>
  );
}
```

---

## 💀 Component 4: Skeleton

### What is a Skeleton?

Have you ever visited YouTube, Facebook, or LinkedIn on a slower internet connection? Before the video thumbnails or user photos appear, you see light gray boxes and bars gently pulsing in place. 

That is called a **`Skeleton`** (or skeleton screen). 

Why is it so much better than a generic spinning circle in the middle of a blank page?
1. **Perceived Speed**: Users feel the website is faster because the structure of the layout is already visible immediately.
2. **Prevents Layout Shift**: When real text and photos finally pop in, the page elements don't jump around violently because space was already reserved for them.

### Building Skeleton Placeholders

In `@alcspower/ui`, `<Skeleton />` is an animated gray placeholder box whose dimensions you control directly with Tailwind utility classes (`h-*`, `w-*`, `rounded-*`).

```tsx
import { Skeleton } from '@alcspower/ui';

export function ContactItemSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-xl">
      {/* Circular skeleton for an Avatar */}
      <Skeleton className="h-12 w-12 rounded-full" />

      {/* Text line skeletons */}
      <div className="space-y-2 flex-1">
        {/* Title line placeholder */}
        <Skeleton className="h-4 w-[250px]" />
        {/* Subtitle line placeholder */}
        <Skeleton className="h-4 w-[180px]" />
      </div>

      {/* Button placeholder */}
      <Skeleton className="h-9 w-20 rounded-md" />
    </div>
  );
}
```

### The Standard Loading Pattern

In React, the cleanest way to display skeletons while fetching data is a ternary operator:

```tsx
// Pattern: isLoading ? <SkeletonPlaceholder /> : <RealDataView />
{isLoading ? (
  <div className="space-y-3">
    <Skeleton className="h-16 w-full rounded-lg" />
    <Skeleton className="h-16 w-full rounded-lg" />
    <Skeleton className="h-16 w-full rounded-lg" />
  </div>
) : (
  <div className="space-y-3">
    {contacts.map((contact) => (
      <RealContactCard key={contact.id} contact={contact} />
    ))}
  </div>
)}
```

---

## 📊 Component 5: Progress

### What is a Progress Bar?

A **`Progress`** component is a horizontal bar that fills from left to right to display the completion percentage of a long-running operation, such as:
- Uploading a photo
- Multi-step account registration (Step 2 of 4 = 50%)
- Storage quota usage (75MB of 100MB used = 75%)

### Using the `value` Prop

The `Progress` component accepts a single primary prop: `value`, which represents a number between `0` and `100`.

```tsx
import { Progress } from '@alcspower/ui';

export function ProgressShowcase() {
  return (
    <div className="space-y-6 max-w-md">
      {/* 25% complete */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Uploading attachment</span>
          <span>25%</span>
        </div>
        <Progress value={25} />
      </div>

      {/* 75% complete */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Profile Completion</span>
          <span>75%</span>
        </div>
        <Progress value={75} />
      </div>

      {/* Custom thinner height */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Quick Sync</span>
          <span>50%</span>
        </div>
        <Progress value={50} className="h-1.5" />
      </div>
    </div>
  );
}
```

### Simulating Dynamic Progress with `setInterval`

Here is an example demonstrating an automated progress bar simulating a file backup or download:

```tsx
import { useState, useEffect } from 'react';
import { Progress, Button } from '@alcspower/ui';

export function SimulatedProgressBar() {
  const [percent, setPercent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Only run the timer if the process is active and not yet finished
    if (!isRunning || percent >= 100) return;

    const timer = setInterval(() => {
      setPercent((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          setIsRunning(false);
          return 100;
        }
        return next;
      });
    }, 300);

    // Clean up interval when component unmounts or state updates
    return () => clearInterval(timer);
  }, [isRunning, percent]);

  const handleStart = () => {
    setPercent(0);
    setIsRunning(true);
  };

  return (
    <div className="p-4 border rounded-xl space-y-4 max-w-md">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">Exporting Address Book</span>
        <span className="text-sm text-gray-500">{percent}%</span>
      </div>

      <Progress value={percent} />

      <Button
        size="sm"
        onClick={handleStart}
        disabled={isRunning}
      >
        {isRunning ? 'Exporting...' : percent === 100 ? 'Restart Export' : 'Start Export'}
      </Button>
    </div>
  );
}
```

---

## 🚀 Mini-Project: Complete Loading States in the Contact Book

Let's integrate all 5 feedback components into a working feature! 

In this mini-project:
1. When the screen mounts, we simulate a **2-second network request** displaying **Skeleton placeholders**.
2. If the user tries to save a contact with an empty name, an **`Alert` error banner** appears immediately at the top of the form.
3. While the contact is saving, the submit button displays a **`Spinner`** and disables itself.
4. When saving succeeds, a bright green **`Toast`** fires in the bottom-right corner.
5. A **`Progress`** bar shows profile completion percentage based on how many form fields are filled!

Here is the complete source code:

```tsx
import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
  Spinner,
  Skeleton,
  Progress,
  Toaster,
  toast,
} from '@alcspower/ui';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export function FeedbackMiniProject() {
  // State for initial data loading simulation
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Validation and async submission states
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Simulate initial API loading on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts([
        { id: 1, name: 'Sofia Rodriguez', email: 'sofia@work.com', phone: '+505 8888-1111' },
        { id: 2, name: 'Mateo Ortiz', email: 'mateo@work.com', phone: '+505 8888-2222' },
      ]);
      setIsLoadingList(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 2. Calculate profile completion percentage (0%, 33%, 66%, or 100%)
  const calculateCompletion = () => {
    let score = 0;
    if (name.trim()) score += 34;
    if (email.trim()) score += 33;
    if (phone.trim()) score += 33;
    return score;
  };

  // 3. Handle form submission
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation: Name is strictly required
    if (!name.trim()) {
      setErrorMessage('Full name is required. Please type a name before saving.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Email address is required.');
      return;
    }

    // Begin asynchronous save
    setIsSubmitting(true);

    setTimeout(() => {
      const newEntry: Contact = {
        id: Date.now(),
        name,
        email,
        phone: phone || 'No phone provided',
      };

      setContacts((prev) => [...prev, newEntry]);
      setIsSubmitting(false);

      // Reset form
      setName('');
      setEmail('');
      setPhone('');

      // Fire success toast!
      toast.success(`Contact "${newEntry.name}" added successfully!`);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      {/* Ensure Toaster is mounted for popup messages */}
      <Toaster position="bottom-right" richColors />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contact Feedback Center</h1>
        <p className="text-sm text-gray-500">
          Experience real-time validation, animated skeletons, and rich toasts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN: CONTACT REGISTRATION FORM                   */}
        {/* ======================================================== */}
        <Card>
          <CardHeader>
            <CardTitle>Create Contact</CardTitle>
            <CardDescription>
              Complete the fields below. Watch the progress bar respond!
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSaveContact}>
            <CardContent className="space-y-4">
              {/* Profile Completion Progress Bar */}
              <div className="space-y-1.5 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex justify-between text-xs font-medium">
                  <span>Form Completion</span>
                  <span>{calculateCompletion()}%</span>
                </div>
                <Progress value={calculateCompletion()} className="h-2" />
              </div>

              {/* Error Alert (Shown conditionally) */}
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertTitle>Validation Issue</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              {/* Input: Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lucia Gomez"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>

              {/* Input: Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="lucia@example.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>

              {/* Input: Phone */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Phone (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+505 8888-0000"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-end border-t pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting && <Spinner size="sm" />}
                {isSubmitting ? 'Saving to Database...' : 'Add Contact'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: CONTACT LIST WITH SKELETONS                */}
        {/* ======================================================== */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Existing Directory</CardTitle>
                <CardDescription>Live contacts loaded from memory</CardDescription>
              </div>
              {/* Button to re-simulate loading */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLoadingList(true)}
              >
                Reload Data
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {isLoadingList ? (
              // SKELETON STATE: Displayed while simulating data fetch
              <div className="space-y-3">
                <div className="p-3 border rounded-lg space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-56" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div className="p-3 border rounded-lg space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            ) : contacts.length === 0 ? (
              // EMPTY STATE
              <div className="text-center py-8 text-gray-500 text-sm">
                No contacts found. Use the form to add one!
              </div>
            ) : (
              // REAL CONTENT STATE
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {contact.name}
                  </h4>
                  <p className="text-xs text-gray-500">{contact.email}</p>
                  <p className="text-xs text-gray-400 mt-1">{contact.phone}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

## ⚠️ What Can Go Wrong? (Common Pitfalls & Fixes)

Here are the four most common mistakes developers make when working with feedback components:

### 1. "I called `toast.success()`, but nothing showed up!"
- **Cause**: You forgot to include `<Toaster />` in your React component tree.
- **Fix**: Render `<Toaster />` once inside your top-level component (such as `App.tsx` or `main.tsx`). Without `<Toaster />`, `toast()` calls are shouting into an empty void.

### 2. "My Skeleton appears invisible or as a tiny 1-pixel dot."
- **Cause**: Unlike images or buttons, `<Skeleton />` has no default inner content. If you don't provide width and height classes, it collapses to 0 pixels.
- **Fix**: Always specify height (`h-4`, `h-10`, `h-24`) and width (`w-full`, `w-[200px]`, `w-1/2`) classes:
  ```tsx
  {/* ❌ Invisible */}
  <Skeleton />

  {/* ✅ Clearly shaped */}
  <Skeleton className="h-4 w-48" />
  ```

### 3. "My Progress bar value is over 100 or less than 0."
- **Cause**: Math calculations that aren't clamped (e.g. calculating percentage from raw file byte counts).
- **Fix**: Clamp the value with `Math.min(100, Math.max(0, value))`:
  ```tsx
  const safePercentage = Math.min(100, Math.max(0, rawScore));
  <Progress value={safePercentage} />
  ```

### 4. "The button keeps spinning forever!"
- **Cause**: Forgetting to set `isSubmitting(false)` in an error catch block or callback. If an error occurs and you only set `isSubmitting(false)` inside the success path, the button remains frozen.
- **Fix**: Always wrap async calls with `try ... finally` and set `isSubmitting(false)` in the `finally` block:
  ```tsx
  try {
    await saveContact();
  } catch (error) {
    toast.error('Failed to save');
  } finally {
    setIsSubmitting(false); // Guarantees the spinner stops!
  }
  ```

---

## 🎯 Try It Yourself! (Exercise)

Now put your new knowledge into practice!

### Your Challenge: Adding a Step Progress Indicator
1. Open the mini-project code in your project.
2. Add a new numeric state: `const [avatarUploadPercent, setAvatarUploadPercent] = useState(0);`.
3. Add a simulated file upload button labeled *"Upload Profile Picture"*.
4. When clicked, run a `setInterval` that increases `avatarUploadPercent` by 20% every 200 milliseconds.
5. Display a `Progress` bar next to it showing `avatarUploadPercent`.
6. When it hits 100%, fire `toast.success('Profile photo uploaded!')` and stop the interval!

### Need a Hint?
```tsx
const handleUpload = () => {
  setAvatarUploadPercent(0);
  const timer = setInterval(() => {
    setAvatarUploadPercent((prev) => {
      if (prev >= 100) {
        clearInterval(timer);
        toast.success('Profile photo uploaded!');
        return 100;
      }
      return prev + 20;
    });
  }, 200);
};
```

---

## ✅ Summary

Giving feedback turns an impersonal webpage into an empathetic, reliable tool:

- 🚨 **`Alert`**: Prominent, persistent messages for crucial warnings, system notices, and validation summaries. Choose from 5 variants (`default`, `destructive`, `success`, `warning`, `info`).
- 🍞 **`Toast` & `Toaster`**: Floating, temporary confirmations (`toast.success()`, `toast.error()`) that pop up and disappear automatically. Requires mounting `<Toaster />` once at the application root.
- 🌀 **`Spinner`**: A spinning indicator for quick async tasks. Always place it inside buttons to prevent double submissions.
- 💀 **`Skeleton`**: Elegant visual wireframes that prevent jarring layout jumps while awaiting API responses.
- 📊 **`Progress`**: A clear horizontal bar showing percentage (0 to 100) for uploads, multi-step wizards, and quotas.

In the next module, we will explore **Overlays**: modals, popups, and dropdown menus that float above your page!

---

## 🧭 Navigation

| [← Previous: Module 04 (Layouts & Cards)](04-layout-and-cards.md) | [Table of Contents](README.md) | [Next: Module 06 (Overlays) →](06-overlays.md) |
| :--- | :---: | ---: |
