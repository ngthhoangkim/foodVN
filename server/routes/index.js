import authRoute from './authRoute';
import employeeRoute from './employeeRoute';
import categoryRoute from './categoryRoute';
import foodRoute from './foodRoute';
import tableRoute from './tableRoute';
import customerRoute from './customerRoute'
import orderRoute from './orderRoute'

const initRoutes = (app) => {
    app.use("/api/auth", authRoute);
    app.use("/api/employee",employeeRoute);
    app.use("/api/category",categoryRoute);
    app.use("/api/food",foodRoute);
    app.use("/api/table",tableRoute);
    app.use("/api/customer",customerRoute);
    app.use("/api/order",orderRoute);

    return app.use('/', (req, res) => {
        res.status(200).json({ message: "Hello" });
    })
}

export default initRoutes;