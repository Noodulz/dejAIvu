
# !pip install tf2onnx onnx onnxmltools


import onnx
import os
import tf2onnx
import tensorflow as tf
from tensorflow.keras.models import load_model, Model
from tensorflow.keras.losses import BinaryCrossentropy
from tensorflow.keras import Input # Import Input layer

# Load the model without compiling
loaded_keras_model = load_model('./model.h5', compile=False)

# If you need to compile the model, do it manually,
# but avoid using custom objects or configurations that might not be compatible
# with your current environment. For example:
loaded_keras_model.compile(loss=BinaryCrossentropy(), optimizer='adam', metrics=['accuracy'])

# Instead of directly accessing loaded_keras_model.input,
# create a new Input layer with the correct shape
# and connect it to the first layer of your loaded model.
# Assuming the input shape of your model is (224, 224, 3):
input_shape = (256, 256, 3) # Replace with the actual input shape of your model
input_tensor = Input(shape=input_shape)
output_tensor = loaded_keras_model(input_tensor)  # Connect the input to your loaded model
functional_model = Model(inputs=input_tensor, outputs=output_tensor)

# Specify input signature for tf2onnx
# This helps tf2onnx understand the input shape and type
# Include the batch size dimension (None) in the input shape
input_signature = [tf.TensorSpec((None,) + input_shape, tf.float32, name='input')] # Assuming input is float32

# Convert and save the Functional API model, providing input signature
onnx_model, _ = tf2onnx.convert.from_keras(functional_model, input_signature=input_signature)  # Convert the functional model, passing input signature
onnx.save(onnx_model, 'model.onnx')