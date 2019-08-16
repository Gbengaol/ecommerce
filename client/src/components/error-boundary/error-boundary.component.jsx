import React from 'react';
import './error-boundary.styles.scss';

class ErrorBoundary extends React.Component {
    constructor(){
        super()
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return ({hasError: true})
    }

    componentDidCatch(error, info){
        console.log(error);
        console.warn(info);
    }
    render(){
        const { hasError } = this.state;
        if (hasError) {
            return(
                <div className="errorImageOverlay">
                    <div className="errorImageContainer"></div>
                    <h3 className="errorImageText">
                        This page broke, please contact the system administrator.<br/>
                        <i>Olufeyimi Gbenga (gbqngq@gmail.com) </i>
                    </h3>
                </div>
            )
        }
            return this.props.children        
    }
}

export default ErrorBoundary;