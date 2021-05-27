const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async createMe(ctx) {
    let entity;

    const { id } = ctx.state.user;

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);

      data.user = id;

      entity = await strapi.services.product.create(data, { files });
    } else {
      ctx.request.body.user = id;
      entity = await strapi.services.product.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.product });
  },

  async findMe(ctx) {
    let entities;
    const { id } = ctx.state.user;
    if (ctx.query._q) {
      entities = await strapi.services.product.search({ user: id });
    } else {
      entities = await strapi.services.product.find({ user: id });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.product })
    );
  },
};
