import * as tf from '@tensorflow/tfjs';


// Cette route, de train monpropre modèle, me paraît trop longue et trop compliqué pour mes besoin.
// Je vais sûrement importer et run un modèle déjà entraîner de Github. On verras bien.
// Use `tfjs`.
const tf = require('@tensorflow/tfjs');
// Define a simple model.
const model = tf.sequential();
model.add(tf.layers.dense({units: 100, activation: 'relu', inputShape: [10]}));
model.add(tf.layers.dense({units: 1, activation: 'linear'}));
model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

const xs = tf.randomNormal([100, 10]);
const ys = tf.randomNormal([100, 1]);
// Train the model.
model.fit(xs, ys, {
  epochs: 100,
  callbacks: {
    onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
  }
});

