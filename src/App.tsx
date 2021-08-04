import React from 'react';
import {
    Container, Grid,
    List,
    ListItems,
    ListItemText,
    ListWrapper,
    Loading,
    SiteErrorMessage, SiteLoading,
    Wrapper
} from "./styles/Global";
import {useActions} from "./hooks/useActions";
import {useTypedSelector} from "./hooks/useTypedSelector";
import loadSvg from "./assets/icons/load.svg";
import {Company, CompanyStreet} from "./types/company";
import MenuList from "./components/MenuList";
import Clients from "./components/Clients";
import SiteHeader from "./components/SiteHeader";


function App() {
  const {
      loadCompanyActionCreator,
      setActiveStreetActionCreator,
      loadCompanyStreetsActionCreator,
      setActiveCompanyActionCreator,
      setActiveHouseActionCreator,
      setActiveApartmentActionCreator} = useActions();
  const {
      companyList,
      activeCompany,
      activeApartment,
      apartments,
      streetsArchive,
      houses,
      activeHouse,
      activeStreet,
      loading,
      streets} = useTypedSelector(store=>store.company);
  const {loadingSite, error} = useTypedSelector(store=>store.site);
  const setActiveCompanyHandler = (company: Company):void => {
      if(activeCompany!==null && activeCompany.id === company.id )
          setActiveCompanyActionCreator(null);
      else{
          setActiveCompanyActionCreator(company);
      }
  }
  const setActiveStreetHandler = (street: CompanyStreet) => {
     if(street.streetId === activeStreet?.streetId){
         setActiveStreetActionCreator(null, streetsArchive);
     }else{
         setActiveStreetActionCreator(street, streetsArchive);
     }
  }
  const setActiveHouseHandler = (apartment: CompanyStreet) => {
      if(apartment.houseId === activeHouse?.houseId){
          setActiveHouseActionCreator(null, streetsArchive)
      }else{
          setActiveHouseActionCreator(apartment, streetsArchive)
      }
  }
  const setActiveApartmentHandler = (apartment: CompanyStreet) => {
      setActiveApartmentActionCreator(apartment);
  }

  React.useEffect( ()=> {
      loadCompanyActionCreator();
  },[]);

  React.useEffect( () => {
     activeCompany!==null && loadCompanyStreetsActionCreator(activeCompany.id)
  }, [activeCompany]);

  React.useEffect(()=>{
     activeApartment!==null && setActiveApartmentHandler(activeApartment)
  }, [activeApartment]);


  if(loadingSite) return <SiteLoading>Загрузка....</SiteLoading>
  return (<Wrapper>
          <SiteHeader/>
      {error && <SiteErrorMessage>{error}</SiteErrorMessage>}
        <Container>
            <Grid>
                <ListWrapper>
                    <List>
                        {companyList.map( (company, ind) => (
                            <List key={ind} floor={0}>
                                <ListItems onClick={() => setActiveCompanyHandler(company)}>
                                    <ListItemText>
                                        {company.name}
                                        {loading && company.id === activeCompany?.id && <Loading src={loadSvg} />}
                                    </ListItemText>
                                </ListItems>
                                {activeCompany !== null && activeCompany.id === company.id
                                && streets!==null && streets.map((street, ind) => (
                                    <List floor={1} key={ind}>
                                        <MenuList
                                            active={activeStreet?.streetId === street.streetId}
                                            handler={setActiveStreetHandler}
                                            item={street}
                                            type={"street"}
                                        />
                                        {activeStreet!== null  &&  houses!==null && activeStreet.streetId === street.streetId &&
                                        houses.map( (house, ind) =>(
                                            <List key={ind} floor={2} >
                                                <MenuList
                                                    active={activeHouse?.houseId === house.houseId}
                                                    handler={setActiveHouseHandler}
                                                    item={house}
                                                    type={"house"}
                                                />
                                                {activeHouse!==null && apartments!==null && activeHouse.houseId === house.houseId &&
                                                apartments.map( (apartment, ind) => (<List key={ind} floor={3}>
                                                    <MenuList
                                                        active={activeHouse.houseId === apartment.houseId}
                                                        handler={setActiveApartmentHandler}
                                                        item={apartment}
                                                        type={"apartment"}
                                                    />
                                                </List>))
                                                }
                                            </List>
                                        ))}

                                    </List>
                                ))}
                            </List>
                        ))}
                    </List>
                </ListWrapper>
                <Container>

                    {activeApartment !==null && streetsArchive!==null &&
                        <Clients clients={activeApartment} archive = {streetsArchive}/>
                    }
                </Container>
            </Grid>

        </Container>
    </Wrapper>
);
}

export default App;
