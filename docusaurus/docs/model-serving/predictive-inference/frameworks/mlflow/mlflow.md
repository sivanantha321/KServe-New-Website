---
title: MLflow
description: Deploy MLflow models with KServe
---

# Deploying MLflow Models with KServe

This guide demonstrates how to deploy MLflow models using KServe's `InferenceService` and how to send inference requests using the [Open Inference Protocol](https://github.com/kserve/open-inference-protocol).

## Prerequisites

Before you begin, make sure you have:

- A Kubernetes cluster with [KServe installed](../../../../getting-started/quickstart-guide.md).
- `kubectl` CLI configured to communicate with your cluster.
- Basic knowledge of Kubernetes concepts and MLflow models.
- Access to cloud storage (like Google Cloud Storage) to store your model artifacts.

## Training a Sample MLflow Model

The first step is to train a sample scikit-learn model and save it in MLflow format by calling the MLflow `log_model` API.

```python
# Original source code and more details can be found in:
# https://www.mlflow.org/docs/latest/tutorials-and-examples/tutorial.html

# The data set used in this example is from
# http://archive.ics.uci.edu/ml/datasets/Wine+Quality
# P. Cortez, A. Cerdeira, F. Almeida, T. Matos and J. Reis.
# Modeling wine preferences by data mining from physicochemical properties.
# In Decision Support Systems, Elsevier, 47(4):547-553, 2009.

import warnings
import sys

import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.linear_model import ElasticNet
from urllib.parse import urlparse
import mlflow
import mlflow.sklearn
from mlflow.models.signature import infer_signature

import logging

logging.basicConfig(level=logging.WARN)
logger = logging.getLogger(__name__)


def eval_metrics(actual, pred):
    rmse = np.sqrt(mean_squared_error(actual, pred))
    mae = mean_absolute_error(actual, pred)
    r2 = r2_score(actual, pred)
    return rmse, mae, r2


if __name__ == "__main__":
    warnings.filterwarnings("ignore")
    np.random.seed(40)

    # Read the wine-quality csv file from the URL
    csv_url = (
        "http://archive.ics.uci.edu/ml"
        "/machine-learning-databases/wine-quality/winequality-red.csv"
    )
    try:
        data = pd.read_csv(csv_url, sep=";")
    except Exception as e:
        logger.exception(
            "Unable to download training & test CSV, "
            "check your internet connection. Error: %s",
            e,
        )

    # Split the data into training and test sets. (0.75, 0.25) split.
    train, test = train_test_split(data)

    # The predicted column is "quality" which is a scalar from [3, 9]
    train_x = train.drop(["quality"], axis=1)
    test_x = test.drop(["quality"], axis=1)
    train_y = train[["quality"]]
    test_y = test[["quality"]]

    alpha = float(sys.argv[1]) if len(sys.argv) > 1 else 0.5
    l1_ratio = float(sys.argv[2]) if len(sys.argv) > 2 else 0.5

    with mlflow.start_run():
        lr = ElasticNet(alpha=alpha, l1_ratio=l1_ratio, random_state=42)
        lr.fit(train_x, train_y)

        predicted_qualities = lr.predict(test_x)

        (rmse, mae, r2) = eval_metrics(test_y, predicted_qualities)

        print("Elasticnet model (alpha=%f, l1_ratio=%f):" % (alpha, l1_ratio))
        print("  RMSE: %s" % rmse)
        print("  MAE: %s" % mae)
        print("  R2: %s" % r2)

        mlflow.log_param("alpha", alpha)
        mlflow.log_param("l1_ratio", l1_ratio)
        mlflow.log_metric("rmse", rmse)
        mlflow.log_metric("r2", r2)
        mlflow.log_metric("mae", mae)

        tracking_url_type_store = urlparse(mlflow.get_tracking_uri()).scheme
        model_signature = infer_signature(train_x, train_y)

        # Model registry does not work with file store
        if tracking_url_type_store != "file":

            # Register the model
            # There are other ways to use the Model Registry,
            # which depends on the use case,
            # please refer to the doc for more information:
            # https://mlflow.org/docs/latest/model-registry.html#api-workflow
            mlflow.sklearn.log_model(
                lr,
                "model",
                registered_model_name="ElasticnetWineModel",
                signature=model_signature,
            )
        else:
            mlflow.sklearn.log_model(lr, "model", signature=model_signature)
```

The training script will serialize your trained model in the MLflow Model format:

```text
model/
├── MLmodel
├── model.pkl
├── conda.yaml
└── requirements.txt
```

## Testing the Model Locally

Once you have your model serialized as `model.pkl`, you can use [MLServer](https://github.com/SeldonIO/MLServer) to create a local model server. For more details, check the [MLflow example documentation](https://github.com/SeldonIO/MLServer/tree/master/docs/examples/mlflow/README.md).

:::tip
This local testing step is optional. You can skip to the deployment section if you prefer.
:::

### Prerequisites

To use MLServer locally, install the `mlserver` package and the MLflow runtime:

```bash
pip install mlserver mlserver-mlflow
```

### Model Settings

Next, provide model settings so that MLServer knows:

- The inference runtime to serve your model (i.e. `mlserver_mlflow.MLflowRuntime`)
- The model's name and version

These can be specified through environment variables or by creating a local `model-settings.json` file:

```json
{
  "name": "mlflow-wine-classifier",
  "version": "v1.0.0",
  "implementation": "mlserver_mlflow.MLflowRuntime"
}
```

### Starting the Model Server Locally

With the `mlserver` package installed and a local `model-settings.json` file, start your server with:

```bash
mlserver start .
```

## Deploying the Model with InferenceService

When deploying the model with InferenceService, KServe injects sensible defaults that work out-of-the-box without additional configuration. However, you can override these defaults by providing a `model-settings.json` file similar to your local one. You can even provide [multiple `model-settings.json` files to load multiple models](https://github.com/SeldonIO/MLServer/tree/master/docs/examples/mms).

To use the Open Inference Protocol (v2) for inference with the deployed model, set the `protocolVersion` field to `v2`. In this example, your model artifacts have already been uploaded to a Google Cloud Storage bucket and can be accessed at `gs://kfserving-examples/models/mlflow/wine`.

```yaml
apiVersion: "serving.kserve.io/v1beta1"
kind: "InferenceService"
metadata:
  name: "mlflow-v2-wine-classifier"
spec:
  predictor:
    model:
      modelFormat:
        name: mlflow
      protocolVersion: v2
      storageUri: "gs://kfserving-examples/models/mlflow/wine"
      resources:
        requests:
          cpu: "100m"
          memory: "512Mi"
        limits:
          cpu: "1"
          memory: "1Gi"
```

Apply the YAML manifest:

```bash
kubectl apply -f mlflow.yaml
```

## Testing the Deployed Model

You can test your deployed model by sending a sample request following the [Open Inference Protocol](https://github.com/kserve/open-inference-protocol).

Use our sample input file [mlflow-input.json](./mlflow-input.json) to test the model:

[Determine the ingress IP and ports](../../../../getting-started/predictive-first-isvc.md#4-determine-the-ingress-ip-and-ports), then set the `INGRESS_HOST` and `INGRESS_PORT` environment variables.


```bash
SERVICE_HOSTNAME=$(kubectl get inferenceservice mlflow-v2-wine-classifier -o jsonpath='{.status.url}' | cut -d "/" -f 3)

curl -v \
  -H "Host: ${SERVICE_HOSTNAME}" \
  -H "Content-Type: application/json" \
  -d @./mlflow-input.json \
  http://${INGRESS_HOST}:${INGRESS_PORT}/v2/models/mlflow-v2-wine-classifier/infer
```

:::tip[Expected Output]
```json
{
  "model_name":"mlflow-v2-wine-classifier",
  "model_version":null,
  "id":"699cf11c-e843-444e-9dc3-000d991052cc",
  "parameters":null,
  "outputs":[
    {
      "name":"predict",
      "shape":[1],
      "datatype":"FP64",
      "parameters":null,
      "data":[5.576883936610762]
    }
  ]
}
```
:::
