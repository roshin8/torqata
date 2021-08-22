import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from 'redux/auth'

export const BackButton = React.memo(() => {
  const history = useHistory();
  return (
    <span
      className="back-btn"
      style={{ display: "inline-block", marginRight: "20px" }}
    >
      <CButton
        block
        shape="pill"
        color="light"
        onClick={() => history.goBack()}
      >
        <CIcon name="cil-arrow-left" />
      </CButton>
    </span>
  );
});

const Register = () => {
  const dispatch = useDispatch()
  const authError = useSelector(state => state.auth.authError)
  const isLoggedIn = useSelector((state) => state.firebase.auth.uid);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    dispatch(signUp({email, password}))
  } 

  if (isLoggedIn){
    return <Redirect to='/' /> 
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      alignItems: "stretch",
                    }}
                  >
                    <BackButton />
                    <div>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                    </div>
                  </div>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      onChange={e => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CButton color="success" block onClick={handleSubmit}>
                    Create Account
                  </CButton>
                  <div style={{color: 'red', textAlign: 'center'}}> {authError} </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default Register
