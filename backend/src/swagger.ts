import { UserModel } from "./models/user.model";
import { FoodModel } from "./models/food.model";
import { OrderModel } from "./models/order.model";
import m2s from "mongoose-to-swagger";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { get } from "http";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.2",
    info: {
      version: "1.0.0",
      title: "FoodMeUp API's",
      description: "FoodMeUP application",
      contact: {
        name: "API Support",
        url: "http://www.example.com",
        email: "stef.katsivelos@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Server",
      },
      {
        url: "http://www.example.com",
        description: "Testing server",
      },
    ],
    components: {
      schemas: {
        User: m2s(UserModel),
        Food: m2s(FoodModel),
        Order: m2s(OrderModel),
      },
    },
    tags: [
      {
        name: "Users",
        description: "API endpoints for managing users",
      },
      {
        name: "Foods",
        description: "API endpoints for managing food",
      },
      {
        name: "Orders",
        description: "API endpoints for managing order",
      },
    ],
    paths: {
      "/api/users/all": {
        get: {
          tags: ["Users"],
          summary: "Get all users",
          description: "Returns a list of all registered users.",
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
            "500": {
              description: "Internal server error",
            },
          },
        },
      },
      "/api/users/{name}": {
        get: {
          tags: ["Users"],
          summary: "Get user by name",
          description: "Returns a single user by their name.",
          parameters: [
            {
              name: "name",
              in: "path",
              required: true,
              description: "Name of the user to retrieve",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            "404": {
              description: "User not found",
            },
            "500": {
              description: "Internal server error",
            },
          },
        },
      },
      "/api/users/register": {
        post: {
          tags: ["Users"],
          summary: "Register a new user",
          description: "Creates a new user and returns their details.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                    address: {
                      type: "string",
                    },
                  },
                  required: ["name", "email", "password", "address"],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "User successfully registered",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            "400": {
              description: "User already exists or invalid data",
            },
            "500": {
              description: "Internal server error",
            },
          },
        },
      },
      '/api/foods': {
        get: {
          tags: ['Foods'],
          summary: 'Get all foods',
          description: 'Returns a list of all food items.',
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Food'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Internal server error'
            }
          }
        }
      },
      "/api/foods/search/{searchTerm}": {
        get: {
          tags: ["Foods"],
          summary: "Search for food items",
          description: "Returns a list of food items matching the search term.",
          parameters: [
            {
              name: "searchTerm",
              in: "path",
              required: true,
              description: "Term to search for in food names",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Food",
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid search term or no results found",
            },
            "500": {
              description: "Internal server error",
            },
          },
        },
      },
      '/api/orders/create': {
        post: {
          tags: ['Orders'],
          summary: 'Create a new order',
          description: 'Creates a new order for the authenticated user.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          food: {
                            type: 'string',
                            description: 'ID of the food item'
                          },
                          quantity: {
                            type: 'number',
                            description: 'Quantity of the food item'
                          }
                        },
                        required: ['food', 'quantity']
                      }
                    }
                  },
                  required: ['items']
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Order successfully created',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Order'
                  }
                }
              }
            },
            '400': {
              description: 'Cart is empty or invalid data'
            },
            '401': {
              description: 'Unauthorized'
            },
            '500': {
              description: 'Internal server error'
            }
          }
        }
      }
    }
  },

  // List of files to process for Swagger documentation
  apis: [
    "./src/routers/food.routes.ts",
    "./src/routers/order.routes.ts",
    "./src/routers/user.routes.ts",
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
