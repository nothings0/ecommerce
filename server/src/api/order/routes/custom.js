module.exports = {
  routes: [
    {
      method: "POST",
      path: "/create-order",
      handler: "order.create",
    },
    {
      method: "PUT",
      path: "/update-order",
      handler: "order.update",
    },
  ],
};
