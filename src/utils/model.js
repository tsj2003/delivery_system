import * as tf from '@tensorflow/tfjs';

export async function createAndTrainModel(normalizedData) {
  // Create a sequential model
  const model = tf.sequential();
  
  // Add layers
  model.add(tf.layers.dense({
    units: 8,
    activation: 'relu',
    inputShape: [4]
  }));
  
  model.add(tf.layers.dense({
    units: 4,
    activation: 'relu'
  }));
  
  model.add(tf.layers.dense({
    units: 1,
    activation: 'linear'
  }));

  // Compile the model
  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'meanSquaredError'
  });

  // Prepare training data
  const inputs = tf.tensor2d(normalizedData.map(item => item.input));
  const outputs = tf.tensor2d(normalizedData.map(item => item.output));

  // Train the model
  await model.fit(inputs, outputs, {
    epochs: 100,
    batchSize: 32,
    shuffle: true
  });

  return model;
}