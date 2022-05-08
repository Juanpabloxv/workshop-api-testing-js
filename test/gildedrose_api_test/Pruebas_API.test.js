const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');
chai.use(require('chai-json-schema'));

const { expect } = require('chai');
const { ItemSchema } = require('../schema/Item.schema');
const { ListItemSchema } = require('../schema/ListItem.schema');

const urlBase = 'http://localhost:8080/api/items';

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

describe('Pruebas API.test', () => {
  let itemId; let
    firstItemQuality;
  before(async () => {
    const query = {
      name: 'CHITOS',
      sellIn: random(1, 50),
      quality: 16,
      type: 'NORMAL'
    };
    const response = await agent.get(`${urlBase}`);
    if (response.body.length > 0) {
      response.body.forEach(async (item) => { await agent.delete(`${urlBase}/${item.id}`); });
    }
    const response2 = await agent.post(`${urlBase}`).send(query);
    firstItemQuality = response2.body.quality;
    itemId = response2.body.id;
  });
  it('Consume GET service with endpoint get item', async () => {
    const response = await agent.get(`${urlBase}/${itemId}`);
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.be.jsonSchema(ItemSchema);
    expect(response.body.id).to.equal(itemId);
  });
  it('Consume GET service with endpoint list items', async () => {
    const response = await agent.get(`${urlBase}`);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.be.jsonSchema(ListItemSchema);
  });

  it('Consume POST service with endpoint create item', async () => {
    const query2 = {
      name: 'CHOCOSO',
      sellIn: random(1, 50),
      quality: 15,
      type: 'NORMAL'
    };
    const response = await agent.post(`${urlBase}`).send(query2);
    expect(response.status).to.equal(statusCode.CREATED);
    expect(response.body).to.be.jsonSchema(ItemSchema);
  });

  it('Consume UPDATE service with endpoint update quality', async () => {
    const response = await agent.post(`${urlBase}/quality`);
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.be.jsonSchema(ListItemSchema);
    expect(response.body[0].quality).to.equal(firstItemQuality - 1);
  });

  it('Consume UPDATE service with endpoint update item', async () => {
    const query = {
      name: 'PAPITAS',
      sellIn: 25,
      quality: random(1, 50),
      type: 'NORMAL'
    };
    const response = await agent.put(`${urlBase}/${itemId}`).send(query);
    expect(response.status).to.equal(statusCode.OK);
  });

  it('Consume DELETE service with endpoint delete item', async () => {
    const response = await agent.delete(`${urlBase}/${itemId}`);
    expect(response.status).to.equal(statusCode.OK);
  });

  after(async () => {
    const response = await agent.get(`${urlBase}`);
    if (response.body.length > 0) {
      response.body.forEach(async (item) => { await agent.delete(`${urlBase}/${item.id}`); });
    }
  });
});
