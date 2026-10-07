---
hide_table_of_contents: true
---

# Delete Employer Branding resources

Using this endpoint you can delete ALL your Employer Branding related resources, including pages, email templates, emails and videos. All candidate screening resources are not deleted.

**Important**: The members of an Employer Branding organization will not be deleted. If you are a partner, you can delete a user with the [`DELETE /api/user/me`](../user.md#delete-your-profile) endpoint, when you are authenticated as that user. (This page used to name the endpoint `DELETE /users/me`, which does not exist.)

**Request**

    DELETE /api/organizations/5b53484422e3d6123e82788/eb
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

    A 204 status message
