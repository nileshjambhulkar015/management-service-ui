import React from 'react';
import styled from 'styled-components';


const AlertContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Overlay background */
  z-index: 1000;
`;

const Alert = styled.div`
  background-color: ${props => (props.type === 'error' ? '#d8b9f8' : '#3498DB')};
  color: white;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size:2.0rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: auto;
`;

const ButtonGroup = styled.div`
  margin-top: 15px;
  display: flex;
  gap:20px;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  background-color: ${props => (props.isCancel ? '#d8b9f8' : '#d8b9f8')};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => (props.isCancel ? '#ff7875' : '#73d13d')};
  }
`;

const AlertboxComponent = ({ type, message, onClose, onOk, isCancleAvailable = true }) => {
    return (
        <AlertContainer>
            <Alert type={type}>
                {message}
                <ButtonGroup>
                    <ActionButton onClick={onOk}>OK</ActionButton>
                    {isCancleAvailable && (
                        <ActionButton onClick={onClose}>Close</ActionButton>
                    )}


                </ButtonGroup>
            </Alert>
        </AlertContainer>
    );
};


export default AlertboxComponent;