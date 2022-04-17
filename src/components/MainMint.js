import React, { useState } from "react";
import {Box, Button,Flex, Input, Text} from '@chakra-ui/react';


import { ethers, BigNumber} from "ethers";
import abiNFT from '../ABI/abiNFT.json';



const MintNFTAddress = "0xa278Eb97b9Ce20fe469414DE8FEd38B2c2280204"

const MainMint = ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);


    async function handleMint() {
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const Signer = provider.getSigner();
            const contract = new ethers.Contract(
                MintNFTAddress,
                abiNFT.abi,
                Signer
            );
            try{
                const response = await contract.mint(BigNumber.from(mintAmount),{
                    value: ethers.utils.parseEther((0.02* mintAmount).toString()),
                });
                console.log('response', response);

            }catch(err){
                console.log('error', err)
            }
        }
    }

    const handleDecrement=() => {
        if(mintAmount <= 1)return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncriment= () => {
        if(mintAmount >= 3)return;
        setMintAmount(mintAmount + 1);
    };

    return(
        <Flex justify="center" align="center" height='100vh' paddingBottom="150px">
            <Box width='520px'>

            <div>
                <Text
                 fontSize='60px'
                 textShadow='0 5px #000000'
                 >RoboPunk</Text>
                <Text
                
                  fontSize='38px'
                  letterSpacing='-5.5%'
                  fontFamily='VT323'
                  textShadow='0 2px 2px #000000'
                  >
                    It's 2078.
                    Can the RoboPunk NFT save
                    humans from destructive rampant NFT
                    speculation?
                    Mint RoboPunk to find out.
                </Text
                  >

            </div>


                {isConnected ? (
                    <div>
                        <Flex align='center' justify='center'>
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius='8px'
                            boxShadow='0px 2px 2px 1px #0f0f0f'
                            color='white'
                            cursor='pointer'
                            fontFamily='inherit'
                            fontSize='35px'
                            padding='10px'
                            margin='0 15px'
                            onClick={handleDecrement}
                      >-
    
                     </Button>
                            <Input 
                              readOnly
                              fontFamily='inherit'
                              width='100px'
                              height='40px'
                              textAlign='center'
                              paddingLeft='19px'
                              marginTop='10px'
                              type="number"
                              value={mintAmount}
                              />
                            <Button 
                                backgroundColor="#D6517D"
                                borderRadius='8px'
                                boxShadow='0px 2px 2px 1px #0f0f0f'
                                color='white'
                                cursor='pointer'
                                fontFamily='inherit'
                                fontSize='35px'
                                padding='10px'
                                margin='0 15px'
                            onClick={handleIncriment}
                            >+</Button>
                        </Flex>
                        <Button
                           backgroundColor="#D6517D"
                           borderRadius='8px'
                           boxShadow='0px 2px 2px 1px #0f0f0f'
                           color='white'
                           cursor='pointer'
                           fontFamily='inherit'
                           fontSize='35px'
                           padding='10px'
                           margin='0 15px'
                           onClick={handleMint}
                         >MINT NOW</Button
                          >

                    </div>
                ) : (
                    <Text
                        color='#D6517D'
                        fontSize='30px'
                        fontFamily='VT323'
                        marginTop='70px'
                        letterSpacing='-5.5%'
                        textShadow='0 2px 2px #000000'
                    
                    >You must be connected to mint.</Text>
                )}
            </Box>
        </Flex>
    );

};

export default MainMint;