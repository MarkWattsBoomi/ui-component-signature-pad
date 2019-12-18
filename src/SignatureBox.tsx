import {FlowComponent } from 'flow-component-model';
import * as React from 'react';
import SignaturePad  from 'react-signature-pad-wrapper';
import './css/SignatureBox.css';

declare const manywho: any;

class SignatureBox extends FlowComponent {

    sigpad: any;

    constructor(props: any) {
        super(props);

        this.clearSignature = this.clearSignature.bind(this);
        this.strokeEnd = this.strokeEnd.bind(this);
    }

    async componentDidMount() {
        await super.componentDidMount();
    }

    clearSignature() {
        this.sigpad.clear();
        const data: string = this.sigpad.toDataURL();
        this.setStateValue(data);
    }

    strokeEnd() {
        const data: string = this.sigpad.toDataURL();
        this.setStateValue(data);
    }

	   render() {
        const options: any = {};
        options.width = '100px';
        options.height = '70';
        options.penColor = '#000000';
        options.redrawOnResize = true;
        options.onEnd = this.strokeEnd;

        const title = this.getAttribute('title') || 'Signature - please draw your signature in the area below';

        return (
            <div className="signature-box">
                <div className="signature-box-header">
                    <div style={{float: 'left'}}>
                        <span className="signature-box-header-title">{title}</span>
                    </div>
                    <div style={{float: 'right'}}>
                        <span className="glyphicon glyphicon-remove signature-box-header-button" onClick={this.clearSignature}/>
                    </div>

                </div>
                <div className="signature-box-body">
                    <SignaturePad ref={(ele: any) => {this.sigpad = ele; }} redrawOnResize={true} options={options}/>
                </div>
            </div>
        );
    }
}

manywho.component.register('SignatureBox', SignatureBox);

export default SignatureBox;
