import React from "react";
/* eslint-disable */ 
import {Box, Button,Flex, Image, Link, Spacer} from '@chakra-ui/react';
import Facebook from '../assets/social-media-icons/facebook_32x32.png';
import twitter from '../assets/social-media-icons/twitter_32x32.png';
import email from '../assets/social-media-icons/email_32x32.png';


const Navbar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAcount() {
        if(window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return(
        <Flex justify="space-between" align="center" padding="30px">
            {/* left side - social Media Icons */}
            <Flex justify="space-around" width="40%" padding="0 75px" >
                <Link href="https://www.facebook.com">
                    <Image src={Facebook} boxSize="42px" margin="0 15px"/>
                </Link> 

                <Link href="https://www.twitter.com">
                    <Image src={twitter} boxSize="42px" margin="0 15px"/>
                </Link> 

                <Link href="https://email.google.com">
                    <Image src={email} boxSize="42px" margin="0 15px"/>
                </Link> 
            </Flex>
           


             

            <Flex justify='space-around' align='center' width='40%' padding='30px'>
                <Box margin='0 15px'>About</Box>
                <Spacer/>
                <Box margin='0 15px'>Mint</Box>
                <Spacer/>
                <Box margin='0 15px'>Team</Box>
                <Spacer/>

                {isConnected ? (
                <Box
                backgroundColor="#D6517D"
                borderRadius = '8px'
                boxShadow='0px 2px 2px 1px #0f0f0f'
                color='white'
                cursor='pointer'
                fontFamily='inherit'
                fontSize='35px'
                padding='10px'
                margin='0 15px'
                >connected</Box>
            ):(
                <Button
                    backgroundColor="#D6517D"
                    borderRadius = '8px'
                    boxShadow='0px 2px 2px 1px #0f0f0f'
                    color='white'
                    cursor='pointer'
                    fontFamily='inherit'
                    fontSize='35px'
                    padding='10px'
                    margin='0 15px'
                    onClick={connectAcount}>
                     Connect
                     </Button>
            )}

            </Flex>

            
            


        </Flex>
    );
};

export default Navbar;