import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "@/hooks";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Material UI
import {
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  InputAdornment,
  Stack,
  Alert,
  IconButton,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Components
import Input from "../components/Input";
import Button from "../components/Button";

// Api
import { userApi } from "@/api";

// Scss
import "./style.scss";

const ForgotPasswordPage = () => {
  const auth = useAuth();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { control, handleSubmit } = useForm({
    reValidateMode: "onSubmit",
    defaultValues: { username: "", password: "" },
  });

  const handleLogin = (user) => {
    (async () => {
      try {
        setLoading(true);

        const email = { email: user.email };
        const response = await userApi.forgotPassword(email);
        
        // Check response status
        if (!response.isSuccess) {
          // Handle error case - show error message from API
          setError(response.message); // Store error message from API
        } else {
          // Handle success case - navigate to home
          navigate("/");
        }

      } catch (error) {
        // Handle unexpected errors
        setError("Có lỗi xảy ra, vui lòng thử lại sau");
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <Box
      className="auth-login-form"
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      noValidate
      mt={1}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Input name="email" control={control} label="Email" />
      <Button onClick={() => setError(false)} loading={loading}>
        Gửi email lấy lại mật khẩu
      </Button>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography className="auth-link-to-register">
          Không có tài khoản? <RouterLink to="/auth/register">Đăng ký</RouterLink>
        </Typography>
        <Typography className="auth-link-to-register">
          Đã có tài khoản? <RouterLink to="/auth/login">Đăng nhập</RouterLink>
        </Typography>
      </Stack>
    </Box>
  );
};

export default ForgotPasswordPage;
