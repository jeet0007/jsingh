"use server";
  export async function handleFormSubmit(formData: FormData) {
        const url = formData.get('url') as string;
        if (!url) {
            return { error: 'Invalid URL provided' };
        }
        
        try {
            // Fetch screenshot using r.jina.ai
            const image = await fetch('https://r.jina.ai/', {
                method: 'POST',
                body: JSON.stringify({ url }),
                headers: {
                    'X-Return-Format': 'pageshot',
                    'Content-Type': 'application/json',
                },
            });

            if (!image.ok) {
                return { error: `Failed to generate screenshot: ${image.status} ${image.statusText}` };
            }

            // Return the screenshot as a response
            const blob = await image.blob();
            return blob;
        } catch (error) {
            console.error('Screenshot generation error:', error);
            return { 
                error: error instanceof Error 
                    ? error.message 
                    : 'Internal server error during screenshot generation' 
            };
        }
    }