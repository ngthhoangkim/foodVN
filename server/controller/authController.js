import * as authServices from "../services/auth.js";
// register
export const register = async (req, res) => {
  const { email, password, name, phone, birthday } = req.body
  try {
    if (!email || !password || !name || !phone || !birthday) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" })
    }
    const response = await authServices.registerService(req.body)
    return res.status(201).json(response)

  } catch (error) {
    res.status(500).json({ ["Fail at auth:"]: error.message });
  }
};
// login for customer
export const login = async (req, res) => {
  const { password,phone } = req.body
  try {
    if ( !password || !phone ) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" })
    }
    const response = await authServices.loginService(req.body)
    return res.status(201).json(response)

  } catch (error) {
    res.status(500).json({ ["Fail at auth:"]: error.message });
  }
};
//login for employee
export const loginEmployee = async (req, res) => {
  const { password,phone } = req.body
  try {
    if ( !password || !phone ) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" })
    }
    const response = await authServices.loginEmployeeService(req.body)
    return res.status(201).json(response)

  } catch (error) {
    res.status(500).json({ ["Fail at auth:"]: error.message });
  }
};
