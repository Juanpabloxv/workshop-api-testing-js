const listPublicEventsSchema = {
  type: 'array',
  items: [
    {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        actor: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            login: {
              type: 'string'
            },
            display_login: {
              type: 'string'
            },
            gravatar_id: {
              type: 'string'
            },
            url: {
              type: 'string'
            },
            avatar_url: {
              type: 'string'
            }
          },
          required: [
            'id',
            'login',
            'display_login',
            'gravatar_id',
            'url',
            'avatar_url'
          ]
        },
        repo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            name: {
              type: 'string'
            },
            url: {
              type: 'string'
            }
          },
          required: [
            'id',
            'name',
            'url'
          ]
        },
        payload: {
          type: 'object',
          properties: {
            push_id: {
              type: 'integer'
            },
            size: {
              type: 'integer'
            },
            distinct_size: {
              type: 'integer'
            },
            ref: {
              type: 'string'
            },
            head: {
              type: 'string'
            },
            before: {
              type: 'string'
            },
            commits: {
              type: 'array',
              items: [
                {
                  type: 'object',
                  properties: {
                    sha: {
                      type: 'string'
                    },
                    author: {
                      type: 'object',
                      properties: {
                        email: {
                          type: 'string'
                        },
                        name: {
                          type: 'string'
                        }
                      },
                      required: [
                        'email',
                        'name'
                      ]
                    },
                    message: {
                      type: 'string'
                    },
                    distinct: {
                      type: 'boolean'
                    },
                    url: {
                      type: 'string'
                    }
                  },
                  required: [
                    'sha',
                    'author',
                    'message',
                    'distinct',
                    'url'
                  ]
                }
              ]
            }
          },
          required: [
            'push_id',
            'size',
            'distinct_size',
            'ref',
            'head',
            'before',
            'commits'
          ]
        },
        public: {
          type: 'boolean'
        },
        created_at: {
          type: 'string'
        }
      },
      required: [
        'id',
        'type',
        'actor',
        'repo',
        'payload',
        'public',
        'created_at'
      ]
    }
  ]
};

exports.listPublicEventsSchema = listPublicEventsSchema;
