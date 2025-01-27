# DejAIvu: Identifying and Explaining AI Art in Real-Time with Saliency Maps

## **Abstract**
- Brief overview of the motivation behind detecting AI-generated art in real-time.
- Highlight the role of saliency maps in providing interpretability and transparency.
- Summary of the proposed extension and detection framework.

## **Introduction**
- The growing prevalence of AI-generated art and its implications for authenticity, creativity, and intellectual property.
- The challenge of detecting AI-generated images in dynamic and real-time environments.
- The significance of explainable AI (XAI) for building trust in detection systems.
- Objectives of the paper:
  - Introducing **DejAIvu**, a browser-based real-time AI art detection extension.
  - Demonstrating the role of saliency maps in explaining model predictions.

## **Background and Related Work**
- Overview of generative AI techniques (GANs, diffusion models, transformers) and their applications in art.
- Review of existing detection approaches:
  - Visual artifact detection.
  - Statistical and frequency-based methods.
  - Deep learning-based classifiers.
- The need for real-time, user-facing detection tools.
- Challenges in providing interpretability using saliency maps.

## **System Architecture**
### **1. Browser Extension Framework**
- Description of the **DejAIvu** browser extension:
  - Real-time injection of content scripts to monitor and process images.
  - Lightweight deployment using **TensorFlow.js** for in-browser inference.
  - MutationObserver integration for detecting dynamically loaded images.

### **2. AI Detection Model**
- Overview of the detection pipeline:
  - Pretrained convolutional neural network (CNN) fine-tuned on real and AI-generated datasets.
  - Integration with **Grad-CAM** for saliency map generation.
- Training details:
  - Dataset composition (real vs. AI-generated images from models like DALL-E, MidJourney, and Stable Diffusion).
  - Preprocessing steps (resizing, normalization, data augmentation).
  - Performance metrics (accuracy, precision, recall, F1-score).

### **3. Saliency Map Explanation**
- Explanation of saliency map generation using **Grad-CAM**:
  - Visualizing regions of the image that contributed most to the AI-generated classification.
  - Overlaying the saliency map on the original image.
- User interface considerations:
  - Highlighting key features with color-coded heatmaps.
  - Ensuring interpretability for non-technical users.

## **Implementation Details**
- Integration of the detection model with the browser extension:
  - Conversion to **TensorFlow.js** for browser compatibility.
  - Script injection for identifying and processing `<img>` elements.
- Overlay system:
  - Real-time saliency map rendering using **HTML Canvas**.
  - Absolute positioning to ensure alignment with images during scrolling.
- Optimization techniques:
  - Model quantization for faster inference.
  - Reducing memory footprint in browser environments.

## **Evaluation**
### **1. Dataset and Benchmarks**
- Description of the dataset used for evaluation:
  - AI-generated images from various models.
  - Real-world images from publicly available datasets.
- Metrics for evaluation:
  - Accuracy, latency (inference time), and user satisfaction (qualitative feedback).

### **2. Real-World Testing**
- Testing the extension on dynamic web environments (e.g., Google Images, Pinterest).
- Performance results:
  - Accuracy in detecting AI-generated images.
  - Average time per detection.
  - Saliency map usability and interpretability.

## **Challenges and Limitations**
- Challenges in dynamic environments:
  - Handling large-scale image datasets in real time.
  - Addressing edge cases (e.g., heavily cropped or distorted images).
- Limitations of current saliency map techniques:
  - Potential for misinterpretation by users.
  - Computational overhead for high-resolution images.
- Discussion on adversarial attacks and potential countermeasures.

## **Future Work**
- Enhancing model robustness to new generative techniques.
- Incorporating multi-modal analysis (e.g., detecting discrepancies between text prompts and generated images).
- User studies to improve saliency map design and interpretability.
- Expanding the extension to detect AI-generated content in videos and other media.

## **Conclusion**
- Summary of the contributions of **DejAIvu**:
  - A real-time detection and explanation system for AI-generated art.
  - Providing transparency through saliency maps.
- Emphasis on the importance of explainability and accessibility in AI detection systems.

## **Acknowledgments**
- Recognition of datasets, frameworks (e.g., TensorFlow, Grad-CAM), and contributors to the project.

## **References**
- Comprehensive list of references covering:
  - Generative AI methods (GANs, diffusion models).
  - Detection techniques and saliency map methodologies.
  - Relevant prior works in AI art detection and interpretability.