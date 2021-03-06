define({ "api": [
  {
    "type": "get",
    "url": "/status",
    "title": "Status da API",
    "version": "1.0.0",
    "group": "Recursos_Abertos",
    "description": "<p>Verifica a disponibilidade da API.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Verifica a disponibilidade da API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Resposta de Sucesso:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Serviço disponível WS2\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes.js",
    "groupTitle": "Recursos_Abertos",
    "name": "GetStatus"
  },
  {
    "type": "get",
    "url": "/installments-limit/:brand",
    "title": "Limite de parcelas.",
    "version": "1.0.0",
    "group": "Recursos_Autenticados",
    "description": "<p>Verifica a quantidade permitida de parcelas em uma compra a partir da bandeira informada.</p>",
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "String",
            "optional": false,
            "field": "brand",
            "description": "<p>Nome da bandeira.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Resposta de Sucesso:",
          "content": "HTTP/1.1 200 OK\n{\n  \"Bandeira\": \"vista\",\n  \"limite_parcelas\": 6,\n  \"Operadores_permitidos\": {\n    \"op-01\": false,\n    \"op-02\": true,\n    \"op-03\": true\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bandeira inválida - Resposta de Erro:",
          "content": "HTTP/1.1 401 Error\n{\n  \"resposta\": \"erro\",\n  \"detalhes\": \"A bandeira informada não existe\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/LimitInstallmentsController.js",
    "groupTitle": "Recursos_Autenticados",
    "name": "GetInstallmentsLimitBrand"
  },
  {
    "type": "post",
    "url": "/pay/:brand",
    "title": "Recebe dados para pagamento",
    "version": "1.0.0",
    "group": "Recursos_Autenticados",
    "description": "<p>Envia para a bandeira do cartão a solicitação de pagamento.</p>",
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "String",
            "optional": false,
            "field": "brand",
            "description": "<p>Nome da bandeira.</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "numero_cartao",
            "description": "<p>Número do cartão de crédito. O segundo conjunto de números.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "nome_cliente",
            "description": "<p>Nome do titular do cartão de crédito.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "bandeira",
            "description": "<p>Nome da bandeira segundo opções a seguir: mister (cod.: 1111), vista (cod.:2222) ou daciolo (cod.: 3333).</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "cod_seguranca",
            "description": "<p>Código de três dígitos.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "valor_em_centavos",
            "description": "<p>Valor em centavos da compra.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "parcelas",
            "description": "<p>Quantidade de parcelas para o pagamento.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "cod_operadora",
            "description": "<p>Código único da operadora de cartão. Será usado para que a bandeira verifique se o operador é seu cliente.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Exemplo de Requisição:",
        "content": "POST http://localhost:3333/ws-brands/v1/pay/{brand}\n{\n  \"numero_cartao\": \"1111.2222.3333.4444\",\n  \"nome_cliente\": \"USUARIO DE SOUSA\",\n  \"bandeira\": \"mister\",\n  \"cod_seguranca\": 111,\n  \"valor_em_centavos\": 500,\n  \"parcelas\": 12,\n  \"cod_operadora\": \"op-xx\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "resposta",
            "description": "<p>Resultado da transação.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "nome_cliente",
            "description": "<p>Nome do titular do cartão de crédito.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "valor_em_centavos",
            "description": "<p>Valor em centavos da compra.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "parcelas",
            "description": "<p>Quantidade de parcelas em que o pagamento foi feito.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Resposta de Sucesso:",
          "content": "HTTP/1.1 200 OK\n{\n  \"resposta\": \"sucesso\",\n  \"nome_cliente\": \"USUARIO DE SOUSA\",\n  \"valor_em_centavos\": 500,\n  \"parcelas\": 12\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bandeira inválida - Resposta de Erro:",
          "content": "HTTP/1.1 401 Error\n{\n  \"resposta\": \"falha\",\n  \"detalhes\": \"Bandeira não autorizada\",\n  \"brand\": \"moster\"\n}",
          "type": "json"
        },
        {
          "title": "Números de operador inválido - Resposta de Erro:",
          "content": "HTTP/1.1 401 Error\n{\n  \"cod_resposta\": \"Operadora-negada\",\n  \"resposta\": \"falha\",\n  \"detalhes\": \"Operadora sem relação com a bandeira\",\n  \"cod_operadora\": \"op-xx\"\n}",
          "type": "json"
        },
        {
          "title": "Número de parcelas acima do permitido - Resposta de Erro:",
          "content": "HTTP/1.1 401 Error\n{\n  \"resposta\": \"falha\",\n   \"detalhes\": \"Limite de parcelas ultrapassado\",\n   \"parcelas_solicitadas\": 20,\n   \"limite_parcelas\": 12\n }",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/RecivePaymentDetailsController.js",
    "groupTitle": "Recursos_Autenticados",
    "name": "PostPayBrand"
  }
] });
