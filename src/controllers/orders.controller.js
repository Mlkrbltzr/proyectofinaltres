import OrdersDao from "../DAO/classes/orders.dao.js";

const ordersService = new OrdersDao();

export const getOrders = async (req, res) => {
    let result = await ordersService.getOrders();
    res.send({ status: "success", result: result });
};

export const getOrdersById = async (req, res) => {
    const { oid } = req.params;
    let order = await ordersService.getOrderById(oid);
    res.send({ status: "success", result: order });
};

export const createOrder = async (req, res) => {
    const { user, business, products } = req.body;

    // Assuming you have functions like getUserById and getBusinessById in your OrdersDao
    const resultUser = await ordersService.getUserById(user);
    const resultBusiness = await ordersService.getBusinessById(business);

    let actualOrders = resultBusiness.products.filter((product) => products.includes(product.id));
    let sum = actualOrders.reduce((acc, prev) => {
        acc += prev.price;
        return acc;
    }, 0);

    let orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);

    let order = {
        number: orderNumber,
        business,
        user,
        status: "pendiente",
        products: actualOrders.map((product) => product.id),
        totalPrice: sum,
    };

    let orderResult = await ordersService.createOrder(order);
    resultUser.orders.push(orderResult._id);
    await ordersService.updateUser(user, resultUser);
    res.send({ status: "success", result: orderResult });
};

export const resolveOrder = async (req, res) => {
    const { resolve } = req.query;
    let order = await ordersService.getOrderById(req.params.oid);
    order.status = resolve;
    await ordersService.resolveOrder(order._id, order);
    res.send({ status: "success", result: "orden resuelta" });
};