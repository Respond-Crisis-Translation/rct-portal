import React from 'react';
import './ErrorMessage.css';

function ErrorMessage(props) {

    const { errorCode } = props;

    function getErrorMessage() {
        switch(errorCode) {
            case 'anonymous-auth-failed':
                return 'Anonymous authentication failed. Try again.'
            case 'unauthorized-access':
                return 'Ohhh ho! You are trying to sneak around! Please get to admin for access to this page.';
            case 'create-list-error':
                return 'Failed to create the grocery list. Try again.';
            case 'add-user-to-list-error':
                return 'Failed to add user to the grocery list. Try again.';
            case 'duplicate-item-error':
                return 'grocery item on list already';
            case 'user-name-required':
                return 'your name is required';
            default:
                return 'Oops, something went wrong.';
        }
    }

    return errorCode ? <p className="error">{getErrorMessage()}</p> : null;
}

export default ErrorMessage;