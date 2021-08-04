import React from 'react';
import {Header, HeaderWrapper, Logo, LogoImg} from "../styles/Global";
import logoSvg from "../assets/icons/logo.svg"
const SiteHeader = () => {
    return (
        <Header>
            <HeaderWrapper>
                <Logo><LogoImg src={logoSvg}/> </Logo>
            </HeaderWrapper>
        </Header>
    );
};

export default SiteHeader;