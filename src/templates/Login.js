import React, {useState} from 'react';
import styled from 'styled-components'
import axios from 'axios';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const _handleClick = () => {
    setLoading(true);
    axios.put(`https://dev.tuten.cl/TutenREST/rest/user/${email}`, {},{
        headers: {
            password: password,
            app: "APP_BCK"
        }        
    })
    .then(function (response) {
        console.log(response)
        setLoading(false);
        if(response.data && response.data.sessionTokenBck){
            localStorage.setItem("token",response.data.sessionTokenBck);
            props.history.push("/list");
        }else{
            setLoading(false);
            setResult({error: true});
        }
    })
    .catch(function (error) {
      setLoading(false);
      setResult({error: true});
    });
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
  
  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <Banner />
      <Form>
        <FormCard>
          <Title>Iniciar sesión</Title>
          <Label>Correo electrónico:</Label>
          <Input type="email" onChange={changeEmail} />
          <Label>Contraseña:</Label>
          <Input type="password" onChange={changePassword} />
          {loading ? <Form>Consultando...</Form> : <Button onClick={_handleClick}>Iniciar sesión</Button>}

          {!loading && result && result.error ? <div>Usuario o contraseña incorrectos.</div> : null}

        </FormCard>
      </Form>

    </div>
  );
}

const Button = styled.div`
  border: none;
  outline: none;
  background-color:  #1A60CA;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  margin-top: 15px;
  color: #FFF;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  hover: {
    opacity: .7;
  }
`

const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #1A60CA;
  width: 100%;
`

const Label = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`

const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FormCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 10px;
  width: 300px;
  height: 100%;
  margin-top: -50px;
  background-color: #FFF;
  padding: 15px;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`

const Banner = styled.div`
  height: 200px;
  background-color: #1A60CA;
`

export default Login;
