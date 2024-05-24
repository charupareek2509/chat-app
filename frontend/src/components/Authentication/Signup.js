import React, { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
const Signup = () => {

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const navigate = useNavigate()

  const handleClick = () => setShow(!show);
  const postDetails= (pics)=>{
      setLoading(true)
      if(pics === undefined){
        toast({
          title: 'Please select image.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
        return
      }
      if(pics.type === "image/jpeg" || pics.type === "image/jpg" || pics.type === "image/png"){
        const data = new FormData()
        data.append("file", pics)
        data.append("upload_preset", "chat-app")
        data.append("cloud_name", "djdvjbe5c")
        fetch("https://api.cloudinary.com/v1_1/djdvjbe5c/image/upload",{
          method: 'post',
          body: data
        }).then((res) =>res.json())
          .then(data => {
            setPic(data.url.toString())
            console.log("🚀 ~ postDetails ~ data.url.toString():", data.url.toString())
            setLoading(false)
          })
          .catch((err) => {
            console.log("error", err)
            setLoading(false)
          })
      }else{
        toast({
          title: 'Please select image.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
        setLoading(false)
        return
      }
  } 
  const submitHandler=async ()=>{
    setLoading(true)
    if(!name || !email || !password || !confirmPassword){
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
    if(password !== confirmPassword){
      toast({
        title: 'Password do not match.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "top"
      })
      return
    }
    try {
      const config = {
        headers: {
          "content-type": "application/json"
        }
      }
      const {data} =await axios.post("/api/user", 
      {name, password, email, pic},
      config
    )
    toast({
      title: 'Registration is successful.',
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
        title: 'Error Occur.',
        status: 'danger',
        duration: 5000,
        isClosable: true,
        position: "top"
      })
      setLoading(false)
    }
  }

   return (
    <VStack spacing="5px" color={"black"}>
      <FormControl id="firstName" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input type="file" p={1.5} accept ='image/*' 
        onChange={(e)=> postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button 
      colorScheme="blue" 
      width="100%" 
      style={{marginTop: 15}} 
      onClick={submitHandler}
      isLoading={loading}
      >Sign Up</Button>
    </VStack>
  );
};

export default Signup;
