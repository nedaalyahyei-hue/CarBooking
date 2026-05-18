import { Button, Card, CardBody, FormGroup, Label } from "reactstrap";
import { FaCarSide } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterValidation } from "../validations/RegisterValidation";
import { addUser } from "../features/UserSlice";

const Register = () => {
  const dispatch = useDispatch();
  const message = useSelector(
    (state) => state.user.message
  );

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(RegisterValidation)
  });

  const onSubmit = () => {
    const userData = {
      fullname,
      email,
      password,
      phone
    };
    dispatch(addUser(userData));
  };

  return (
    <div className="registerPage">
      <Card className="registerBox">
        <CardBody>
          <div className="loginLogo">
            <FaCarSide className="loginIcon" />
            <h1>CarBook</h1>
          </div>
          <h2>Sign Up</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="loginForm"
          >
            <FormGroup>
              <Label>Name</Label>
              <input type="text" placeholder="full Name" className="form-control"
                {...register("name", {
                  onChange: (e) =>
                    setFullname(e.target.value)
                })}
              />

              <p style={{ color: "red" }}>
                {errors.name?.message}
              </p>

            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <input type="email" placeholder="Enter Email" className="form-control"
                {...register("email", {
                  onChange: (e) =>
                    setEmail(e.target.value)
                })}
              />

              <p style={{ color: "red" }}>
                {errors.email?.message}
              </p>

            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <input type="password" placeholder="Create Password" className="form-control"
                {...register("password", {
                  onChange: (e) =>
                    setPassword(e.target.value)
                })}
              />

              <p style={{ color: "red" }}> {errors.password?.message} </p>

            </FormGroup>

            <FormGroup>
              <Label>Confirm Password</Label>

              <input type="password"
                placeholder="Confirm Password"
                className="form-control"

                {...register("confirmPassword")}
              />

              <p style={{ color: "red" }}>
                {errors.confirmPassword?.message}
              </p>
            </FormGroup>

            <FormGroup>
              <Label>Phone</Label>
              <input
                type="text"
                placeholder="Enter Phone"
                className="form-control"

                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

            </FormGroup>

            <Button color="primary" type="submit"> Register </Button>
            <h5 style={{ marginTop: "15px" }}>
              {message}
            </h5>

            <p style={{ marginTop: "15px" }}>
              Already have an account?

              <a href="/login">
                {" "}Login
              </a>
            </p>

          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Register;