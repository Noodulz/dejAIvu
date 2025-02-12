
## **Title**
DejAIvu: Identifying and Explaining AI Art in Real-Time with Saliency Maps
---

## **Abstract** *(~150 words)*
- Briefly introduce the growing prevalence of AI-generated art and its challenges.
- Describe **DejAIvu**, a browser extension that detects AI-generated art in real-time.
- Highlight its unique feature: saliency maps for interpretable detection.
- Summarize contributions:
  - Real-time detection on dynamic web pages.
  - Lightweight deployment using TensorFlow.js.
  - Visual interpretability with Grad-CAM.

---

## **1. Introduction**
- Motivation:
  - Increasing sophistication of generative AI models (e.g., GANs, Stable Diffusion).
  - The need for tools to detect AI art in real-time and provide transparency.
- Objectives:
  - Build a system for dynamic, real-world environments (e.g., Google Images).
  - Explain predictions with visual saliency maps for interpretability.
- Paper contributions:
  - Real-time browser extension architecture.
  - Integration of Grad-CAM for saliency map overlays.
  - Optimization for low-latency and dynamic content handling.

---

## **2. System Design and Implementation**
### **2.1. Browser Extension Framework**
- **Architecture:**
  - Content scripts to monitor and process `<img>` elements.
  - MutationObserver for dynamically loaded images.
  - Overlay rendering with HTML Canvas.
- **Deployment:**
  - Lightweight model integration using TensorFlow.js for browser inference.

### **2.2. AI Detection Pipeline**
- **Model Overview:**
  - CNN-based classifier trained on AI and real art datasets.
  - Dataset sources: AI-generated art (e.g., DALL-E, MidJourney), real-world images (e.g., Flickr).
- **Saliency Map Integration:**
  - Grad-CAM to identify and highlight regions contributing to AI classification.
  - Real-time saliency overlays rendered directly on detected images.

### **2.3. Optimization Strategies**
- Model quantization for faster inference in browser environments.
- Efficient handling of high-resolution images via preprocessing.

---

## **3. Evaluation**
### **3.1. Dataset and Experimental Setup**
- Dataset description:
  - Balanced dataset of real and AI-generated art.
- Metrics:
  - Accuracy, latency (inference time), and interpretability (user study feedback).

### **3.2. Real-World Performance**
- Tested on dynamic environments (e.g., Google Images, Pinterest).
- Results:
  - High detection accuracy.
  - Average inference time per image: < 50ms.
  - Positive user feedback on saliency map clarity.

---

## **4. Challenges and Future Work**
- Challenges:
  - Addressing adversarial AI-generated images designed to bypass detection.
  - Scaling to video or multi-modal content.
- Future Work:
  - Improve interpretability with interactive saliency maps.
  - Extend detection to cross-modal inputs (e.g., text and image alignment).

---

## **5. Ethical Considerations**
- Broader impact:
  - Protecting intellectual property and combating disinformation.
  - Transparency in AI art detection to maintain trust.
- Limitations:
  - Potential bias in training datasets.
  - Considerations for artists using AI as part of their creative process.

---

## **6. Conclusion**
- Summary of the system’s contributions:
  - Real-time, interpretable detection of AI art in a browser extension.
  - Practical applicability in addressing real-world challenges in AI-generated art detection.

---

## **References** *(if additional space is available)*
- Citations for key generative AI models (GANs, diffusion models).
- Relevant detection techniques and saliency map methods.