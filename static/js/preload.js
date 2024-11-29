function preload(arrayOfImages) {
    if (arrayOfImages.length > 0) {
        showPreloader();
        var loadedImages = 0;

        // Create a hidden container element to hold the preloaded images
        const container = document.createElement('div');
        container.style.display = 'none';

        // Append the container to the body
        document.body.appendChild(container);

        // Preload each image
        arrayOfImages.forEach(function (imageUrl) {
            const img = new Image();
            img.onload = function () {
                loadedImages++;
                console.log('loaded' + loadedImages)
                if (loadedImages === arrayOfImages.length) {
                    hidePreloader();
                }
            };
            img.onerror = function () {
                loadedImages++;
                console.error('Error loading image: ' + imageUrl);
                if (loadedImages === arrayOfImages.length) {
                    hidePreloader();
                }
            };
            img.src = imageUrl;
            container.appendChild(img);
        });
    } else {
        hidePreloader();
    }
}

function showPreloader() {
    $('#preloader').show();
}

function hidePreloader() {
    $('#preloader').hide();
}
