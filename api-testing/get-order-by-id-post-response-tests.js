pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

const response = pm.response.json();

pm.test("Request was successful", function () {
    pm.expect(response.success).to.eql(true);
});

pm.test("Response contains order data", function () {
    pm.expect(response.data).to.exist;
});

pm.test("Correct order ID is returned", function () {
    pm.expect(response.data.id.toString())
        .to.eql(pm.environment.get("orderId").toString());
});

pm.test("Order status exists", function () {
    pm.expect(response.data.status).to.exist;
});

pm.test("Total amount exists", function () {
    pm.expect(response.data.total_amount).to.exist;
});

pm.test("Response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});
