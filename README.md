# Stage 1a: Advanced Todo Card

**Live URL:** [Insert your Live URL here]
**GitHub Repository:** [Insert your GitHub Repo link here]

## Overview
This project is an interactive, stateful Todo Card component built for Stage 1a. It builds upon the static Stage 0 card by introducing state management, edit capabilities, dynamic time calculations, and richer accessibility patterns.

---

## What Changed from Stage 0
* **State Management:** Transitioned from a hard-coded static template to a fully stateful JavaScript component using a central state object.
* **Edit Mode:** Added a toggleable edit form that allows updating the title, description, priority, and due date.
* **Status Controls:** Introduced a status dropdown (Pending, In Progress, Done) that strictly syncs with the completion checkbox.
* **Expand/Collapse Behavior:** Descriptions are now truncated by default with a toggle button to reveal the full text.
* **Granular Time Handling:** Time remaining now updates live every 30 seconds with granular text (e.g., "Due in 2 hours", "Overdue by 45 minutes"). Added a dedicated Overdue badge.

## New Design Decisions
* **Priority Indicator:** Instead of just a badge, I implemented a left-border accent color (red for high, yellow for medium, green for low) to provide an immediate, subtle visual cue for priority without cluttering the layout.
* **In-Place Editing:** Rather than opening a modal, the Edit form replaces the view layer within the card itself. This keeps the user contextually anchored and works much better on mobile devices.
* **Status Synchronization:** Centralized the data so that changing the status dropdown to "Done" automatically checks the box, and unchecking the box automatically reverts the status back to "Pending". 
* **Visual States:** Added a distinct bordered style for "In Progress" and strike-through/muted text for the "Done" state to provide immediate visual feedback.

## Known Limitations
* **Persistence:** Because this is a single frontend component, state is handled purely in-memory. Any edits or status changes will be lost upon a page refresh.
* **Delete Action:** The delete button is currently a dummy action (`alert`) since there is no parent list or backend to remove the card from yet.
* **Focus Trapping:** While focus correctly returns to the Edit button when the form closes, strict focus trapping *inside* the form (preventing tabbing out of the card entirely while in edit mode) was left to the natural DOM order for this iteration.

## Accessibility Notes
* **Form Labels:** Every input within the Edit mode is strictly paired with a semantic `<label for="...">` to ensure screen-reader compatibility.
* **Expand/Collapse:** The description toggle utilizes standard `aria-expanded` and `aria-controls` attributes, directly tied to the ID of the collapsible container.
* **Live Regions:** The time-remaining and overdue text are wrapped in a container utilizing `aria-live="polite"` so that dynamic time updates are announced to assistive technologies without aggressively interrupting the user.
* **Keyboard Flow:** The DOM is structured to ensure a logical tab sequence: Checkbox → Status Control → Expand Toggle → Edit Button → Delete Button. When closing the Edit form, focus is intentionally forced back to the Edit button to prevent keyboard users from losing their place.
* **Focus Rings:** High-contrast `focus-visible` outlines are applied globally to all interactive elements to meet WCAG AA standards for keyboard navigation.
