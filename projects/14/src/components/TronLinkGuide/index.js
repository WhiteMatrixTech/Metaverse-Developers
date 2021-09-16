import React from 'react';

import TronLinkLogo from './TronLinkLogo.png';
import './TronLinkGuide.scss';
import { useTranslation } from 'react-i18next'

const WEBSTORE_URL = 'https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/';

const logo = (
    <div className='logo'>
        <img src={ TronLinkLogo } alt='TronLink logo' style={{width:"50%",height:"50%"}}/>
    </div>
);

const openTronLink = () => {
    window.open(WEBSTORE_URL, '_blank');
};

const TronLinkGuide = props => {
    const {
        installed = false
    } = props;

    const {t} =useTranslation()
    if(!installed) {
        return (
            <div className='tronLink' onClick={ openTronLink }>
                <div className='info'>
                    <p>
                        {t('intall-tips')}
                        <a href={ WEBSTORE_URL } target='_blank' rel='noopener noreferrer'>TronLink</a>
                    </p>
                </div>
              
            </div>
        );
    }

    return (
        <div className='tronLink hover' onClick={ openTronLink }>
            <div className='info'>
                <h1>Log in Required</h1>
                <p>
                    TronLink is installed but you must first log in. Open TronLink from the browser bar and set up your
                    first wallet or decrypt a previously-created wallet.
                </p>
            </div>
            { logo }
        </div>
    );
};

export default TronLinkGuide;