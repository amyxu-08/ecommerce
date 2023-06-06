import React from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
const HomePage = styled.div`
  position: relative;
`;

const ClothesImage = styled.img`
  width: 100%;
`;

const Slogan = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 4.5rem;
  font-weight: 900;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const StyledButton = styled(Button)`
  margin-right: 1rem;
`;

const Home = () => {
  return (
    <HomePage>
      <ClothesImage
        src="https://www.productphoto.com/wp-content/uploads/2021/06/Things-to-consider-while-taking-Clothing-Product-Photography-on-White-Background.jpg"
        alt="Clothes"
      />
      <Slogan>Expect More, Pay Less</Slogan>
      <ButtonContainer>
        <StyledButton variant="contained" color="primary">
          Buy from Us
        </StyledButton>
        <StyledButton variant="contained" color="secondary">
          Buy from You
        </StyledButton>
      </ButtonContainer>
    </HomePage>
  );
};

export default Home;
