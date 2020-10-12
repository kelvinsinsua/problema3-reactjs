import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import axios from 'axios';

const Lista = (props) => {
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [matches, setMatches] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  useEffect(() => {
      if(localStorage.getItem("token")){
        axios.get(`https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true`,{
            headers: {
                adminemail: "testapis@tuten.cl",
                app: "APP_BCK",
                token: localStorage.getItem("token")
            }        
        })
        .then(function (response) {
            console.log(response)
            if(Array.isArray(response.data)){
                setData(response.data)
                setMatches(response.data)
            }else{
                setData({error: true})
            }
        })
        .catch(function (error) {
        setData({error: true})
        });
      }else{
        props.history.push("/");
      }
  },[])
 
  const changeId = (e) => {
    setId(e.target.value);
    filter(e.target.value, minPrice, maxPrice);
  }
 
  const changeMinPrice = (e) => {
    setMinPrice(e.target.value);
    filter(id, e.target.value, maxPrice);
  }
 
  const changeMaxPrice = (e) => {
    setMaxPrice(e.target.value);
    filter(id, minPrice, e.target.value);
  }

  const filter = (id, minPrice, maxPrice) => {
    if(Array.isArray(data)){
      let matches = data.filter((item) => {
        let valid = true;
        if(id){
          valid = (item.bookingId.toString().indexOf(id) > -1);
        }
        if(minPrice && valid){
          valid = item.bookingPrice >= minPrice ? true : false;
        }
        if(maxPrice && valid){
          valid = item.bookingPrice <= maxPrice ? true : false;
        }
        return valid;
      })

      

      setMatches(matches);
    }
  }

  return (
    <div>
      <Banner />
      <Form>
        <FormCard>
          <Input type="text" placeholder="BookingId" onChange={changeId}/>
          <Input type="text" placeholder="Precio mínimo" onChange={changeMinPrice}/>
          <Input type="text" placeholder="Precio máximo" onChange={changeMaxPrice}/>
          <Title>Lista</Title>
          <GridContainer>
                <Th>
                BookingId
                </Th>
                <Th>
                Cliente
                </Th>
                <Th>
                Fecha de Creación
                </Th>
                <Th>
                Dirección
                </Th>
                <Th>
                Precio
                </Th>
            </GridContainer>
                {Array.isArray(data) ? matches.map((item,key) => {
                    return(
                        <GridContainer key={key}>
                            <Td>{item.bookingId}</Td>
                            <Td>{item.tutenUserClient.firstName} {item.tutenUserClient.lastName}</Td>
                            <Td>{item.bookingTime}</Td>
                            <Td>{item.locationId.streetAddress}</Td>
                            <Td>{item.bookingPrice}</Td>
                        </GridContainer>
                    )
                }) : null}

        { data && data.error ? <div>Ha ocurrido un error al obtener los datos.</div> : null}
        
          

        </FormCard>
      </Form>

    </div>
  );
}

const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #1A60CA;
  width: 200px;
  margin-right: 10px;
`

const Button = styled.div`
  border: none;
  outline: none;
  background-color:  #1A60CA;
  width: 120px;
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

const Th = styled.div`
  text-align: center;
  font-weight: bold;
  min-width: 100px;
`

const Td = styled.div`
  text-align: center;
  min-width: 100px;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border-bottom: 1px solid #000;
  justify-items: center;
  margin-top: 20px;
  grid-gap: 10px;
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
  min-width: 500px;
  max-width: 1200px;
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

export default Lista;
