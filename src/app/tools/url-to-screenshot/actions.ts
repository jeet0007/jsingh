"use server";
  export async function generateScreenshot(url: string, format: 'screenshot' | 'pageshot' = 'screenshot') {
        if (!url) {
            throw new Error('Invalid URL provided');
        }
        
        try {
            // Fetch screenshot using r.jina.ai
            const image = await fetch('https://r.jina.ai/', {
                method: 'POST',
                body: JSON.stringify({ url }),
                headers: {
                    'X-Return-Format': format,
                    'Content-Type': 'application/json',
                },
            });

            if (!image.ok) {
                throw new Error(`Failed to generate screenshot: ${image.status} ${image.statusText}`);
            }

            // Return the screenshot as a blob
            return await image.blob();
        } catch (error) {
            console.error('Screenshot generation error:', error);
            throw error;
        }
    }