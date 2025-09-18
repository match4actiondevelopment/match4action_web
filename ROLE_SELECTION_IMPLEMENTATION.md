# Role Selection Implementation

## Overview
After user registration, users are now redirected to a role selection page where they can choose between "Volunteer" and "Organization" roles.

## Implementation Details

### 1. Role Selection Page (`/role-selection`)
- **Question**: "Select how you want to act?"
- **Two Options**: 
  - **Volunteer**: "Help others and make a difference"
  - **Organization**: "Create opportunities for others"

### 2. Button States
- **Initial State**: Both role buttons are greyed-out (`#E5E5E5`)
- **Selected State**: Selected button turns orange (`#FFD15C`)
- **Continue Button**: 
  - **Disabled**: Greyed-out when no role is selected
  - **Enabled**: Green (`#4CAF50`) when a role is selected

### 3. User Flow
1. **User completes registration** → Redirected to `/role-selection`
2. **User selects a role** → Button turns orange, Continue button becomes green
3. **User clicks Continue** → Redirected to `/initiatives` (same page for both roles)

### 4. Technical Implementation

#### Files Created/Modified:
- `src/app/role-selection/page.tsx` - Route page
- `src/modules/pages/RoleSelection.tsx` - Main component
- `src/modules/pages/Register.tsx` - Updated redirect after registration

#### Key Features:
- **Responsive Design**: Works on mobile and desktop
- **Smooth Transitions**: CSS transitions for button state changes
- **Accessibility**: Proper button states and disabled states
- **Consistent Styling**: Uses project fonts (Lato, Source Serif Pro)

### 5. Button Behavior
```typescript
// Role buttons start grey, turn orange when selected
background: selectedRole === "volunteer" ? "#FFD15C" : "#E5E5E5"

// Continue button starts grey, turns green when role is selected
background: selectedRole ? "#4CAF50" : "#E5E5E5"
disabled: !selectedRole
```

### 6. Future Enhancements
- Different destinations for Volunteer vs Organization
- Role-specific onboarding flows
- Role persistence in user profile
- Role-based feature access

## Testing
1. **Register a new user** → Should redirect to role selection
2. **Select Volunteer** → Button should turn orange
3. **Click Continue** → Should redirect to initiatives page
4. **Select Organization** → Button should turn orange
5. **Click Continue** → Should redirect to initiatives page

## Current Status
✅ **Implemented and Ready for Testing**
- Role selection page created
- Registration flow updated
- Button states working
- Responsive design implemented
