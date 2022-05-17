import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useRequest from "../hooks/useRequest";
import { connectAppContext } from "../contexts/appContext/appContext";
import { deleteAccessToken, updateAccessToken } from "../contexts/appContext/appActions";

function Login({ dispatch }) {
  const request = useRequest();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    const form = event.target;
    const email = form[0].value;
    const password = form[1].value;

    request
      .post(
        "login",
        {},
        {
          auth: {
            username: email,
            password: password,
          },
        }
      )
      .then(({ data }) => {
        dispatch(updateAccessToken(data.token, data.email, data.type_manager));
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteAccessToken(null));
        alert(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Stack
      flexGrow={1}
      sx={{
        backgroundImage: "url('/BgLogin.jpg')",
        backgroundBlendMode: "multiply",
        backgroundColor: "blue.500",
        backgroundSize: "cover",
      }}
    >
      <Stack justifyContent="center" alignItems="center" height="100vh">
        <Paper elevation={4} sx={{ borderRadius: 4, minWidth: "32rem" }}>
          <Stack px={8} py={8}>
            <Typography variant="h3" color="blue.500" mb={4} textAlign="center">
              ATVSTP - Admin
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack>
                <TextField
                  label="EMAIL"
                  type="email"
                  name="email"
                  variant="standard"
                  sx={{ marginBottom: 2 }}
                  placeholder="email@gmail.com"
                />

                <TextField
                  label="MẬT KHẨU"
                  name="password"
                  variant="standard"
                  type="password"
                  sx={{ marginBottom: 4 }}
                  placeholder="Mật khẩu của bạn"
                />

                <Button disabled={isLoading} type="submit" variant="contained">
                  {isLoading ? "Đang xử lý" : "Đăng nhập"}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}

export default connectAppContext(Login);
