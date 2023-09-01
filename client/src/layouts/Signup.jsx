"use client";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import HStack from "../components/HStack.jsx";
import Title from "../components/Title.jsx";
import Spline from "@splinetool/react-spline";
import Card from "../components/Card.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Icons from "../components/Icons.js";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [passMask, setPassMask] = useState("");
  const [showPass, setShowPass] = useState(false);
  let navigate = useNavigate();

  async function SignupSubmit() {
    const res = await fetch(import.meta.env.VITE_URL + ":3000/user/Signup", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email: email, pass: pass, name: name }),
    });
    const data = await res.json();
    setStatus(data.msg);
  }

  const handleInput = (event) => {
    const inputElement = event.target;
    const inputValue = inputElement.value;
    let maskChar = "♪";
    const maskedValue = maskChar.repeat(inputValue.length);
    setPassMask(maskedValue);
    let lc =
      inputValue.length > 0 ? inputValue.charAt(inputValue.length - 1) : "";

    if (lc === maskChar) setPass(pass.substring(0, pass.length - 1));
    else if (inputValue.length < 1) setPass("");
    else setPass(pass + lc);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      background={"#EEF2FD"}
    >
      <Box style={{ position: "absolute" }}>
        <Spline
          scene="https://prod.spline.design/fjsaLQFdcaxFF4lp/scene.splinecode"
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
        />
      </Box>
      <Box
        width={"60%"}
        minWidth="fit-content"
        maxWidth="500px"
        style={{ zIndex: 5, position: "relative" }}
      >
        <Card
          pad={"30px 50px"}
          width={"100%"}
          height={"100%"}
          minWidth="fit-content"
          mar=""
          bg=""
          style={{
            left: 0,
            zIndex: -1,
            position: "absolute",
            background: "#fffd",
            filter: "blur(2px)",
          }}
        />
        <Stack
          spacing={4}
          style={{
            padding: "30px 50px",
            zIndex: 6,
          }}
        >
          <HStack justifyContent="center" mar={"0 0 25px 0"}>
            <Title variant="primary" size={"26px"}>
              Signup
            </Title>
          </HStack>
          <FormControl id="name">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                style={{
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                }}
              >
                <Icons.USER />
              </InputLeftElement>
              <Input
                type="string"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                focusBorderColor="#0000"
                borderColor="#0000"
                borderRadius={"50px"}
                style={{
                  background: "#5F04A70a",
                  padding: "25px 25px 25px 50px",
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="email">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                style={{
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                }}
              >
                <Icons.MAIL />
              </InputLeftElement>
              <Input
                type="email"
                value={email}
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                focusBorderColor="#0000"
                borderColor="#0000"
                borderRadius={"50px"}
                style={{
                  background: "#5F04A70a",
                  padding: "25px 25px 25px 50px",
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="password">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                style={{
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                }}
              >
                <Icons.LOCK />
              </InputLeftElement>
              <Input
                // type="password"
                value={showPass ? pass : passMask}
                placeholder="Password"
                // onChange={(e) => setPassMask(e.target.value)}
                focusBorderColor="#0000"
                borderColor="#0000"
                borderRadius={"50px"}
                style={{
                  background: "#5F04A70a",
                  padding: "25px 25px 25px 50px",
                }}
                onInput={handleInput}
              />
            </InputGroup>
          </FormControl>
          <Stack spacing={10}>
            <Checkbox
              style={{
                marginLeft: "10px",
              }}
              colorScheme="primary"
              checked={showPass}
              onChange={() => setShowPass(!showPass)}
            >
              Show Password
            </Checkbox>
            <p style={{ textAlign: "center", color: "green", fontSize: 16 }}>
              {status}
            </p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              <Button
                bg={"#7901d7"}
                color={"white"}
                _hover={{
                  bg: "primary.500",
                }}
                onClick={SignupSubmit}
                style={{
                  boxShadow: "0 0 50px 20px #5F04A740",
                  padding: "25px",
                  width: "50%",
                  borderRadius: "50px",
                }}
              >
                Sign up
              </Button>
            </motion.div>
          </Stack>
          <Stack
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "30px" }}
          >
            <Text>Already have an account?</Text>
            <p
              style={{
                color: "#4c0383",
                padding: "5px",
              }}
              onClick={() => navigate("/login")}
            >
              Login to Account
            </p>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
