"use client";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement, InputRightElement,
    Stack,
    Text,
} from "@chakra-ui/react";
import {useState} from "react";
import Title from "../components/Title.jsx";
import HStack from "../components/HStack.jsx";
import Gap from "../components/Gap.jsx";
import Icon from "../components/Icon.jsx"
import Card from "../components/Card.jsx";
import {motion} from "framer-motion";

// <Lottie animationData={bg1} style={{width: "480px", flex: "1"}}/>
//
// function CircleDiv({top, left, right, bottom, size = '20vw', bg, children}) {
//     return <div style={{
//         position: "absolute",
//         top: top,
//         left: left,
//         right: right,
//         bottom: bottom,
//         width: size,
//         height: size,
//         borderRadius: '50%',
//         background: bg + 'e0',
//         boxShadow: '0 0 80px 30px ' + bg + 'a0',
//     }}>{children}</div>;
// }
//
// export default function Login() {
//     return (<MouseParallaxContainer containerStyle={{background: '#19282b'}}>
//         <MouseParallaxChild
//             factorX={0.05}
//             factorY={0.05}
//             style={{}}>
//             <CircleDiv top='-15vw' left='-10vw' bg="#5425B8" size='40vw'></CircleDiv>
//         </MouseParallaxChild>
//         <MouseParallaxChild
//             factorX={0.05}
//             factorY={0.05}
//             style={{}}>
//             <CircleDiv top='-20vw' right='-20vw' bg="#CA3372" size='50vw'></CircleDiv>
//         </MouseParallaxChild>
//         <MouseParallaxChild
//             factorX={0.21}
//             factorY={0.22}
//             style={{}}>
//             <CircleDiv bottom='-85vw' right='-15vw' bg="#27A2A2" size='60vw'></CircleDiv>
//         </MouseParallaxChild>
//         <MouseParallaxChild
//             factorX={0.21}
//             factorY={0.22}
//             style={{}}>
//             <CircleDiv bottom='-85vw' left='-22vw' bg="#CE7001" size='65vw'></CircleDiv>
//         </MouseParallaxChild>
//         <LoginForm/>
//     </MouseParallaxContainer>);
// }
//
// function LoginForm() {
//     const [email, setEmail] = useState("");
//     const [pass, setPass] = useState("");
//     const [status, setStatus] = useState("");
//
//     async function loginSubmit() {
//         const res = await fetch("http://localhost:3000/user/login", {
//             headers: {"Content-Type": "application/json"},
//             method: "POST",
//             body: JSON.stringify({email: email, pass: pass}),
//         });
//         const data = await res.json();
//         setStatus(data.msg);
//     }
//
//     return (
//         <Flex
//             minH={"100vh"}
//             align={"center"}
//             justify={"center"}
//             style={{zIndex: '5'}}
//         >
//             <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}
//                    style={{width: "70%", minWidth: 'max-content', height: '100%', zIndex: '5'}}>
//                 <Box
//                     rounded={"lg"}
//                     bg={useColorModeValue("#fffffff0", "primary.700")}
//                     boxShadow="0 0 30px #5F04A720"
//                     p={8}
//                 >
//                     <Stack spacing={4}>
//                         <HStack justifyContent='center'>
//                             <Title variant='primary'>Login</Title>
//                         </HStack>
//                         <FormControl id="email">
//                             <FormLabel>Email address</FormLabel>
//                             <Input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 focusBorderColor='#5F04A770'
//                             />
//                         </FormControl>
//                         <FormControl id="password">
//                             <FormLabel>Password</FormLabel>
//                             <Input
//                                 type="password"
//                                 value={pass}
//                                 onChange={(e) => setPass(e.target.value)}
//                                 focusBorderColor='#5F04A770'
//                             />
//                         </FormControl>
//                         <Stack spacing={10}>
//                             <Stack
//                                 direction={{base: "column", sm: "row"}}
//                                 align={"start"}
//                                 justify={"space-between"}
//                                 style={{flexWrap: 'wrap'}}
//                             >
//                                 <Checkbox colorScheme='primary'>Remember me</Checkbox>
//                                 <Text color={"primary.400"}>Forgot password?</Text>
//                             </Stack>
//                             <p style={{textAlign: "center", color: "green", fontSize: 16}}>
//                                 {status}
//                             </p>
//                             <Button
//                                 bg={"primary.400"}
//                                 color={"white"}
//                                 _hover={{
//                                     bg: "primary.500",
//                                 }}
//                                 onClick={loginSubmit}
//                             >
//                                 Sign in
//                             </Button>
//                         </Stack>
//                         <HStack justifyContent='center' alignItems='center'>
//                             <Text>Don't have an account?</Text>
//                             <a href='/signup' style={{
//                                 color: '#4c0383',
//                                 padding: '5px'
//                             }}>Create Account</a>
//                         </HStack>
//                     </Stack>
//                 </Box>
//             </Stack>
//         </Flex>
//     );
// }

export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [status, setStatus] = useState("");
    const [passMask, setPassMask] = useState("");
    const [showPass, setShowPass] = useState(false);

    async function loginSubmit() {
        const res = await fetch("http://localhost:3000/user/login", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({email: email, pass: pass}),
        });
        const data = await res.json();
        setStatus(data.msg);
    }

    const handleInput = (event) => {
        const inputElement = event.target;
        const inputValue = inputElement.value;
        let maskChar = '♪';
        const maskedValue = maskChar.repeat(inputValue.length);
        setPassMask(maskedValue)
        let lc = inputValue.length > 0 ? inputValue.charAt(inputValue.length - 1) : '';

        if (lc === maskChar)
            setPass(pass.substring(0, pass.length - 1))
        else if (inputValue.length < 1)
            setPass('')
        else
            setPass(pass + lc)
    };

    return (
        <Flex minH={"100vh"} justify={'center'} align={"center"} background={"#EEF2FD"}>
            <Card
                pad={'30px 50px'}
                width={'60%'}
                minWidth="fit-content"
                maxWidth="500px"
            >
                <Stack spacing={4}>
                    <HStack justifyContent="center" mar={'0 0 25px 0'}>
                        <Title variant="primary" size={'26px'}>Login</Title>
                    </HStack>
                    <FormControl id="email">
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' style={{
                                top: "50%",
                                left: '10px',
                                transform: "translateY(-50%)"
                            }}>
                                <Icon src={'/mail.svg'} size={'30px'} style={{padding: '3px'}}/>
                            </InputLeftElement>
                            <Input
                                type="email"
                                value={email}
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                                focusBorderColor="#0000"
                                borderColor="#0000"
                                borderRadius={'50px'}
                                style={{
                                    background: "#5F04A70a",
                                    padding: "25px 25px 25px 50px",
                                }}
                            />
                        </InputGroup>
                    </FormControl>
                    <Gap/>
                    <FormControl id="password">
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' style={{
                                top: "50%",
                                left: '10px',
                                transform: "translateY(-50%)"
                            }}>
                                <Icon src={'/lock.svg'} size={'30px'}/>
                            </InputLeftElement>
                            <Input
                                // type="password"
                                value={showPass ? pass : passMask}
                                placeholder="Password"
                                // onChange={(e) => setPassMask(e.target.value)}
                                focusBorderColor="#0000"
                                borderColor="#0000"
                                borderRadius={'50px'}
                                style={{
                                    background: "#5F04A70a",
                                    padding: "25px 25px 25px 50px",
                                }}
                                onInput={handleInput}
                            />
                        </InputGroup>
                    </FormControl>
                    <Stack spacing={10}>
                        <Checkbox style={{
                            marginLeft: '10px'
                        }} colorScheme="primary" checked={showPass} onChange={() => setShowPass(!showPass)}>Show
                            Password</Checkbox>
                        <Stack
                            direction={{base: "column", sm: "row"}}
                            align={"start"}
                            justify={"space-between"}
                        >
                            <Checkbox colorScheme="primary">Remember me</Checkbox>
                            <Text color={"primary.400"}>Forgot password?</Text>
                        </Stack>
                        <p style={{textAlign: "center", color: "green", fontSize: 16}}>
                            {status}
                        </p>
                        <motion.div
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                            style={{
                                width: '100%',
                                textAlign: 'center'
                            }}>
                            <Button
                                bg={"#7901d7"}
                                color={"white"}
                                _hover={{
                                    bg: "primary.500",
                                }}
                                onClick={loginSubmit}
                                style={{
                                    boxShadow: "0 0 50px 20px #5F04A740",
                                    padding: "25px",
                                    width: '50%',
                                    borderRadius: '50px'
                                }}
                            >Login </Button>
                        </motion.div>
                    </Stack>
                    <Stack justifyContent='center' alignItems='center' style={{marginTop: '30px'}}>
                        <Text>Don't have an account?</Text>
                        <a href='/signup' style={{
                            color: '#4c0383',
                            padding: '5px'
                        }}>Create Account</a>
                    </Stack>
                </Stack>
            </Card>
        </Flex>
    );
}
