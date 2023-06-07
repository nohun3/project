'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import Copyright from '@/app/Copyright';
import { AppContext } from '@/context/AppContext';
import TransitionAlerts from '@/app/TransitionAlerts';
import {signIn, signOut} from 'next-auth/react'
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Join() {
  
  const {isAlert, setIsAlert, alertMessage, setAlertMessage, alertServerity, setAlertServerity} = React.useContext(AppContext);
  const regexEmail = new RegExp('([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})');
  const regexNickName = new RegExp('([a-z0-9가-힣_\.-]+)');
  const regexPassword = new RegExp('(?=.*[A-Za-z])(?=.*[0-9]){8,}');
  let errorMessage;

  const emailInputRef = React.useRef();
  
  React.useEffect(() => {
    emailInputRef.current.focus();
  },[])

  const verifyInput = (input) => {
    let isValid = true;
    setAlertServerity("info");
    if (!regexEmail.test(input.email)) {
      setIsAlert(true);
      setAlertMessage("이메일 형식이 올바르지 않습니다.");
      isValid = false;
    }
    else if (!regexNickName.test(input.nickName)) {
      setIsAlert(true);
      setAlertMessage("닉네임 형식이 올바르지 않습니다.");
      isValid = false;
    }
    else if (!regexPassword.test(input.password)) {
      setIsAlert(true);
      setAlertMessage("비밀번호는 영문자와 숫자를 조합해야 합니다.");
      isValid = false;
    }
    return isValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let param = {};
    data.forEach(function(value, key){
      param[key] = value;
    });

    if (!verifyInput(param)) return;

    fetch('/api/auth/join', {method: 'POST', body: JSON.stringify(param)})
    .then((r)=>{
      return r.json()
    })
    .then((result)=>{
      setAlertMessage(result.message);
      setAlertServerity("success");
      setIsAlert(true);
    }).catch((error)=>{
      //인터넷문제 등으로 실패시 실행할코드
      throw new Error('서버 연동 오류 발생');
    });
    // console.log(data.entries());
  };

  return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ width:170, height:170 }}>
            <Image
              src="/ssis.jpg"
              width={200}
              height={200}
              alt="한국사회보장정보원"
            />
            </Avatar>
            {/* <Typography component="h6">
              건강보건본부 회원가입
            </Typography> */}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="이메일"
                    name="email"
                    autoComplete="email"
                    inputRef={emailInputRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="nickName"
                    required
                    fullWidth
                    id="nickName"
                    label="닉네임"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="비밀번호"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                가입하기
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/auth/login" variant="body2">
                    로그인
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
          <TransitionAlerts />
        </Container>
      </ThemeProvider>
  );
}