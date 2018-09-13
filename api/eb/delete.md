# Employer Branding Organizations

### Delete Employer Branding resources

Using this endpoint you can delete ALL your Employer Branding related resources, including pages, email templates, emails and videos. All candidate screening resources are not deleted.

**Important**: The members of an Employer Branding organization will not be deleted. If you are a partner, you can delete this using the `DELETE /users/me` API endpoint, when you are authenticated as the user itself.

**Request**

    DELETE /api/organization/5b53484422e3d6123e82788/eb
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

    A 204 status message
