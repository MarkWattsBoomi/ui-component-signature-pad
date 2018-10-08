# Signature Box

This component allows the user to draw in a box on the form.

This can either be with the mouse or via a touch screen.

The resulting image is stored into a text field on the Flow instance as a base64 image.

## Setup

- Grab the js file & css from the /dist folder and upload it as an asset to your tenant.

- Add the files to your player code like this: -

        requires: ['core', 'bootstrap3'],
        customResources: [
                'https://s3.amazonaws.com/files-manywho-com/tenant-id/SignatureBox.css',
                'https://s3.amazonaws.com/files-manywho-com/tenant-id/SignatureBox.js'
                ],


- Add a component to your page, any type, save it then change it's "componentType" to "SignatureBox" in the metadata editor and save it.
e.g. 
            "componentType": "SignatureBox",

- Set the component's width from the property pages.

- Add a String value to the Flow to hold the resulting image e.g. "SignatureImage".

- Set the component's "State" to a the string field (e.g. SignatureImage). 

## Extra Configuration

You can add attributes to the component to control it's appearance: -

- Title  - String - A string to use as the signature box's title
