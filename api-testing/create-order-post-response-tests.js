pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

const response = pm.response.json();

pm.test("Order creation was successful", function () {
    pm.expect(response.success).to.eql(true);
});

pm.test("Response contains order data", function () {
    pm.expect(response.data).to.have.property("order");
});

pm.test("Order has an ID", function () {
    pm.expect(response.data.order.id).to.exist;
});

pm.test("Order status is PENDING", function () {
    pm.expect(response.data.order.status).to.eql("PENDING");
});

pm.test("Order total amount exists", function () {
    pm.expect(response.data.order.total_amount).to.exist;
});

pm.test("Response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.environment.set("orderId", response.data.order.id);

console.log("Created Order ID:", response.data.order.id);
