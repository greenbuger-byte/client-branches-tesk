import styled, {createGlobalStyle} from "styled-components";
enum eVariables {
  RED_COLOR = "#b61827",
  DARKEN_COLOR = "#383838",
  BLANK_COLOR ="#FFFFFF",
  DEFAULT_COLOR = "#0468ff",
  BORDER = "5px",
  BOX_SHADOW = "-1px 8px 13px -7px rgba(34, 60, 80, 0.2)",
  BOX_SHADOW_ACTIVE = "-1px 8px 13px -7px rgba(34, 60, 80, 0.5)",

}
export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    list-style: none;
    color: ${eVariables.DARKEN_COLOR};
  }
`;

export const Grid = styled.div<{fr?: string}>`
  display: grid;
  grid-template-columns: ${({fr})=> fr ? fr : ' 1fr 2fr '};
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
export const SiteErrorMessage = styled.div`
  position: fixed;
  bottom: 20px;
  padding: 10px;
  right: 20px;
  font-size: 12px;
  width: 250px;
  background-color: ${eVariables.RED_COLOR};
  color:${eVariables.BLANK_COLOR};
`;
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  
`;
export const Wrapper = styled.div`

`;
export const Header = styled.div`
  background: #fff;
  height: 60px;
  position: sticky;
  z-index: 999;
  top:0;
  box-shadow: ${eVariables.BOX_SHADOW};
`;
export const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Logo = styled.h1`
  font-size: 20px;
  
`;

export const Loading = styled.img`
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

export const CardWrapper = styled.div`
  padding: 5px;
`;

export const Card = styled.div<{h?: number}>`
  border: 1px solid whitesmoke;
  border-radius: ${eVariables.BORDER};
  padding: 20px;
  width: 100%;
  ${({h})=> h && `height: ${h}px;`}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${eVariables.BOX_SHADOW};
  transition: .3s;
  &:hover{
    box-shadow: ${eVariables.BOX_SHADOW_ACTIVE};
  }
`;

export const Button = styled.button<{bg?: string}>`
  border: 0px;
  outline: none;
  background-color: ${({bg})=>bg ? bg : eVariables.DEFAULT_COLOR};
  color: ${eVariables.BLANK_COLOR};
  opacity: .8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:10px 20px;
  cursor: pointer;
  border-radius: ${eVariables.BORDER};
  transition: .3s;
  &:disabled{
    background-color: whitesmoke;
    color: darkgrey;
  }
  &:hover{
    opacity: 1;
  }
`;

export const InfoMessage = styled.div`
  background-color: #fdf5eb;
  color: black;
  font-size: 14px;
  padding: 20px;
  display: flex;
  border-radius: 5px;
  width: 100%;

`;

// ==> CLIENT
export const ClientHeader = styled.div`
  display: flex;
  margin: 20px 0;
  position: sticky;
  top: 65px;
  background-color: ${eVariables.BLANK_COLOR};
  z-index: 888;
  border-bottom: 1px solid whitesmoke;
  padding: 10px 10px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const ClientIcon = styled.span`
  margin: 0 5px;
`;
export const ClientTitleCard = styled.h4`
  font-size: 16px;
  font-weight: 500;
  max-width: 100%;
  height: 50px;
  overflow: hidden;
`;
export const ClientRow = styled.div`
  padding: 5px;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 30px;
  overflow: hidden;
  width: 100%;
`;

export const ClientsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 10px 0;
  @media screen and (max-width: 1000px){
    grid-template-columns: 1fr 1fr;
  }
  @media screen and  (max-width: 800px){
    grid-template-columns: 1fr;
  }
`;

//===> LIST
export const ListWrapper = styled.div`
  display: block;
  position: sticky;
  margin: 10px 0;
  top:60px;
  border-right: 1px solid whitesmoke;
  width: 300px;
  z-index: 666;
  height: calc(100vh - 80px);
  overflow-y: scroll;
  background-color: white;
  &::-webkit-scrollbar {
    width: 0;
  }
  @media screen and (max-width: 800px){
    position: fixed;
  }
`;
export const List = styled.ul<{floor?:number}>`
  list-style: none;
  margin-left: ${({floor}) => floor ? (floor*20)+'px' : '0'};
`;
export const ListItems = styled.li<{active?: boolean}>`
  padding: 10px 10px;
  background-color: ${({active})=>active ? "whitesmoke" : "#fff"};
  cursor: pointer;
  transition: .3s;
  &:hover{
    background-color: whitesmoke;
  }
`;
export const ListItemText = styled.span`
  margin: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ListIcon = styled.div<{active?: boolean}>`
  width: 20px;
  height: 20px;
  ${({active})=> active && `transform: rotate(90deg)`}
`;
export const ListUserIcon = styled.div`
  display: flex;
  align-items: center;
`;

//==> ADD CLIENT

export const AddForm = styled.form`
  display: flex;
  justify-content: space-around;
`;
export const Input = styled.input<{error?: boolean}>`
  border: 1px solid ${({error}) => error ? '#b61827' : 'whitesmoke'};
  padding: 10px;
  border-radius: 5px;
  outline: none;
  width: 100%;
  &::placeholder {
    color: #bbbaba;
    font-weight: 300;
  }
`;

export const FormControl = styled.div`
  padding: 10px;
  position: relative;
  width: 25%;
`;
export const FormError = styled.div`
  color: #b61827;
  bottom: -20px;
  line-height: 10px;
  font-size: 13px;
  font-weight: 300;
  padding: 5px;
`;

export const LogoImg = styled.img`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SiteLoading = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top:0;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  opacity: .9;
`;