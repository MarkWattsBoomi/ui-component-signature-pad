
declare var manywho: any;

import * as React from 'react';
var SignaturePad  = require('react-signature-pad-wrapper');
import './SignatureBox.css';

class SignatureBox extends React.Component<any, any> 
{   
    componentId: string = "";
    flowKey: string ="";    
    attributes : any = {};
    selectedItem: string = null;

    text : string = "";

    constructor(props : any)
	{
        super(props);
        
        this.componentId = props.id;
        this.flowKey = props.flowKey;

        //push attributes into keyed map 
		var flowModel = manywho.model.getComponent(this.props.id,   this.props.flowKey);
		if(flowModel.attributes)
		{
			for(var key in flowModel.attributes)
			{
				this.attributes[key] = flowModel.attributes[key];
			}
        }
    }

    
    componentDidMount() 
    {
        var flowModel = manywho.model.getComponent(this.props.id,   this.props.flowKey);
        const flowState = manywho.state.getComponent(this.props.id,   this.props.flowKey);

        if(flowModel.contentValue)
		{
            flowState.contentValue = flowModel.contentValue;
            var sigPad : any = this.refs.signaturePad;
            sigPad.fromDataURL(flowModel.contentValue);
        }

        this.forceUpdate();
    }

    componentDidUpdate()
    {

        var sigPad : any = this.refs.signaturePad;
        //sigPad.onEnd = this.strokeEnd.bind(this); 
    }

	getAttribute(attributeName : string)
	{
		if(this.attributes[attributeName])
		{
			return this.attributes[attributeName];
		}
		else
		{
			return null;
		}
	}

       
    clearSignature()
    {
        var sigpad : any = this.refs.signaturePad;
        sigpad.clear();

        var data : string = sigpad.toDataURL();
        
        const flowState = manywho.state.getComponent(this.props.id,   this.props.flowKey);

        flowState.contentValue = data;

    }

    strokeEnd()
    {
        var sigpad : any = this.refs.signaturePad;

        var data : string = sigpad.toDataURL();
        
        const flowState = manywho.state.getComponent(this.props.id,   this.props.flowKey);

        flowState.contentValue = data;
    }


	render()
	{
	   
		const flowModel = manywho.model.getComponent(this.props.id,   this.props.flowKey);
        const flowState = manywho.state.getComponent(this.props.id,   this.props.flowKey);
        
        var options : any = {};
        options.width="100px";
        options.height="70";
        options.penColor = "#000000";
        options.redrawOnResize= true;
        options.onEnd = this.strokeEnd.bind(this);
        

        //create an array of SFKResultListItem classes for the data
        var self = this;
        

        return <div className="signature-box">
                    <div className="signature-box-header">
                        <div style={{float:'left'}}>
                            <span className="signature-box-header-title">Signature - please draw your signature in the area below</span>
                        </div>
                        <div style={{float:'right'}}>
                            <span className="glyphicon glyphicon-remove signature-box-header-button" onClick={this.clearSignature.bind(this)}></span>
                        </div>
                        
                    </div>
                    <div className="signature-box-body">
                        <SignaturePad ref="signaturePad" redrawOnResize={true} options={options} />
                    </div>
               </div>
    }
}

manywho.component.register('SignatureBox', SignatureBox);

export default SignatureBox;