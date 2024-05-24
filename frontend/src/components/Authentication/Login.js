import React, { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const navigate = useNavigate()
  const handleClick = () => setShow(!show);

  const submitHandler=async()=>{
    setLoading(true)
    if(!email || !password){
      toast({
        title: 'Please fill all the fields.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "top"
      })
      setLoading(false)
      return
    }
    try {
      const config = {
        headers: {
          "content-type": "application/json"
        }
      }
      const {data} =await axios.post("/api/user/login", 
      { password, email },
      config
    )
    toast({
      title: 'Login successful.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: "top"
    })
    localStorage.setItem("userInfo", JSON.stringify(data))
    setLoading(false)
    navigate("/chats");
    } catch (error) {
      toast({
        title: 'Incorrect email/password.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "top"
      })
      setLoading(false)
    }
  }
  return (
    <VStack spacing="5px" color={"black"}>
    <FormControl id="email" isRequired>
      <FormLabel>Email</FormLabel>
      <Input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
    </FormControl>
    <FormControl id="password" isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          type={show ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
   
    <Button colorScheme="blue" width="100%" style={{marginTop: 15}} onClick={submitHandler}>Login</Button>
    <Button 
      variant="solid" 
      colorScheme="red"
      width="100%" 
      style={{marginTop: 15}} 
      onClick={() => {
        setEmail('guest@example.com')
        setPassword("123456")
      }}
      isLoading={loading}
    >
      Login Guest USer
    </Button>
  </VStack>
  )
}

export default Login