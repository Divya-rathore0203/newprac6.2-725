document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('image-upload');
    const previewImage = document.getElementById('preview-image');
    const captionResult = document.getElementById('caption-result'); // Change this to match the ID in HTML

    if (imageUpload && previewImage && captionResult) {
        imageUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;

                    // Prepare FormData for upload
                    const formData = new FormData();
                    formData.append('image', file);

                    fetch('/api/generate-caption', {
                        method: 'POST',
                        body: formData,
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('HTTP error! status: ' + response.status);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Response from server:', data);
                        captionResult.textContent = data.caption; // Set the caption text
                    })
                    .catch(error => {
                        console.error('Error generating caption:', error);
                        captionResult.textContent = 'Error generating caption.';
                    });
                };
                reader.readAsDataURL(file);
            } else {
                console.log('No file selected.');
            }
        });
    } else {
        console.error('One or more elements not found.');
    }
});
