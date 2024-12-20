import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';
import { deliveryData, normalizeData } from './utils/dataset';
import { createAndTrainModel } from './utils/model';

const App = () => {
  const [model, setModel] = useState(null);
  const [predictedTime, setPredictedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initModel() {
      const normalizedData = normalizeData(deliveryData);
      const trainedModel = await createAndTrainModel(normalizedData);
      setModel(trainedModel);
      setIsLoading(false);
    }
    initModel();
  }, []);

  const handlePredict = async (formData) => {
    if (!model) return;

    const maxValues = {
      distance: Math.max(...deliveryData.map(d => d.distance)),
      traffic: 3,
      timeOfDay: 24,
      weather: 2,
      actualTime: Math.max(...deliveryData.map(d => d.actualTime))
    };

    // Normalize input data
    const normalizedInput = tf.tensor2d([[
      Number(formData.distance) / maxValues.distance,
      Number(formData.traffic) / maxValues.traffic,
      Number(formData.timeOfDay) / maxValues.timeOfDay,
      Number(formData.weather) / maxValues.weather
    ]]);

    // Make prediction
    const prediction = model.predict(normalizedInput);
    const predictedValue = prediction.dataSync()[0] * maxValues.actualTime;
    setPredictedTime(predictedValue);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">
          Loading model...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Delivery Time Predictor
          </h1>
          <p className="mt-2 text-gray-600">
            Enter delivery details to predict delivery time
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <PredictionForm onPredict={handlePredict} />
          {predictedTime && (
            <PredictionResult
              predictedTime={predictedTime}
              actualTimes={deliveryData.map(d => d.actualTime)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;