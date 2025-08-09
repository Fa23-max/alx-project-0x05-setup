import ImageCard from "@/components/common/ImageCard";
import { ImageProps } from "@/interfaces";
import { useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call to generate image based on prompt
      console.log("Generating image for prompt:", prompt);
      // This would be replaced with actual API call
      const newImageUrl = `https://example.com/image-${Date.now()}.jpg`;
      setImageUrl(newImageUrl);
      
      // Add to generated images list
      setGeneratedImages(prev => [
        { id: Date.now().toString(), url: newImageUrl, prompt },
        ...prev
      ]);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Image Generator</h1>
      <div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image prompt"
          disabled={isLoading}
        />
        <button onClick={handleGenerateImage} disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Image"}
        </button>
      </div>
      
      {imageUrl && (
        <div>
          <h2>Generated Image</h2>
          <img src={imageUrl} alt="Generated" />
        </div>
      )}
      
      {generatedImages.length > 0 && (
        <div>
          <h2>Previous Images</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {generatedImages.map((image) => (
              <ImageCard key={image.id} {...image} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;