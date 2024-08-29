document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('image-upload');
    const previewImage = document.getElementById('preview-image');
    const progressBar = document.querySelector('#progress-bar .determinate');
    
    console.log('imageUpload:', imageUpload);
    console.log('previewImage:', previewImage);
    console.log('progressBar:', progressBar);
    
    if (imageUpload && previewImage && progressBar) {
        imageUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;

                    // Display progress bar
                    progressBar.style.width = '0%'; // Reset progress bar

                    // Perform the image caption request
                    const formData = new FormData();
                    formData.append('image', file);
                    
                    fetch('/generate-caption', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => {
                        // Log response details
                        console.log('Response status:', response.status);
                        console.log('Response headers:', response.headers);

                        // Check if the response is OK
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Response data:', data); // Log the response data
                        if (data && data.caption) {
                            document.getElementById('caption-result').innerText = data.caption;
                        } else {
                            document.getElementById('caption-result').innerText = 'No caption returned from the server.';
                        }
                        progressBar.style.width = '100%'; // Complete progress bar
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        document.getElementById('caption-result').innerText = `An error occurred: ${error.message}`;
                        progressBar.style.width = '0%'; // Reset progress bar
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
