# Dynamics 365 Setup Guide

This guide explains how to configure the Product Image Web Resource on the Microsoft Dynamics 365 Case form.

## Prerequisites

Before configuring the solution, make sure the following components are available:

- Microsoft Dynamics 365 / Model-driven App
- Case entity
- Product lookup on the Case form
- Product entity
- Product image enabled on the Product entity

## 1. Create the HTML Web Resource

Create a new Web Resource in Dynamics 365.

### Configuration

**Type:**

```text
HTML
```

**Name:**

```text
CaseProductImage.html
```

Upload the following file from this repository:

```text
Case/CaseProductImage.html
```

Publish the Web Resource.

---

## 2. Create the JavaScript Web Resource

Create another Web Resource.

### Configuration

**Type:**

```text
JavaScript
```

**Name:**

```text
CaseProductImages.js
```

Upload the following file from this repository:

```text
Case/CaseProductImages.js
```

Publish the Web Resource.

---

## 3. Add the JavaScript Web Resource to the Case Form

Open the Case form in the Dynamics 365 form editor.

Add the following JavaScript Web Resource to the Form Libraries:

```text
CaseProductImages.js
```

---

## 4. Register the Form OnLoad Event

Open the Case form events.

Add an OnLoad event handler.

### Library

```text
CaseProductImages.js
```

### Function

```text
CaseProductImageForm.onLoad
```

### Pass execution context

```text
No
```

Save the event handler.

---

## 5. Add the HTML Web Resource to the Case Form

Add the HTML Web Resource to the Case form.

### Web Resource

```text
CaseProductImage.html
```

### Control Name

```text
WebResource_CaseProductImage
```

The JavaScript code uses this control name to refresh the Web Resource.

### Recommended Height

```text
300 px
```

### Border

```text
No
```

Save the form.

---

## 6. Verify the Product Lookup

The Case form must contain the Product lookup with the following logical name:

```text
productid
```

The JavaScript implementation uses this field to detect Product changes.

---

## 7. Publish the Customizations

Publish the following components:

- JavaScript Web Resource
- HTML Web Resource
- Case form
- Customizations

Make sure all changes are published before testing.

---

## 8. Test the Product Image

Open a Case record.

Select a Product in the Product lookup.

The Product image should appear automatically without saving the Case.

Change the Product.

The displayed image should update immediately.

No form save or page refresh should be required.

---

## 9. Product Without an Image

If the selected Product does not have an image, the Web Resource displays:

```text
No Product image available.
```

The Case form remains functional and no image is displayed.

---

## 10. How the Solution Works

The solution consists of two Web Resources.

### HTML Web Resource

The HTML Web Resource:

1. Reads the selected Product from the Case form.
2. Retrieves the Product record using the Dynamics 365 Web API.
3. Requests the `entityimage_url` field.
4. Displays the Product image.
5. Displays a fallback message when no image is available.

### JavaScript Web Resource

The JavaScript Web Resource:

1. Registers an OnChange event for the `productid` lookup.
2. Detects Product changes.
3. Refreshes the HTML Web Resource.
4. Forces the Web Resource to reload.
5. Allows the HTML Web Resource to display the image for the newly selected Product.

---

## 11. Product Image Field

The implementation retrieves the Product image URL using:

```text
entityimage_url
```

The Product entity is:

```text
product
```

The primary image field is:

```text
entityimage
```

---

## 12. Web Resource Refresh Strategy

The JavaScript uses the legacy-compatible `getSrc()` and `setSrc()` methods to refresh the HTML Web Resource.

A timestamp is appended to the Web Resource URL:

```javascript
var separator =
    src.indexOf("?") === -1 ? "?" : "&";

var newSrc =
    src +
    separator +
    "data=" +
    new Date().getTime();

webResourceControl.setSrc(newSrc);
```

The timestamp forces the browser to reload the Web Resource instead of using the previously loaded content.

---

## 13. Compatibility

This implementation was designed for a legacy Microsoft Dynamics 365 environment where `Xrm.Page` is available.

The implementation uses:

```text
Xrm.Page
```

and:

```text
getSrc()
setSrc()
```

to maintain compatibility with the target Dynamics 365 client.

---

## 14. Important Behavior

The Product image is updated when the Product lookup triggers its normal OnChange event.

The implementation does not require the Case form to be saved before displaying the new Product image.

The implementation also does not depend on the Case Serial Number field.

---

## 15. Project Components

The main project files are:

```text
Case/
├── CaseProductImage.html
└── CaseProductImages.js
```

The HTML Web Resource handles the image display.

The JavaScript Web Resource handles Product change detection and Web Resource refresh.
