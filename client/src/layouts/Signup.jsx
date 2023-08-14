"use client";

import {Box, Button, Flex, FormControl, FormLabel, Input, Stack, Text, useColorModeValue,} from "@chakra-ui/react";
import {useState} from "react";
import {MouseParallaxChild, MouseParallaxContainer} from "react-parallax-mouse";
import HStack from "../components/HStack.jsx";
import Title from "../components/Title.jsx";

function CircleDiv({top, left, right, bottom, size = '20vw', bg, children}) {
    return <div style={{
        position: "absolute",
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg + 'e0',
        boxShadow: '0 0 80px 30px ' + bg + 'a0'
    }}>{children}</div>;
}

export default function Signup() {
    return (<MouseParallaxContainer containerStyle={{background: '#19282b'}}>
        <MouseParallaxChild
            factorX={0.05}
            factorY={0.05}
            style={{}}>
            <CircleDiv top='-15vw' left='-10vw' bg="#5425B8" size='40vw'></CircleDiv>
        </MouseParallaxChild>
        <MouseParallaxChild
            factorX={0.05}
            factorY={0.05}
            style={{}}>
            <CircleDiv top='-20vw' right='-20vw' bg="#CA3372" size='50vw'></CircleDiv>
        </MouseParallaxChild>
        <MouseParallaxChild
            factorX={0.21}
            factorY={0.22}
            style={{}}>
            <CircleDiv bottom='-85vw' right='-15vw' bg="#27A2A2" size='60vw'></CircleDiv>
        </MouseParallaxChild>
        <MouseParallaxChild
            factorX={0.21}
            factorY={0.22}
            style={{}}>
            <CircleDiv bottom='-85vw' left='-22vw' bg="#CE7001" size='65vw'></CircleDiv>
        </MouseParallaxChild>
        <SignupForm/>
    </MouseParallaxContainer>);
}

function SignupForm() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");

    async function SignupSubmit() {
        const res = await fetch("http://localhost:3000/user/Signup", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({email: email, pass: pass, name: name}),
        });
        const data = await res.json();
        setStatus(data.msg);
    }

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            style={{zIndex: '5'}}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}
                   style={{width: "70%", minWidth: 'max-content', height: '100%', zIndex: '5'}}>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("#fffffff0", "primary.700")}
                    boxShadow={"0 0 30px #5F04A720"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <HStack justifyContent='center'>
                            <Title variant='primary'>Signup</Title>
                        </HStack>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="string"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                focusBorderColor='#5F04A770'
                            />
                        </FormControl>
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
                            <p style={{textAlign: "center", color: "green", fontSize: 16}}>
                                {status}
                            </p>
                            <Button
                                bg={"primary.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={SignupSubmit}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <HStack justifyContent='center' alignItems='center'>
                            <Text>Already have an account?</Text>
                            <a href='/login' style={{
                                color: '#4c0383',
                                padding: '5px'
                            }}>Login</a>
                        </HStack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
