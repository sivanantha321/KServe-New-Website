import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {


  // KServe documentation sidebar
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/quickstart-guide',
        'getting-started/genai-first-isvc',
        'getting-started/predictive-first-isvc',
        'getting-started/swagger-ui'
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      link: {
        type: 'doc',
        id: 'concepts/index',
      }, items: [
        {
          type: 'category',
          label: 'Architecture',
          link: {
            type: 'doc',
            id: 'concepts/architecture/index',
          },
          items: [
            "concepts/architecture/control-plane",
            "concepts/architecture/data-plane/data-plane",
            "concepts/architecture/data-plane/v1-protocol",
            {
              type: 'category',
              label: 'Open Inference Protocol (V2)',
              items: [
                "concepts/architecture/data-plane/v2-protocol/v2-protocol",
                {
                  type: 'category',
                  label: 'Extensions',
                  items: [
                    "concepts/architecture/data-plane/v2-protocol/binary-tensor-data-extension"
                  ],
                }
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Resources',
          link: {
            type: 'doc',
            id: 'concepts/resources/index',
          },
          items: [
            "concepts/resources/servingruntime",
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Model Serving',
      items: [
        {
          type: 'category',
          label: 'Generative Inference',
          items: [
            "model-serving/generative-inference/overview",
            {
              type: 'category',
              label: 'Tasks',
              items: [
                "model-serving/generative-inference/tasks/text-generation/text-generation",
                "model-serving/generative-inference/tasks/text2text-generation/text2text-generation",
                "model-serving/generative-inference/tasks/embedding/embedding",
                "model-serving/generative-inference/tasks/reranking/rerank",
              ],
            },
            "model-serving/generative-inference/sdk-integration/sdk-integration",
            "model-serving/generative-inference/kvcache-offloading/kvcache-offloading",
            "model-serving/generative-inference/modelcache/localmodel",
            "model-serving/generative-inference/autoscaling/autoscaling",
            "model-serving/generative-inference/multi-node/multi-node",
            "model-serving/generative-inference/ai-gateway/envoy-ai-gateway",
          ],
        },
        {
          type: 'category',
          label: 'Predictive Inference',
          items: [
            {
              type: 'category',
              label: 'Model Serving Runtimes',
              items: [
                "model-serving/predictive-inference/frameworks/overview",
                {
                  type: 'category',
                  label: 'Supported Frameworks',
                  items: [
                    "model-serving/predictive-inference/frameworks/tensorflow/tensorflow",
                    "model-serving/predictive-inference/frameworks/triton/torchscript/torchscript",
                    "model-serving/predictive-inference/frameworks/sklearn/sklearn",
                    "model-serving/predictive-inference/frameworks/xgboost/xgboost",
                    "model-serving/predictive-inference/frameworks/pmml/pmml",
                    "model-serving/predictive-inference/frameworks/spark-mllib/spark-mllib",
                    "model-serving/predictive-inference/frameworks/lightgbm/lightgbm",
                    "model-serving/predictive-inference/frameworks/paddle/paddle",
                    "model-serving/predictive-inference/frameworks/mlflow/mlflow",
                    "model-serving/predictive-inference/frameworks/onnx/onnx",
                    {
                      type: 'category',
                      label: 'Hugging Face',
                      items: [
                        "model-serving/predictive-inference/frameworks/huggingface/overview",
                        "model-serving/predictive-inference/frameworks/huggingface/token-classification/token-classification",
                        "model-serving/predictive-inference/frameworks/huggingface/text-classification/text-classification",
                        "model-serving/predictive-inference/frameworks/huggingface/fill-mask/fill-mask",
                      ]
                    },
                  ]
                },
                {
                  type: 'category',
                  label: 'Multi-Framework Runtimes',
                  items: [
                    {
                      type: 'category',
                      label: 'Triton',
                      items: [
                        "model-serving/predictive-inference/frameworks/triton/torchscript/torchscript",
                        "model-serving/predictive-inference/frameworks/triton/tensorflow/tensorflow",
                        "model-serving/predictive-inference/frameworks/triton/huggingface/huggingface",
                      ]
                    },
                  ]
                },
                "model-serving/predictive-inference/frameworks/custom-predictor/custom-predictor",
              ]
            },
            // {
            // type: 'category',
            // label: 'Transformers (Pre/Post Processing)',
            // items: [
            //   "model-serving/predictive-inference/transformers/custom-transformer/custom-transformer",
            // "model-serving/predictive-inference/transformers/collocation",
            // "model-serving/predictive-inference/transformers/feast",
            // ]
            // },
            // {
            //   type: 'category',
            //   label: 'Operations',
            //   items: [
            //     {
            //       type: 'category',
            //       label: 'Rollout Strategies',
            //       items: [
            //         "model-serving/predictive-inference/operations/rollout/canary",
            //         "model-serving/predictive-inference/operations/rollout/canary-example",
            //       ]
            //     },
            //     {
            //       type: 'category',
            //       label: 'Autoscaling',
            //       items: [
            //         "model-serving/predictive-inference/operations/autoscaling/kpa",
            //         "model-serving/predictive-inference/operations/autoscaling/hpa",
            //         "model-serving/predictive-inference/operations/autoscaling/keda",
            //       ]
            //     },
            //     "model-serving/predictive-inference/operations/batcher",
            //     "model-serving/predictive-inference/operations/logger",
            //     "model-serving/predictive-inference/operations/kafka",
            //   ]
            // },
            // {
            //   type: 'category',
            //   label: 'Observability & Monitoring',
            //   items: [
            //     {
            //       type: 'category',
            //       label: 'Metrics & Dashboards',
            //       items: [
            //         "model-serving/predictive-inference/observability/metrics",
            //         "model-serving/predictive-inference/observability/dashboards",
            //       ]
            //     },
            //     {
            //       type: 'category',
            //       label: 'Model Explainability',
            //       items: [
            //         "model-serving/predictive-inference/observability/explainer/concept",
            //         "model-serving/predictive-inference/observability/explainer/trustyai",
            //         {
            //           type: 'category',
            //           label: 'Alibi Explainer',
            //           items: [
            //             "model-serving/predictive-inference/observability/explainer/alibi/image",
            //             "model-serving/predictive-inference/observability/explainer/alibi/income",
            //             "model-serving/predictive-inference/observability/explainer/alibi/text",
            //           ]
            //         },
            //         "model-serving/predictive-inference/observability/explainer/aix",
            //       ]
            //     },
            //     {
            //       type: 'category',
            //       label: 'Model Monitoring',
            //       items: [
            //         "model-serving/predictive-inference/observability/monitoring/alibi-detect",
            //         "model-serving/predictive-inference/observability/monitoring/aif-bias",
            //         "model-serving/predictive-inference/observability/monitoring/art-adversarial",
            //       ]
            //     }
            //   ]
            // }
          ]
        },
        {
          type: 'category',
          label: 'InferenceGraph',
          items: [
            'model-serving/inferencegraph/overview',
          ],
        },
        {
          type: 'category',
          label: 'Model Storage',
          items: [
            'model-serving/storage/overview',
            'model-serving/storage/storage-containers/storage-containers',
            'model-serving/storage/hf'
          ],
        }
      ],
    },
    {
      type: 'category',
      label: 'Administrator Guide',
      items: [
        'admin-guide/overview',
        {
          type: 'category',
          label: 'Generative Inference',
          items: [
            'admin-guide/kubernetes-deployment'
          ]
        },
        {
          type: 'category',
          label: 'Predictive Inference',
          items: [
            'admin-guide/kubernetes-deployment',
            'admin-guide/modelmesh',
            {
              type: 'category',
              label: 'Serverless Deployment',
              items: [
                'admin-guide/serverless/serverless',
                'admin-guide/serverless/kourier-networking/index',
                'admin-guide/serverless/servicemesh/index'
              ]
            }
          ]
        },
        'admin-guide/gatewayapi-migration',
        'admin-guide/configurations',
      ]
    },
    {
      type: 'category',
      label: 'Developer Guide',
      link: {
        type: 'doc',
        id: 'developer-guide/index',
      },
      items: [
        'developer-guide/index',
        'developer-guide/contribution',
        'developer-guide/debugging',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'reference/crd-api',
        {
          type: 'category',
          label: 'Inference Client SDK',
          items: [
            'reference/inference-client/inference-rest-client',
            'reference/inference-client/inference-grpc-client',
          ],
        },
        'reference/pyton-runtime-sdk',
        'reference/controlplane-client/controlplane-client-sdk',
        {
          type: 'category',
          label: 'Open Inference Protocol (OIP)',
          items: [
            {
              type: 'category',
              label: 'REST API',
              items: [
                {
                  type: 'doc',
                  id: 'reference/oip/data-plane',
                },
                {
                  type: 'doc',
                  id: 'reference/oip/get-v-2-health-live',
                  label: 'Server Live',
                  className: 'api-method get',
                },
                {
                  type: 'doc',
                  id: 'reference/oip/get-v-2-health-ready',
                  label: 'Server Ready',
                  className: 'api-method get',
                },
                {
                  type: 'doc',
                  id: 'reference/oip/get-v-2-models-model-name-versions-model-version-ready',
                  label: 'Model Ready',
                  className: 'api-method get',
                },
                {
                  type: 'doc',
                  id: 'reference/oip/get-v-2',
                  label: 'Server Metadata',
                  className: 'api-method get',
                },
                {
                  type: 'doc',
                  id: 'reference/oip/get-v-2-models-model-name-versions-model-version',
                  label: 'Model Metadata',
                  className: 'api-method get',
                },
                {
                  type: 'doc',
                  id: 'reference/oip/post-v-2-models-model-name-versions-model-version-infer',
                  label: 'Inference Request (POST)',
                  className: 'api-method post'
                }
              ],
            },
            {
              type: 'category',
              label: 'gRPC API',
              items: [
                {
                  type: 'doc',
                  id: 'reference/oip/grpc-api',
                },
              ],
            },
          ]
        },
      ],
    },
  ],

  // Community sidebar
  // This sidebar is used for community-related documentation and links.
  communitySidebar: [
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/get-involved',
        'community/adopters',
        'community/presentations',
      ],
    },
  ],
};

export default sidebars;
