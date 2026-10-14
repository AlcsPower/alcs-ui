# 🧭 Module 08: Navigation — Guiding the User Through Your Application

> **"Great navigation is invisible. When users always know where they are and where to go next, they feel in total control."**

Welcome to Module 08! Have you ever visited a massive shopping mall or an international airport for the first time? If there were no signs, no floor maps, and no gate arrows, you would wander around anxiously wondering:
- *"Where am I right now?"*
- *"How do I get back to where I started?"*
- *"What step comes next before I board my plane?"*

Web applications have the exact same challenge. As your apps grow from a single page into complex tools with detailed profiles, nested sections, and multi-step registration forms, users need clear, reassuring signposts.

In this module, you will learn the three navigation guides of `@alcspower/ui`:
- 🪗 **`Accordion`**: Vertically collapsible panels that neatly hide secondary details until requested.
- 🍞 **`Breadcrumb`**: A reassuring trail of links showing exactly where the current page sits inside the site hierarchy.
- 🪜 **`Stepper`**: Step-by-step progress bars that guide users through multi-stage workflows and wizards.

Let's learn how to guide your users with confidence!

---

## 📚 What You'll Learn

By the end of this module, you will be able to:
1. Explain the purpose of hierarchical navigation and progressive disclosure.
2. Build responsive `Accordion` panels, comparing `type="single"` versus `type="multiple"` and enabling `collapsible`.
3. Construct accessible `Breadcrumb` navigation bars with links, separators, and current page indicators (`BreadcrumbPage`).
4. Implement multi-step wizards using `Stepper`, `StepperItem`, `StepperTrigger`, `StepperSeparator`, and `StepperTitle`.
5. Connect `Stepper` steps to React state and validate each step before allowing the user to proceed.
6. Assemble a complete **3-Step Contact Onboarding Flow Mini-Project**.
7. Avoid common navigation pitfalls, such as orphaned accordion items and out-of-sync step counters.

---

## 🗺️ Introduction: Guiding the User Through Your Application

Think about three classic navigation aids from the physical world:
1. **The Musical Accordion**: A musical accordion compresses down into a compact box when packed away, but can expand smoothly when music is played. In user interfaces, an **`Accordion`** allows long documents, FAQs, and contact notes to fold into neat title strips so users aren't overwhelmed by walls of text.
2. **Hansel and Gretel's Trail of Breadcrumbs**: In the classic fairy tale, the children left a trail of crumbs behind them in the forest so they could always trace their steps back home. In web apps, **`Breadcrumb`** navigation leaves a clear trail: `Home > Contacts > Engineering > Ana Garcia`.
3. **A Cooking Recipe's Numbered Steps**: A great cookbook doesn't say *"Make a chocolate cake."* It breaks the recipe down into Step 1 (Mix Dry Ingredients), Step 2 (Beat Eggs & Milk), and Step 3 (Bake for 30 minutes). A **`Stepper`** provides this exact structure for multi-stage digital forms.

```
+-------------------------------------------------------------------------------+
| BREADCRUMB: Home  /  Contacts  /  Ana Garcia                                  |
+-------------------------------------------------------------------------------+
|                                                                               |
| STEPPER:  [ (1) Basic Info ] ----- [ (2) Contact Details ] ----- [ (3) Done ] |
|                                                                               |
| ACCORDION:                                                                    |
| +---------------------------------------------------------------------------+ |
| | > Personal Information                                                    | |
| +---------------------------------------------------------------------------+ |
| | v Work & Department                                                       | |
| |   Department: Engineering                                                 | |
| |   Manager: Sofia Herrera                                                  | |
| +---------------------------------------------------------------------------+ |
| | > Emergency Notes                                                         | |
| +---------------------------------------------------------------------------+ |
+-------------------------------------------------------------------------------+
```

Let's study each component in detail!

---

## 🪗 Component 1: Accordion

### What is an Accordion?

An **`Accordion`** is a stacked collection of expandable and collapsible panels. Each panel has a header title (the "Trigger"). When clicked, the content underneath expands downward smoothly.

Accordions are the gold standard for **progressive disclosure**: the design principle that says you should only show users the information they need right now, while keeping secondary information easily accessible with one click.

Common uses include:
- Frequently Asked Questions (FAQ) pages
- Complex contact profiles (Personal Info, Job History, Emergency Contacts, Internal Notes)
- Advanced filter sidebars

### Anatomy of Accordion in `@alcspower/ui`

The `Accordion` system includes four components:
- `<Accordion type="..." collapsible>`: Root container managing open/closed states.
- `<AccordionItem value="...">`: Individual section container. Must have a unique string `value`!
- `<AccordionTrigger>`: The clickable heading button with an animated chevron arrow.
- `<AccordionContent>`: The hidden panel revealed when the trigger is activated.

### Single vs. Multiple Mode

The root `<Accordion>` accepts a `type` prop:
1. `type="single"`: Only **one** panel can be open at any given moment. Opening a new panel automatically folds up the previously opened one.
2. `type="multiple"`: The user can open as many panels simultaneously as they wish.
3. `collapsible`: When `type="single"`, adding `collapsible` allows the user to click the active panel to close it completely (so all panels are closed).

### Code: Accordion in Action

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@alcspower/ui';

export function ContactDetailsAccordion() {
  return (
    <div className="max-w-lg border rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-3">Contact Profile Overview</h3>

      {/* type="single" ensures only one section opens at a time */}
      <Accordion type="single" collapsible className="w-full">
        {/* Section 1 */}
        <AccordionItem value="personal">
          <AccordionTrigger>👤 Personal Information</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p><strong>Full Name:</strong> Ana Maria Garcia</p>
            <p><strong>Date of Birth:</strong> April 14, 1992</p>
            <p><strong>Location:</strong> Headquarters</p>
          </AccordionContent>
        </AccordionItem>

        {/* Section 2 */}
        <AccordionItem value="work">
          <AccordionTrigger>💼 Work & Role Details</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p><strong>Department:</strong> Software Engineering</p>
            <p><strong>Direct Manager:</strong> Sofia Herrera</p>
            <p><strong>Work Location:</strong> Managua Central Office (Hybrid)</p>
          </AccordionContent>
        </AccordionItem>

        {/* Section 3 */}
        <AccordionItem value="notes">
          <AccordionTrigger>📝 Administrative Notes</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 dark:text-gray-300">
            <p>
              Ana joined the company during Q2 2024. Completed primary security
              clearance and onboarding certifications on May 10th.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
```

---

## 🍞 Component 2: Breadcrumb

### What is a Breadcrumb?

A **`Breadcrumb`** trail is a horizontal list of links that shows where the current page sits within the site hierarchy. 

Consider this trail:
```
Home  >  Directories  >  Engineering  >  Ana Garcia
```

Why is this so valuable for users?
1. **Context**: At a single glance, the user knows they are inspecting Ana Garcia's profile inside the Engineering department.
2. **One-Click Escape**: If they want to see other people in the Engineering department, they don't have to hit their browser's "Back" button three times. They just click "Engineering" in the breadcrumb!
3. **Accessibility**: Screen readers announce the path hierarchically, helping visually impaired users navigate with ease.

### Anatomy of Breadcrumb in `@alcspower/ui`

The `Breadcrumb` family consists of:
- `<Breadcrumb>`: Root `<nav>` container with `aria-label="breadcrumb"`.
- `<BreadcrumbList>`: Semantic ordered list (`<ol>`).
- `<BreadcrumbItem>`: Individual item container (`<li>`).
- `<BreadcrumbLink href="...">`: Clickable link to an ancestor page.
- `<BreadcrumbSeparator />`: Subtle chevron or slash icon between items.
- `<BreadcrumbPage>`: Non-clickable text representing the **current page** (receives `aria-current="page"`).

### Code: Breadcrumb in Action

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@alcspower/ui';

export function NavigationBreadcrumbDemo() {
  return (
    <div className="p-4 border rounded-lg bg-gray-50/50 dark:bg-gray-900/20">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Level 1: Home */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator />

          {/* Level 2: Contacts Directory */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/contacts">Contacts</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          {/* Level 3: Department */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/contacts/engineering">Engineering</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          {/* Level 4: Current Page (Active, Not a link) */}
          <BreadcrumbItem>
            <BreadcrumbPage>Ana Garcia</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
```

> [!IMPORTANT]
> **Why is the last item a `<BreadcrumbPage>` and not a `<BreadcrumbLink>`?**  
> Because the user is **already on that page**! Linking to the current page is redundant and confuses screen readers. `<BreadcrumbPage>` renders bold, non-underlined text and automatically applies `aria-current="page"` so assistive technology announces: *"Current page: Ana Garcia"*.

---

## 🪜 Component 3: Stepper

### What is a Stepper?

A **`Stepper`** is a visual progress bar that guides users through a multi-step workflow or form wizard. 

Imagine registering a new bank account or buying an airline ticket:
- You don't want a single endless form with 40 fields on one page. That causes form fatigue and makes users give up.
- Instead, the app breaks the process into 3 simple stages:
  - Step 1: Personal Details
  - Step 2: Identification & Address
  - Step 3: Review & Confirmation

A `Stepper` shows users exactly how many steps exist, which step they are currently completing, and which steps have already been finished.

### Anatomy of Stepper in `@alcspower/ui`

The `Stepper` family includes:
- `<Stepper value={currentStep}>`: Root container tracking the active numeric step.
- `<StepperItem step={stepNumber}>`: Represents an individual step.
- `<StepperTrigger>`: Clickable or focusable step bubble/button.
- `<StepperTitle>`: Text label describing the step (e.g., *"Basic Info"*).
- `<StepperSeparator />`: The connecting line between adjacent step bubbles.

### Code: Basic Controlled Stepper

```tsx
import { useState } from 'react';
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperTitle,
  StepperSeparator,
  Button,
} from '@alcspower/ui';

export function StepperQuickDemo() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Personal Info' },
    { id: 2, title: 'Contact Methods' },
    { id: 3, title: 'Confirmation' },
  ];

  return (
    <div className="space-y-6 max-w-lg p-6 border rounded-xl">
      {/* The Stepper Component */}
      <Stepper value={currentStep}>
        {steps.map((step) => (
          <StepperItem key={step.id} step={step.id}>
            <StepperTrigger onClick={() => setCurrentStep(step.id)}>
              <StepperTitle>{step.title}</StepperTitle>
            </StepperTrigger>
            {/* Show separator line between items, but not after the last step */}
            {step.id < steps.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>

      {/* Step Content */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-center">
        {currentStep === 1 && <p>Step 1: Enter your name and job title.</p>}
        {currentStep === 2 && <p>Step 2: Enter your email and phone number.</p>}
        {currentStep === 3 && <p>Step 3: Review all information and submit.</p>}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Previous
        </Button>

        <Button
          disabled={currentStep === steps.length}
          onClick={() => setCurrentStep((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
```

---

## 🚀 Mini-Project: 3-Step Contact Registration Wizard

Let's combine all our navigation components into a complete, professional **3-Step Contact Registration Wizard**!

In this project:
1. **Breadcrumb** sits at the top: `Home > Contacts > New Contact Wizard`.
2. **Stepper** displays our 3 progressive milestones:
   - **Step 1: Basic Profile** (First Name, Last Name)
   - **Step 2: Contact Details** (Email, Phone)
   - **Step 3: Review & Confirmation** (Summary Card + Accordion for optional notes)
3. Step-by-step validation prevents users from moving forward if required fields are missing.
4. On step 3, an **Accordion** lets users attach optional notes before finishing!

Here is the complete source code:

```tsx
import { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperTitle,
  StepperSeparator,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
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
  Toaster,
  toast,
} from '@alcspower/ui';

export function ContactRegistrationWizard() {
  // Stepper active step: 1, 2, or 3
  const [currentStep, setCurrentStep] = useState(1);

  // Form Field States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Step Validation Error
  const [error, setError] = useState<string | null>(null);

  // Steps definition array
  const steps = [
    { id: 1, title: 'Basic Info' },
    { id: 2, title: 'Contact Details' },
    { id: 3, title: 'Confirm' },
  ];

  // Validate Step 1 before proceeding
  const handleNextFromStep1 = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Both first name and last name are required to continue.');
      return;
    }
    setError(null);
    setCurrentStep(2);
  };

  // Validate Step 2 before proceeding
  const handleNextFromStep2 = () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError(null);
    setCurrentStep(3);
  };

  // Final submission on Step 3
  const handleFinalSubmit = () => {
    toast.success(`Contact ${firstName} ${lastName} registered successfully!`);
    // Reset to step 1
    setCurrentStep(1);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setNotes('');
  };

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <Toaster position="bottom-right" richColors />

      {/* ======================================================== */}
      {/* 1. BREADCRUMB TRAIL                                      */}
      {/* ======================================================== */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/contacts">Contacts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New Contact Wizard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ======================================================== */}
      {/* 2. STEPPER PROGRESS BAR                                  */}
      {/* ======================================================== */}
      <Card className="p-6">
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
      </Card>

      {/* Error alert if validation fails */}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Action Required</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* ======================================================== */}
      {/* 3. WIZARD STEP CONTENT (CARD)                           */}
      {/* ======================================================== */}
      <Card>
        {/* STEP 1: BASIC INFORMATION */}
        {currentStep === 1 && (
          <div>
            <CardHeader>
              <CardTitle>Step 1: Who are you adding?</CardTitle>
              <CardDescription>
                Provide the full legal name for this contact record.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">First Name *</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Ana"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Last Name *</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Garcia"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button onClick={handleNextFromStep1}>
                Next: Contact Details →
              </Button>
            </CardFooter>
          </div>
        )}

        {/* STEP 2: CONTACT DETAILS */}
        {currentStep === 2 && (
          <div>
            <CardHeader>
              <CardTitle>Step 2: How can we reach them?</CardTitle>
              <CardDescription>
                Enter an email address and an optional telephone number.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ana.garcia@example.com"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+505 8888-0001"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                ← Back
              </Button>
              <Button onClick={handleNextFromStep2}>
                Next: Review & Confirm →
              </Button>
            </CardFooter>
          </div>
        )}

        {/* STEP 3: REVIEW & CONFIRM */}
        {currentStep === 3 && (
          <div>
            <CardHeader>
              <CardTitle>Step 3: Review and Confirm</CardTitle>
              <CardDescription>
                Double-check the details below before saving to the directory.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 bg-gray-50/50 dark:bg-gray-900/30 space-y-2 text-sm">
                <p>
                  <strong className="text-gray-900 dark:text-white">Full Name:</strong>{' '}
                  {firstName} {lastName}
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-white">Email:</strong>{' '}
                  {email}
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-white">Phone:</strong>{' '}
                  {phone || 'Not specified'}
                </p>
              </div>

              {/* Accordion for optional notes */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="notes">
                  <AccordionTrigger>Optional: Add Internal Notes</AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any internal tags or context here..."
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
              <Button onClick={handleFinalSubmit}>
                Confirm and Save Contact ✓
              </Button>
            </CardFooter>
          </div>
        )}
      </Card>
    </div>
  );
}
```

---

## ⚠️ What Can Go Wrong? (Common Pitfalls & Fixes)

Here are the most common hiccups beginners encounter with navigation elements:

### 1. "My Accordion panel won't open when clicked!"
- **Cause**: The `<AccordionItem>` is missing its `value` prop or has an empty string `value=""`.
- **Fix**: Each `AccordionItem` must have a non-empty string identifier:
  ```tsx
  {/* ❌ Won't toggle properly */}
  <AccordionItem>

  {/* ✅ Works perfectly */}
  <AccordionItem value="section-1">
  ```

### 2. "The last breadcrumb link redirects to the same page or reloads!"
- **Cause**: Using `<BreadcrumbLink href="...">` for the current page instead of `<BreadcrumbPage>`.
- **Fix**: Always use `<BreadcrumbPage>` for the terminal item in the breadcrumb list.

### 3. "The Stepper active index is off by one (Step 0 instead of Step 1)!"
- **Cause**: Using a 0-indexed number (`0, 1, 2`) for `currentStep` while your `steps` array uses 1-indexed IDs (`1, 2, 3`).
- **Fix**: Align your step indices. In `@alcspower/ui`, steppers conventionally start at `1`.

### 4. "Users can skip to Step 3 without filling in Step 1!"
- **Cause**: Allowing users to click `<StepperTrigger>` to advance to any step without validating the current step.
- **Fix**: Either disable clicking directly on future steps, or run validation before allowing `setCurrentStep` to change.

---

## 🎯 Try It Yourself! (Exercise)

Now put your skills to the test with this practical challenge!

### Your Challenge: Add a 4th Step for Profile Photo
1. Update the `steps` array in the wizard to include 4 steps:
   ```tsx
   const steps = [
     { id: 1, title: 'Basic Info' },
     { id: 2, title: 'Contact Details' },
     { id: 3, title: 'Profile Photo' },
     { id: 4, title: 'Confirm' },
   ];
   ```
2. In the new Step 3 ("Profile Photo"):
   - Add a file input or an image URL input.
   - Display a preview using the `Avatar` component from Module 02!
   - Provide "Back" (returns to step 2) and "Next" (advances to step 4) buttons.
3. Update the final confirmation step to be Step 4.

Give it a try! You'll love seeing how naturally the `Stepper` adapts to a 4-step wizard.

---

## ✅ Summary

Navigation elements turn complex software into an effortless journey:

- 🪗 **`Accordion`**: Perfect for progressive disclosure. Use `type="single" collapsible` to keep FAQ items and profile sections tidy.
- 🍞 **`Breadcrumb`**: Tells users where they are and lets them jump back up the hierarchy. Always terminate with `<BreadcrumbPage>`.
- 🪜 **`Stepper`**: Guides users through multi-stage forms and processes step-by-step. Managed with numeric state (`currentStep`) and connected to validation guards.

In our final module, Module 09, we will combine **EVERY SINGLE COMPONENT** we have learned into our ultimate showcase: the **Complete Enterprise Contact Book Application**!

---

## 🧭 Navigation

| [← Previous: Module 07 (Data)](07-data.md) | [Table of Contents](README.md) | [Next: Module 09 (Final Project) →](09-final-project.md) |
| :--- | :---: | ---: |
