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

const LoginPage = () => {
  const auth = useAuth();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { control, handleSubmit } = useForm({
    reValidateMode: "onSubmit",
    defaultValues: { username: "", password: "" },
    // resolver: yupResolver(loginSchema),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = (user) => {
    (async () => {
      try {
        setLoading(true);

        user = { email: user.username, password: user.password };
        user = await userApi.login(user);
        auth.login(user);
        // dispatch(actUpdateRoleBase(user.maLoaiNguoiDung));
        navigate(-1);
      } catch (error) {
        setError(true);
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
          Đăng nhập không thành công
        </Alert>
      )}
      <Input name="username" control={control} label="Tài khoản" />
      <Input
        name="password"
        control={control}
        label="Mật khẩu"
        type={showPassword ? "password" : "text"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Ghi nhớ đăng nhập"
        className="remember-login"
      />
      <Button onClick={() => setError(false)} loading={loading}>
        Đăng nhập
      </Button>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RouterLink to="/auth/forgot-password" variant="body2" className="auth-link-to-register">
          Quên mật khẩu?
        </RouterLink>
        <Typography className="auth-link-to-register">
          Không có tài khoản? <RouterLink to="/auth/register">Đăng ký</RouterLink>
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginPage;
