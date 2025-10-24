# Form Components

## Description
These components are designed to be used in the standardized creation of forms.  
They provide a consistent structure, styling, and behavior across the application.

## Usage

### 1. Form Root
The root of every form **must** be the `FormWrapper` component.  
It is responsible for:
- Wrapping the entire form content.
- Applying default styling (e.g., background color, padding, layout).
- Setting the initial positioning of the main child components.

Example:
```tsx
<FormWrapper>
  {/* Form content goes here */}
</FormWrapper>
```

### 2. Form Title

The first component inside FormWrapper must be the FormTitle.
It should receive a string prop representing the form title.

Example:
```tsx
<FormWrapper>
  <FormTitle className={'Form Title'}/>
</FormWrapper>
```