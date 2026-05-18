import { Button, FormGroup, Label } from "reactstrap";
import { FaCarSide } from "react-icons/fa";
import { LoginValidation } from "../validations/LoginValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const message = useSelector((state) => state.user.message);
  const isSuccess = useSelector((state) => state.user.isSuccess);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(LoginValidation)
  });

  const handleSubmit = () => {
    const udata = { email, password };
    dispatch(login(udata));
  }

  useEffect(() => {
    if (message == "success" && isSuccess)
      navigate("/home");
  }, [message, isSuccess]);

  return (
    <div className="loginPage">
      <div className="loginBox">
        <div className="loginLogo">
          <FaCarSide className="loginIcon" />
          <h1>CarBook</h1>
        </div>
        <h2>Login</h2>
        <form className="loginForm">
          <FormGroup>
            <h5 style={{ color: "red" }}>
              {message}
            </h5>
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="form-control"

              {...register("email", {
                onChange: (e) => setEmail(e.target.value)
              })}
            />

            <p style={{ color: "red" }}>
              {errors.email?.message}
            </p>
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <input type="password"
              placeholder="Enter Your Password"
              className="form-control"

              {...register("password", {
                onChange: (e) => setPassword(e.target.value)
              })}
            />

            <p style={{ color: "red" }}>
              {errors.password?.message}
            </p>
          </FormGroup>

          <FormGroup>
            <Button color="primary" onClick={submitForm(handleSubmit)}> Login</Button>
          </FormGroup>
        </form>

        <p>
          Don’t have an account?{" "}
          <Link to="/register">Sign Up</Link>
        </p>

      </div>
    </div>
  );
};
export default Login;