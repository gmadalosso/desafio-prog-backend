import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema de Matrículas API",
      version: "1.0.0",
      description: "API para gerenciamento de matrículas em turmas de uma instituição de ensino",
      contact: {
        name: "Desafio PBE Grupo 13"
      }
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Servidor de desenvolvimento"
      }
    ],
    tags: [
      {
        name: "Auth",
        description: "Endpoints de autenticação"
      },
      {
        name: "Turmas",
        description: "Endpoints para gerenciamento de turmas"
      },
      {
        name: "Matrículas",
        description: "Endpoints para gerenciamento de matrículas"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT obtido no endpoint de login"
        }
      },
      schemas: {
        Usuario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            nomeUsuario: {
              type: "string",
              example: "professor1"
            },
            papel: {
              type: "integer",
              description: "0 = Aluno, 1 = Professor",
              example: 1
            }
          }
        },
        LoginRequest: {
          type: "object",
          required: ["nomeUsuario", "senha"],
          properties: {
            nomeUsuario: {
              type: "string",
              example: "professor1"
            },
            senha: {
              type: "string",
              format: "password",
              example: "senha123"
            }
          }
        },
        LoginResponse: {
          type: "object",
          properties: {
            mensagem: {
              type: "string",
              example: "Login bem-sucedido"
            },
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            },
            usuario: {
              $ref: "#/components/schemas/Usuario"
            }
          }
        },
        Turma: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            disciplina_id: {
              type: "integer",
              example: 1
            },
            professor_id: {
              type: "integer",
              example: 1
            },
            horario: {
              type: "string",
              description: "Formato: dígito + dígito (dia da semana + turno). Ex: 21 = Segunda Manhã, 33 = Terça Noite",
              example: "21"
            },
            vagas_disponiveis: {
              type: "integer",
              example: 30
            }
          }
        },
        CriarTurmaRequest: {
          type: "object",
          required: ["disciplina_id", "horario"],
          properties: {
            disciplina_id: {
              type: "integer",
              example: 1
            },
            horario: {
              type: "string",
              description: "Horários válidos: 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53, 61, 62, 63",
              example: "21"
            }
          }
        },
        MatricularRequest: {
          type: "object",
          required: ["turma_id"],
          properties: {
            turma_id: {
              type: "integer",
              example: 1
            }
          }
        },
        MatricularResponse: {
          type: "object",
          properties: {
            mensagem: {
              type: "string",
              example: "Matrícula realizada com sucesso"
            }
          }
        },
        Erro: {
          type: "object",
          properties: {
            erro: {
              type: "string",
              example: "Mensagem de erro"
            },
            detalhes: {
              type: "string",
              example: "Detalhes adicionais do erro (opcional)"
            }
          }
        }
      }
    },
    paths: {
      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Realizar login",
          description: "Autentica um usuário e retorna um token JWT",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRequest"
                },
                example: {
                  nomeUsuario: "professor1",
                  senha: "senha123"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Login realizado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/LoginResponse"
                  }
                }
              }
            },
            401: {
              description: "Credenciais inválidas",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro"
                  },
                  example: {
                    erro: "Usuário não encontrado"
                  }
                }
              }
            }
          }
        }
      },
      "/api/auth/logout": {
        post: {
          tags: ["Auth"],
          summary: "Realizar logout",
          description: "Encerra a sessão do usuário (requer autenticação)",
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            200: {
              description: "Logout realizado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      mensagem: {
                        type: "string",
                        example: "Logout realizado com sucesso"
                      }
                    }
                  }
                }
              }
            },
            401: {
              description: "Token não fornecido ou inválido",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro"
                  }
                }
              }
            }
          }
        }
      },
      "/api/turmas": {
        post: {
          tags: ["Turmas"],
          summary: "Criar nova turma",
          description: "Cria uma nova turma (apenas professores)",
          security: [
            {
              bearerAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CriarTurmaRequest"
                },
                example: {
                  disciplina_id: 1,
                  horario: "21"
                }
              }
            }
          },
          responses: {
            201: {
              description: "Turma criada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Turma"
                  }
                }
              }
            },
            400: {
              description: "Dados inválidos ou turma já existe",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro"
                  },
                  examples: {
                    dadosInvalidos: {
                      value: {
                        erro: "disciplina_id e horario são obrigatórios"
                      }
                    },
                    horarioInvalido: {
                      value: {
                        erro: "Horário inválido. Use: 21, 33, etc."
                      }
                    },
                    turmaDuplicada: {
                      value: {
                        erro: "Já existe uma turma para esta disciplina neste horário"
                      }
                    }
                  }
                }
              }
            },
            403: {
              description: "Acesso negado: apenas professores podem criar turmas",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro"
                  }
                }
              }
            },
            401: {
              description: "Token não fornecido ou inválido",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro"
                  }
                }
              }
            }
          }
        },
        get: {
          tags: ["Turmas"],
          summary: "Listar todas as turmas",
          description: "Retorna uma lista de todas as turmas disponíveis (requer autenticação)",
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            200: {
              description: "Lista de turmas",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Turma"
                    }
                  }
                }
              }
            },
            401: {
              description: "Token não fornecido ou inválido",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro"
                  }
                }
              }
            }
          }
        }
      },
      "/api/matriculas": {
        post: {
          tags: ["Matrículas"],
          summary: "Matricular em turma",
          description: "Realiza a matrícula de um aluno em uma turma (apenas alunos)",
          security: [
            {
              bearerAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MatricularRequest"
                },
                example: {
                  turma_id: 1
                }
              }
            }
          },
          responses: {
            201: {
              description: "Matrícula realizada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/MatricularResponse"
                  }
                }
              }
            },
            400: {
              description: "Dados inválidos ou vagas esgotadas",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro"
                  },
                  examples: {
                    vagasEsgotadas: {
                      value: {
                        erro: "Vagas esgotadas"
                      }
                    },
                    matriculaDuplicada: {
                      value: {
                        erro: "Aluno já está matriculado nesta turma"
                      }
                    }
                  }
                }
              }
            },
            404: {
              description: "Turma não encontrada",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro"
                  }
                }
              }
            },
            409: {
              description: "Conflito: aluno já matriculado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro"
                  }
                }
              }
            },
            403: {
              description: "Acesso negado: apenas alunos podem se matricular",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro"
                  }
                }
              }
            },
            401: {
              description: "Token não fornecido ou inválido",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

