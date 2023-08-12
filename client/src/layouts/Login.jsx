"use client";

import star1 from "../assets/star1.png";
import star2 from "../assets/star2.png";
import musicnotes from "../assets/music-note1.png";
import musicnotes1 from "../assets/music-note1.png";

import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import {useState} from "react";

import Lottie from "lottie-react";
import {MouseParallaxChild, MouseParallaxContainer,} from "react-parallax-mouse";
import bg1 from "../assets/1.json";
import Title from "../components/Title.jsx";
import HStack from "../components/HStack.jsx";

export default function Login() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
            }}
        >
            <MouseParallaxContainer
                containerStyle={{
                    display: "flex",
                    flexDirection: "row",
                    flex: "1",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <div style={{flex: "1", display: "flex", flexDirection: "column"}}>
                        <div
                            style={{
                                position: "relative",
                                marginLeft: "20%",
                                marginTop: "100px",
                                flex: "1",
                            }}
                        >
                            <MouseParallaxChild
                                factorX={0.1}
                                factorY={0.1}
                                style={{
                                    position: "absolute",
                                    top: "100px",
                                    left: 0,
                                    width: "10%",
                                    height: "10%",
                                }}
                            >
                                <img src={star1} alt=""/>
                            </MouseParallaxChild>
                            <MouseParallaxChild
                                factorX={0.2}
                                factorY={0.2}
                                style={{
                                    position: "absolute",
                                    top: "0",
                                    left: "100px",
                                    width: "10%",
                                    height: "10%",
                                }}
                            >
                                <img src={musicnotes1} alt=""/>
                            </MouseParallaxChild>
                            <MouseParallaxChild
                                factorX={0.15}
                                factorY={0.15}
                                style={{
                                    position: "absolute",
                                    top: "100px",
                                    left: "20%",
                                    width: "10%",
                                    height: "10%",
                                }}
                            >
                                <img src={star2} alt=""/>
                            </MouseParallaxChild>
                            <MouseParallaxChild
                                factorX={0.25}
                                factorY={0.25}
                                style={{
                                    position: "absolute",
                                    top: "0",
                                    left: "30%",
                                    width: "10%",
                                    height: "10%",
                                }}
                            >
                                <img src={musicnotes} alt=""/>
                            </MouseParallaxChild>
                        </div>
                        <Lottie animationData={bg1} style={{width: "480px", flex: "1"}}/>
                    </div>
                    <div
                        style={{
                            height: "100%",
                            flex: "1",
                        }}
                    >
                        <LoginForm/>
                    </div>
                </div>
            </MouseParallaxContainer>
        </div>
    );
}

function LoginForm() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [status, setStatus] = useState("");

    async function loginSubmit() {
        const res = await fetch("http://localhost:3000/user/login", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({email: email, pass: pass}),
        });
        const data = await res.json();
        setStatus(data.msg);
    }

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} style={{width: "70%", height: '100%'}}>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow="0 0 30px #5F04A720"
                    p={8}
                >
                    <Stack spacing={4}>
                        <HStack justifyContent='center'>
                            <Title variant='primary'>Signin</Title>
                        </HStack>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                focusBorderColor='#5F04A770'
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                focusBorderColor='#5F04A770'
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{base: "column", sm: "row"}}
                                align={"start"}
                                justify={"space-between"}
                            >
                                <Checkbox colorScheme='primary'>Remember me</Checkbox>
                                <Text color={"primary.400"}>Forgot password?</Text>
                            </Stack>
                            <p style={{textAlign: "center", color: "green", fontSize: 16}}>
                                {status}
                            </p>
                            <Button
                                bg={"primary.400"}
                                color={"white"}
                                _hover={{
                                    bg: "primary.500",
                                }}
                                onClick={loginSubmit}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
