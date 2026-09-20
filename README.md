# Dynamics 365 Case Product Image

A Microsoft Dynamics 365 implementation for displaying and dynamically refreshing Product images on the Case form.

The Product image is updated immediately when the Product lookup changes, without requiring the user to save or refresh the Case form.

## Features

- Display the selected Product image on the Case form
- Update the image when the Product changes
- No form save required
- No page refresh required
- Uses Dynamics 365 Web API
- Uses the Product `entityimage_url` field
- Supports Products without an image
- Preserves the original image aspect ratio
- Uses separate HTML and JavaScript Web Resources
- Designed for legacy Dynamics 365 environments

## Preview

The Product image is displayed directly on the Case form and is refreshed automatically when the Product lookup changes.

![Case Product Image Preview](docs/case-product-image-preview.png)

## Project Structure

```text
dynamics365-case-product-image/
│
├── Case/
│   ├── CaseProductImage.html
│   └── CaseProductImages.js
│
│
├── docs/
│   └── setup.md
│
└── README.md
```

## Architecture

The implementation consists of two main components.

### HTML Web Resource

The HTML Web Resource is responsible for displaying the Product image.

It:

1. Reads the selected Product from the Case form.
2. Retrieves the Product record using the Dynamics 365 Web API.
3. Retrieves the `entityimage_url` field.
4. Displays the Product image.
5. Displays a fallback message when no image is available.

### JavaScript Web Resource

The JavaScript Web Resource is responsible for detecting Product changes and refreshing the HTML Web Resource.

It:

1. Registers the Product lookup `OnChange` event.
2. Detects changes to the `productid` field.
3. Refreshes the HTML Web Resource.
4. Forces the Web Resource to reload.
5. Allows the HTML Web Resource to display the image for the selected Product.

## Dynamics 365 Components

| Component | Value |
|---|---|
| Entity | Case |
| Product Lookup | `productid` |
| Product Entity | `product` |
| Product Primary Image | `entityimage` |
| Product Image URL | `entityimage_url` |
| HTML Web Resource | `CaseProductImage.html` |
| JavaScript Web Resource | `CaseProductImages.js` |
| Web Resource Control | `WebResource_CaseProductImage` |
| Form OnLoad Function | `CaseProductImageForm.onLoad` |

## How It Works

When the Case form loads, the JavaScript registers an `OnChange` handler for the Product lookup.

When the Product changes:

```text
Product lookup changes
        ↓
OnChange event is triggered
        ↓
JavaScript refreshes the Web Resource
        ↓
HTML Web Resource loads
        ↓
Selected Product is retrieved
        ↓
entityimage_url is retrieved
        ↓
Product image is displayed
```

The Case form does not need to be saved and the page does not need to be refreshed.

## Web Resource Refresh

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

The timestamp forces the browser to reload the Web Resource.

## Technical Implementation

The Product image URL is retrieved using the Dynamics 365 Web API:

```javascript
Xrm.WebApi.retrieveRecord(
    "product",
    productId,
    "?$select=entityimage_url"
);
```

Only the required Product field is requested.

The selected Product is obtained from the Case form using:

```javascript
Xrm.Page.getAttribute("productid").getValue();
```

## Legacy Dynamics 365 Compatibility

This project was implemented for a legacy Microsoft Dynamics 365 environment where `Xrm.Page` is available.

The implementation intentionally uses:

```text
Xrm.Page
```

and:

```text
getSrc()
setSrc()
```

to maintain compatibility with the target Dynamics 365 client.

## Important Behavior

The image is refreshed when the Product lookup triggers its normal `OnChange` event.

The solution does not depend on the Case Serial Number field.

The Case form does not need to be saved before displaying the new Product image.

## Product Without an Image

If the selected Product does not have an image, the Web Resource displays:

```text
No Product image available.
```

The Case form remains functional and no image is displayed.

## Configuration

The Case form requires the following configuration:

### JavaScript Library

Add:

```text
CaseProductImages.js
```

to the Case form libraries.

### Form OnLoad

Register:

```text
CaseProductImageForm.onLoad
```

as the Case form `OnLoad` event handler.

### HTML Web Resource

Add:

```text
CaseProductImage.html
```

to the Case form.

Use the following control name:

```text
WebResource_CaseProductImage
```

### Product Lookup

The Case Product lookup must use:

```text
productid
```

For the complete configuration steps, see:

[Setup Guide](docs/setup.md)



## Technical Challenges

### Legacy Client API Compatibility

The target Dynamics 365 environment uses legacy client APIs.

Modern Web Resource APIs were not used because they were not compatible with the target environment.

The implementation therefore uses the legacy-compatible Web Resource methods:

```javascript
getSrc()
setSrc()
```

### Dynamic Image Refresh

The Product image needs to change immediately when the Product lookup changes.

Instead of saving or refreshing the entire Case form, the HTML Web Resource is reloaded dynamically.

A timestamp is appended to the Web Resource URL to force the browser to load the updated content.

## Project Goal

The goal of this project is to provide a lightweight and reusable pattern for displaying Dynamics 365 Product images directly inside model-driven forms.

The implementation demonstrates how HTML Web Resources, JavaScript form events, and the Dynamics 365 Web API can work together to create a dynamic form experience.

## License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.
