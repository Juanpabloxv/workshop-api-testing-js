const ListItemSchema = {
  type: 'array',
  items: [
    {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        sellIn: {
          type: 'integer'
        },
        quality: {
          type: 'integer'
        },
        type: {
          type: 'string'
        },
        id: {
          type: 'integer'
        }
      },
      required: [
        'name',
        'sellIn',
        'quality',
        'type',
        'id'
      ]
    }
  ]
};
exports.ListItemSchema = ListItemSchema;
