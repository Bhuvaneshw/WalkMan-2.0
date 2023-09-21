"use client";
import {Box, Button, Flex, Stack,} from "@chakra-ui/react";
import React from "react";
import Title from "../components/Title.jsx";
import Card from "../components/Card.jsx";
import Spline from "@splinetool/react-spline";
import {useNavigate} from "react-router-dom";
import {isNotMobileDevice} from "../components/util.js";
import Text from "../components/Text.jsx";
import Gap from "../components/Gap.jsx";
import HStack from "../components/HStack.jsx";

export default function LandingPage() {
    let navigate = useNavigate();

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            background={"#EEF2FD"}>
            <Box style={{position: "absolute"}}>
                {isNotMobileDevice() && <Spline
                    scene="https://prod.spline.design/c34Qj9Va910fK4uP/scene.splinecode"
                    style={{width: "100vw", height: "100vh", objectFit: "cover"}}
                />}
            </Box>
            <Box
                width={"100%"}
                margin={"20px"}
                minWidth="280px"
                maxWidth="700px"
                style={{zIndex: 5, position: "relative"}}>
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
                        background: "#fffa",
                        filter: "blur(2px)",
                    }}/>
                <Stack
                    spacing={0}
                    style={{
                        padding: "80px 50px",
                        zIndex: 6,
                        alignItems: "center"
                    }} mar={"0 0 25px 0"}>
                    <img src={'/icon.svg'} alt={"walkman"} style={{
                        // position: 'absolute',
                        // top: '20px',
                        // left: '20px',
                        width: '80px',
                        height: '80px'
                    }}/>
                    <Stack spacing={0}>
                        <Title size={"35px"}>
                            Welcome to
                        </Title>
                        <Title variant={"primary"} size={"50px"} style={{
                            transform: 'translateY(-10px)',
                            textAlign: 'center'
                        }}>
                            Walkman 2.0
                        </Title>
                    </Stack>
                    <Gap height={'50px'}/>
                    <Text variant={'black40'}>yegfcyag ewuyf gweyfgysdfeyey y ygfygdsyf eyd ey feyf eygfeyf efyegfef
                        eyfg eyfehfg ygf
                        dhfvey </Text>
                    <Gap height={'50px'}/>
                    <HStack>
                        <Button
                            bg={"#7901d7"}
                            color={"white"}
                            _hover={{
                                bg: "primary.500",
                            }}
                            style={{
                                boxShadow: "0 0 50px 20px #5F04A740",
                                padding: "25px",
                                width: "50%",
                                borderRadius: "50px",
                                marginRight: '30px',
                            }}
                            onClick={() => {
                                navigate('/login')
                            }}>
                            Login
                        </Button>
                        <Gap width={'20px'}/>
                        <Button
                            bg={"#7901d7"}
                            color={"white"}
                            _hover={{
                                bg: "primary.500",
                            }}
                            style={{
                                boxShadow: "0 0 50px 20px #5F04A740",
                                padding: "25px",
                                width: "50%",
                                borderRadius: "50px",
                            }}
                            onClick={() => {
                                navigate('/signup')
                            }}>
                            Signup
                        </Button>
                    </HStack>
                </Stack>
            </Box>
        </Flex>
    );
}
