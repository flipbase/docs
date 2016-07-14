## Sent confirmation form is processed

To make sure there is no discrepancy in the number of videos are stored in your database, and het number of videos are stored in our database, we require an additional 'sent confirmation' request. 
Video is often one of multiple input fields in a form. In a scenario where video submission is optional, the Recorder.js application cannot detect if whole form is actually submitted (/sent) by the user. This prevents a statistical discrepancies and therefore we advise strongly to send a 'send confirmation' request if the user submits the form.

**Request***
    
    PUT /videos/:id
    
    {
      status: 'sent'
    }

**Response**

    {
      status: 'sent'
    }