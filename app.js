/**
 * GrowBolt Web SDK - Integration Logic
 * 
 * This file demonstrates how to bootstrap, initialize, and trigger the GrowBolt
 * Web SDK in a standard frontend application. Make sure the GrowBolt SDK script
 * is loaded prior to executing these functions.
 */

async function bootstrap() {
  try {
    let config = null;

    /**
     * Step 1: Securely load credentials at runtime.
     * This fetches environment variables via the serverless API.
     */
    try {
      const response = await fetch('/api/config');
      if (!response.ok) {
        throw new Error("Failed to fetch configuration from /api/config");
      }
      config = await response.json();
      
      if (!config.apiKey || !config.sub4) {
        throw new Error("Missing apiKey or sub4 in configuration.");
      }
      console.log("GrowBolt credentials loaded securely from serverless config.");
    } catch (e) {
      console.error("Configuration error: ", e.message);
      console.warn("Please ensure Vercel environment variables are set and the serverless endpoint is running.");
      return; // Stop initialization if config is missing
    }

    /**
     * Step 2: Initialize the GrowBolt client.
     * Call `GrowBolt.init` as early as possible in your page load lifecycle.
     */
    await GrowBolt.init(config);

    console.log("GrowBolt SDK initialized successfully.");

    /**
     * Step 3: Hook up the Offerwall trigger button.
     * When the user clicks the target button, call `GrowBolt.openOfferwall()`
     * to open the GrowBolt rewards dashboard as an overlay on your website.
     */
    const triggerBtn = document.getElementById("openRewards");
    if (triggerBtn) {
      triggerBtn.addEventListener("click", () => {
        // Launches the offerwall overlay/modal
        GrowBolt.openOfferwall();
      });
    } else {
      console.warn("Trigger button with ID 'openRewards' not found in DOM.");
    }
  } catch (err) {
    // Handle initialization or runtime errors
    console.error("Failed to initialize GrowBolt SDK:", err);
  }
}

// Execute the bootstrap sequence
bootstrap();