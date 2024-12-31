import authRoute from './authRoute';
import employeeRoute from './employeeRoute';

const initRoutes = (app) => {
    app.use("/api/auth", authRoute);
    app.use("/api/employee",employeeRoute);

    return app.use('/', (req, res) => {
        res.status(200).json({ message: "Hello" });
    })
}

export default initRoutes;