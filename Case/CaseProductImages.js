var CaseProductImageForm = (function () {

    var PRODUCT_LOOKUP = "productid";

    var WEB_RESOURCE_CONTROL =
        "WebResource_CaseProductImage";

    // Registers the Product lookup OnChange event.
    function onLoad() {

        var productAttribute =
            Xrm.Page.getAttribute(PRODUCT_LOOKUP);

        if (!productAttribute) {
            console.error(
                "Product field was not found: " +
                PRODUCT_LOOKUP
            );

            return;
        }

        productAttribute.addOnChange(
            onProductChange
        );
    }

    // Refreshes the Product image when the Product changes.
    function onProductChange() {
        refreshProductImage();
    }

    // Refreshes the Product image Web Resource.
    function refreshProductImage() {

        var webResourceControl =
            Xrm.Page.getControl(
                WEB_RESOURCE_CONTROL
            );

        if (!webResourceControl) {
            console.error(
                "Web Resource control was not found: " +
                WEB_RESOURCE_CONTROL
            );

            return;
        }

        var src =
            webResourceControl.getSrc();

        if (!src) {
            return;
        }

        var separator =
            src.indexOf("?") === -1
                ? "?"
                : "&";

        var newSrc =
            src +
            separator +
            "data=" +
            new Date().getTime();

        webResourceControl.setSrc(
            newSrc
        );
    }

    return {
        onLoad: onLoad,
        onProductChange: onProductChange,
        refreshProductImage: refreshProductImage
    };

})();
