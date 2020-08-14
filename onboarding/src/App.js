import React from 'react';
import './App.css';
import Form from './Components/Form'; 
import styled from 'styled-components'; 

const FormContainer = styled.div`
  width: 75%;
  margin: 2rem auto; 


`

function App() {
  return (
    <FormContainer>
      <h1>Onboarding Form</h1>
      <Form />
    </FormContainer>
  );
}

export default App;
