# 🟡 Module 02: Your First UI Building Blocks

> **Mastering Buttons, Badges, Avatars, and Cards to assemble your first professional contact profile card.**

---

## 📚 What You'll Learn

In this module, you will learn how to wield the fundamental visual building blocks of `@alcspower/ui`. By the end of this chapter, you will:

- 🔘 **Master the `Button` Component**: Learn all 6 visual variants, size configurations, icon buttons, and interactive loading states.
- 🏷️ **Categorize with the `Badge` Component**: Use status badges and tag chips across 7 semantic color variants to communicate priority and state.
- 👤 **Represent Users with `Avatar`**: Handle remote profile pictures gracefully, with automatic fallback to text initials when photos are missing or fail to load.
- 🗂️ **Structure Content with the `Card` Suite**: Compose headers, titles, descriptions, content bodies, and action footers into modular containers.
- 🛠️ **Assemble a Complete Contact Card**: Build a fully-featured, production-ready profile card combining all four components.
- 🩺 **Troubleshoot Common Mistakes**: Learn why missing subcomponents or broken image links happen and how to fix them effortlessly.

---

## 🧱 The Core Philosophy: Atomic Building Blocks

When architects design a skyscraper, they don't start by pouring the entire building all at once. They use standardized steel beams, uniform windows, and modular panels.

In user interface engineering, we follow the exact same principle:
1. **Atoms**: Primitive components like a `Button`, a `Badge`, or an `Avatar`.
2. **Molecules**: Grouping a few atoms together (for example, placing an `Avatar` next to a user's name and status `Badge`).
3. **Organisms**: A complete card or form (like our `Card` containing the profile molecule and action buttons).

Let's explore each atom in detail before assembling our molecule and organism!

---

## 🔘 The Button Component

The **Button** is the workhorse of any web application. It triggers actions: submitting forms, confirming deletions, opening dialogs, and navigating between pages.

In `@alcspower/ui`, the `Button` component comes pre-configured with:
- Hover and active pressed states.
- High-contrast focus rings for keyboard accessibility (`Tab` + `Enter` / `Space`).
- Built-in loading spinners with custom loading messages.
- Full TypeScript autocompletion for sizes and variants.

### Basic Button Example Commented Line-by-Line

```tsx
// 1. Import the Button from the design system package
import { Button } from '@alcspower/ui';

export function ButtonShowcase() {
  return (
    // 2. We render a primary button with medium size
    <Button 
      variant="primary" // Sets the visual hierarchy to the most prominent action
      size="md"          // Sets standard balanced padding and font size
      onClick={() => console.log('Button clicked!')} // Event listener triggered on click
    >
      Save Contact
    </Button>
  );
}
```

---

### Button Variants: When to Use Each One

The `variant` prop tells the user how important or risky an action is. Here is the complete catalog of variants:

| Variant | Visual Appearance | When to Use It | Real-World Example |
| :--- | :--- | :--- | :--- |
| `"primary"` | Solid high-contrast background (brand color) | The single primary, intended action on a screen or card. | "Save Changes", "Add Contact", "Confirm" |
| `"secondary"` | Muted filled background | Supporting actions that shouldn't compete with the primary button. | "Cancel", "Back", "Export" |
| `"outline"` | Transparent background with a distinct border | Secondary actions that need crisp definition without drawing too much attention. | "Edit Profile", "Filter", "View History" |
| `"ghost"` | Completely transparent until hovered | Low-priority actions, toolbar buttons, or subtle repeated triggers. | "Close", "Options", "Learn More" |
| `"destructive"` | Bold warning red background | Dangerous, irreversible actions that delete or destroy data. | "Delete Contact", "Remove Account", "Discard" |
| `"link"` | Styled like a text hyperlink with underline on hover | Navigational triggers disguised as inline text. | "Forgot password?", "Terms of service" |

```tsx
// Visual demonstration of all 6 variants:
import { Button } from '@alcspower/ui';

export function AllButtonVariants() {
  return (
    <div className="flex flex-wrap gap-3 p-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

---

### Button Sizes

The `size` prop allows you to adjust the physical footprint of the button to match your layout hierarchy:

| Size | Use Case | Description |
| :--- | :--- | :--- |
| `"sm"` | Compact interfaces | Tight spaces like table rows, filter bars, or dense cards. |
| `"md"` | Standard default | Perfect for 90% of forms, cards, and modal dialogs. |
| `"lg"` | Hero sections | Call-to-action buttons on landing pages or primary mobile banners. |
| `"icon-sm"` | Square icon button (small) | Compact icon-only triggers (e.g., small search or close icon). |
| `"icon"` | Square icon button (standard) | Standard square button for solitary icons (e.g., star favorite icon). |
| `"icon-lg"` | Square icon button (large) | Prominent icon buttons in toolbars or mobile navigation bars. |

```tsx
// Sizing comparison:
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

---

### Loading State (`isLoading` & `loadingText`)

Have you ever clicked a "Save" button on a slow website, and because nothing happened immediately, you clicked it 5 more times? That causes duplicate data, accidental payments, and user frustration!

The `@alcspower/ui` Button solves this gracefully with two built-in props:
1. `isLoading`: A boolean (`true` or `false`) that disables the button and displays an animated spinning indicator.
2. `loadingText`: An optional message shown while loading.

```tsx
// Loading button example:
<Button 
  variant="primary" 
  isLoading={true} 
  loadingText="Saving contact..."
>
  Save Contact
</Button>
```

When `isLoading` is active:
- The button is automatically disabled so users cannot double-click it.
- The cursor changes to `not-allowed`.
- A crisp spinner appears alongside the `loadingText`.

---

## 🏷️ The Badge Component

A **Badge** is a compact visual indicator used to display metadata, status, categories, or counts.

Think of badges as the sticky colored tags you put on physical office folders:
- Green tag = Active client
- Orange tag = Pending invoice
- Red tag = Urgent account

### Basic Badge Example

```tsx
import { Badge } from '@alcspower/ui';

export function BadgeShowcase() {
  return (
    <div className="flex gap-2">
      <Badge variant="success">Active</Badge>
      <Badge variant="warning" size="sm">Pending Review</Badge>
    </div>
  );
}
```

---

### Badge Semantic Variants

`@alcspower/ui` provides 7 semantic variants for Badges:

| Variant | Typical Color | Purpose & Meaning |
| :--- | :--- | :--- |
| `"primary"` | Brand color | General highlight or category tag (e.g., "Work", "VIP"). |
| `"secondary"` | Soft neutral gray | Neutral metadata or subtle labels (e.g., "Draft", "Archived"). |
| `"success"` | Vibrant emerald green | Positive status, confirmed state, or active member (e.g., "Connected", "Verified"). |
| `"warning"` | Warm amber/yellow | States requiring attention, pending actions, or trial periods (e.g., "Away", "Pending"). |
| `"destructive"` | Urgent ruby red | Negative or blocked status (e.g., "Offline", "Suspended", "Blocked"). |
| `"info"` | Bright sky blue | Informational or neutral system notes (e.g., "New", "Beta", "Updated"). |
| `"outline"` | Transparent with border | Minimalist subtle tags that don't overpower the screen. |

### Badge Sizes
Badges come in two sizes:
- `size="md"`: The standard default size.
- `size="sm"`: A compact size ideal for dense lists and small contact cards.

```tsx
// Example of all badge variants in action:
<div className="flex flex-wrap gap-2">
  <Badge variant="primary">Work</Badge>
  <Badge variant="secondary">Personal</Badge>
  <Badge variant="success">Active</Badge>
  <Badge variant="warning">Away</Badge>
  <Badge variant="destructive">Offline</Badge>
  <Badge variant="info">New Contact</Badge>
  <Badge variant="outline">Family</Badge>
</div>
```

---

## 👤 The Avatar Component Suite

An **Avatar** displays a user's profile image. But what happens if:
- The user hasn't uploaded a photo yet?
- The image URL is broken or takes 5 seconds to load over mobile data?
- The image link returns a 404 error?

In standard HTML, a broken `<img>` tag displays an ugly cracked icon.

`@alcspower/ui` provides a compound Avatar system composed of three coordinated components:
1. `<Avatar>`: The outer circular frame.
2. `<AvatarImage>`: The actual image, with smooth loading and error listeners.
3. `<AvatarFallback>`: The placeholder (typically user initials) rendered automatically whenever the image is missing or loading.

### Avatar Example Commented Line-by-Line

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@alcspower/ui';

export function UserAvatarExample() {
  return (
    // 1. The outer circular avatar container
    <Avatar>
      {/* 2. The image source. If this succeeds, it displays gracefully */}
      <AvatarImage 
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
        alt="Sarah Jenkins" 
      />
      {/* 3. The fallback text displayed if the image fails or is absent */}
      <AvatarFallback>SJ</AvatarFallback>
    </Avatar>
  );
}
```

### How the Fallback Mechanism Works Under the Hood:
```
+-------------------------------------------------------------+
|                      AVATAR LIFECYCLE                       |
+-------------------------------------------------------------+
|  1. Component renders.                                      |
|  2. Browser attempts to fetch src image in the background.  |
|  3. While fetching -> AvatarFallback ("SJ") is visible.     |
|  4. If image loads successfully -> Image smoothly fades in. |
|  5. If image fails or 404s -> AvatarFallback stays visible! |
+-------------------------------------------------------------+
```

This guarantees that your user interface **never looks broken**, regardless of internet conditions!

---

## 🗂️ The Card Component Suite

A **Card** is a structured, bordered container that groups related information together with consistent padding and visual hierarchy.

In `@alcspower/ui`, Cards are built as a compound component with semantic subcomponents:
- `<Card>`: The main container with background, rounded borders, and subtle shadow.
- `<CardHeader>`: The top portion, organizing the title and description.
- `<CardTitle>`: Bold headline text with proper semantic heading tags.
- `<CardDescription>`: Subdued, secondary explanatory text.
- `<CardContent>`: The main body where details, fields, or lists live.
- `<CardFooter>`: The bottom section reserved for action buttons and secondary controls.

### Card Composition Architecture

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@alcspower/ui';

export function CardStructureDemo() {
  return (
    <Card className="max-w-md">
      {/* 1. Header with title and subtitle */}
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card subtitle or helper text</CardDescription>
      </CardHeader>

      {/* 2. Main content body */}
      <CardContent>
        <p className="text-sm text-slate-600">
          Main content goes here. You can put text, charts, or images!
        </p>
      </CardContent>

      {/* 3. Actions footer */}
      <CardFooter className="flex justify-end gap-2">
        <button>Action</button>
      </CardFooter>
    </Card>
  );
}
```

---

## 🚀 Mini-Project: Assembling a Complete Contact Profile Card

Now let's bring all four building blocks together into our first real application piece: a **Contact Profile Card**!

Here is the complete, self-contained code. You can copy this directly into your `src/App.tsx` file to see it run in your browser:

```tsx
// src/App.tsx
// Complete Contact Profile Card using @alcspower/ui
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Button,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback
} from '@alcspower/ui';

export default function App() {
  return (
    <main className="min-h-screen bg-slate-100 p-8 flex flex-col items-center justify-center font-sans text-slate-900">
      <div className="w-full max-w-sm">
        
        {/* 1. The outer Card container */}
        <Card className="overflow-hidden shadow-lg border border-slate-200 bg-white rounded-2xl transition-all hover:shadow-xl">
          
          {/* 2. Card Header containing Avatar, Name, and Status */}
          <CardHeader className="flex flex-row items-center gap-4 pb-3">
            {/* User Avatar with photo and fallback */}
            <Avatar className="h-14 w-14 border-2 border-primary/20">
              <AvatarImage 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" 
                alt="Elena Rostova" 
              />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                ER
              </AvatarFallback>
            </Avatar>

            {/* Contact Name, Subtitle, and Badges */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold truncate">
                  Elena Rostova
                </CardTitle>
                <Badge variant="success" size="sm">
                  Active
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-500">
                Senior Product Designer
              </CardDescription>
              <div className="mt-1 flex gap-1.5">
                <Badge variant="primary" size="sm">Work</Badge>
                <Badge variant="outline" size="sm">VIP</Badge>
              </div>
            </div>
          </CardHeader>

          {/* 3. Card Content containing Contact Details */}
          <CardContent className="pt-2 pb-4 space-y-2 text-sm text-slate-600 border-t border-slate-100">
            <div className="flex items-center gap-2 pt-2">
              <span className="text-slate-400">📧</span>
              <span className="font-medium truncate">elena.rostova@designcorp.io</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">📞</span>
              <span className="font-medium">+1 (555) 234-8901</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">📍</span>
              <span className="font-medium">San Francisco, CA</span>
            </div>
          </CardContent>

          {/* 4. Card Footer with Action Buttons */}
          <CardFooter className="flex justify-between items-center gap-2 pt-2 bg-slate-50/80 border-t border-slate-100">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => alert('Opening Elena’s profile modal...')}
            >
              View Profile
            </Button>
            
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => alert('Sending email to Elena...')}
            >
              Send Message
            </Button>
          </CardFooter>

        </Card>

      </div>
    </main>
  );
}
```

```
+-------------------------------------------------------------+
|  CARD PREVIEW IN BROWSER:                                   |
+-------------------------------------------------------------+
|  +-------------------------------------------------------+  |
|  | [Avatar]  Elena Rostova                      [Active] |  |
|  |           Senior Product Designer                     |  |
|  |           [Work] [VIP]                                |  |
|  |  ---------------------------------------------------  |  |
|  |  📧 elena.rostova@designcorp.io                       |  |
|  |  📞 +1 (555) 234-8901                                 |  |
|  |  📍 San Francisco, CA                                 |  |
|  |  ---------------------------------------------------  |  |
|  |  [ View Profile ]                    [ Send Message ]  |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

---

## 🩺 What Can Go Wrong?

### Issue 1: "Cannot find name 'CardTitle'" or missing subcomponent error
- **Cause**: When using compound components like `Card`, you must import each subcomponent you use (`CardHeader`, `CardTitle`, etc.) inside the curly braces of your import statement.
- **Fix**: Check your import line at the top:
  ```tsx
  import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@alcspower/ui';
  ```

### Issue 2: Avatar shows only initials even when an image URL is supplied
- **Cause**: The image URL might be mistyped, offline, or blocked by browser CORS restrictions.
- **Fix**: The component is working as intended! It automatically displayed `AvatarFallback` because the image failed to load. To test a valid image, use an Unsplash image URL or a local public image.

### Issue 3: Button text overflows on small screens
- **Cause**: Using `size="lg"` with very long text in a narrow container.
- **Fix**: Use `size="sm"` or `size="md"` inside cards, or let the footer wrap with Tailwind's `flex-wrap` class.

---

## 🎯 Practice Challenges: Create 3 Unique Contact Cards

To build your confidence and muscle memory, challenge yourself to create 3 distinct cards:

1. **Card 1 (Family Member)**:
   - Name: "David Chen (Brother)"
   - Avatar Fallback: `"DC"` (without an image URL to test fallback).
   - Badge: `variant="outline"` with text `"Family"`.
   - Primary action: `"Call David"`.

2. **Card 2 (Pending Freelancer)**:
   - Name: "Marcus Vance"
   - Status Badge: `variant="warning"` with text `"Pending Interview"`.
   - Secondary button: `variant="destructive"` with text `"Decline"`.
   - Primary button: `variant="primary"` with text `"Accept"`.

3. **Card 3 (Saving State)**:
   - Create a card where the primary button has `isLoading={true}` and `loadingText="Updating..."` to simulate a card being saved to a database.

---

---

## 🔗 Advanced Tip: The `asChild` Prop in Buttons

Sometimes in web applications, you want an element to look like a Button, but functionally act as an HTML anchor tag `<a>` that navigates to a new webpage or opens an external URL.

In traditional HTML, wrapping a `<button>` inside an `<a>` is invalid HTML and confuses screen readers.

`@alcspower/ui` solves this elegantly with the **`asChild`** prop:

```tsx
// Example of asChild:
import { Button } from '@alcspower/ui';

export function NavigationLinkButton() {
  return (
    // When asChild is true, Button delegates its visual styling and click
    // behavior to the direct child element (in this case, an <a> link)!
    <Button asChild variant="outline">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        Visit GitHub Profile ↗
      </a>
    </Button>
  );
}
```

This ensures 100% semantic HTML, perfect accessibility, and consistent design system aesthetics!

---

## 💡 Solutions to Practice Challenges

Here are reference solutions for the practice challenges so you can compare your code:

### Solution for Challenge 1: Family Member Card (with Fallback Avatar)
```tsx
<Card className="max-w-sm border shadow-sm">
  <CardHeader className="flex flex-row items-center gap-3">
    {/* No AvatarImage src provided: AvatarFallback displays immediately */}
    <Avatar>
      <AvatarFallback className="bg-amber-100 text-amber-800 font-bold">
        DC
      </AvatarFallback>
    </Avatar>
    <div>
      <CardTitle className="text-base">David Chen</CardTitle>
      <Badge variant="outline" size="sm">Family</Badge>
    </div>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-slate-500">Brother • Birthday: Oct 24</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary" size="sm" className="w-full">
      Call David
    </Button>
  </CardFooter>
</Card>
```

### Solution for Challenge 2: Freelancer with Destructive Action
```tsx
<Card className="max-w-sm border shadow-sm">
  <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle className="text-base">Marcus Vance</CardTitle>
    <Badge variant="warning" size="sm">Pending Interview</Badge>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-slate-600">Applied for: DevOps Engineer</p>
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="destructive" size="sm">Decline</Button>
    <Button variant="primary" size="sm">Accept</Button>
  </CardFooter>
</Card>
```

---

## ✅ Summary

- **`Button`** is the interactive trigger supporting 6 variants (`primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`), multiple sizes, and built-in loading states (`isLoading`).
- **`Badge`** provides immediate visual categorization using 7 semantic colors (`primary`, `secondary`, `success`, `warning`, `destructive`, `info`, `outline`).
- **`Avatar`** gracefully displays user photos with automatic fallback initials via `AvatarFallback`.
- **`Card`** organizes information into semantic zones: Header, Title, Description, Content, and Footer.
- Combining these primitive blocks allows you to build clean, professional UI components in minutes!

Now that you know how to build static cards, how do we make them interactive so users can type into forms and create new contacts? 

In the next module, we master **Forms & React State**!

---

### Navigation
| Previous | Home | Next |
| :---: | :---: | :---: |
| [← Module 01: Installation Guide](01-installation.md) | [Home](README.md) | [Module 03: Forms & React State →](03-forms.md) |

