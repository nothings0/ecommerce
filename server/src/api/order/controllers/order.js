"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { customer_id, products } = ctx.request.body;
    const order = await strapi.service("api::order.order").create({
      data: {
        users: customer_id,
        order_date: new Date(),
        publishedAt: new Date(),
        status: 1,
      },
    });
    for (const product of products) {
      await strapi.service("api::order-detail.order-detail").create({
        data: {
          quantity: product.quantity,
          product: product.product.id,
          order: order.id,
          publishedAt: new Date(),
        },
      });
      await strapi.service("api::product.product").update(product.product.id, {
        data: {
          quantity: product.product.attributes.quantity - product.quantity,
        },
      });
    }
    const result = await this.sanitizeOutput(order, ctx);

    return this.transformResponse(result);
  },
  async update(ctx) {
    const orderId = ctx.params.id;
    const { state, order } = ctx.request.body;
    const res = await strapi.service("api::order.order").update(orderId, {
      data: {
        status: state,
      },
    });
    for (let product of order) {
      await strapi
        .service("api::product.product")
        .update(product.attributes.product.data.id, {
          data: {
            quantity:
              product.attributes.product.data.attributes.quantity +
              product.attributes.quantity,
          },
        });
    }
    const result = await this.sanitizeOutput(res, ctx);

    return this.transformResponse(result);
  },
}));
